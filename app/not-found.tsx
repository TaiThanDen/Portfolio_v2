"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 bg-[#0a0b0d]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-40 top-1/4 w-96 h-96 rounded-full border border-btn-primary/10" />
      <div className="pointer-events-none absolute -right-20 top-1/3 w-64 h-64 rounded-full border border-btn-primary/15" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 w-96 h-96 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -left-20 bottom-1/3 w-64 h-64 rounded-full border border-white/8" />

      <div className="relative z-10 max-w-3xl text-center">
        {/* 404 number with glitch effect */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.h1
            className="text-[clamp(8rem,20vw,16rem)] font-bold text-transparent bg-clip-text bg-gradient-to-br from-btn-primary via-white to-btn-primary leading-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            404
          </motion.h1>

          {/* Glitch overlay */}
          <motion.div
            className="absolute inset-0 text-[clamp(8rem,20vw,16rem)] font-bold text-btn-primary/20 leading-none"
            animate={{
              x: [0, -4, 4, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into
            the digital void. Don't worry, we'll guide you back home.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <div className="w-2 h-2 rounded-full bg-btn-primary animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">
              Redirecting in{" "}
              <span className="text-btn-primary font-bold">{countdown}</span>s
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
        >
          <Link
            href="/"
            className="group relative px-8 py-4 btn-primary hover:bg-btn-primary-hover text-black font-semibold rounded-full transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Go Home</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <button
            onClick={() => router.back()}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-full transition-all duration-300"
          >
            Go Back
          </button>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          className="absolute -z-10 inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(140,255,46,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 rounded-full bg-btn-primary/40"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-4 h-4 rounded-full bg-white/20"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </main>
  );
}
