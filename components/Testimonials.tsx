"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── UI TUNING: chỉnh nhanh toàn bộ size tại đây ─── */
const UI = {
  // Card size (chỉ cần đổi 2 thông số này để card nhỏ/lớn)
  CARD_WIDTH: "clamp(270px, 30vw, 360px)",
  CARD_MIN_HEIGHT: "clamp(320px, 36vw, 400px)",

  // Rating
  RATING_NUMBER_CLASS: "text-sm md:text-lg",
  STAR_SIZE: 16,

  // Feedback text
  FEEDBACK_CLASS: "text-base md:text-xl",

  // Avatar + name
  AVATAR_SIZE: "clamp(44px, 3.2vw, 54px)",
  NAME_CLASS: "text-sm md:text-base",
};

/* ─── Types ─── */
export interface Testimonial {
  name: string;
  avatar?: string;
  rating: number;
  text: string;
}

export interface TestimonialsProps {
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  items?: Testimonial[];
  /** Seconds for one full loop (lớn hơn = chậm hơn) */
  speed?: number;
}

/* ─── Default testimonials ─── */
const defaultTestimonials: Testimonial[] = [
  {
    name: "Emily Desire",
    rating: 5.0,
    text: "Ily delivered a complex web application ahead of schedule. Her coding prowess and problem-solving abilities were evident in the seamless functionality and robust features she implemented.",
  },
  {
    name: "Tom Shawn",
    rating: 5.0,
    text: "Tom's redesign of our outdated website was nothing short of miraculous. He modernized our online presence while maintaining our core identity. The positive feedback from our clients has been overwhelming.",
  },
  {
    name: "Andrew Mathews",
    rating: 4.5,
    text: "Andrew transformed my business idea into a stunning website in just two weeks, and I couldn't be happier! His attention to detail and quick turnaround time were impressive.",
  },
  {
    name: "Sarah Taller",
    rating: 5.0,
    text: "Attention to detail is evident in the responsive layouts, ensuring seamless performance across all devices.",
  },
  {
    name: "Michael Chen",
    rating: 5.0,
    text: "Pleasure working with a developer who truly understands modern web standards. The final product exceeded all expectations and our conversion rate increased by 40%.",
  },
  {
    name: "Lisa Nguyen",
    rating: 4.5,
    text: "The website redesign was completed on time and on budget. Communication throughout the project was excellent, with regular updates and quick responses to feedback.",
  },
];

/* ─── Star rating component ─── */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`${UI.RATING_NUMBER_CLASS} font-semibold text-white/80 mr-2`}
      >
        {rating.toFixed(1)}
        <span className="text-white/30 font-normal"> / 5</span>
      </span>

      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={UI.STAR_SIZE}
          className="fill-btn-primary text-btn-primary"
        />
      ))}
      {hasHalf && (
        <StarHalf
          size={UI.STAR_SIZE}
          className="fill-btn-primary text-btn-primary"
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={UI.STAR_SIZE}
          className="text-white/20"
        />
      ))}
    </div>
  );
}

/* ─── Quote icon ─── */
function QuoteIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white/10"
    >
      <path
        d="M10 8C10 5.79 8.21 4 6 4C3.79 4 2 5.79 2 8C2 10.21 3.79 12 6 12C6.34 12 6.67 11.96 6.99 11.88C6.88 13.64 6.14 15.23 4.97 16.39L6.5 18C8.6 15.89 10 12.87 10 10V8ZM22 8C22 5.79 20.21 4 18 4C15.79 4 14 5.79 14 8C14 10.21 15.79 12 18 12C18.34 12 18.67 11.96 18.99 11.88C18.88 13.64 18.14 15.23 16.97 16.39L18.5 18C20.6 15.89 22 12.87 22 10V8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ─── Single testimonial card ─── */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className="shrink-0 rounded-2xl border border-white/8 bg-[#1a1a1a] p-5 md:p-6 flex flex-col justify-between gap-4"
      style={{ width: UI.CARD_WIDTH, minHeight: UI.CARD_MIN_HEIGHT }}
    >
      <div>
        <div className="flex items-center justify-between mb-4 mt-1">
          <StarRating rating={item.rating} />
          <QuoteIcon />
        </div>

        <p
          className={`${UI.FEEDBACK_CLASS} leading-relaxed text-white/72 font-medium py-4`}
        >
          {item.text}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-3 pt-4 border-t border-white/6">
        <div
          className="rounded-full bg-white/10 overflow-hidden shrink-0 flex items-center justify-center"
          style={{ width: UI.AVATAR_SIZE, height: UI.AVATAR_SIZE }}
        >
          {item.avatar ? (
            <Image
              src={item.avatar}
              alt={item.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-white/50">
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          )}
        </div>

        <span className={`${UI.NAME_CLASS} font-semibold text-white/80`}>
          {item.name}
        </span>
      </div>
    </div>
  );
}

/* ─── Track content ─── */
function TestimonialTrack({ items }: { items: Testimonial[] }) {
  return (
    <>
      {items.map((item, i) => (
        <TestimonialCard key={`${item.name}-${i}`} item={item} />
      ))}
    </>
  );
}

/* ─── Main section ─── */
export default function Testimonials({
  sectionLabel = "{04} — Testimonials",
  heading = "Don't take my word for it",
  subheading = "Take theirs",
  items = defaultTestimonials,
  speed = 120, // lớn hơn = chậm hơn
}: TestimonialsProps) {
  const x = useMotionValue(0);
  const singleTrackRef = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);

  const measure = useCallback(() => {
    if (!singleTrackRef.current) return;
    setSingleWidth(singleTrackRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (singleTrackRef.current) ro.observe(singleTrackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    if (singleWidth > 0) x.set(-singleWidth); // start từ trái để chạy sang phải
  }, [singleWidth, x]);

  useAnimationFrame((_, delta) => {
    if (singleWidth <= 0) return;
    const safeSpeed = Math.max(20, speed);
    const pxPerSec = singleWidth / safeSpeed;
    const step = pxPerSec * (delta / 1000);

    let next = x.get() + step; // trái -> phải
    if (next >= 0) next -= singleWidth;
    x.set(next);
  });

  return (
    <section className="relative w-full bg-[#111111] py-24 overflow-hidden">
      {/* Header — centered */}
      <div className="px-8 md:px-16 xl:px-52 text-center mb-16">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="w-2 h-2 rounded-full bg-btn-primary shrink-0" />
          <span className="text-md font-medium text-white/50 tracking-wide">
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
          <span className="text-btn-primary">*</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-base md:text-lg text-white/40 font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease }}
        >
          <span className="text-btn-primary">*</span> {subheading}
        </motion.p>
      </div>

      {/* Scrolling testimonial cards */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-linear-to-r from-[#111111] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-linear-to-l from-[#111111] to-transparent z-10" />

        <motion.div
          className="flex items-stretch"
          style={{ x, width: "max-content", willChange: "transform" }}
        >
          <div
            ref={singleTrackRef}
            className="flex items-stretch gap-5 pr-5 shrink-0"
          >
            <TestimonialTrack items={items} />
          </div>
          <div className="flex items-stretch gap-5 pr-5 shrink-0" aria-hidden>
            <TestimonialTrack items={items} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
