"use client";

import { useEffect, useRef } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<ReturnType<typeof GLOBE> | null>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = GLOBE({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x918d8d,
        color2: 0x8cff2e,
        size: 1.1,
        backgroundColor: 0xffffff,
      });
    }

    // Resize handler
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 w-full h-full" />;
}
