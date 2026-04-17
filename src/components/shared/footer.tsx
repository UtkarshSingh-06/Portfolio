import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/data/site";

export function Footer() {
  const socials = [
    { href: siteConfig.socialLinks.github, icon: FaGithub, label: "GitHub" },
    { href: siteConfig.socialLinks.linkedin, icon: FaLinkedin, label: "LinkedIn" },
    { href: siteConfig.socialLinks.email, icon: Mail, label: "Email" },
  ];

  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-zinc-800/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="text-sm text-zinc-500">
            Built with Next.js, Tailwind CSS & Framer Motion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="rounded-full border border-zinc-200/70 p-2.5 transition hover:-translate-y-1 hover:text-indigo-500 dark:border-zinc-700"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
