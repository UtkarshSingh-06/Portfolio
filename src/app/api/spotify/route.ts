import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  trackUrl: string;
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return null;
    const data = await res.json() as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

async function getNowPlaying(accessToken: string): Promise<SpotifyTrack | null> {
  try {
    const res = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(5000),
    });

    if (res.status === 204 || res.status > 400) return null;

    const data = await res.json() as {
      is_playing?: boolean;
      item?: {
        name?: string;
        artists?: { name: string }[];
        album?: { images?: { url: string }[] };
        external_urls?: { spotify?: string };
      };
    };

    if (!data.item) return null;

    return {
      isPlaying: data.is_playing ?? false,
      title: data.item.name ?? "Unknown",
      artist: data.item.artists?.map((a) => a.name).join(", ") ?? "Unknown",
      albumArt: data.item.album?.images?.[0]?.url ?? null,
      trackUrl: data.item.external_urls?.spotify ?? "https://open.spotify.com",
    };
  } catch {
    return null;
  }
}

async function getRecentlyPlayed(accessToken: string): Promise<SpotifyTrack | null> {
  try {
    const res = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return null;

    const data = await res.json() as {
      items?: {
        track?: {
          name?: string;
          artists?: { name: string }[];
          album?: { images?: { url: string }[] };
          external_urls?: { spotify?: string };
        };
      }[];
    };

    const track = data.items?.[0]?.track;
    if (!track) return null;

    return {
      isPlaying: false,
      title: track.name ?? "Unknown",
      artist: track.artists?.map((a) => a.name).join(", ") ?? "Unknown",
      albumArt: track.album?.images?.[0]?.url ?? null,
      trackUrl: track.external_urls?.spotify ?? "https://open.spotify.com",
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ isPlaying: false, configured: false });
  }

  const nowPlaying = await getNowPlaying(accessToken);

  if (nowPlaying) {
    return NextResponse.json({ ...nowPlaying, configured: true });
  }

  const recent = await getRecentlyPlayed(accessToken);

  if (recent) {
    return NextResponse.json({ ...recent, configured: true });
  }

  return NextResponse.json({ isPlaying: false, configured: true });
}
