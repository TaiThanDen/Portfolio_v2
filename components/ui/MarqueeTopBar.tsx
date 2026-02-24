"use client";

import { motion } from "framer-motion";

export interface MarqueeItem {
  /** Highlighted value shown in accent color (optional) */
  highlight?: string;
  /** Descriptive label shown next to the value */
  label: string;
}

interface MarqueeTopBarProps {
  /** Items to display in the marquee. Defaults to portfolio stats. */
  items?: MarqueeItem[];
  /** Duration (seconds) for one full loop cycle. Default: 25 */
  speed?: number;
  /** Extra classes applied to the outer wrapper */
  className?: string;
}

const defaultItems: MarqueeItem[] = [
  { highlight: "3+", label: "years of experience" },
  { highlight: ">95%", label: "client retention rate" },
  { highlight: "18", label: "satisfied clients" },
  { highlight: "14", label: "projects finished" },
];

const Separator = () => (
  <span
    className="text-btn-primary text-4xl select-none mx-8 xl:mx-14"
    aria-hidden
  >
    ✳
  </span>
);

function MarqueeTrack({ items }: { items: MarqueeItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        const hasHighlight =
          typeof item.highlight === "string" && item.highlight.trim().length > 0;

        return (
          <span key={i} className="flex items-center shrink-0">
            <span className="flex items-center gap-2 text-2xl xl:text-4xl font-semibold whitespace-nowrap">
              {hasHighlight && (
                <>
                  <span className="text-btn-primary">{item.highlight}</span>
                  <span className="text-white/40">/</span>
                </>
              )}
              <span className="text-white">{item.label}</span>
            </span>
            <Separator />
          </span>
        );
      })}
    </>
  );
}

export default function MarqueeTopBar({
  items = defaultItems,
  speed = 50,
  className,
}: MarqueeTopBarProps) {
  return (
    <div
      className={`relative w-full bg-[#1a1a1a] overflow-hidden border-b border-white/10 py-7 ${
        className ?? ""
      }`}
    >
      {/* Left & right fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-82 bg-linear-to-r from-[#1a1a1a] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-82 bg-linear-to-l from-[#1a1a1a] to-transparent z-20" />

      <motion.div
        className="flex items-center"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
      </motion.div>
    </div>
  );
}
