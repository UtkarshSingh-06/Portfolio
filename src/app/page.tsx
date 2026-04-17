"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";

// Heavy visual effects are client-only and lazy-loaded
// to keep first paint fast and avoid SSR mismatch.
const ParticleBackground = dynamic(
  () => import("@/components/effects/particle-background").then((mod) => mod.ParticleBackground),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/effects/custom-cursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/effects/scroll-progress").then((mod) => mod.ScrollProgress),
  { ssr: false }
);
const TerminalOverlay = dynamic(
  () => import("@/components/shared/terminal-overlay").then((mod) => mod.TerminalOverlay),
  { ssr: false }
);
const FloatingDock = dynamic(
  () => import("@/components/shared/floating-dock").then((mod) => mod.FloatingDock),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <ScrollProgress />
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingDock />
      <TerminalOverlay />
    </div>
  );
}
