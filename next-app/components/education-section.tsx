import Image from "next/image";
import TooltipWrapper from "@/components/TooltipWrapper";

export function EducationSection() {
  const educationList = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Graphic Era University, Dehradun",
      grade: "CGPA: 8.8/10",
      duration: "2024 - 2026 (Currently pursuing)",
      logo: "/assets/university-logo/geu_logo.png",
      shortName: "Graphic Era University",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Babasaheb Bhimrao Ambedkar Bihar University (BRABU), Bihar",
      grade: "Graduated with 76.03%",
      duration: "2021 - 2024",
      logo: "/assets/university-logo/brabu_logo.png",
      shortName: "BRABU, Bihar",
    },
    {
      degree: "12th Grade (Science Stream)",
      institution: "Bhagwan Singh College, Bihar",
      grade: "Scored 57.80%",
      duration: "2020 - 2021",
      logo: "/assets/university-logo/baeb_logo.jpeg",
      shortName: "Bihar School Examination Board",
    },
  ];

  return (
    <section id="education" className="portfolio-container">
      <h2 className="text-2xl sm:text-[28px] font-bold text-[#fafafa] mb-6 pb-2 border-b border-[#383838]">
        Education
      </h2>

      <div className="relative mt-6 space-y-8">
        {educationList.map((item, idx) => (
          <div key={idx} className="relative flex items-start gap-4 sm:gap-5 group">
            {/* Vertical connector line */}
            {idx < educationList.length - 1 && (
              <span
                className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-[#383838] z-0"
                aria-hidden="true"
              />
            )}

            {/* University Logo Dot */}
            <TooltipWrapper message={item.shortName}>
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white p-0.5 shadow-md transition-transform duration-300 group-hover:scale-110 flex items-center justify-center cursor-pointer">
                <Image
                  src={item.logo}
                  alt={item.institution}
                  width={36}
                  height={36}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </TooltipWrapper>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <strong className="text-[#fafafa] text-base font-semibold block mb-1 group-hover:text-[#ffdb70] transition-colors duration-200">
                {item.degree}
              </strong>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                <span className="text-[#d6d6d6] font-medium block">
                  {item.institution}
                </span>
                <span className="text-[#ffeea6] font-medium">{item.grade}</span>
                <br />
                <span className="text-[#888888]">{item.duration}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
