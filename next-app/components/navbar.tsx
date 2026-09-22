"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import TooltipWrapper from "@/components/TooltipWrapper";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showLogo, setShowLogo] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navHeight = 75;

      // Logo reveal logic matching original morph scroll calculation
      const aboutSlot = document.querySelector(".avatar-slot");
      if (aboutSlot) {
        const slotRect = aboutSlot.getBoundingClientRect();
        const startY =
          slotRect.top +
          window.scrollY -
          window.innerHeight / 2 +
          slotRect.height / 2;
        const rawProgress = (scrollY - startY) / 200;
        const progress = Math.min(Math.max(rawProgress, 0), 1);
        setShowLogo(progress > 0.15);
      } else {
        setShowLogo(scrollY > 200);
      }

      // Active section calculation
      const sectionIds = ["about", "projects", "education", "skills", "contact"];
      let currentId = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - navHeight - 50;
          const sectionBottom = sectionTop + section.clientHeight;

          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            currentId = id;
          }
        }
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 75;
      const targetTop = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] bg-[#121212] border-b border-[#383838] flex justify-center whitespace-nowrap">
      <div className="flex items-center justify-between w-full max-w-[860px] px-4 md:px-5 h-[60px] md:h-[75px] gap-5">
        <div className="flex items-center">
          <TooltipWrapper message="Back to top">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              id="logo"
              aria-label="Back to top"
              className={`aspect-square rounded-full overflow-hidden relative z-[1002] transition-all duration-200 ease-out ${
                showLogo
                  ? "w-[42px] opacity-0 translate-x-0 mr-4 md:mr-6 cursor-pointer"
                  : "w-0 opacity-0 -translate-x-5 pointer-events-none"
              }`}
            >
              <Image
                src="/assets/avatar.webp"
                alt="Abhijeet Singh Rajput"
                width={42}
                height={42}
                className="w-full h-full object-cover"
                priority
              />
            </a>
          </TooltipWrapper>

          <ul className="flex gap-3 md:gap-4">
            <li className="nav-item">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                title="More about Abhijeet Singh"
                className={`text-[#d6d6d6] px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl text-sm md:text-base transition-colors duration-200 ${
                  activeSection === "about"
                    ? "text-[#ffdb70] bg-[#252525]"
                    : "hover:text-[#ffdb70] hover:bg-[#252525]"
                }`}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                title="View Projects"
                className={`text-[#d6d6d6] px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl text-sm md:text-base transition-colors duration-200 ${
                  activeSection === "projects"
                    ? "text-[#ffdb70] bg-[#252525]"
                    : "hover:text-[#ffdb70] hover:bg-[#252525]"
                }`}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#education"
                onClick={(e) => scrollToSection(e, "education")}
                title="Abhijeet's Qualifications"
                className={`text-[#d6d6d6] px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl text-sm md:text-base transition-colors duration-200 ${
                  activeSection === "education"
                    ? "text-[#ffdb70] bg-[#252525]"
                    : "hover:text-[#ffdb70] hover:bg-[#252525]"
                }`}
              >
                Education
              </a>
            </li>
          </ul>
        </div>

        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "contact")}
          className="gold-btn !py-2 md:!py-3 !px-3 md:!px-7 text-xs md:text-sm"
          aria-label="Contact section"
        >
          <span className="inline-block w-4 h-4 md:hidden">
            <Image
              src="/assets/icons/phone.svg"
              alt="Phone icon"
              width={16}
              height={16}
              className="w-full h-full object-contain"
            />
          </span>
          <span className="hidden md:inline">Contact</span>
        </a>
      </div>
    </nav>
  );
}
