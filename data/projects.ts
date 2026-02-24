import thepngocphutai from "../public/assets/projects/thepngocphutai.png";
import gbc from "../public/assets/projects/greenblockcheck.png";
import cineflex from "../public/assets/projects/cineflex.jpg";
import techzone from "../public/assets/projects/techzone.png";
import ASM_VUE from "../public/assets/projects/ASM_VUE_post.png";
import vantaituanhai from "../public/assets/projects/vantaituanhai.png";
import type { StaticImageData } from "next/image";

export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string | StaticImageData;
    techStack: string[];
    link: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        id: "1",
        title: "Ngoc Phu Tai Steel Company Website",
        subtitle: "Corporate website",
        description:
            "A corporate website for Ngoc Phu Tai Steel Company, built to present the company's services, products, and news.",
        image: thepngocphutai,
        techStack: ["Vue.js", "TypeScript", "Tailwind CSS", "Go", "MySQL"],
        link: "https://thepngocphutai.com",
        featured: true,
    },
    {
        id: "2",
        title: "Green Block Check Company Website",
        subtitle: "Corporate website",
        description:
            "A corporate website for Green Block Check Company, built to present the company's services, products, news, and docs",
        image: gbc,
        techStack: ["Next.js", "TypeScript", "Docker", "Go", "PostgreSQL"],
        link: "https://www.greenblockcheck.software/",
        featured: true,
    },
    {
        id: "3",
        title: "CineFlex",
        subtitle: "Movie streaming platform",
        description:
            "An online movie streaming website with a wide variety of films available for free; if you’re tired of watching ads, you can upgrade to a paid plan",
        image: cineflex,
        techStack: ["React", "TypeScript", "Java", "Spring Boot", "Tailwind CSS", "SQLServer"],
        link: "https://cineflexz.netlify.app/",
        featured: true,
    },
    {
        id: "4",
        title: "Van Tai Tuan Hai Logistics Company Website",
        subtitle: "Corporate website",
        description:
            "A corporate website for Van Tai Tuan Hai Logistics Company, Customers can book a car right on the page ",
        image: vantaituanhai,
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        link: "https://vantaituanhai.tech",
        featured: true,
    },
    {
        id: "5",
        title: "Yoso Breaking News",
        subtitle: "News & blogging platform",
        description:
            "A website that offers official news and also lets users read blog posts",
        image: "https://github.com/TaiThanDen/Yoso-Breaking-News/blob/main/src/main/webapp/static/news/images/44b0e301-99bb-4181-8cff-4e1d2a65d2ce.png?raw=true",
        techStack: ["Java", "SQLServer", "Bootstrap",],
        link: "#",
        featured: false,
    },
    {
        id: "6",
        title: "TechZone E-commerce Website",
        subtitle: "E-commerce platform",
        description:
            "Website selling technology products with fully integrated management functions",
        image: techzone,
        techStack: ["Java", "SQLServer", "Bootstrap"],
        link: "#",
        featured: false,
    },
    {
        id: "7",
        title: "Shilily Social Network",
        subtitle: "Social networking platform",
        description:
            "A social network that allows users to create accounts to post and comment",
        image: ASM_VUE,
        techStack: ["TypeScript", "Vue.js", "Tailwind CSS", "Vercel"],
        link: "#",
        featured: false,
    },
];

export default projects;
