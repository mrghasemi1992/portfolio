import type { MetadataRoute } from "next";

import { SITE_URL, projects } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
