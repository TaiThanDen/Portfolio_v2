export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    techStack: string[];
    link: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        id: "1",
        title: "E-Commerce Platform",
        subtitle: "Full-stack web app",
        description:
            "A modern e-commerce platform with real-time inventory, payment integration, and an admin dashboard. Built for performance and scalability.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
        link: "#",
        featured: true,
    },
    {
        id: "2",
        title: "Task Management App",
        subtitle: "Productivity tool",
        description:
            "A drag-and-drop task board with real-time collaboration, notifications, and team analytics. Inspired by modern project management workflows.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
        techStack: ["Vue.js", "Go", "Docker", "Redis", "MongoDB"],
        link: "#",
        featured: true,
    },
    {
        id: "3",
        title: "AI Chat Interface",
        subtitle: "Machine learning project",
        description:
            "An intelligent chat application powered by large language models with streaming responses, conversation memory, and custom fine-tuning.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        techStack: ["React", "Python", "FastAPI", "OpenAI", "Tailwind CSS"],
        link: "#",
        featured: true,
    },
    {
        id: "4",
        title: "Social Media Dashboard",
        subtitle: "Analytics platform",
        description:
            "A comprehensive dashboard for tracking social media metrics across multiple platforms with beautiful charts and export capabilities.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        techStack: ["Next.js", "D3.js", "Node.js", "GraphQL"],
        link: "#",
        featured: false,
    },
    {
        id: "5",
        title: "Weather Forecast App",
        subtitle: "Mobile-first PWA",
        description:
            "A progressive web app providing hyper-local weather forecasts with interactive maps, severe weather alerts, and offline support.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
        techStack: ["React", "TypeScript", "Mapbox", "Node.js"],
        link: "#",
        featured: false,
    },
    {
        id: "6",
        title: "Portfolio Generator",
        subtitle: "Developer tool",
        description:
            "A CLI and web tool that generates beautiful portfolio websites from a simple JSON config. Supports multiple themes and deployment targets.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        techStack: ["Go", "Vue.js", "Tailwind CSS", "Vercel"],
        link: "#",
        featured: false,
    },
    {
        id: "7",
        title: "Fitness Tracker",
        subtitle: "Health & wellness",
        description:
            "A cross-platform fitness application with workout tracking, nutrition logging, and AI-powered workout recommendations.",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
        techStack: ["React Native", "Firebase", "TensorFlow Lite"],
        link: "#",
        featured: false,
    },
    {
        id: "8",
        title: "Code Snippet Manager",
        subtitle: "Developer productivity",
        description:
            "A VS Code extension and web app for organizing, searching, and sharing code snippets with syntax highlighting and team collaboration.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        techStack: ["TypeScript", "Electron", "SQLite", "React"],
        link: "#",
        featured: false,
    },
];

export default projects;
