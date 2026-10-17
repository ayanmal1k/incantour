import type { Metadata } from "next";
import { TravelCategoryTemplate } from "@/components/travel-category/travel-category-template";
import { getSiteUrl, siteName } from "@/lib/site";
import { travelCategoryConfigs } from "@/lib/travel-categories";
import { getRelatedPosts, getTours } from "@/lib/wordpress/client";

export const revalidate = 300;

const config = travelCategoryConfigs.crociere;

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  alternates: { canonical: config.seo.canonical },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: config.seo.title,
    description: config.seo.description,
    url: `${getSiteUrl().origin}${config.seo.canonical}`,
    images: [{ url: config.seo.ogImage, alt: config.hero.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.title,
    description: config.seo.description,
    images: [config.seo.ogImage],
  },
};

export default async function CrocierePage() {
  const [tours, relatedNews] = await Promise.all([
    getTours(50).catch((err) => {
      console.error("Error fetching tours for crociere:", err);
      return [];
    }),
    getRelatedPosts(config.relatedPosts.tag, 3).catch(() => ({
      posts: [],
      hasExactMatch: false,
    })),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.hero.title,
    description: config.seo.description,
    url: `${getSiteUrl().origin}${config.seo.canonical}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tours
        .filter((tour) => {
          const cat = String(tour.acf?.category || "").trim().toLowerCase();
          return cat === config.categoryName.trim().toLowerCase();
        })
        .slice(0, 10)
        .map((tour, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${getSiteUrl().origin}/tours/${tour.slug || tour.id}`,
          name: tour.title?.rendered,
        })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelCategoryTemplate
        config={config}
        allTours={tours}
        relatedPosts={relatedNews.posts}
      />
    </>
  );
}
