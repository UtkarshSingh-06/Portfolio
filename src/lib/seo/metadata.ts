import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl, siteSeo } from "@/lib/seo/site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  /** Absolute or site-relative image path for OG/Twitter */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  keywords?: string[];
};

function resolveImage(image?: string): string {
  if (!image) return absoluteUrl("/opengraph-image");
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image);
}

/**
 * Builds consistent Metadata for any public page (canonical, robots, OG, Twitter).
 */
export function buildMetadata({
  title,
  description = siteSeo.description,
  path = "/",
  image,
  imageAlt = `${siteSeo.name} — portfolio preview`,
  type = "website",
  noIndex = false,
  keywords = [...siteSeo.keywords],
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = resolveImage(image);
  const pageTitle = title ?? siteSeo.title;

  return {
    title: title ? title : { absolute: siteSeo.title },
    description,
    keywords,
    authors: [{ name: siteSeo.name, url: getSiteUrl() }],
    creator: siteSeo.name,
    publisher: siteSeo.name,
    category: "technology",
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteSeo.name,
      locale: siteSeo.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
      creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || undefined,
    },
  };
}

/** Search Console / Bing / other verification tokens from env (never hardcode secrets). */
export function buildVerification(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim();

  if (!google && !bing && !yandex) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing
      ? {
          other: {
            "msvalidate.01": bing,
          },
        }
      : {}),
  };
}
