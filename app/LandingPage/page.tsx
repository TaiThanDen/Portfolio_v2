"use client";

import { motion } from "framer-motion";
import VantaBackground from "@/components/background/Vanta";
import AnimatedArrowButton from "@/components/ui/AnimatedArrowButton";
import Navbar from "@/components/ui/Navbar";
import { TiSocialFacebook } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white text-gray-900">
      <div className="fixed inset-0 z-0 w-full h-full">
        <VantaBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="w-full border-b border-gray-300">
          <div className="w-full container mx-auto px-12">
            <Navbar />
          </div>
        </div>

        {/* Hero row: sidebar + main content */}
        <div className="flex flex-col xl:flex-row flex-1">
          <aside className="flex flex-col justify-between px-6 pt-6 xl:p-8 xl:pl-80 shrink-0">
            <div className="flex flex-col justify-start pt-6 xl:pt-60 flex-1">
              <div className="flex items-center gap-8 mb-4">
                {/* ── Avatar cluster ── */}
                <div className="flex items-center">
                  {/* Sub-avatar 1 – smallest (bên trái nhất) */}
                  {/* <motion.div
                  className="rounded-l-full"
                  style={{
                    width: 10,
                    height: 44,
                    backgroundImage: "url(/assets/avt.jpg)",
                    backgroundSize: "96px 96px",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.42)",
                    overflow: "hidden",
                  }}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease }}
                /> */}

                  {/* Sub-avatar 2 – medium */}
                  {/* <motion.div
                  className="rounded-l-full"
                  style={{
                    width: 20,
                    height: 64,
                    backgroundImage: "url(/assets/avt.jpg)",
                    backgroundSize: "96px 96px",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.6)",
                    overflow: "hidden",
                  }}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.65, ease }}
                /> */}

                  {/* Sub-avatar 3 – large */}
                  {/* <motion.div
                  className="rounded-l-full"
                  style={{
                    width: 44,
                    height: 96,
                    backgroundImage: "url(/assets/avt.jpg)",
                    backgroundSize: "96px 96px",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.78)",
                    overflow: "hidden",
                  }}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.42, ease }}
                /> */}

                  {/* Main avatar – bên phải nhất */}
                  <motion.div
                    className="w-24 h-24 rounded-full overflow-hidden shrink-0 ml-0.5"
                    initial={{ x: -70, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.1, ease }}
                  >
                    <Image
                      src="/assets/avt.jpg"
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </motion.div>
                </div>

                {/* ── Info: tên + vai trò + social ── */}
                <div className="flex flex-col justify-center">
                  <div className="overflow-hidden">
                    <motion.h2
                      className="font-semibold text-2xl whitespace-nowrap text-gray-900"
                      initial={{ y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.28, ease }}
                    >
                      Pham Tan Tai
                    </motion.h2>
                  </div>

                  <div className="overflow-hidden">
                    <motion.p
                      className="text-sm md:text-base font-medium text-gray-500 whitespace-nowrap"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.44, ease }}
                    >
                      Web Developer
                    </motion.p>
                  </div>

                  <motion.div
                    className="flex gap-4 mt-3"
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.62, ease }}
                  >
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <TiSocialFacebook className="w-7 h-7" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <SiZalo className="w-7 h-7" />
                    </a>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="text-base xl:text-xl text-gray-600 font-semibold pt-6 xl:pt-80 hidden xl:block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62, ease: "easeOut" }}
              >
                (2021 – PRESENT)
              </motion.div>
            </div>
          </aside>

          {/* ─── Main hero content ─── */}
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

            <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-6 md:mb-8 text-gray-900">
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
                Pham Tan Tai
              </motion.span>
              <br />
              <div className="h-2" /> {/* Spacer giữa 2 dòng */}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.1, ease }}
              >
                a{" "}
              </motion.span>
              <motion.span
                className="inline-block bg-gray-900 text-white rounded-full px-5 py-1"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.4,
                  type: "keyframes",
                  stiffness: 260,
                  damping: 18,
                }}
              >
                Developer
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
                className="inline-block "
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
              I&apos;m dedicated to crafting websites that bring your ideas to
              life, combining design and development to deliver fast, impactful
              results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.2, ease: "easeOut" }}
            >
              <AnimatedArrowButton href="#">
                See what I can do
              </AnimatedArrowButton>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
