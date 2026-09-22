"use client";

import { useEffect, useState } from "react";
import GitHubContribution, { ContributionWeek } from "./GitHubContribution";

export function GithubCalendar() {
  const [totalContributions, setTotalContributions] = useState<number>(1343);
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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
          if (typeof total === "number") setTotalContributions(total);
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
