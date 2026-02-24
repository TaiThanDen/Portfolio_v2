import { IconType } from "react-icons";
import {
    SiNextdotjs,
    SiReact,
    SiVuedotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiNodedotjs,
    SiGo,
    SiDocker,
    SiPostgresql,
    SiMongodb,
    SiFirebase,
    SiGit,
    SiGithub,
    SiFigma,
    SiVercel,
    SiHtml5,
    SiCss3,
    SiVite,
    SiWordpress,
    SiPython,
    SiRedis,
} from "react-icons/si";

export interface Skill {
    name: string;
    category: string;
    icon: IconType;
    color: string; // the "active" color on hover
}

const skills: Skill[] = [
    // ─── Frameworks & Libraries ───
    { name: "Next.js", category: "Framework", icon: SiNextdotjs, color: "#ffffff" },
    { name: "React", category: "Library", icon: SiReact, color: "#61DAFB" },
    { name: "Vue.js", category: "Framework", icon: SiVuedotjs, color: "#4FC08D" },
    { name: "Node.js", category: "Runtime", icon: SiNodedotjs, color: "#339933" },
    { name: "Vite", category: "Build Tool", icon: SiVite, color: "#646CFF" },
    { name: "Tailwind CSS", category: "CSS", icon: SiTailwindcss, color: "#06B6D4" },

    // ─── Languages ───
    { name: "TypeScript", category: "Language", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", category: "Language", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", category: "Language", icon: SiPython, color: "#3776AB" },
    { name: "Go", category: "Language", icon: SiGo, color: "#00ADD8" },
    { name: "HTML", category: "Markup", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", category: "Style", icon: SiCss3, color: "#1572B6" },

    // ─── Databases & Infra ───
    { name: "PostgreSQL", category: "Database", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", category: "Database", icon: SiMongodb, color: "#47A248" },
    { name: "Redis", category: "Database", icon: SiRedis, color: "#DC382D" },
    { name: "Firebase", category: "BaaS", icon: SiFirebase, color: "#FFCA28" },
    { name: "Docker", category: "DevOps", icon: SiDocker, color: "#2496ED" },
    { name: "Vercel", category: "Platform", icon: SiVercel, color: "#ffffff" },

    // ─── Tools ───
    { name: "Git", category: "VCS", icon: SiGit, color: "#F05032" },
    { name: "GitHub", category: "Platform", icon: SiGithub, color: "#ffffff" },
    { name: "Figma", category: "Design", icon: SiFigma, color: "#F24E1E" },
    { name: "WordPress", category: "CMS", icon: SiWordpress, color: "#21759B" },
];

export default skills;
