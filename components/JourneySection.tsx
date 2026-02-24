"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Types ─── */
export interface JourneyItem {
  /** Date or period, e.g. "2021" or "Apr 2025" */
  date: string;
  /** Badge label, e.g. "Education" */
  category: string;
  /** Main headline for the item */
  title: string;
  /** Bullet-point details */
  bullets: string[];
  /** Duration string shown on the right, e.g. "/2021 – 2024/" */
  duration: string;
}

export interface JourneySectionProps {
  sectionLabel?: string;
  heading?: string;
  items?: JourneyItem[];
}

/* ─── Default data ─── */
const defaultItems: JourneyItem[] = [
  {
    date: "2021",
    category: "Education",
    title: "Enrolled at FPT Polytechnic College",
    bullets: [
      "Major: Software Application Development, focusing on web and mobile technologies.",
      "Fundamentals: Studied data structures, algorithms, OOP, databases, and software engineering principles.",
      "Projects: Completed multiple team and individual projects, from e-commerce sites to social platforms.",
    ],
    duration: "/2021 – 2024/",
  },
  {
    date: "Apr 2025",
    category: "Internship",
    title: "Software Development Intern at VDS Company",
    bullets: [
      "Real-world experience: Contributed to production-level features under senior developer mentorship.",
      "Stack: Worked with modern web technologies including React, TypeScript, and RESTful APIs.",
      "Collaboration: Participated in agile sprints, code reviews, and daily stand-ups.",
    ],
    duration: "/Apr – Aug 2025/",
  },
  {
    date: "Sep 2025",
    category: "Full-time",
    title: "Junior Developer at Green Block Check (GBC)",
    bullets: [
      "Product development: Built and maintained the company's main corporate website end-to-end.",
      "Tech stack: Next.js, TypeScript, Go, PostgreSQL, Docker — from design to deployment.",
      "Impact: Improved load performance and delivered new client-facing features consistently on schedule.",
    ],
    duration: "/Sep 2025 – Present/",
  },
  {
    date: "2026",
    category: "Freelance",
    title: "Independent Freelancer — Taking on client projects worldwide",
    bullets: [
      "Clients: Delivered full-stack web solutions for businesses across logistics, retail, and tech industries.",
      "Services: UI/UX design, full-stack development, cloud deployment, and long-term maintenance.",
      "Achievement: Maintained a >95% client satisfaction rate with on-time delivery across all projects.",
    ],
    duration: "/2026 – Present/",
  },
];

/* ─── Single timeline row ─── */
function JourneyRow({ item, index }: { item: JourneyItem; index: number }) {
  const stepNumber = `/${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease }}
    >
      {/* Top divider */}
      <div className="w-full h-px bg-white/10" />

      <div className="flex flex-col xl:flex-row xl:items-start gap-4 xl:gap-0 py-10">
        {/* ── Category badge ── */}
        <div className="xl:w-44 shrink-0 flex xl:pt-1">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/15 text-sm font-medium text-white/90 bg-white/5 whitespace-nowrap">
            {item.category}
          </span>
        </div>

        {/* ── Step number ── */}
        <div className="xl:w-20 shrink-0 xl:pt-0.5">
          <span className="text-2xl xl:text-4xl font-semibold text-btn-primary tracking-tight">
            {stepNumber}
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          <p className="text-xl xl:text-3xl font-semibold text-white leading-snug mb-5">
            {item.title}
          </p>
          <ul className="space-y-2">
            {item.bullets.map((bullet, i) => {
              const [boldPart, ...rest] = bullet.split(":");
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm xl:text-lg text-white/75 font-medium"
                >
                  <span className="text-btn-primary mt-0.5 text-2xl leading-none shrink-0">
                    ✳
                  </span>
                  <span>
                    {rest.length > 0 ? (
                      <>
                        <span className="font-semibold text-white">
                          {boldPart}:
                        </span>
                        {rest.join(":")}
                      </>
                    ) : (
                      bullet
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Duration ── */}
        <div className="xl:w-44 shrink-0 flex xl:justify-end xl:pt-1">
          <span className="flex items-center gap-1.5 text-md text-white/70 font-medium whitespace-nowrap">
            <Clock size={13} className="shrink-0" />
            {item.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function JourneySection({
  sectionLabel = "{02} — My Journey",
  heading = "How I got here",
  items = defaultItems,
}: JourneySectionProps) {
  return (
    <section className="relative w-full bg-[#111111] py-24 px-8 md:px-16 xl:px-52">
      {/* Section label */}
      <motion.div
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <span className="w-2 h-2 rounded-full bg-btn-primary shrink-0" />
        <span className="text-sm font-medium text-white/50 tracking-wide">
          {sectionLabel}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="text-5xl md:text-6xl xl:text-7xl font-medium text-white leading-[1.08] mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15, ease }}
      >
        {heading}
      </motion.h2>

      {/* Timeline rows */}
      <div>
        {items.map((item, i) => (
          <JourneyRow key={item.date + i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
