import "server-only";

import sanitizeHtml from "sanitize-html";
import type { Metadata } from "next";

import type {
  BookingFormData,
  ContactFormData,
  FAQItem,
  GiftVoucherFormData,
  GroupFormData,
  Post,
  RootsFormData,
  Tour,
  TourAcf,
  WeddingFormData,
  WordPressEntity,
  WordPressTerm,
} from "@/lib/wordpress/types";

const allowedTags = [
  "a", "b", "blockquote", "br", "code", "details", "div", "em", "figcaption", "figure",
  "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "ol", "p", "pre",
  "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td",
  "th", "thead", "tr", "ul",
];

/** Sanitize untrusted CMS HTML before passing it to a rich-text renderer. */
export function sanitizeWordPressHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading", "srcset", "sizes"],
      details: ["open"],
      "*": ["class", "id"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  });
}

export function getWordPressUrl(): string {
  return (process.env.WORDPRESS_URL || "https://staging.incantour.it/wordpress").replace(/\/$/, "");
}

export function getWordPressRestBase(): string {
  return (process.env.WORDPRESS_REST_BASE || `${getWordPressUrl()}/wp-json/wp/v2`).replace(/\/$/, "");
}

export function getCustomApiBase(): string {
  return (process.env.WORDPRESS_CUSTOM_API_BASE || `${getWordPressUrl()}/wp-json/tourism/v1`).replace(/\/$/, "");
}

export function getIncantourApiBase(): string {
  return `${getWordPressUrl()}/wp-json/incantour/v1`;
}

async function restFetch<T>(path: string, revalidate = 300): Promise<T> {
  const url = `${getWordPressRestBase()}/${path.replace(/^\//, "")}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`WordPress REST request failed (${response.status}) at ${url}`);
  }

  return response.json() as Promise<T>;
}

function featuredImage(entity: WordPressEntity): string | undefined {
  return entity._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

function extractTerms(entity: WordPressEntity): WordPressTerm[] {
  if (!entity._embedded?.["wp:term"]) return [];
  return entity._embedded["wp:term"].flat();
}

function toTour(entity: WordPressEntity<TourAcf>): Tour {
  return {
    ...entity,
    featuredImageUrl: featuredImage(entity),
    sanitizedContent: sanitizeWordPressHtml(entity.content?.rendered ?? ""),
    terms: extractTerms(entity),
  };
}

function toPost(entity: WordPressEntity): Post {
  return {
    ...entity,
    featuredImageUrl: featuredImage(entity),
    sanitizedContent: sanitizeWordPressHtml(entity.content?.rendered ?? ""),
    sanitizedExcerpt: sanitizeWordPressHtml(entity.excerpt?.rendered ?? ""),
    terms: extractTerms(entity),
  };
}

/* -------------------------------------------------------------------------- */
/*                                    TOURS                                   */
/* -------------------------------------------------------------------------- */

export async function getTours(perPage = 12): Promise<Tour[]> {
  const tours = await restFetch<WordPressEntity<TourAcf>[]>(`tour_package?per_page=${perPage}&_embed`);
  return tours.map(toTour);
}

export async function getTourById(id: string | number): Promise<Tour> {
  const tour = await restFetch<WordPressEntity<TourAcf>>(`tour_package/${id}?_embed`);
  return toTour(tour);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const tours = await restFetch<WordPressEntity<TourAcf>[]>(`tour_package?slug=${encodeURIComponent(slug)}&_embed`);
    if (tours.length > 0 && tours[0]) {
      return toTour(tours[0]);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching tour by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch a tour by slug or numeric ID with graceful fallback.
 * Checks if the identifier is numeric first, then tries slug.
 */
export async function getTour(slugOrId: string | number): Promise<Tour | null> {
  const isNumeric = typeof slugOrId === "number" || /^\d+$/.test(String(slugOrId).trim());
  if (isNumeric) {
    try {
      return await getTourById(slugOrId);
    } catch {
      // Fallback to checking slug in case of unexpected numeric slug
    }
  }

  // Try by slug
  const tourBySlug = await getTourBySlug(String(slugOrId));
  if (tourBySlug) return tourBySlug;

  // As a last attempt, try as ID if not already tried
  if (!isNumeric) {
    try {
      return await getTourById(slugOrId);
    } catch {
      return null;
    }
  }

  return null;
}

export async function getRelatedPackages(limit = 3): Promise<Tour[]> {
  try {
    const packages = await restFetch<WordPressEntity<TourAcf>[]>(`tour_package?per_page=${limit}&_embed`);
    return packages.map(toTour);
  } catch (error) {
    console.error("Error fetching related packages:", error);
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */

export async function getPosts(perPage = 12, page = 1): Promise<Post[]> {
  const posts = await restFetch<WordPressEntity[]>(`posts?per_page=${perPage}&page=${page}&_embed`);
  return posts.map(toPost);
}

export async function getPostById(id: string | number): Promise<Post> {
  const post = await restFetch<WordPressEntity>(`posts/${id}?_embed`);
  return toPost(post);
}

export type RelatedPostsResult = {
  posts: Post[];
  hasExactMatch: boolean;
};

export async function getRelatedPosts(
  tags: string | string[],
  limit = 3
): Promise<RelatedPostsResult> {
  try {
    const posts = await restFetch<WordPressEntity[]>("posts?per_page=12&_embed");
    const searchTags = (Array.isArray(tags) ? tags : tags.split(","))
      .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
      .filter(Boolean);

    if (searchTags.length === 0) {
      // No tags provided: return random 3 posts with hasExactMatch false
      const shuffled = [...posts].sort(() => 0.5 - Math.random());
      return {
        posts: shuffled.slice(0, limit).map(toPost),
        hasExactMatch: false,
      };
    }

    const filtered = posts.filter((post) => {
      const terms = post._embedded?.["wp:term"]?.flat() || [];
      return terms.some((term) => {
        const termName = term.name?.toLowerCase() || "";
        const termSlug = term.slug?.toLowerCase() || "";
        return searchTags.some((cleanTag) => termName.includes(cleanTag) || termSlug.includes(cleanTag));
      });
    });

    if (filtered.length > 0) {
      return {
        posts: filtered.slice(0, limit).map(toPost),
        hasExactMatch: true,
      };
    }

    // No matching tags found: return random 3 posts with hasExactMatch false
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return {
      posts: shuffled.slice(0, limit).map(toPost),
      hasExactMatch: false,
    };
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return {
      posts: [],
      hasExactMatch: false,
    };
  }
}


/* -------------------------------------------------------------------------- */
/*                                    FAQS                                    */
/* -------------------------------------------------------------------------- */

const fallbackFAQs: FAQItem[] = [
  {
    id: 192,
    category: "Generale",
    question: "Che cos'è il Turismo delle Radici e come funziona il servizio Incantour?",
    answer:
      "<p>Il Turismo delle Radici è un viaggio emozionale dedicato a chi desidera ricostruire il legame con la propria cultura d'origine. Incantour vi accompagna nella ricerca genealogica, nella riscoperta della storia del cognome e nell'organizzazione di incontri con la comunità del borgo natio dei vostri antenati in Campania e in Italia.</p>",
  },
  {
    id: 193,
    category: "Generale",
    question: "Come posso prenotare un tour o richiedere un preventivo?",
    answer:
      "<p>Puoi compilare il form di prenotazione presente nella pagina del tour desiderato o nella sezione Contatti. Il nostro team elaborerà la richiesta e ti ricontatterà entro 24 ore.</p>",
  },
  {
    id: 194,
    category: "Generale",
    question: "Dove si trova la sede di Incantour e quali sono le indicazioni per raggiungervi?",
    answer:
      "<p>Siamo nel Centro Storico di Napoli, al 3° piano dello storico Palazzo Pignatelli di Monteleone (XVI secolo), in Calata Trinità Maggiore 53 (angolo Piazza del Gesù Nuovo, all'interno della Maison Degas). Siamo raggiungibili con la Metropolitana Linea 1 (fermata Dante) o in autobus (linea R2 o R1).</p>",
  },
];

export async function getFaqs(): Promise<FAQItem[]> {
  try {
    const url = `${getIncantourApiBase()}/faqs`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return fallbackFAQs;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackFAQs;
  } catch (error) {
    console.warn("Unable to fetch remote FAQs, using fallback FAQs", error);
    return fallbackFAQs;
  }
}

/* -------------------------------------------------------------------------- */
/*                               SEO EXTRACTION                               */
/* -------------------------------------------------------------------------- */

export function extractEntityMetadata(entity: WordPressEntity, defaultTitle = "IncanTour"): Metadata {
  const yoast = entity.yoast_head_json;
  const rawTitle = entity.title?.rendered ? sanitizeHtml(entity.title.rendered, { allowedTags: [] }) : "";
  const title = yoast?.title || (rawTitle ? `${rawTitle} | IncanTour` : defaultTitle);
  const rawExcerpt = entity.excerpt?.rendered ? sanitizeHtml(entity.excerpt.rendered, { allowedTags: [] }).trim() : "";
  const description = yoast?.description || yoast?.og_description || rawExcerpt || "Scopri itinerari esclusivi ed esperienze uniche con IncanTour.";
  const featured = featuredImage(entity);
  const ogImageUrl = yoast?.og_image?.[0]?.url || featured;

  return {
    title,
    description,
    openGraph: {
      title: yoast?.og_title || title,
      description,
      type: (yoast?.og_type as "article" | "website") || "website",
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    alternates: yoast?.canonical ? { canonical: yoast.canonical } : undefined,
  };
}

/* -------------------------------------------------------------------------- */
/*                               FORM SUBMISSIONS                             */
/* -------------------------------------------------------------------------- */

export async function submitBooking(data: BookingFormData) {
  const url = `${getCustomApiBase()}/submit-booking`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      tour: data.tour,
      date: data.date,
      quantity: data.quantity,
      total: String(data.total).replace(/[^0-9.]/g, ""),
      message: data.message || "",
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(errorJson.message || `Booking failed (${response.status})`);
  }
  return response.json();
}

export async function submitGiftVoucher(data: GiftVoucherFormData) {
  const url = `${getCustomApiBase()}/submit-gift-voucher`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(errorJson.message || `Gift voucher request failed (${response.status})`);
  }
  return response.json();
}

export async function submitContact(data: ContactFormData) {
  const primaryUrl = `${getIncantourApiBase()}/contact-request`;
  const fallbackUrl = `${getIncantourApiBase()}/wedding-request`;

  let response = await fetch(primaryUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!response.ok) {
    response = await fetch(fallbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
  }

  return response.json();
}

export async function submitWedding(data: WeddingFormData) {
  const url = `${getIncantourApiBase()}/wedding-request`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return response.json();
}

export async function submitRoots(data: RootsFormData) {
  const primaryUrl = `${getIncantourApiBase()}/roots-request`;
  const fallbackUrl = `${getIncantourApiBase()}/wedding-request`;

  let response = await fetch(primaryUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!response.ok) {
    response = await fetch(fallbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
  }

  return response.json();
}

export async function submitGroup(data: GroupFormData) {
  const url = `${getIncantourApiBase()}/group-request`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return response.json();
}
