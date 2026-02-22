"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="relative z-20 w-full">
        <motion.header
          className={`w-full flex items-center justify-between px-6 lg:px-12 py-4 lg:py-5 `}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <rect width="22" height="22" rx="4" fill="#8cff2e" />
              <path
                d="M5 5L17 17M17 5L5 17"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">
              My Profile
            </span>
          </Link>

          {/* ── Nav links – ẩn trên mobile & tablet ── */}
          <nav className="hidden lg:flex pl-24 items-center gap-8">
            {[
              { label: "Projects", href: "#projects" },
              { label: "About & Contact", href: "#contact" },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease }}
              >
                <Link
                  href={item.href}
                  className="text-lg text-gray-600 hover:text-gray-900 transition-colors font-semibold"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ── Right: email + CTA – ẩn trên mobile & tablet ── */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
          >
            <span className="text-md text-gray-500 font-semibold">
              Email:{" "}
              <a
                href="mailto:tai25062006z@gmail.com"
                className="text-gray-800 hover:text-gray-900 transition-colors font-semibold"
              >
                tai25062006z@gmail.com
              </a>
            </span>
            <a
              href="#contact"
              className="bg-gray-900 text-white text-lg font-medium px-5 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              Contact me
            </a>
          </motion.div>

          <button
            className="lg:hidden flex flex-col justify-center gap-1.5 p-4 rounded-full py-5 bg-white shadow-2xl "
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-7 h-0.5 bg-gray-900 rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-gray-900 rounded-full"
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-7 h-0.5 bg-gray-900 rounded-full origin-center"
              animate={
                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
            />
          </button>
        </motion.header>
      </div>

      {/* ── Mobile/Tablet dropdown menu – ngoài container, full width ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed top-17.4 left-0 w-screen bg-white border-b border-gray-200 z-50 px-6 py-5 flex flex-col gap-4 shadow-lg"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
          >
            <Link
              href="#projects"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About & Contact
            </Link>
            <div className="h-px bg-gray-200" />
            <span className="text-sm text-gray-500">
              Email:{" "}
              <a
                href="mailto:tai25062006z@gmail.com"
                className="text-gray-800 font-medium"
              >
                tai25062006z@gmail.com
              </a>
            </span>
            <a
              href="#contact"
              className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors text-center"
              onClick={() => setMobileOpen(false)}
            >
              Contact me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
