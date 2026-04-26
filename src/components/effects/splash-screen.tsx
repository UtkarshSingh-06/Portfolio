"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "UTKARSH.EXE — v2.0.26", delay: 0, style: "text-cyan-400 font-bold" },
  { text: "──────────────────────────────────────", delay: 180, style: "text-zinc-600" },
  { text: "> Checking AWS credentials        [OK]", delay: 360, style: "text-zinc-300" },
  { text: "> Spawning Docker containers      [OK]", delay: 540, style: "text-zinc-300" },
  { text: "> Applying Terraform plan         [OK]", delay: 720, style: "text-zinc-300" },
  { text: "> kubectl apply -f portfolio.yaml [OK]", delay: 900, style: "text-zinc-300" },
  { text: "> All pods running.                   ", delay: 1080, style: "text-emerald-400" },
  { text: "──────────────────────────────────────", delay: 1260, style: "text-zinc-600" },
  { text: "READY.", delay: 1440, style: "text-cyan-300 font-bold tracking-widest" },
];

const TOTAL_MS = 1440 + 220; // last line delay + one step
const FADE_AFTER_MS = TOTAL_MS + 400;

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("splash_shown")) {
      setDone(true);
      return;
    }

    setVisible(true);

    const lineTimers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay)
    );

    const fadeTimer = setTimeout(() => setFading(true), FADE_AFTER_MS);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (done || !visible) return null;

  return (
    <AnimatePresence>
      {!fading ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090d]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full max-w-lg px-6">
            <div className="overflow-hidden rounded-xl border border-zinc-700/60 bg-[#0c0f14] shadow-2xl">
              {/* macOS-style chrome */}
              <div className="flex items-center gap-2 border-b border-zinc-700/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-auto font-pixel text-[9px] tracking-widest text-zinc-500">
                  boot.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="space-y-1.5 px-5 py-5 font-mono text-sm">
                {BOOT_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`whitespace-pre ${line.style}`}
                  >
                    {line.text}
                  </motion.p>
                ))}

                {/* Blinking caret */}
                {visibleLines.length === BOOT_LINES.length && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block h-4 w-2 rounded-sm bg-cyan-400"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="splash-fade"
          className="fixed inset-0 z-[9999] bg-[#07090d]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onAnimationComplete={() => {
            sessionStorage.setItem("splash_shown", "1");
            setDone(true);
          }}
        />
      )}
    </AnimatePresence>
  );
}
