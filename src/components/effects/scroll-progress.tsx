"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] h-[3px] w-full origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
