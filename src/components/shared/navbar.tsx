"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site";
import { cn, scrollToSection } from "@/lib/utils";

const socialLinks = [
  {
    href: siteConfig.socialLinks.github,
    icon: FaGithub,
    label: "GitHub",
    hoverClass: "hover:text-zinc-900 dark:hover:text-white",
  },
  {
    href: siteConfig.socialLinks.linkedin,
    icon: FaLinkedin,
    label: "LinkedIn",
    hoverClass: "hover:text-[#0A66C2]",
  },
  {
    href: siteConfig.socialLinks.leetcode,
    icon: SiLeetcode,
    label: "LeetCode",
    hoverClass: "hover:text-[#FFA116]",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(siteConfig.navItems[0]?.href ?? "#home");

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Lock page scroll while drawer is open (especially iOS). */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = siteConfig.navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) setActiveId(`#${top.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    scrollToSection(href);
    setActiveId(href);
    setOpen(false);
  };

  const drawerLayer =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <>
            {/* Backdrop — portaled so `fixed` is viewport-relative (not Framer-transform parent) */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.div
              key="nav-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[110] flex w-[min(18rem,85vw)] flex-col border-l border-zinc-200/80 bg-white/95 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/95"
              style={{ paddingRight: "env(safe-area-inset-right)" }}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-zinc-200/70 px-5 py-4 dark:border-zinc-800/70">
                <span className="font-pixel text-[10px] tracking-[0.28em] text-zinc-500">
                  NAVIGATE
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700 dark:hover:border-indigo-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
                {siteConfig.navItems.map((item, i) => {
                  const isActive = activeId === item.href;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.22 }}
                      onClick={() => handleNav(item.href)}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-left font-display text-lg font-semibold tracking-tight transition",
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-zinc-700 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="drawer-pill"
                          className="absolute inset-0 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20"
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                      {isActive && (
                        <span className="relative ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mx-5 h-px bg-zinc-200/70 dark:bg-zinc-800" />

              <div className="flex items-center justify-center gap-2.5 px-5 py-4">
                {socialLinks.map(({ href, icon: Icon, label, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "glass flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition dark:text-zinc-400",
                      hoverClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                <a
                  href={siteConfig.gmailCompose}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:opacity-90"
                >
                  Hire Me
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-zinc-950/60 border-b border-zinc-200/70 dark:border-zinc-800/80"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <button
          onClick={() => handleNav("#home")}
          className="group flex shrink-0 items-center gap-2"
        >
          <span className="font-pixel text-sm tracking-tight text-zinc-900 transition group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
            utkarsh.exe
          </span>
        </button>

        {/* Center: Nav pill */}
        <div className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = activeId === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                  isActive
                    ? "text-foreground"
                    : "text-zinc-600 hover:text-foreground dark:text-zinc-400"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-indigo-500/15 ring-1 ring-indigo-500/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: socials + actions */}
        <div className="flex items-center gap-2">
          {/* Social icons — desktop only */}
          <div className="hidden items-center gap-1.5 md:flex">
            {socialLinks.map(({ href, icon: Icon, label, hoverClass }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "glass flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:-translate-y-0.5 dark:text-zinc-300",
                  hoverClass
                )}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Hire Me — opens Gmail compose with your email prefilled */}
          <a
            href={siteConfig.gmailCompose}
            target="_blank"
            rel="noreferrer"
            aria-label="Hire me — opens Gmail compose"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.03] hover:shadow-indigo-500/50 sm:inline-flex"
          >
            Hire Me
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Resume download */}
          <a
            href={siteConfig.resumeUrl}
            download
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume"
            className="hidden items-center gap-1.5 rounded-full border border-zinc-300/70 px-4 py-2 text-sm font-semibold transition hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>

          {/* Nav drawer trigger — always visible on the right */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="glass flex h-11 w-11 items-center justify-center rounded-full"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </motion.header>
    {drawerLayer}
    </>
  );
}
