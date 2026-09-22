"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { aboutTechnologies } from "@/data/technologies";

const AVATAR_SIZE = 174;
const COLLAPSED_SIZE = 42;
const MORPH_RANGE = 200;

export function AboutSection() {
  const slotRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let fixedStartRect: { top: number; left: number } | null = null;
    let isFixed = false;
    let rafId: number | null = null;

    const updateMorph = () => {
      const slot = slotRef.current;
      const avatar = avatarRef.current;
      const logo = document.getElementById("logo");

      if (!slot || !avatar) return;

      const slotRect = slot.getBoundingClientRect();
      const startY =
        slotRect.top +
        window.scrollY -
        window.innerHeight / 2 +
        slotRect.height / 2;

      const scrollY = window.scrollY;
      const rawProgress = (scrollY - startY) / MORPH_RANGE;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // BEFORE morph (safe early return)
      if (progress <= 0) {
        avatar.style.position = "relative";
        avatar.style.top = "auto";
        avatar.style.left = "auto";
        avatar.style.width = `${AVATAR_SIZE}px`;
        avatar.style.height = `${AVATAR_SIZE}px`;
        avatar.style.borderRadius = "18px";
        avatar.style.zIndex = "auto";
        avatar.style.pointerEvents = "none";
        slot.style.height = `${AVATAR_SIZE}px`;

        isFixed = false;
        fixedStartRect = null;
        return;
      }

      // Lock exact visual start position once
      if (!isFixed) {
        fixedStartRect = {
          top: slotRect.top,
          left: slotRect.left,
        };
        isFixed = true;
      }

      if (!fixedStartRect) {
        fixedStartRect = {
          top: window.innerHeight / 2 - AVATAR_SIZE / 2,
          left: slotRect.left,
        };
      }

      const logoRect = logo
        ? logo.getBoundingClientRect()
        : { top: 16, left: fixedStartRect.left };

      const size = AVATAR_SIZE - progress * (AVATAR_SIZE - COLLAPSED_SIZE);
      const top =
        fixedStartRect.top + (logoRect.top - fixedStartRect.top) * progress;
      const left =
        fixedStartRect.left + (logoRect.left - fixedStartRect.left) * progress;

      // Smoothly transition border radius from 18px (at 174px) to 50% circle
      const radiusPercent = 10.34 + progress * (50 - 10.34);

      avatar.style.position = "fixed";
      avatar.style.width = `${size}px`;
      avatar.style.height = `${size}px`;
      avatar.style.top = `${top}px`;
      avatar.style.left = `${left}px`;
      avatar.style.borderRadius = `${radiusPercent}%`;
      avatar.style.zIndex = "1001";
      avatar.style.pointerEvents = "none";

      slot.style.height = `${AVATAR_SIZE}px`;
    };

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateMorph);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateMorph();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="about" className="portfolio-container">
      <h2 className="text-2xl sm:text-[28px] font-bold text-[#fafafa] mb-4 pb-2 border-b border-[#383838]">
        About
      </h2>

      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start justify-between">
        <div
          ref={slotRef}
          className="avatar-slot w-[174px] h-[174px] flex-shrink-0 self-center md:self-start"
        >
          <div
            ref={avatarRef}
            className="avatar w-[174px] h-[174px] overflow-hidden rounded-[18px] relative flex-shrink-0 pointer-events-none shadow-lg border border-[#383838]"
          >
            <Image
              src="/assets/avatar.jpg"
              alt="Abhijeet Singh Rajput"
              width={174}
              height={174}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed flex-1 space-y-4">
          <p>
            Hey! I’m <strong className="text-[#fafafa] font-semibold">Abhijeet Singh Rajput</strong>, a{" "}
            <span className="text-[#ffeea6] font-semibold">MERN stack</span> developer who loves building
            smooth, fast, and enjoyable full-stack apps. I’ve worked on{" "}
            <span className="text-[#ffeea6] font-semibold">15+ projects</span> — from UI ideas to end-to-end
            products — always experimenting and adding my own touch.
          </p>
          <p>
            A bit of a DSA nerd 😅 — solved{" "}
            <span className="text-[#ffeea6] font-semibold">750+ problems</span> on{" "}
            <a
              href="https://leetcode.com/u/abhijeet_singh_rajput"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] underline underline-offset-2 hover:brightness-125 transition-all"
            >
              LeetCode
            </a>{" "}
            &{" "}
            <a
              href="https://www.geeksforgeeks.org/user/abhijeet_singh_rajput/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] underline underline-offset-2 hover:brightness-125 transition-all"
            >
              GFG
            </a>{" "}
            and ranked in the{" "}
            <span className="text-[#ffeea6] font-semibold">
              top 4.2% on{" "}
              <a
                href="https://leetcode.com/u/abhijeet_singh_rajput"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffeea6] underline underline-offset-2"
              >
                LeetCode
              </a>
            </span>{" "}
            (2023). This helps me write clean, scalable code where great UX meets strong logic.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold text-[#fafafa] mb-3">
          Technologies & Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          {aboutTechnologies.map((tech) => (
            <span
              key={tech.name}
              className="tech-badge !text-[13px] !py-1.5 !px-3 gap-2 bg-[#383838] hover:bg-[#484848] transition-colors"
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={18}
                height={18}
                className="w-[18px] h-[18px] object-contain"
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
