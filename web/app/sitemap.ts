import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "tours", priority: 0.9, changeFrequency: "daily" as const },
    { path: "blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "terra-mare-tour", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "destination-wedding", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "wedding-planner", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "gruppi-a-tema", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "viaggi-atipici", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "crociere", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "viaggi-di-nozze", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "percorsi-lingua-italiana", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "turismo-radici", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "storia-visione", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "team", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "partner", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "lavora-con-noi", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "contatti", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "prenota", priority: 0.9, changeFrequency: "daily" as const },
  ];

  return routes.map((route) => ({
    url: new URL(route.path, base).toString(),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
