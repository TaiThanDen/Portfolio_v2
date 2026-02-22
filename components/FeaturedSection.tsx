"use client";

import { motion } from "framer-motion";
import AnimatedArrowButton from "@/components/ui/AnimatedArrowButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Decorative flower / rose SVG ─── */
function FlowerDecor({
  color = "white",
  width = 800,
  height = 800,
  opacity = 4,
}: {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
}) {
  // 8 ellipses rotated 0..157.5° in steps of 22.5°, all centered at 300,300
  const petals = Array.from({ length: 8 }, (_, i) => i * 22.5);

  return (
    <svg
      width={width}
      height={height}
      style={{ opacity }}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      {/* Outer ring */}
      <circle
        cx="300"
        cy="300"
        r="270"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <circle
        cx="300"
        cy="300"
        r="220"
        stroke={color}
        strokeWidth="1."
        strokeOpacity="0.3"
      />
      <circle
        cx="300"
        cy="300"
        r="160"
        stroke={color}
        strokeWidth="1."
        strokeOpacity="0.3"
      />

      {/* Petal ellipses */}
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="300"
          cy="300"
          rx="270"
          ry="108"
          stroke={color}
          strokeWidth="1."
          strokeOpacity="0.3"
          transform={`rotate(${deg} 300 300)`}
        />
      ))}

      {/* Inner accent ring */}
      <circle
        cx="300"
        cy="300"
        r="58"
        stroke={color}
        strokeWidth="1."
        strokeOpacity="0.3"
      />
    </svg>
  );
}

/* ─── Main section ─── */
interface FeaturedSectionProps {
  sectionLabel?: string;
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function FeaturedSection({
  sectionLabel = "{01} — Featured projects",
  heading = "I blend creativity with\ntechnical expertise",
  ctaText = "Become a client",
  ctaHref = "#",
}: FeaturedSectionProps) {
  return (
    <section className="relative w-full bg-[#111111] overflow-hidden py-30 px-8 md:px-20 lg:px-32">
      {/* Decorative flower – anchored to the right, partially cropped */}
      <div className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2">
        <FlowerDecor color="#ffff" width={750} height={750} opacity={4} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Label */}
        <motion.div
          className="flex items-center gap-2 mb-7"
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
          className="text-5xl md:text-6xl xl:text-7xl font-medium text-white leading-[1.08] mb-14 whitespace-pre-line"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          {heading}
        </motion.h2>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease }}
        >
          <AnimatedArrowButton
            href={ctaHref}
            variant="primary"
            size="lg"
            className="shadow-[0_8px_24px_0px_rgba(140,255,46,0.18)]"
          >
            {ctaText}
          </AnimatedArrowButton>
        </motion.div>
      </div>
    </section>
  );
}
