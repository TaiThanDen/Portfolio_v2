"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
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
  SiMysql,
  SiGraphql,
  SiElectron,
  SiSqlite,
  SiBootstrap,
  SiVercel,
  SiSpring,
  SiPrisma,
  SiD3Dotjs,
  SiMapbox,
  SiTensorflow,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from "react-icons/fa";
import { type IconType } from "react-icons";
import projects, { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import avt from "@/public/assets/avt.jpg";

/* ── Tech icon color map ── */
const techColors: Record<string, string> = {
  "Next.js": "bg-black text-white",
  React: "bg-sky-500/15 text-sky-400",
  "React Native": "bg-sky-500/15 text-sky-400",
  "Vue.js": "bg-emerald-500/15 text-emerald-400",
  Go: "bg-cyan-500/15 text-cyan-300",
  TypeScript: "bg-blue-500/15 text-blue-400",
  Python: "bg-yellow-500/15 text-yellow-300",
  "Tailwind CSS": "bg-teal-500/15 text-teal-300",
  Docker: "bg-blue-600/15 text-blue-400",
  Redis: "bg-red-500/15 text-red-400",
  MongoDB: "bg-green-600/15 text-green-400",
  PostgreSQL: "bg-indigo-500/15 text-indigo-300",
  Prisma: "bg-violet-500/15 text-violet-300",
  FastAPI: "bg-emerald-600/15 text-emerald-300",
  OpenAI: "bg-gray-500/15 text-gray-300",
  Node: "bg-green-500/15 text-green-400",
  "Node.js": "bg-green-500/15 text-green-400",
  "D3.js": "bg-orange-500/15 text-orange-300",
  GraphQL: "bg-pink-500/15 text-pink-400",
  Firebase: "bg-amber-500/15 text-amber-300",
  Mapbox: "bg-blue-500/15 text-blue-300",
  Vercel: "bg-white/10 text-white",
  "TensorFlow Lite": "bg-orange-500/15 text-orange-300",
  Electron: "bg-sky-600/15 text-sky-300",
  SQLite: "bg-blue-400/15 text-blue-300",
  Java: "bg-red-500/15 text-red-400",
  "Spring Boot": "bg-green-500/15 text-green-400",
  SQLServer: "bg-gray-500/15 text-gray-300",
  Bootstrap: "bg-purple-500/15 text-purple-400",
};

/* ── Tech icon map ── */
const techIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  "React Native": SiReact,
  "Vue.js": SiVuedotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Node: SiNodedotjs,
  Go: SiGo,
  Docker: SiDocker,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  MySQL: SiMysql,
  GraphQL: SiGraphql,
  Electron: SiElectron,
  SQLite: SiSqlite,
  Bootstrap: SiBootstrap,
  Vercel: SiVercel,
  "Spring Boot": SiSpring,
  Prisma: SiPrisma,
  "D3.js": SiD3Dotjs,
  Mapbox: SiMapbox,
  "TensorFlow Lite": SiTensorflow,
  Java: FaJava,
  SQLServer: DiMsqlServer,
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const featuredProjects = projects.filter((p) => p.featured);
const allProjects = projects;

function ProjectCarousel({ onSelect }: { onSelect: (index: number) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelectCb = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      onSelect(idx);
    };
    emblaApi.on("select", onSelectCb);
    onSelectCb();
    return () => {
      emblaApi.off("select", onSelectCb);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#1a1a1a] group">
      <div
        className="absolute top-0 left-0 w-32 h-32 z-30 pointer-events-none"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />

      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-btn-primary shrink-0" />
          <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">
            Popular Projects
          </span>
        </div>
      </div>

      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex-[0_0_100%] min-w-0 relative h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={featuredProjects[selectedIndex]?.link ?? "#"}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 hover:bg-black/80 transition-colors"
        >
          View Project <ArrowUpRight size={12} />
        </a>

        <div className="flex items-center gap-3 border-2 border-white/10 rounded-full px-3 py-4 bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            {featuredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === selectedIndex
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/75 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/75 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Dynamic Project Info (top-right top)
   ───────────────────────────────────────────── */
function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="h-full rounded-2xl bg-[#1a1a1a] p-6 flex flex-col justify-between overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={avt}
              alt={project.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover shrink-0"
            />
            <div>
              <h3 className="text-white font-semibold text-base leading-tight">
                {project.title}
              </h3>
              <p className="text-white/40 text-sm">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.link}
            className="mt-4 flex items-center justify-between w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors group"
          >
            <span>View Details</span>
            <ArrowUpRight
              size={16}
              className="text-white/50 group-hover:text-white transition-colors"
            />
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tech Stack Grid (top-right side)
   ───────────────────────────────────────────── */
function TechStackGrid({ project }: { project: Project }) {
  return (
    <div className="h-full rounded-2xl bg-[#1a1a1a] p-5 flex flex-col overflow-y-auto bento-scrollbar">
      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
        Tech Stack
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-2 flex-1"
        >
          {project.techStack.map((tech, i) => {
            const Icon = techIcons[tech];
            return (
              <motion.div
                key={tech}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium border border-white/5",
                  techColors[tech] ?? "bg-white/10 text-white/80",
                )}
              >
                {Icon ? (
                  <Icon size={15} className="shrink-0 opacity-80" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-current opacity-60 shrink-0" />
                )}
                {tech}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   All Projects – scrollable (bottom-right)
   ───────────────────────────────────────────── */
function AllProjectsList() {
  return (
    <div className="rounded-2xl bg-[#1a1a1a] p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-md font-semibold text-white/70">
            All Projects
          </span>
        </div>
        <a
          href="#"
          className="text-sm text-btn-primary font-medium hover:underline"
        >
          View All
        </a>
      </div>

      {/* ── Mobile: list view ── */}
      <div className="space-y-2 lg:hidden">
        {allProjects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 p-3 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">
                {project.title}
              </h4>
              <p className="text-white/40 text-xs truncate">
                {project.subtitle}
              </p>
            </div>

            <ArrowUpRight
              size={14}
              className="text-white/20 shrink-0 group-hover:text-white/60 transition-colors"
            />
          </motion.a>
        ))}
      </div>

      {/* ── Desktop: image grid view ── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-3">
          {allProjects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative rounded-xl overflow-hidden group aspect-9/11"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-btn-primary shrink-0" />
                  <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">
                    {project.title}
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <ArrowUpRight size={12} className="text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bento Grid – main export
   ───────────────────────────────────────────── */
export default function BentoProjectGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex] ?? featuredProjects[0];

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#111111] p-3 lg:h-screen"
    >
      <div className="flex flex-col lg:flex-row gap-3 lg:h-full">
        {/* ── Left: Carousel (fixed, stays in place) ── */}
        <div className="lg:w-1/2 h-105 lg:h-full shrink-0">
          <ProjectCarousel onSelect={handleSelect} />
        </div>

        {/* ── Right: Scrollable column ── */}
        <div
          data-lenis-prevent
          className="lg:w-1/2 lg:h-full min-h-0 lg:overflow-y-auto overscroll-contain bento-scrollbar flex flex-col gap-3"
        >
          {/* Top row: Project Info + Tech Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
            <div className="h-60 lg:h-72">
              <ProjectInfo project={activeProject} />
            </div>
            <div className="h-60 lg:h-72">
              <TechStackGrid project={activeProject} />
            </div>
          </div>

          {/* All Projects – grows naturally, no overflow hidden */}
          <div className="shrink-0">
            <AllProjectsList />
          </div>
        </div>
      </div>
    </section>
  );
}
