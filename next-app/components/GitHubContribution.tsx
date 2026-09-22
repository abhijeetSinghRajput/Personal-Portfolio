"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpRight, Loader2, RefreshCcw, Trash2 } from "lucide-react";
import GithubIcon from "./icons/githubIcon";

const CELL_SIZE = 10;
const CELL_GAP = 3;
const STEP = CELL_SIZE + CELL_GAP;
const MONTH_LABEL_HEIGHT = 20;

const COLORS = {
  light: [
    "#ebedf0",
    "hsl(150, 66%, 16%)",
    "hsl(148, 100%, 21%)",
    "hsl(133, 63%, 40%)",
    "hsl(130, 64%, 53%)",
  ],
  dark: [
    "#1e1e1f",
    "hsl(150, 66%, 16%)",
    "hsl(148, 100%, 21%)",
    "hsl(133, 63%, 40%)",
    "hsl(130, 64%, 53%)",
  ],
};

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubContributionProps {
  weeks: ContributionWeek[];
  totalContributions: number;
  gh_username?: string;
  isOwner?: boolean;
  onDisconnect?: () => Promise<void>;
  onRefresh?: () => Promise<void>;
  isLoading?: boolean;
}

// Accepts contributions from GitHub GraphQL API response
// shape: [{ date: "2024-05-14", contributionCount: 3 }]

export default function GitHubContribution({
  weeks = [],
  totalContributions = 0,
  gh_username = "",
  isOwner = false,
  isLoading,
  onDisconnect,
  onRefresh,
}: GitHubContributionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDisconnect = async () => {
    if (!onDisconnect) return;
    const confirmed = window.confirm(
      "Disconnect your GitHub account from NoteHub?"
    );
    if (!confirmed) return;
    setIsDisconnecting(true);
    try {
      await onDisconnect();
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  function getLevel(count: number) {
    if (count >= 7) return 4;
    if (count >= 4) return 3;
    if (count >= 2) return 2;
    if (count > 0) return 1;
    return 0;
  }

  // Build month labels
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({
        x: wi * STEP,
        label: new Date(firstDay.date).toLocaleString("default", {
          month: "short",
        }),
      });
      lastMonth = month;
    }
  });

  const svgWidth = Math.max(weeks.length * STEP, 53 * STEP);
  const svgHeight = MONTH_LABEL_HEIGHT + 7 * STEP;

  return (
    <>
      <div className="flex justify-between items-center gap-8 mb-2">
        <p className="mb-2 text-[#a3a3a3] text-xs">
          <span className="font-semibold text-[#fafafa]">
            {totalContributions.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>
        {isOwner && (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              tooltip="Disconnect GitHub"
              onClick={handleDisconnect}
              disabled={isDisconnecting || isRefreshing}
            >
              {isDisconnecting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              tooltip="Refresh contributions"
              onClick={handleRefresh}
              disabled={isRefreshing || isDisconnecting}
            >
              {isRefreshing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <RefreshCcw />
              )}
            </Button>
          </div>
        )}
      </div>
      <div className="w-full overflow-x-auto pb-1 calendar-grid">
        <svg
          width="100%"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className={`block min-w-[650px] ${isLoading ? " animate-pulse" : ""}`}
        >
          {/* Month labels */}
          {monthLabels.map(({ x, label }, i) => (
            <text
              key={i}
              x={x}
              y={12}
              fontSize={10}
              fill={isDark ? "#8b949e" : "#57606a"}
              fontFamily="monospace"
            >
              {label}
            </text>
          ))}

          {/* Cells */}
          {weeks.map((week, wi) =>
            week.contributionDays.map((day, di) => {
              const x = wi * STEP;
              const y = MONTH_LABEL_HEIGHT + di * STEP;
              return (
                <rect
                  key={day.date}
                  x={x}
                  y={y}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  fill={colors[getLevel(day.contributionCount)]}
                  data-date={day.date}
                  data-count={day.contributionCount}
                >
                  <title>
                    {day.contributionCount === 0
                      ? `No contributions on ${day.date}`
                      : `${day.contributionCount} contributions on ${day.date}`}
                  </title>
                </rect>
              );
            })
          )}
        </svg>
      </div>
      {/* Legend */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <div className="flex items-center gap-2">
            <GithubIcon className="size-4 text-[#fafafa]" />
            {gh_username && (
              <a
                href={`https://github.com/${gh_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-0.5 text-[#a3a3a3] hover:text-[#fafafa] text-xs transition-colors"
              >
                {gh_username}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <span className="text-[#a3a3a3] text-xs mr-1">Less</span>
          {colors.map((c, i) => (
            <div
              key={i}
              className="rounded-[2px] size-2.5 sm:size-3"
              style={{ backgroundColor: c }}
            />
          ))}
          <span className="text-[#a3a3a3] text-xs ml-1">More</span>
        </div>
      </div>
    </>
  );
}
