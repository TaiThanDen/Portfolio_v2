"use client";

import { useEffect, useRef } from "react";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function initVanta() {
      if (vantaEffect.current || !vantaRef.current) return;

      const [{ default: GLOBE }, THREE] = await Promise.all([
        import("vanta/dist/vanta.globe.min"),
        import("three"),
      ]);

      if (cancelled || !vantaRef.current) return;

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

    initVanta();

    // Resize handler
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 w-full h-full" />;
}
