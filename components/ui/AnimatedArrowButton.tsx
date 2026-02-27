"use client";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

interface AnimatedArrowButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Visual style of the button. Default: "primary" */
  variant?: ButtonVariant;
  /** Size preset. Default: "md" */
  size?: ButtonSize;
  /** Extra classes applied to the anchor element */
  className?: string;
  /** Extra classes applied to the icon circle */
  iconBgClassName?: string;
  /** Extra classes applied to both arrow icons */
  iconClassName?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary shadow-btn-primary",
  outline:
    "bg-transparent border-2 border-gray-300 text-gray-900 hover:border-gray-600",
  dark: "bg-gray-900 text-white hover:bg-gray-700",
};

const sizeStyles: Record<
  ButtonSize,
  { button: string; icon: string; arrow: number }
> = {
  sm: { button: "px-4 py-2 text-sm  gap-2", icon: "w-6 h-6", arrow: 13 },
  md: { button: "px-7 py-3 text-base gap-3", icon: "w-8 h-8", arrow: 16 },
  lg: { button: "px-9 py-4 text-lg  gap-4", icon: "w-10 h-10", arrow: 19 },
};

const iconBgByVariant: Record<ButtonVariant, string> = {
  primary: "bg-white",
  outline: "bg-gray-900",
  dark: "bg-white",
};

const iconColorByVariant: Record<ButtonVariant, string> = {
  primary: "text-black",
  outline: "text-white",
  dark: "text-black",
};

export default function AnimatedArrowButton({
  href = "#",
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  iconBgClassName,
  iconClassName,
}: AnimatedArrowButtonProps) {
  const [hovered, setHovered] = useState(false);
  const sz = sizeStyles[size];
  const arrowColor = cn(iconColorByVariant[variant], iconClassName);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex items-center rounded-full w-fit font-medium transition-colors",
        variantStyles[variant],
        sz.button,
        className,
      )}
    >
      {children}

      {/* Icon circle */}
      <span
        className={cn(
          "rounded-full flex items-center justify-center overflow-hidden relative shrink-0",
          iconBgByVariant[variant],
          sz.icon,
          iconBgClassName,
        )}
      >
        {/* Arrow Up-Right – shown when not hovered */}
        <ArrowUpRight
          size={sz.arrow}
          className={cn(
            "absolute transition-all duration-300",
            arrowColor,
            hovered
              ? "opacity-0 -translate-y-4 translate-x-4"
              : "opacity-100 translate-y-0 translate-x-0",
          )}
        />
        {/* Arrow Right – shown when hovered */}
        <ArrowRight
          size={sz.arrow}
          className={cn(
            "absolute transition-all duration-300",
            arrowColor,
            hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
          )}
        />
      </span>
    </a>
  );
}
