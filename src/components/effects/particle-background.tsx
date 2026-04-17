"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function ParticleBackground() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, [reducedMotion]);

  if (reducedMotion || !ready) return null;

  const isDark = resolvedTheme === "dark";
  const color = isDark ? "#818cf8" : "#4f46e5";
  const linkColor = isDark ? "#a5b4fc" : "#6366f1";

  return (
    <Particles
      id="tsparticles"
      className="pointer-events-none fixed inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.35 } },
          },
        },
        particles: {
          color: { value: color },
          links: {
            color: linkColor,
            distance: 140,
            enable: true,
            opacity: isDark ? 0.18 : 0.14,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.45,
            outModes: { default: "out" },
          },
          number: { value: 40, density: { enable: true } },
          opacity: { value: isDark ? 0.35 : 0.28 },
          size: { value: { min: 1, max: 2.5 } },
        },
      }}
    />
  );
}
