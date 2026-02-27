"use client";

import { motion } from "framer-motion";
import { TiSocialFacebook } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import Image from "next/image";
import AnimatedArrowButton from "@/components/ui/AnimatedArrowButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface HeroBannerProps {
  name?: string;
  role?: string;
  avatarSrc?: string;
  sinceYear?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  socialLinks?: SocialLink[];
}

const defaultSocialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/tai.pham.731844",
    label: "Facebook",
    icon: <TiSocialFacebook className="w-7 h-7" />,
  },
  {
    href: "https://zalo.me/0961967006",
    label: "Zalo",
    icon: <SiZalo className="w-7 h-7" />,
  },
];

export default function HeroBanner({
  name = "Pham Tan Tai",
  role = "Web Developer",
  avatarSrc = "/assets/avt.jpg",
  sinceYear = "2021 – PRESENT",
  description = "I'm dedicated to crafting websites that bring your ideas to life, combining design and development to deliver fast, impactful results.",
  ctaText = "See featured projects",
  ctaHref = "#featured-projects",
  socialLinks = defaultSocialLinks,
}: HeroBannerProps) {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(ctaHref);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="flex flex-col xl:flex-row flex-1">
      {/* ── Sidebar ── */}
      <aside className="flex flex-col justify-between px-6 pt-6 xl:p-8 xl:pl-80 shrink-0">
        <div className="flex flex-col justify-start pt-6 xl:pt-47 flex-1">
          <div className="flex items-center gap-8 mb-4">
            {/* Avatar */}
            <div className="flex items-center">
              <motion.div
                className="w-24 h-24 rounded-full overflow-hidden shrink-0 ml-0.5"
                initial={{ x: -70, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.3, ease }}
              >
                <Image
                  src={avatarSrc}
                  alt={`${name} avatar`}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </motion.div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="overflow-hidden">
                <motion.h2
                  className="font-semibold text-2xl whitespace-nowrap text-gray-900"
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.28, ease }}
                >
                  {name}
                </motion.h2>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  className="text-sm md:text-base font-medium text-gray-500 whitespace-nowrap"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.44, ease }}
                >
                  {role}
                </motion.p>
              </div>

              <motion.div
                className="flex gap-4 mt-3"
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.62, ease }}
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="text-base xl:text-xl text-gray-600 font-semibold pt-6 xl:pt-80 hidden xl:block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: "easeOut" }}
          >
            ({sinceYear})
          </motion.div>
        </div>
      </aside>

      {/* ── Main hero content ── */}
      <div className="flex flex-col justify-center flex-1 px-6 md:px-16 py-8 md:py-12">
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <span className="w-2 h-2 rounded-full bg-btn-primary animate-pulse" />
          <span className="text-base font-medium text-gray-600">
            Available for work
          </span>
        </motion.div>

        <h1 className="text-3xl md:text-6xl font-medium leading-tight mb-6 md:mb-8 text-gray-900">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease }}
          >
            Hi! I&apos;m{" "}
          </motion.span>
          <motion.span
            className="inline-block bg-white border border-gray-200 rounded-full px-5 py-1 shadow-lg"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
          >
            {name}
          </motion.span>
          <br />
          <div className="h-2" />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.1, ease }}
          >
            a
          </motion.span>{" "}
          <motion.span
            className="inline-block bg-gray-900 text-white rounded-full px-5 py-1"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4, ease }}
          >
            {role}
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8, ease }}
          >
            from{" "}
          </motion.span>
          <motion.span
            className="inline-block border-gray-300 border-2 rounded-full px-5 py-1"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2.1, ease }}
          >
            Vietnam
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4, ease }}
          >
            turning your ideas into
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4, ease }}
          >
            pixel-perfect realities
          </motion.span>
        </h1>

        <motion.p
          className="text-gray-500 max-w-xl mb-10 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8, ease: "easeOut" }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.2, ease: "easeOut" }}
        >
          <AnimatedArrowButton href={ctaHref} onClick={handleCtaClick}>
            {ctaText}
          </AnimatedArrowButton>
        </motion.div>
      </div>
    </div>
  );
}
