"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { projectsData } from "@/data/projects";

import TooltipWrapper from "@/components/TooltipWrapper";

export function ProjectsSection() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const scrollOffsetRef = useRef<number | null>(null);

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 6);

  const handleToggle = () => {
    if (showAll && btnRef.current) {
      // Only record offset when collapsing to keep cursor on button
      scrollOffsetRef.current = btnRef.current.getBoundingClientRect().top;
    } else {
      scrollOffsetRef.current = null;
    }
    setShowAll((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (scrollOffsetRef.current !== null && btnRef.current) {
      const newTop = btnRef.current.getBoundingClientRect().top;
      const delta = newTop - scrollOffsetRef.current;
      if (delta !== 0) {
        window.scrollBy({ top: delta, behavior: "instant" });
      }
      scrollOffsetRef.current = null;
    }
  }, [showAll]);

  return (
    <section id="projects" className="mx-4 md:mx-4 mb-[30px]">
      <h2 className="text-2xl sm:text-[28px] font-bold text-[#fafafa] mb-6 px-1">
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="portfolio-card group flex flex-col justify-between"
          >
            <div>
              <div className="preview h-[200px] overflow-hidden relative">
                <Image
                  src={project.previewImage}
                  alt={project.title}
                  width={420}
                  height={240}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                  quality={80}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-[#fafafa] group-hover:text-[#e4c466] transition-colors duration-300 mb-2">
                  {project.title}
                </h3>
                <p className="text-[#a3a3a3] text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-2.5 items-center mt-1">
                    {project.technologies.map((tech) => (
                      <TooltipWrapper key={tech.name} message={tech.name}>
                        <div
                          className="w-6 h-6 flex items-center justify-center cursor-default"
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      </TooltipWrapper>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2">
              <div className="flex flex-wrap gap-2.5 mt-4">
                {project.githubUrl && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Code on GitHub"
                    href={project.githubUrl}
                    className="btn-action flex-1"
                  >
                    <Image
                      src="/assets/social icons/github.svg"
                      alt="Github Icon"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    Github
                  </a>
                )}
                {project.tutorialUrl && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Watch Tutorial"
                    href={project.tutorialUrl}
                    className="btn-action flex-1"
                  >
                    <Image
                      src="/assets/social icons/youtube.svg"
                      alt="YouTube Icon"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    Tutorial
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Demo"
                    href={project.demoUrl}
                    className="btn-action primary flex-1"
                  >
                    <Image
                      src="/assets/icons/external-link.svg"
                      alt="Live Demo Icon"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          ref={btnRef}
          type="button"
          onClick={handleToggle}
          id="toggle-all-projects"
          className="btn-action !h-[44px] !px-6 text-sm font-semibold cursor-pointer select-none"
        >
          {showAll ? "Collapse Projects" : "Show All Projects"}
        </button>
      </div>
    </section>
  );
}
