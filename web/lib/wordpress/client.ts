import "server-only";

import sanitizeHtml from "sanitize-html";

import type { Post, Tour, TourAcf, WordPressEntity } from "@/lib/wordpress/types";

const allowedTags = [
  "a", "b", "blockquote", "br", "code", "em", "figcaption", "figure", "h2", "h3",
  "h4", "img", "li", "ol", "p", "pre", "span", "strong", "ul",
];

/** Sanitize untrusted CMS HTML before passing it to a rich-text renderer. */
export function sanitizeWordPressHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  });
}

function requiredEnv(name: "WORDPRESS_URL" | "WORDPRESS_REST_BASE" | "WORDPRESS_CUSTOM_API_BASE") {
  const value = process.env[name]?.replace(/\/$/, "");
  if (!value) {
    throw new Error(`${name} is not configured. See .env.example.`);
  }
  return value;
}

async function restFetch<T>(path: string, revalidate = 300): Promise<T> {
  const response = await fetch(`${requiredEnv("WORDPRESS_REST_BASE")}/${path.replace(/^\//, "")}`, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`WordPress REST request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

function featuredImage(entity: WordPressEntity) {
  return entity._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

function toTour(entity: WordPressEntity<TourAcf>): Tour {
  return {
    ...entity,
    featuredImageUrl: featuredImage(entity),
    sanitizedContent: sanitizeWordPressHtml(entity.content?.rendered ?? ""),
  };
}

function toPost(entity: WordPressEntity): Post {
  return {
    ...entity,
    featuredImageUrl: featuredImage(entity),
    sanitizedContent: sanitizeWordPressHtml(entity.content?.rendered ?? ""),
    sanitizedExcerpt: sanitizeWordPressHtml(entity.excerpt?.rendered ?? ""),
  };
}

export async function getTours(perPage = 12) {
  const tours = await restFetch<WordPressEntity<TourAcf>[]>(`tour_package?per_page=${perPage}&_embed`);
  return tours.map(toTour);
}

export async function getTourById(id: string | number) {
  const tour = await restFetch<WordPressEntity<TourAcf>>(`tour_package/${id}?_embed`);
  return toTour(tour);
}

export async function getPosts(perPage = 12) {
  const posts = await restFetch<WordPressEntity[]>(`posts?per_page=${perPage}&_embed`);
  return posts.map(toPost);
}

export async function getPostById(id: string | number) {
  const post = await restFetch<WordPressEntity>(`posts/${id}?_embed`);
  return toPost(post);
}

export function getCustomApiBase() {
  return requiredEnv("WORDPRESS_CUSTOM_API_BASE");
}

export function getWordPressUrl() {
  return requiredEnv("WORDPRESS_URL");
}
