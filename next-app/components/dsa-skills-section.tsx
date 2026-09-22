"use client";

import { useEffect, useRef, useState } from "react";
import type { Chart } from "chart.js";
import { dsaSkillsData, SkillCategory } from "@/data/skills";

export function DsaSkillsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>("Fundamental");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const currentSkills = dsaSkillsData[selectedCategory];

  useEffect(() => {
    let isMounted = true;
    if (!chartRef.current) return;

    import("chart.js").then(
      ({
        Chart,
        RadarController,
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend,
        Title,
      }) => {
        if (!isMounted || !chartRef.current) return;

        Chart.register(
          RadarController,
          RadialLinearScale,
          PointElement,
          LineElement,
          Filler,
          Tooltip,
          Legend,
          Title
        );

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(255, 50, 0, 0.75)");
        gradient.addColorStop(1, "rgba(254, 202, 102, 0.75)");

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const labels = Object.keys(currentSkills);
        const data = Object.values(currentSkills);

        chartInstance.current = new Chart(ctx, {
          type: "radar",
          data: {
            labels,
            datasets: [
              {
                label: "Efficiency index",
                data,
                backgroundColor: gradient,
                borderColor: "rgba(254, 202, 102, 0.9)",
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                min: 0,
                max: 100,
                angleLines: {
                  color: "#555",
                },
                grid: {
                  color: "#444",
                },
                pointLabels: {
                  color: "#fff",
                  font: {
                    size: 11,
                  },
                },
                ticks: {
                  display: false,
                  stepSize: 100 / 3,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: selectedCategory,
                color: "#ff6b6b",
                font: {
                  size: 15,
                  weight: "bold",
                },
              },
              tooltip: {
                enabled: false,
              },
            },
          },
        });
      }
    );

    return () => {
      isMounted = false;
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedCategory, currentSkills]);

  return (
    <section id="skills" className="portfolio-container">
      <h2 className="text-2xl sm:text-[28px] font-bold text-[#fafafa] mb-6 pb-2 border-b border-[#383838]">
        My DSA Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Progress bars */}
        <ul className="space-y-5">
          {Object.entries(currentSkills).map(([label, value]) => (
            <li key={label}>
              <div className="flex justify-between items-center mb-1.5">
                <strong className="text-sm md:text-[15px] font-semibold text-[#fafafa]">
                  {label}
                </strong>
                <span className="text-sm md:text-[15px] text-[#d6d6d6] font-medium">
                  {value}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#383838] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${value}%`,
                    background:
                      "linear-gradient(to right, hsl(45, 100%, 72%), hsl(35, 100%, 68%))",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Radar chart */}
        <div className="w-full h-[260px] sm:h-[280px] md:h-[300px] flex items-center justify-center">
          <canvas ref={chartRef} className="w-full h-full" />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2.5 mt-8 justify-center md:justify-start">
        {(["Fundamental", "Intermediate", "Advanced"] as SkillCategory[]).map(
          (category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`btn-action flex-1 sm:flex-none !py-2 !px-5 text-xs md:text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[#555] text-white brightness-110 ring-1 ring-[#ffdb70]"
                  : "bg-[#383838] text-[#fafafa]"
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>
    </section>
  );
}
