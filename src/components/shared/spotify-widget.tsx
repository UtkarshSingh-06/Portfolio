"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SpotifyData {
  isPlaying: boolean;
  configured: boolean;
  title?: string;
  artist?: string;
  albumArt?: string | null;
  trackUrl?: string;
}

function EqualizerBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="inline-block w-[3px] rounded-sm bg-[#1DB954]"
          style={
            isPlaying
              ? {
                  animation: `eq-bounce ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                  height: `${8 + i * 3}px`,
                }
              : { height: "4px" }
          }
        />
      ))}
    </span>
  );
}

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSpotify() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("fetch failed");
        const json = await res.json() as SpotifyData;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ isPlaying: false, configured: false });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white/50 px-3 py-2.5 dark:border-zinc-700/50 dark:bg-zinc-800/40">
        <span className="h-8 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex flex-col gap-1">
          <span className="h-2 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <span className="h-2 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    );
  }

  if (!data?.configured) {
    return null;
  }

  const { isPlaying, title, artist, albumArt, trackUrl } = data;

  return (
    <>
      <style>{`
        @keyframes eq-bounce {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      <a
        href={trackUrl ?? "https://open.spotify.com"}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white/50 px-3 py-2.5 transition hover:border-[#1DB954]/40 hover:bg-[#1DB954]/5 dark:border-zinc-700/50 dark:bg-zinc-800/40 dark:hover:border-[#1DB954]/40"
      >
        {/* Spotify logo */}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-[#1DB954]"
          aria-hidden="true"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.316a.747.747 0 0 1-1.029.249c-2.818-1.722-6.365-2.112-10.542-1.157a.748.748 0 0 1-.333-1.459c4.571-1.045 8.492-.595 11.655 1.338a.747.747 0 0 1 .249 1.029zm1.472-3.27a.936.936 0 0 1-1.288.308c-3.225-1.981-8.141-2.557-11.956-1.399a.937.937 0 0 1-.581-1.782c4.361-1.342 9.782-.692 13.517 1.585a.936.936 0 0 1 .308 1.288zm.126-3.404C15.422 8.457 9.1 8.247 5.698 9.27a1.122 1.122 0 1 1-.651-2.147c3.93-1.191 10.468-.961 14.595 1.594a1.123 1.123 0 0 1-1.528 1.925z" />
        </svg>

        {/* Album art */}
        {albumArt ? (
          <Image
            src={albumArt}
            alt={`${title} album art`}
            width={36}
            height={36}
            className="shrink-0 rounded"
          />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-zinc-200 dark:bg-zinc-700">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-zinc-400" aria-hidden="true">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </span>
        )}

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[8px] tracking-widest text-zinc-400 dark:text-zinc-500">
            {isPlaying ? "NOW PLAYING" : "RECENTLY PLAYED"}
          </p>
          <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-100">
            {title ?? "—"}
          </p>
          <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
            {artist ?? "—"}
          </p>
        </div>

        <EqualizerBars isPlaying={isPlaying} />
      </a>
    </>
  );
}
