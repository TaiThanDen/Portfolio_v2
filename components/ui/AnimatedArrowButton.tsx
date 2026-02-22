"use client";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";
interface AnimatedArrowButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function AnimatedArrowButton({
  href = "#",
  children,
  onClick,
}: AnimatedArrowButtonProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="btn-primary flex items-center gap-3 rounded-full px-7 py-3 w-fit font-medium transition-colors shadow-6xl shadow-btn-primary"
    >
      {" "}
      {children} {/* Icon circle */}{" "}
      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
        {" "}
        {/* Arrow Up-Right - hiện khi không hover */}{" "}
        <ArrowUpRight
          size={16}
          className={`absolute text-black transition-all duration-300 ${
            hovered
              ? "opacity-0 -translate-y-4 translate-x-4"
              : "opacity-100 translate-y-0 translate-x-0"
          }`}
        />
        {/* Arrow Right - hiện khi hover */}
        <ArrowRight
          size={16}
          className={`absolute text-black transition-all  duration-300 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        />
      </span>
    </a>
  );
}
