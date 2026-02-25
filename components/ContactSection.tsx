"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { TiSocialFacebook } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import type { ReactNode } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Types ─── */
export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  /** Accent card (uses btn-primary green bg) */
  accent?: boolean;
}

export interface ContactProps {
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  items?: ContactItem[];
}

/* ─── Default contact items ─── */
const defaultItems: ContactItem[] = [
  {
    label: "Facebook",
    value: "Pham Tan Tai",
    href: "https://www.facebook.com/tai.pham.731844",
    icon: <TiSocialFacebook size={30} />,
  },
  {
    label: "Zalo",
    value: "0961 967 006",
    href: "https://zalo.me/0961967006",
    icon: <SiZalo size={30} />,
  },
  {
    label: "Email",
    value: "tai25062006z@gmail.com",
    href: "mailto:tai25062006z@gmail.com",
    icon: <Mail size={30} />,
  },
  {
    label: "Phone",
    value: "0961 967 006",
    href: "tel:+84961967006",
    icon: <Phone size={30} />,
  },
  {
    label: "Get in touch",
    value: "Let's build something",
    href: "mailto:tai25062006z@gmail.com",
    icon: <Mail size={30} />,
    accent: true,
  },
];

/* ─── Decorative flower constellation (new) ─── */
function GeometricFlowerDecor({
  color = "#eeeeee",
  width = 760,
  height = 760,
  opacity = 0.22,
}: {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
}) {
  const cx = 300;
  const cy = 300;

  // 12 điểm: xen kẽ cánh dài/cánh ngắn
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const angle = (-90 + i * 30) * (Math.PI / 180);
    const r = i % 2 === 0 ? 210 : 130;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  // Smooth closed path (flower)
  const first = nodes[0];
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < nodes.length; i++) {
    const curr = nodes[i];
    const next = nodes[(i + 1) % nodes.length];
    const mx = (curr.x + next.x) / 2;
    const my = (curr.y + next.y) / 2;
    d += ` Q ${curr.x} ${curr.y} ${mx} ${my}`;
  }
  d += " Z";

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
      {/* flower outline */}
      <path d={d} stroke={color} strokeWidth="1.4" />

      {/* inner star ring */}
      <polygon
        points={nodes
          .filter((_, i) => i % 2 === 1)
          .map((p) => `${p.x},${p.y}`)
          .join(" ")}
        stroke={color}
        strokeWidth="1.1"
        strokeOpacity="0.9"
      />

      {/* constellation lines from center */}
      {nodes.map((p, i) => (
        <line
          key={`ray-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke={color}
          strokeWidth="0.9"
          strokeOpacity="0.75"
        />
      ))}

      {/* orbit rings */}
      <circle
        cx={cx}
        cy={cy}
        r="220"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
      <circle
        cx={cx}
        cy={cy}
        r="160"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />
      <circle
        cx={cx}
        cy={cy}
        r="85"
        stroke={color}
        strokeWidth="1.0"
        strokeOpacity="0.65"
      />

      {/* nodes */}
      {nodes.map((p, i) => (
        <circle
          key={`node-${i}`}
          cx={p.x}
          cy={p.y}
          r={i % 2 === 0 ? 4 : 3}
          fill={i % 2 === 0 ? color : "none"}
          stroke={color}
          strokeWidth="1"
        />
      ))}

      <circle cx={cx} cy={cy} r="6" fill={color} />
    </svg>
  );
}

/* ─── Single card ─── */
function ContactCard({ item, index }: { item: ContactItem; index: number }) {
  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.08 * index, ease }}
      className={`
        group relative flex flex-col justify-between rounded-2xl p-10 min-h-40 cursor-pointer
         transition-all duration-300 overflow-hidden 
        ${
          item.accent
            ? "bg-btn-primary border-transparent hover:brightness-105"
            : "bg-white hover:shadow-md "
        }
      `}
    >
      {/* Label */}
      <span
        className={`text-xl font-semibold ${
          item.accent ? "text-gray-900" : "text-gray-800"
        }`}
      >
        {item.label}
      </span>

      {/* Value */}
      <span
        className={`text-md font-medium mt-1 ${
          item.accent ? "text-gray-800/70" : "text-gray-500"
        }`}
      >
        {item.value}
      </span>

      {/* Icon circle — bottom-right with rotate on card hover */}
      <div className="flex justify-end mt-6">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center shrink-0
            transition-transform duration-300
            group-hover:rotate-45
            ${item.accent ? "bg-gray-900" : "bg-btn-primary"}
          `}
        >
          <span className={item.accent ? "text-white" : "text-gray-900"}>
            {item.icon}
          </span>
        </div>
      </div>

      {/* Subtle noise texture overlay for accent card */}
      {item.accent && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}
    </motion.a>
  );
}

/* ─── Main section ─── */
export default function Contact({
  sectionLabel = "{06} — Contact me",
  heading = "I'm all over the internet",
  subheading = "Reach out anytime — I usually reply within 24 hours.",
  items = defaultItems,
}: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress (0 → 1) to rotation (0° → 360°)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#f8f8f8] py-30 md:py-34 px-8 md:px-16 xl:px-52 overflow-hidden"
    >
      {/* Decorative geometric flower – anchored to the left, rotates on scroll */}
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2"
        style={{ rotate }}
      >
        <GeometricFlowerDecor
          color="#000"
          width={960}
          height={960}
          opacity={0.22}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="w-2 h-2 rounded-full bg-btn-primary shrink-0" />
          <span className="text-md font-medium text-gray-400 tracking-wide">
            {sectionLabel}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-5xl md:text-6xl xl:text-7xl font-medium text-gray-900 leading-[1.08] mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15, ease }}
        >
          {heading}
          <span className="text-btn-primary">*</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-base md:text-lg text-gray-400 font-medium mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease }}
        >
          <span className="text-btn-primary">*</span> {subheading}
        </motion.p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
