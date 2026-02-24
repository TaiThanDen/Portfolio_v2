"use client";

import VantaBackground from "@/components/background/Vanta";
import Navbar from "@/components/ui/Navbar";
import MarqueeTopBar from "@/components/ui/MarqueeTopBar";
import HeroBanner from "@/components/HeroBanner";
import BentoProjectGrid from "@/components/BentoProjectGrid";
import FeaturedSection from "@/components/FeaturedSection";
import JourneySection from "@/components/JourneySection";
import ToolsAndTechnologies from "@/components/ToolsAndTechnologies";

const marqueeItems = [
  { highlight: "3+", label: "years of experience" },
  { highlight: ">95%", label: "client retention rate" },
  { highlight: "18", label: "satisfied clients" },
  { highlight: "14", label: "projects finished" },
];

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
        <MarqueeTopBar items={marqueeItems} />
      </div>
      <FeaturedSection />
      <BentoProjectGrid />
      <MarqueeTopBar items={marqueeItems} />
      <JourneySection />
      <ToolsAndTechnologies />
    </main>
  );
}
