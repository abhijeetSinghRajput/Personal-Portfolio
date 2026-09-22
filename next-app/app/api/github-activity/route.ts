import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "abhijeetSinghRajput";

  if (token) {
    try {
      const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date,
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
      `;
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 3600 },
      });
      const data = await response.json();
      if (data?.data?.user?.contributionsCollection?.contributionCalendar) {
        return NextResponse.json(data);
      }
    } catch {
      // Fall through to public endpoint
    }
  }

  // Use public contributions API for real-time accurate counts
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Public API returned error");
    const json = await res.json();

    // Group into weeks
    const days = json.contributions || [];
    const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] = [];
    let currentWeek: { date: string; contributionCount: number }[] = [];

    for (const day of days) {
      currentWeek.push({
        date: day.date,
        contributionCount: day.count,
      });
      if (currentWeek.length === 7) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
    }

    return NextResponse.json({
      data: {
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: json.total?.lastYear || 1343,
              weeks,
            },
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity", details: String(error) },
      { status: 500 }
    );
  }
}
