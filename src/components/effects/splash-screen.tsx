"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Milliseconds between each boot line appearing (readable on mobile + desktop). */
const LINE_STEP_MS = 380;
/** Extra time on the final “READY.” + blinking caret before the overlay fades out. */
const HOLD_AFTER_LAST_LINE_MS = 1500;

const BOOT_LINES = [
  { text: "UTKARSH.EXE — v2.0.26", style: "text-cyan-400 font-bold" },
  { text: "─────────────────────────────", style: "text-zinc-600" },
  { text: "> AWS credentials       [OK]", style: "text-zinc-300" },
  { text: "> Docker containers     [OK]", style: "text-zinc-300" },
  { text: "> Terraform plan        [OK]", style: "text-zinc-300" },
  { text: "> kubectl apply         [OK]", style: "text-zinc-300" },
  { text: "> All pods running.         ", style: "text-emerald-400" },
  { text: "─────────────────────────────", style: "text-zinc-600" },
  { text: "READY.", style: "text-cyan-300 font-bold tracking-widest" },
];

const lastLineDelay = (BOOT_LINES.length - 1) * LINE_STEP_MS;
/** Wait until last line has animated in, then hold so the boot “lands” before fade. */
const FADE_AFTER_MS = lastLineDelay + 260 + HOLD_AFTER_LAST_LINE_MS;

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

    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, i * LINE_STEP_MS)
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
          transition={{ duration: 0.65, ease: "easeInOut" }}
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
              <div className="space-y-1.5 overflow-x-hidden px-5 py-5 font-mono text-sm">
                {BOOT_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`truncate ${line.style}`}
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
          transition={{ duration: 0.65, ease: "easeInOut" }}
          onAnimationComplete={() => {
            sessionStorage.setItem("splash_shown", "1");
            setDone(true);
          }}
        />
      )}
    </AnimatePresence>
  );
}
