"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site";
import { cn, scrollToSection } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(siteConfig.navItems[0]?.href ?? "#home");

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

  return (
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
          className="group flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-indigo-500/30">
            {siteConfig.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="hidden sm:inline">utkarsh.dev</span>
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

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="glass rounded-full p-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-zinc-200/60 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/90 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {siteConfig.navItems.map((item) => {
                const isActive = activeId === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-500/10 text-indigo-500"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="my-4 h-px bg-zinc-200/70 dark:bg-zinc-800" />

            <div className="mb-4 flex items-center justify-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition dark:text-zinc-300",
                    hoverClass
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={siteConfig.gmailCompose}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30"
              >
                Hire Me
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-semibold dark:border-zinc-700"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
