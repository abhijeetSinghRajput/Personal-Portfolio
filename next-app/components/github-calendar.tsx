"use client";

import { useEffect, useState } from "react";
import GitHubContribution, { ContributionWeek } from "./GitHubContribution";

const CACHE_KEY = "github_contributions_cache";
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes cache

export function GithubCalendar() {
  const [totalContributions, setTotalContributions] = useState<number>(1343);
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let hasValidCache = false;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const isFresh = Date.now() - parsed.timestamp < CACHE_DURATION_MS;

        if (
          parsed.weeks &&
          Array.isArray(parsed.weeks) &&
          parsed.weeks.length > 0
        ) {
          setWeeks(parsed.weeks);
          if (typeof parsed.totalContributions === "number") {
            setTotalContributions(parsed.totalContributions);
          }
          setIsLoading(false);
          if (isFresh) {
            hasValidCache = true;
          }
        }
      }
    } catch {
      // Ignore localStorage read errors
    }

    if (hasValidCache) return;

    const fetchGithubData = async () => {
      try {
        const res = await fetch("/api/github-activity");
        if (!res.ok) throw new Error("Failed to load activity");
        const json = await res.json();

        const fetchedWeeks =
          json?.data?.user?.contributionsCollection?.contributionCalendar
            ?.weeks;
        const total =
          json?.data?.user?.contributionsCollection?.contributionCalendar
            ?.totalContributions;

        if (
          fetchedWeeks &&
          Array.isArray(fetchedWeeks) &&
          fetchedWeeks.length > 0
        ) {
          setWeeks(fetchedWeeks);
          const totalVal = typeof total === "number" ? total : 1343;
          if (typeof total === "number") setTotalContributions(totalVal);

          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                weeks: fetchedWeeks,
                totalContributions: totalVal,
              })
            );
          } catch {
            // Ignore localStorage write errors
          }
        }
      } catch {
        // keep defaults
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <div
      id="github"
      className="portfolio-container !bg-[#1e1e1f] border border-[hsl(0,0%,22%)] text-[#e6edf3]"
    >
      <GitHubContribution
        weeks={weeks}
        totalContributions={totalContributions}
        gh_username="abhijeetSinghRajput"
        isLoading={isLoading}
      />
    </div>
  );
}
