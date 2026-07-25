import { experiences, projects, siteConfig, type Project } from "@/data/site";
import { absoluteUrl, getSiteUrl, siteSeo } from "@/lib/seo/site";
import { getProjectPath } from "@/lib/seo/projects";

type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  const sameAs = [
    siteConfig.socialLinks.github,
    siteConfig.socialLinks.linkedin,
    siteConfig.socialLinks.leetcode,
  ].filter(Boolean);

  return {
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteConfig.name,
    url: getSiteUrl(),
    image: absoluteUrl("/opengraph-image"),
    jobTitle: "Full-Stack Developer & SDE Intern",
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Manipal University Jaipur",
      url: "https://jaipur.manipal.edu/",
    },
    worksFor: {
      "@type": "Organization",
      name: "Samsung Electro-Mechanics Bangalore (SEM-B)",
      url: "https://www.samsungelectro-mechanics.com/",
    },
    knowsAbout: [
      "Full-Stack Development",
      "Cloud Computing",
      "DevOps",
      "Artificial Intelligence",
      "React",
      "Next.js",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    sameAs,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteSeo.name,
    url: getSiteUrl(),
    description: siteSeo.description,
    inLanguage: siteSeo.language,
    publisher: { "@id": absoluteUrl("/#person") },
    author: { "@id": absoluteUrl("/#person") },
  };
}

export function profilePageJsonLd(): JsonLd {
  return {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profilepage"),
    url: getSiteUrl(),
    name: siteSeo.title,
    description: siteSeo.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#person") },
    mainEntity: { "@id": absoluteUrl("/#person") },
    inLanguage: siteSeo.language,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${items[items.length - 1]?.path ?? "/"}#breadcrumb`),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectCreativeWorkJsonLd(project: Project): JsonLd {
  const path = getProjectPath(project.slug);
  return {
    "@type": "SoftwareSourceCode",
    "@id": absoluteUrl(`${path}#project`),
    name: project.title,
    description: project.seoDescription ?? project.description,
    url: absoluteUrl(path),
    image: absoluteUrl(project.image),
    dateCreated: project.year ? `${project.year}-01-01` : undefined,
    keywords: project.tags.join(", "),
    programmingLanguage: project.tags,
    codeRepository: project.githubUrl,
    author: { "@id": absoluteUrl("/#person") },
    creator: { "@id": absoluteUrl("/#person") },
    inLanguage: siteSeo.language,
    isAccessibleForFree: true,
    ...(project.liveUrl && project.liveUrl !== project.githubUrl
      ? { discussionUrl: project.liveUrl }
      : {}),
  };
}

export function projectsItemListJsonLd(): JsonLd {
  return {
    "@type": "ItemList",
    "@id": absoluteUrl("/projects#itemlist"),
    name: "Selected projects by Utkarsh Singh",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(getProjectPath(project.slug)),
      name: project.title,
      item: { "@id": absoluteUrl(`${getProjectPath(project.slug)}#project`) },
    })),
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteSeo.name,
    url: getSiteUrl(),
    logo: absoluteUrl("/icon"),
    sameAs: [
      siteConfig.socialLinks.github,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.leetcode,
    ],
    founder: { "@id": absoluteUrl("/#person") },
  };
}

/** Full graph for the homepage (Person + WebSite + ProfilePage + projects + breadcrumbs). */
export function homeJsonLdGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      organizationJsonLd(),
      profilePageJsonLd(),
      projectsItemListJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }]),
      ...projects.map((p) => projectCreativeWorkJsonLd(p)),
      {
        "@type": "ItemList",
        name: "Professional experience",
        itemListElement: experiences.map((exp, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "OrganizationRole",
            roleName: exp.role,
            startDate: exp.period.split("–")[0]?.trim(),
            description: exp.details.join(" "),
            worksFor: {
              "@type": "Organization",
              name: exp.company,
            },
          },
        })),
      },
    ],
  };
}

export function projectsIndexJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      personJsonLd(),
      projectsItemListJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
      ...projects.map((p) => projectCreativeWorkJsonLd(p)),
    ],
  };
}

export function projectPageJsonLd(project: Project): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      personJsonLd(),
      projectCreativeWorkJsonLd(project),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.title, path: getProjectPath(project.slug) },
      ]),
    ],
  };
}
