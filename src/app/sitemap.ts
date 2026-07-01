import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cie.mlrit.ac.in";
  const now = new Date();

  const routes = [
    { url: "/",           priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: "/about",      priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/events",     priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: "/gallery",    priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/council",    priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/facilities", priority: 0.6,  changeFrequency: "yearly"  as const },
    { url: "/studios",    priority: 0.6,  changeFrequency: "yearly"  as const },
    { url: "/alumni",     priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/contact",    priority: 0.6,  changeFrequency: "yearly"  as const },
    { url: "/join",       priority: 0.8,  changeFrequency: "monthly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
