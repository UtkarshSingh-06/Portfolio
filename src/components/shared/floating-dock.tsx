"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const DISMISS_KEY = "portfolio:hire-card-dismissed";

export function FloatingDock() {
  const [mounted, setMounted] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(DISMISS_KEY) === "1";
    if (dismissed) return;
    const t = setTimeout(() => setShowCard(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function dismissCard() {
    setShowCard(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  function openTerminal() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("portfolio:open-terminal"));
    }
  }

  function goToContact() {
    scrollToSection("#contact");
  }

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(1rem+env(safe-area-inset-left))] z-40 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:left-[calc(1.5rem+env(safe-area-inset-left))]">
      <div className="pointer-events-auto flex flex-col items-start gap-3">
          <AnimatePresence>
            {showCard ? (
              <motion.div
                key="hire-card"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[192px] overflow-hidden rounded-xl border border-black/10 bg-white/95 p-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md dark:border-white/10 dark:bg-[#0d1b1e]/95 dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
                role="complementary"
                aria-label="Availability status"
              >
                {/* Ambient glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.12),transparent_60%)]"
                />

                {/* Close */}
                <button
                  onClick={dismissCard}
                  aria-label="Dismiss availability card"
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-black/5 hover:text-zinc-700 dark:hover:bg-white/5 dark:hover:text-zinc-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                {/* Availability pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available for hiring
                </div>

                <div className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Open to opportunities
                </div>
                <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Full Stack · Cloud · DevOps
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={goToContact}
                  className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 px-3 py-1.5 text-xs font-semibold text-[#042524] shadow-md shadow-cyan-500/20 transition"
                >
                  Let&apos;s talk
                  <span aria-hidden>→</span>
                </motion.button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Terminal launcher */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={openTerminal}
            aria-label="Open terminal"
            title="Open terminal (`)"
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-teal-700 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:border-teal-500/40 hover:text-teal-800 dark:border-white/10 dark:bg-[#0d1b1e]/90 dark:text-teal-300 dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] dark:hover:border-teal-400/40 dark:hover:text-teal-200"
          >
            <TerminalSquare className="h-5 w-5" />
          </motion.button>
        </div>
    </div>
  );
}
