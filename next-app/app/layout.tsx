import type { Metadata } from "next";
import { Poppins, Orbitron, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mrcodium.netlify.app"),
  title: "Abhijeet Singh Rajput | MERN Stack Developer",
  description:
    "Portfolio of Abhijeet Kumar, a proficient MERN Stack Developer specializing in JavaScript, TypeScript, C++, and Data Structures & Algorithms.",
  keywords: [
    "Abhijeet Singh",
    "Mr Codium",
    "MERN Stack Developer",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "DSA",
    "Programming",
  ],
  authors: [{ name: "Abhijeet Singh aka Mr. Codium" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mrcodium.netlify.app/",
  },
  openGraph: {
    type: "website",
    url: "https://mrcodium.netlify.app/",
    title: "Abhijeet Singh Rajput | Developer Portfolio",
    description:
      "Portfolio of Abhijeet Singh, a skilled developer specializing in JavaScript, C++, React.js, and solving complex problems through algorithms.",
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Singh Rajput Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Singh Rajput | Developer Portfolio",
    description:
      "Portfolio of Abhijeet Singh, a skilled developer specializing in JavaScript, C++, React.js, and solving complex problems through algorithms.",
    images: ["/assets/og.png"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon.ico", sizes: "any" },
    ],
    shortcut: "/assets/favicon.svg",
    apple: "/assets/favicon.svg",
  },
  other: {
    "msvalidate.01": "DCF4DE3C631E387108F7150F083B1A9D",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhijeet Singh",
  jobTitle: "Mern Stack Developer",
  url: "https://mrcodium.netlify.app",
  sameAs: [
    "https://github.com/abhijeetSinghRajput",
    "https://www.linkedin.com/in/abhijeet-singh-rajput1/",
    "https://leetcode.com/u/abhijeet_singh_rajput",
    "https://www.geeksforgeeks.org/user/abhijeet_singh_rajput/",
    "https://www.instagram.com/abhijeet_singh_rajput1",
  ],
  description:
    "A skilled developer specializing in JavaScript, C++, React.js, and solving algorithmic challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        poppins.variable,
        orbitron.variable,
        fontMono.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#121212] text-[#fafafa] min-h-screen">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
