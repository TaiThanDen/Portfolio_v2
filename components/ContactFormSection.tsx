"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TiSocialFacebook } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import ContactForm from "./ContactForm";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Types ─── */
interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface ContactFormSectionProps {
  heading?: string;
  subtitle?: string;
  avatarSrc?: string;
  name?: string;
  role?: string;
  email?: string;
  emailHref?: string;
  description?: string;
  descriptionBold?: string;
  ctaText?: string;
  ctaHref?: string;
  socialLinks?: SocialLink[];
  formTitle?: string;
}

const defaultSocialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/tai.pham.731844",
    label: "Facebook",
    icon: <TiSocialFacebook className="w-5 h-5" />,
  },
  {
    href: "https://zalo.me/0961967006",
    label: "Zalo",
    icon: <SiZalo className="w-5 h-5" />,
  },
];

export default function ContactFormSection({
  heading = "Let's create\nsomething\nextraordinary\ntogether",
  subtitle = "Let's make an impact",
  avatarSrc = "/assets/avt.jpg",
  name = "Pham Tan Tai",
  role = "Web developer",
  email = "tai25062006z@gmail.com",
  emailHref = "mailto:tai25062006z@gmail.com",
  description = "Hit me up if you're looking for a",
  descriptionBold = "fast, reliable web-developer",
  ctaText = "Book a call",
  ctaHref = "#",
  socialLinks = defaultSocialLinks,
  formTitle = "Let's get in touch",
}: ContactFormSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0b0d] py-20 md:py-28 px-6 md:px-16 xl:px-52 overflow-hidden"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── LEFT: Heading + Profile ─── */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Big heading */}
          <motion.h2
            className="text-5xl md:text-7xl xl:text-8xl text-white leading-[1.02] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
          >
            {heading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.split("\n").length - 1 && <br />}
              </span>
            ))}
            <span className="text-btn-primary">.</span>
          </motion.h2>

          <div className="mt-14 md:mt-20 flex flex-col gap-7 max-w-sm">
            <motion.p
              className="text-gray-400 text-base md:text-xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35, ease }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={avatarSrc}
                    alt={`${name} avatar`}
                    width={58}
                    height={58}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-md">
                    {name}
                  </span>
                  <span className="text-gray-400 text-sm">{role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            >
              <span className="text-gray-500 text-sm font-medium">
                Contact me
              </span>
              <a
                href={emailHref}
                className="text-white text-xl md:text-2xl font-medium hover:text-btn-primary transition-colors"
              >
                {email}
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">
                {description}{" "}
                <span className="text-white font-semibold">
                  {descriptionBold}
                </span>{" "}
                who can bring your vision to life
              </p>
            </motion.div>
          </div>
        </div>

        {/* ─── RIGHT: Contact form (to hơn) ─── */}
        <motion.div
          className="lg:col-span-5 w-full max-w-2xl lg:ml-auto bg-[#0a0b0d] mt-12 rounded-3xl p-7 md:p-9 border border-[#333333] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-7">
            {formTitle}
          </h3>

          <ContactForm />
        </motion.div>
      </div>

      {/* bông hoa / vòng tròn nền trái */}
      <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 w-125 h-125 rounded-full border border-white/45" />
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-87.5 h-87.5 rounded-full border border-white/45" />
    </section>
  );
}
