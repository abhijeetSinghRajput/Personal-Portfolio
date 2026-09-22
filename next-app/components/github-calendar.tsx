"use client";

import { useEffect, useState, useRef } from "react";

interface DayData {
  date: string;
  count: number;
  level: number;
  tooltip: string;
}

const MONTHS_STR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SUFFIXES = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

export function GithubCalendar() {
  const [totalContributions, setTotalContributions] = useState<number>(1343);
  const [gridData, setGridData] = useState<DayData[][]>([]);
  const [monthHeaders, setMonthHeaders] = useState<{ label: string; flex: number }[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const res = await fetch("/api/github-activity");
        if (!res.ok) throw new Error("Failed to load activity");
        const json = await res.json();

        const weeks =
          json?.data?.user?.contributionsCollection?.contributionCalendar
            ?.weeks;
        const total =
          json?.data?.user?.contributionsCollection?.contributionCalendar
            ?.totalContributions || 1343;

        if (weeks && Array.isArray(weeks) && weeks.length > 0) {
          const contributions: [string, number][] = [];
          const monthsList: number[] = [];

          for (const week of weeks) {
            if (week.contributionDays && week.contributionDays.length > 0) {
              monthsList.push(+week.contributionDays[0].date.split("-")[1]);
              for (const day of week.contributionDays) {
                contributions.push([day.date, day.contributionCount]);
              }
            }
          }

          // Calculate month column proportions
          let count = 1;
          const frList: number[] = [];
          for (let i = 1; i < monthsList.length; ++i) {
            if (monthsList[i - 1] === monthsList[i]) {
              count++;
            } else {
              frList.push(count);
              count = 1;
            }
          }
          frList.push(count);

          if (contributions.length > 0) {
            const startMonth = new Date(contributions[0][0]).getMonth();
            const headers = frList.map((fr, idx) => ({
              label: MONTHS_STR[(startMonth + idx) % 12],
              flex: fr,
            }));
            setMonthHeaders(headers);
          }

          const newGrid: DayData[][] = Array.from({ length: 7 }, () =>
            Array.from({ length: 53 }, () => ({
              date: "",
              count: 0,
              level: 0,
              tooltip: "",
            }))
          );

          let itemIdx = 0;
          for (let col = 0; col < 53; ++col) {
            for (let row = 0; row < 7; ++row) {
              if (itemIdx >= contributions.length) break;
              const [dateStr, countVal] = contributions[itemIdx++];
              let lvl = 0;
              if (countVal >= 7) lvl = 4;
              else if (countVal >= 4) lvl = 3;
              else if (countVal >= 2) lvl = 2;
              else if (countVal > 0) lvl = 1;

              const [, mStr, dStr] = dateStr.split("-");
              const m = parseInt(mStr, 10);
              const d = parseInt(dStr, 10);
              const sfx = SUFFIXES[d % 10] || "th";

              newGrid[row][col] = {
                date: dateStr,
                count: countVal,
                level: lvl,
                tooltip: `${countVal} contributions on ${FULL_MONTHS[m - 1]} ${d}${sfx}`,
              };
            }
          }

          setGridData(newGrid);
          setTotalContributions(total);
        }
      } catch {
        // Fallback grid
      }
    };

    fetchGithubData();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollLeft = gridRef.current.scrollWidth;
    }
  }, [gridData]);

  const getLevelColor = (lvl: number) => {
    switch (lvl) {
      case 1:
        return "bg-[hsl(150,66%,16%)]";
      case 2:
        return "bg-[hsl(148,100%,21%)]";
      case 3:
        return "bg-[hsl(133,63%,40%)]";
      case 4:
        return "bg-[hsl(130,64%,53%)]";
      default:
        return "bg-[#2d2d2f]";
    }
  };

  return (
    <div
      id="github"
      className="portfolio-container !bg-[#1e1e1f] border border-[hsl(0,0%,22%)] text-[#e6edf3]"
    >
      <p className="text-[#a3a3a3] text-sm">
        <span
          id="contribution-count"
          className="font-bold text-[#ffeea6]"
        >
          {totalContributions}
        </span>{" "}
        contributions in the last year
      </p>

      <div
        ref={gridRef}
        className="calendar-grid grid grid-cols-[28px_1fr] gap-1 overflow-x-auto text-[12px] leading-[12px] capitalize pb-1 mt-4 mb-2 select-none"
      >
        <div />
        {/* Month Headers */}
        <div className="flex justify-between items-center text-[#9ba1a8] text-[11px] mb-1">
          {monthHeaders.map((m, idx) => (
            <div
              key={idx}
              style={{ flex: `${m.flex} 1 0%` }}
              className="text-left"
            >
              {m.label}
            </div>
          ))}
        </div>

        {/* Week Day Labels */}
        <ul className="flex flex-col justify-between py-1 text-[#9ba1a8] text-[10px]">
          <li className="mt-1">Mon</li>
          <li className="mt-3.5">Wed</li>
          <li className="mt-3.5">Fri</li>
        </ul>

        {/* 53 Columns x 7 Rows Grid */}
        <div className="grid grid-cols-[repeat(53,minmax(10px,1fr))] grid-rows-[repeat(7,minmax(10px,1fr))] gap-[3px]">
          {Array.from({ length: 53 }).map((_, col) =>
            Array.from({ length: 7 }).map((_, row) => {
              const cell = gridData[row]?.[col];
              const lvl = cell?.level ?? 0;
              return (
                <div
                  key={`${row}-${col}`}
                  title={cell?.tooltip || ""}
                  className={`w-full aspect-square rounded-[2px] transition-colors duration-150 ${getLevelColor(
                    lvl
                  )}`}
                  style={{ gridRow: row + 1, gridColumn: col + 1 }}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 text-[12px] text-[#9ba1a8] mt-2">
        <span>less</span>
        <span className="w-2.5 h-2.5 rounded-[2px] bg-[#1e1e1f] inline-block aspect-square" />
        <span className="w-2.5 h-2.5 rounded-[2px] bg-[hsl(150,66%,16%)] inline-block aspect-square" />
        <span className="w-2.5 h-2.5 rounded-[2px] bg-[hsl(148,100%,21%)] inline-block aspect-square" />
        <span className="w-2.5 h-2.5 rounded-[2px] bg-[hsl(133,63%,40%)] inline-block aspect-square" />
        <span className="w-2.5 h-2.5 rounded-[2px] bg-[hsl(130,64%,53%)] inline-block aspect-square" />
        <span>More</span>
      </div>
    </div>
  );
}
