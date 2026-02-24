"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import skills, { type Skill } from "@/data/skills";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPOTLIGHT_RADIUS = 220;

/* ─── Types ─── */
export interface ToolsAndTechnologiesProps {
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  items?: Skill[];
}

/* ─── Hex to RGB helper ─── */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

/* ─── Single skill card ─── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      data-skill-card
      data-skill-color={skill.color}
      className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 flex items-center gap-4 will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 * index, ease }}
    >
      {/* Glow overlay */}
      <div
        data-glow
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-none"
      />

      {/* Icon */}
      <div className="relative z-10 shrink-0">
        <skill.icon
          data-icon
          size={36}
          className="transition-none"
          style={{
            color: "#555555",
            filter: "grayscale(100%)",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 min-w-0">
        <p
          data-name
          className="font-semibold text-sm md:text-base leading-tight truncate transition-none"
          style={{ color: "rgba(255, 255, 255, 0.3)" }}
        >
          {skill.name}
        </p>
        <p
          data-category
          className="text-xs mt-0.5 truncate transition-none"
          style={{ color: "rgba(255, 255, 255, 0.15)" }}
        >
          {skill.category}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function ToolsAndTechnologies({
  sectionLabel = "{03} — Tools & Technologies",
  heading = "Tools & Technologies",
  subheading = "My Skills",
  items = skills,
}: ToolsAndTechnologiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const isInsideRef = useRef(false);

  const updateCards = useCallback(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    const mouse = mouseRef.current;

    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-skill-card]");

    if (!mouse || !isInsideRef.current) {
      // Reset all cards
      if (spotlight) {
        spotlight.style.opacity = "0";
      }
      cards.forEach((card) => {
        card.style.borderColor = "rgba(255, 255, 255, 0.06)";
        card.style.background = "rgba(255, 255, 255, 0.02)";

        const glow = card.querySelector<HTMLElement>("[data-glow]");
        if (glow) glow.style.opacity = "0";

        const icon = card.querySelector<HTMLElement>("[data-icon]");
        if (icon) {
          icon.style.color = "#555555";
          icon.style.filter = "grayscale(100%)";
          icon.style.opacity = "0.4";
        }

        const name = card.querySelector<HTMLElement>("[data-name]");
        if (name) name.style.color = "rgba(255, 255, 255, 0.3)";

        const category = card.querySelector<HTMLElement>("[data-category]");
        if (category) category.style.color = "rgba(255, 255, 255, 0.15)";
      });
      return;
    }

    // Update spotlight position
    if (spotlight) {
      spotlight.style.opacity = "1";
      spotlight.style.left = `${mouse.x - 150}px`;
      spotlight.style.top = `${mouse.y - 150}px`;
    }

    // Update each card
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const dx = mouse.x - cardCenterX;
      const dy = mouse.y - cardCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - distance / SPOTLIGHT_RADIUS);
      const skillColor = card.dataset.skillColor || "#ffffff";
      const rgb = hexToRgb(skillColor);

      // Card border & bg
      card.style.borderColor = `rgba(255, 255, 255, ${0.06 + proximity * 0.14})`;
      card.style.background = `rgba(255, 255, 255, ${0.02 + proximity * 0.04})`;

      // Glow overlay
      const glow = card.querySelector<HTMLElement>("[data-glow]");
      if (glow) {
        const localX = mouse.x - rect.left;
        const localY = mouse.y - rect.top;
        glow.style.opacity = `${proximity * 0.18}`;
        glow.style.background = `radial-gradient(circle at ${localX}px ${localY}px, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35), transparent 70%)`;
      }

      // Icon
      const icon = card.querySelector<HTMLElement>("[data-icon]");
      if (icon) {
        icon.style.color = proximity > 0 ? skillColor : "#555555";
        icon.style.filter =
          proximity > 0
            ? `grayscale(${(1 - proximity) * 100}%) drop-shadow(0 0 ${8 * proximity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4))`
            : "grayscale(100%)";
        icon.style.opacity = `${0.4 + proximity * 0.6}`;
      }

      // Name
      const name = card.querySelector<HTMLElement>("[data-name]");
      if (name) {
        name.style.color = `rgba(255, 255, 255, ${0.3 + proximity * 0.7})`;
      }

      // Category
      const category = card.querySelector<HTMLElement>("[data-category]");
      if (category) {
        category.style.color = `rgba(255, 255, 255, ${0.15 + proximity * 0.35})`;
      }
    });
  }, []);

  const tick = useCallback(() => {
    updateCards();
    rafRef.current = requestAnimationFrame(tick);
  }, [updateCards]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseEnter = useCallback(() => {
    isInsideRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const handleMouseLeave = useCallback(() => {
    isInsideRef.current = false;
    mouseRef.current = null;
    cancelAnimationFrame(rafRef.current);
    updateCards(); // reset all cards
  }, [updateCards]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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
        className="text-5xl md:text-6xl xl:text-7xl font-medium text-white leading-[1.08] mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15, ease }}
      >
        {heading}
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-lg md:text-xl text-white/40 font-medium mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
      >
        {subheading}
      </motion.p>

      {/* Grid with spotlight effect */}
      <div
        ref={containerRef}
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mouse spotlight glow — fixed position, updated via ref */}
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed z-20 w-[300px] h-[300px] rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(140,255,46,0.07) 0%, transparent 70%)",
            filter: "blur(20px)",
            willChange: "left, top, opacity",
          }}
        />

        {items.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
