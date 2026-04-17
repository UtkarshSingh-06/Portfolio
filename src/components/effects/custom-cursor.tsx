"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.5 });

  const dotSpringX = useSpring(mouseX, { stiffness: 900, damping: 30 });
  const dotSpringY = useSpring(mouseY, { stiffness: 900, damping: 30 });

  useEffect(() => {
    if (!isDesktop || reducedMotion) {
      document.body.removeAttribute("data-cursor");
      return;
    }

    document.body.setAttribute("data-cursor", "custom");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setHovering(Boolean(interactive));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      document.body.removeAttribute("data-cursor");
    };
  }, [isDesktop, reducedMotion, mouseX, mouseY]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/70 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
      />
    </>
  );
}
