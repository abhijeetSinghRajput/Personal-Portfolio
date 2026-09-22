import Image from "next/image";
import { socialLinks } from "@/data/social-links";
import { heroTechnologies } from "@/data/technologies";

import TooltipWrapper from "@/components/TooltipWrapper";

export function HeroSection() {
  return (
    <section id="hero" className="portfolio-container flex flex-col-reverse md:flex-row gap-5 items-center">
      <div className="flex-1 flex flex-col justify-center w-full">
        <h1>
          <a
            id="name"
            href="/"
            className="text-4xl sm:text-[40px] md:text-[48px] font-bold text-[#fafafa] whitespace-nowrap leading-tight"
          >
            Abhijeet Singh
          </a>
        </h1>

        <div className="mt-2.5 flex items-center gap-4">
          <div className="ping-dot" />
          <h2 className="font-orbitron text-[#ffdb70] text-lg sm:text-[20px] font-semibold tracking-[2px]">
            MERN Stack Developer
          </h2>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
          <span>I build interactive web apps using</span>
          {heroTechnologies.map((tech, idx) => (
            <span key={tech.name} className="inline-flex items-center">
              <span className="tech-badge mx-0.5">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                {tech.name}
              </span>
              {idx < heroTechnologies.length - 2 && ","}
              {idx === heroTechnologies.length - 2 && " and"}
            </span>
          ))}
        </div>

        <div className="mt-8 mb-5">
          <a
            href="/assets/Abhijeet_Resume.pdf"
            download="Abhijeet_Resume.pdf"
            className="hero-cta text-sm md:text-base cursor-pointer"
          >
            Resume / CV
          </a>
        </div>

        <ul className="flex items-center gap-5 mt-4 ml-1 w-max">
          {socialLinks.map((social) => (
            <li key={social.title} className="w-6 h-6 aspect-square overflow-hidden hover:brightness-200 transition-all duration-200">
              <TooltipWrapper message={social.title}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  href={social.url}
                  className="block w-full h-full"
                >
                  <Image
                    src={social.icon}
                    alt={`${social.title} icon`}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </a>
              </TooltipWrapper>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-shrink-0 flex items-center justify-center">
        <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden">
          <Image
            src="/assets/avatar.jpg"
            alt="Abhijeet Singh Rajput"
            width={300}
            height={300}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
            priority
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <Image
            src="/assets/frame.png"
            alt="Available for work status"
            width={300}
            height={300}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
            priority
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
