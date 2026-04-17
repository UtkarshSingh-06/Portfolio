"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  certifications,
  projects,
  siteConfig,
  skills,
} from "@/data/site";

const USER = "utkarsh";
const HOST = "portfolio";
const PROMPT = `${USER}@${HOST} :~$`;

type Entry = {
  id: number;
  input: string;
  output: ReactNode;
};

type CommandDef = {
  name: string;
  summary: string;
  run: (ctx: CommandContext) => ReactNode | "__clear__" | "__exit__";
};

type CommandContext = {
  args: string[];
  close: () => void;
  clear: () => void;
};

function Line({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <div className={muted ? "text-zinc-500" : "text-zinc-200"}>{children}</div>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-teal-300">{children}</span>;
}

function Key({ children }: { children: ReactNode }) {
  return <span className="text-emerald-300">{children}</span>;
}

function ExtLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="text-cyan-300 underline decoration-dotted underline-offset-4 hover:text-cyan-200"
    >
      {children}
    </a>
  );
}

export function TerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);
  const clear = useCallback(() => setEntries([]), []);

  const commands: Record<string, CommandDef> = useMemo(
    () => ({
      help: {
        name: "help",
        summary: "list available commands",
        run: () => <HelpOutput />,
      },
      whoami: {
        name: "whoami",
        summary: "who is this guy?",
        run: () => (
          <div className="space-y-1">
            <Line>
              Hi, I&apos;m <Accent>{siteConfig.name}</Accent> — {siteConfig.title}.
            </Line>
            <Line muted>{siteConfig.description}</Line>
            <Line>
              Based in <Accent>{siteConfig.location}</Accent>.
            </Line>
          </div>
        ),
      },
      skills: {
        name: "skills",
        summary: "tech stack overview",
        run: () => <SkillsOutput />,
      },
      projects: {
        name: "projects",
        summary: "list all projects",
        run: () => <ProjectsOutput />,
      },
      contact: {
        name: "contact",
        summary: "get in touch",
        run: () => (
          <div className="space-y-1">
            <Line>
              <Accent>email</Accent>   :{" "}
              <ExtLink href={siteConfig.socialLinks.email}>
                {siteConfig.email}
              </ExtLink>
            </Line>
            <Line>
              <Accent>phone</Accent>   :{" "}
              <ExtLink
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              >
                {siteConfig.phone}
              </ExtLink>
            </Line>
            <Line>
              <Accent>where</Accent>   : {siteConfig.location}
            </Line>
            <Line muted>
              Tip: run <Key>hire</Key> to open my inbox with a draft.
            </Line>
          </div>
        ),
      },
      leetcode: {
        name: "leetcode",
        summary: "CP stats",
        run: () => (
          <div className="space-y-1">
            <Line>
              <Accent>handle</Accent>  : Utkarsh-Singh06
            </Line>
            <Line>
              <Accent>profile</Accent> :{" "}
              <ExtLink href={siteConfig.socialLinks.leetcode}>
                leetcode.com/u/Utkarsh-Singh06
              </ExtLink>
            </Line>
            <Line muted>
              Opening profile in a new tab...
            </Line>
          </div>
        ),
      },
      hire: {
        name: "hire",
        summary: "why you should hire me",
        run: () => <HireOutput />,
      },
      socials: {
        name: "socials",
        summary: "all my links",
        run: () => (
          <div className="space-y-1">
            <Line>
              <Accent>github</Accent>    :{" "}
              <ExtLink href={siteConfig.socialLinks.github}>
                github.com/UtkarshSingh-06
              </ExtLink>
            </Line>
            <Line>
              <Accent>linkedin</Accent>  :{" "}
              <ExtLink href={siteConfig.socialLinks.linkedin}>
                linkedin.com/in/utkarsh-singh06
              </ExtLink>
            </Line>
            <Line>
              <Accent>leetcode</Accent>  :{" "}
              <ExtLink href={siteConfig.socialLinks.leetcode}>
                leetcode.com/u/Utkarsh-Singh06
              </ExtLink>
            </Line>
            <Line>
              <Accent>email</Accent>     :{" "}
              <ExtLink href={siteConfig.socialLinks.email}>
                {siteConfig.email}
              </ExtLink>
            </Line>
          </div>
        ),
      },
      resume: {
        name: "resume",
        summary: "download my resume",
        run: () => (
          <div className="space-y-1">
            <Line>
              <Accent>resume</Accent> :{" "}
              <ExtLink href={siteConfig.resumeUrl}>UTKARSHRESUME.pdf</ExtLink>
            </Line>
            <Line muted>Opening resume in a new tab...</Line>
          </div>
        ),
      },
      clear: {
        name: "clear",
        summary: "clear terminal",
        run: () => "__clear__",
      },
      exit: {
        name: "exit",
        summary: "close terminal",
        run: () => "__exit__",
      },
    }),
    []
  );

  // Global key listener — backtick opens, Escape closes.
  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "`" && !isTyping) {
        event.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("portfolio:open-terminal", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portfolio:open-terminal", onOpenEvent);
    };
  }, [open]);

  // Autofocus + lock background scroll when opened.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Auto-scroll to bottom on new entries.
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [entries, open]);

  function execute(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = commands[name.toLowerCase()];

    const id = ++idRef.current;

    if (!cmd) {
      setEntries((e) => [
        ...e,
        {
          id,
          input: trimmed,
          output: (
            <Line>
              <span className="text-rose-400">command not found:</span> {name}
              <div className="text-zinc-500">
                Type <Key>help</Key> to see available commands.
              </div>
            </Line>
          ),
        },
      ]);
      return;
    }

    const result = cmd.run({ args, close, clear });

    if (result === "__clear__") {
      setEntries([]);
      return;
    }

    if (result === "__exit__") {
      setEntries((e) => [
        ...e,
        { id, input: trimmed, output: <Line muted>Goodbye. 👋</Line> },
      ]);
      setTimeout(() => setOpen(false), 180);
      return;
    }

    // Side effects for certain commands.
    if (typeof window !== "undefined") {
      if (name.toLowerCase() === "leetcode") {
        window.open(siteConfig.socialLinks.leetcode, "_blank", "noreferrer");
      } else if (name.toLowerCase() === "resume") {
        window.open(siteConfig.resumeUrl, "_blank", "noreferrer");
      } else if (name.toLowerCase() === "hire") {
        window.open(siteConfig.gmailCompose, "_blank", "noreferrer");
      }
    }

    setEntries((e) => [...e, { id, input: trimmed, output: result }]);
  }

  function onSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = input;
      if (value.trim()) {
        setHistory((h) => [...h, value]);
      }
      setHistoryIndex(null);
      execute(value);
      setInput("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const prefix = input.trim().toLowerCase();
      if (!prefix) return;
      const match = Object.keys(commands).find((c) => c.startsWith(prefix));
      if (match) setInput(match);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/70 p-4 pt-20 backdrop-blur-sm sm:pt-28"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio terminal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            key="terminal-window"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[min(92vw,780px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1315] font-mono text-[13px] text-zinc-200 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-[#101b1d] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <TrafficLight color="bg-[#ff5f56]" hover="hover:bg-[#ff5f56]/80" onClick={() => setOpen(false)} />
                <TrafficLight color="bg-[#ffbd2e]" hover="hover:bg-[#ffbd2e]/80" />
                <TrafficLight color="bg-[#27c93f]" hover="hover:bg-[#27c93f]/80" />
              </div>
              <div className="text-[12px] font-medium text-zinc-400">
                {USER}@{HOST}: ~
              </div>
              <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                <span className="hidden sm:inline">ESC to close</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="rounded p-1 transition hover:bg-white/10 hover:text-zinc-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="max-h-[60vh] overflow-y-auto px-4 pb-3 pt-4 leading-6"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="mb-3 text-teal-300">
                {siteConfig.firstName}&apos;s Portfolio Terminal v1.0.0
              </div>
              <div className="mb-3 text-zinc-400">
                Type <Key>help</Key> to see available commands.
              </div>

              {entries.map((entry) => (
                <div key={entry.id} className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="shrink-0 text-teal-300">{PROMPT}</span>
                    <span className="break-words">{entry.input}</span>
                  </div>
                  <div className="mt-1">{entry.output}</div>
                </div>
              ))}

              {/* Active prompt */}
              <div className="flex items-baseline gap-2">
                <span className="shrink-0 text-teal-300">{PROMPT}</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onSubmit}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    aria-label="Terminal input"
                    className="w-full border-0 bg-transparent p-0 text-zinc-200 caret-emerald-300 outline-none placeholder:text-zinc-600"
                    placeholder="type a command…"
                  />
                </div>
                <span
                  aria-hidden
                  className="ml-1 inline-block h-[14px] w-[7px] bg-emerald-300"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TrafficLight({
  color,
  hover,
  onClick,
}: {
  color: string;
  hover: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      tabIndex={-1}
      aria-hidden
      className={`h-3 w-3 rounded-full border border-black/20 ${color} transition ${hover}`}
    />
  );
}

function HelpOutput() {
  const list: Array<{ name: string; desc: string }> = [
    { name: "whoami", desc: "who is this guy?" },
    { name: "skills", desc: "tech stack overview" },
    { name: "projects", desc: "list all projects" },
    { name: "contact", desc: "get in touch" },
    { name: "leetcode", desc: "CP stats" },
    { name: "hire", desc: "why you should hire me" },
    { name: "socials", desc: "all my links" },
    { name: "resume", desc: "download my resume" },
    { name: "clear", desc: "clear terminal" },
    { name: "exit", desc: "close terminal" },
  ];
  return (
    <div>
      <Line>
        <Accent>Available commands:</Accent>
      </Line>
      <div className="mt-1 ml-4 grid grid-cols-[auto_auto_1fr] gap-x-3 text-zinc-300">
        {list.map((c) => (
          <div key={c.name} className="contents">
            <span className="text-emerald-300">{c.name}</span>
            <span className="text-zinc-600">—</span>
            <span className="text-zinc-400">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsOutput() {
  const categories: Array<{ key: "frontend" | "backend" | "tools"; label: string }> = [
    { key: "frontend", label: "frontend" },
    { key: "backend", label: "backend" },
    { key: "tools", label: "devops / tools" },
  ];
  return (
    <div className="space-y-1">
      {categories.map((cat) => {
        const items = skills.filter((s) => s.category === cat.key);
        return (
          <Line key={cat.key}>
            <Accent>{cat.label.padEnd(14, " ")}</Accent>:{" "}
            <span className="text-zinc-300">
              {items.map((s) => s.name).join(", ")}
            </span>
          </Line>
        );
      })}
    </div>
  );
}

function ProjectsOutput() {
  return (
    <div className="space-y-2">
      {projects.map((p, i) => (
        <div key={p.title}>
          <Line>
            <span className="text-zinc-500">{String(i + 1).padStart(2, "0")}.</span>{" "}
            <Accent>{p.title}</Accent>{" "}
            {p.year ? <span className="text-zinc-500">({p.year})</span> : null}
          </Line>
          <Line muted>
            <span className="ml-6 block">{p.description}</span>
          </Line>
          <Line>
            <span className="ml-6 block text-zinc-400">
              tags: <span className="text-teal-300">{p.tags.join(" · ")}</span>
            </span>
          </Line>
        </div>
      ))}
    </div>
  );
}

function HireOutput() {
  return (
    <div className="space-y-1">
      <Line>
        <Accent>why {siteConfig.firstName}?</Accent>
      </Line>
      <Line muted>
        <span className="ml-4 block">
          → Ships production-grade full-stack apps (10K+ DAU at CampusAdda).
        </span>
      </Line>
      <Line muted>
        <span className="ml-4 block">
          → Strong in React/Next.js, Node, Python/FastAPI, AWS &amp; Docker.
        </span>
      </Line>
      <Line muted>
        <span className="ml-4 block">
          → AWS Certified (SAA-C03) · open-source contributor (GSSoC &apos;25).
        </span>
      </Line>
      <Line muted>
        <span className="ml-4 block">
          → {certifications.length}+ certifications and counting.
        </span>
      </Line>
      <Line>
        <span className="text-zinc-400">
          Opening Gmail compose with a draft...
        </span>
      </Line>
      <Line>
        <ExtLink href={siteConfig.gmailCompose}>
          → Start a conversation now
        </ExtLink>
      </Line>
    </div>
  );
}
