"use client";

import VantaBackground from "@/components/background/Vanta";
import Navbar from "@/components/ui/Navbar";
import MarqueeTopBar from "@/components/ui/MarqueeTopBar";
import HeroBanner from "@/components/HeroBanner";
import BentoProjectGrid from "@/components/BentoProjectGrid";
import FeaturedSection from "@/components/FeaturedSection";

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
        <HeroBanner />
      </div>
      <div className="relative bg-[#1c1c1c] z-10 mt-auto ">
        <MarqueeTopBar />
      </div>
      <FeaturedSection />
      <BentoProjectGrid />
    </main>
  );
}
