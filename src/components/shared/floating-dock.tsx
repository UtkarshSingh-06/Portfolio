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
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      <div className="pointer-events-auto flex flex-col items-start gap-3">
          <AnimatePresence>
            {showCard ? (
              <motion.div
                key="hire-card"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b1e]/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md"
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
                  className="absolute right-2 top-2 rounded-md p-1 text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                {/* Availability pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available for hire
                </div>

                <div className="mt-3 text-base font-semibold text-zinc-100">
                  Open to opportunities
                </div>
                <div className="mt-1 text-xs text-zinc-400">
                  Full Stack · Cloud · DevOps
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={goToContact}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 px-4 py-2.5 text-sm font-semibold text-[#042524] shadow-lg shadow-cyan-500/20 transition"
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
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0d1b1e]/90 text-teal-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition hover:border-teal-400/40 hover:text-teal-200"
          >
            <TerminalSquare className="h-5 w-5" />
          </motion.button>
        </div>
    </div>
  );
}
