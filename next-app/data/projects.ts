export interface Project {
  id: string;
  title: string;
  subTitle?: string;
  description: string;
  previewImage: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
  tutorialUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "geu-erp",
    title: "GEU ERP Redesign",
    description:
      "A modern, fast, and student-friendly redesign of the GEU Legacy Portal with optimized UI, faster navigation, and easy access to academics, attendance, results, and more — now 40% faster.",
    previewImage: "/assets/project-preview/geu-preview.webp",
    technologies: [
      { name: "Next JS", icon: "/assets/icons/next-js.svg" },
      { name: "Node JS", icon: "/assets/icons/node-js.svg" },
      { name: "Typescript", icon: "/assets/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/assets/icons/tailwind.svg" },
      { name: "Shadcn UI", icon: "/assets/icons/shadcn.svg" },
    ],
    githubUrl: "https://github.com/abhijeetsinghrajput/geu-erp.git",
    demoUrl: "https://geu-erp.onrender.com/login",
  },
  {
    id: "notehub",
    title: "Notehub",
    description:
      "A clean and collaborative note-management platform to write, organize, and share notes. Supports smart formatting, LaTeX, real-time collaboration, and a distraction-free UI.",
    previewImage: "/assets/project-preview/notehub-preview.webp",
    technologies: [
      { name: "React JS", icon: "/assets/icons/react.svg" },
      { name: "Express JS", icon: "/assets/icons/express.svg" },
      { name: "Node JS", icon: "/assets/icons/node-js.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
      { name: "Tailwind CSS", icon: "/assets/icons/tailwind.svg" },
      { name: "Socket IO", icon: "/assets/icons/socket-io.svg" },
      { name: "Shadcn UI", icon: "/assets/icons/shadcn.svg" },
      { name: "Mongo DB", icon: "/assets/icons/mongo-db.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/notehub-production.git",
    demoUrl: "https://notehub-38kp.onrender.com/",
  },
  {
    id: "chess-engine",
    title: "Chess Engine",
    description:
      "A strong chess engine built with advanced algorithms capable of defeating experienced players. Features strategic move evaluation, pruning, and smart decision-making.",
    previewImage: "/assets/project-preview/chess-preview1.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/ChessEngine.git",
    demoUrl: "https://chessleague.netlify.app",
  },
  {
    id: "chess-engine-cpp",
    title: "Chess Engine Version 2.1 (C++)",
    subTitle: "2.1",
    description:
      "An enhanced C++ chess engine powered by bitboards, alpha-beta pruning, and custom heuristics — delivering competitive ELO-level performance.",
    previewImage: "/assets/project-preview/doodle.webp",
    technologies: [
      { name: "C++", icon: "/assets/icons/cpp.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/ChessEngine.git",
  },
  {
    id: "pathfinder-visualizer",
    title: "Path Finder Visualizer",
    description:
      "An interactive visualizer that demonstrates popular pathfinding algorithms like A*, BFS, DFS, and Dijkstra in real-time for a clearer understanding of how they work.",
    previewImage: "/assets/project-preview/pathfinder-preview.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/pathFinderVisualizer.git",
    tutorialUrl: "https://www.youtube.com/playlist?list=PLZ92O1inS6VmlSaCzdxm5_Jf2IyJesCF4",
    demoUrl: "https://path-explorer.netlify.app",
  },
  {
    id: "sorting-simulator",
    title: "Sorting Simulator",
    description:
      "A real-time visualization tool to learn how sorting algorithms work, including Bubble, Selection, Insertion, Merge, and Quick Sort — with step-by-step animations.",
    previewImage: "/assets/project-preview/sorting-preview.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/sorting-simulation.git",
    demoUrl: "https://sortsimulator.netlify.app",
  },
  {
    id: "whisper",
    title: "Whisper",
    description:
      "A fast and secure real-time chat application with typing indicators, live messaging, authentication, and a smooth UI — built using the MERN stack.",
    previewImage: "/assets/project-preview/whisper-preview.webp",
    technologies: [
      { name: "React JS", icon: "/assets/icons/react.svg" },
      { name: "Express JS", icon: "/assets/icons/express.svg" },
      { name: "Node JS", icon: "/assets/icons/node-js.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
      { name: "Tailwind CSS", icon: "/assets/icons/tailwind.svg" },
      { name: "Socket IO", icon: "/assets/icons/socket-io.svg" },
      { name: "Mongo DB", icon: "/assets/icons/mongo-db.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/whisper",
    demoUrl: "https://whisper-chat-app-m4ks.onrender.com",
  },
  {
    id: "my-portfolio",
    title: "My Portfolio",
    description:
      "A personal developer portfolio showcasing my skills, experience, and featured projects — built with a clean and modern UI for seamless navigation.",
    previewImage: "/assets/project-preview/portfolio-preview.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/Personal-Portfolio.git",
    demoUrl: "https://chessleague.netlify.app",
  },
  {
    id: "num-pie",
    title: "Num Pie",
    description:
      "A smart scientific equation solver that evaluates complex expressions instantly with an intuitive UI and efficient calculation engine.",
    previewImage: "/assets/project-preview/numpie-preview.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/Num-Pie.git",
    demoUrl: "https://numpie.netlify.app/",
  },
  {
    id: "typing-guru",
    title: "TypingGuru",
    description:
      "A typing speed trainer designed to improve accuracy and WPM with engaging practice sessions, performance analytics, and responsive design.",
    previewImage: "/assets/project-preview/typingGuru-preview.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/TypingGuru",
    demoUrl: "https://fingersfast.netlify.app/",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    description:
      "A fun, nostalgic version of the classic Snake Game with smooth controls, colorful UI, and score tracking for an enjoyable gaming experience.",
    previewImage: "/assets/project-preview/snake-preview.webp",
    technologies: [
      { name: "HTML 5", icon: "/assets/icons/html.svg" },
      { name: "CSS", icon: "/assets/icons/css.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
    ],
    githubUrl: "https://github.com/abhijeetSinghRajput/snake-game.git",
    demoUrl: "https://2dsnake.netlify.app",
  },
];
