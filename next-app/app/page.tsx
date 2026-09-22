import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { GithubCalendar } from "@/components/github-calendar";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { EducationSection } from "@/components/education-section";
import { DsaSkillsSection } from "@/components/dsa-skills-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#fafafa]">
      <Navbar />
      <main className="body w-full max-w-[860px] mx-auto pt-[80px] md:pt-[100px] pb-12 overflow-hidden">
        <HeroSection />
        <GithubCalendar />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <DsaSkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
