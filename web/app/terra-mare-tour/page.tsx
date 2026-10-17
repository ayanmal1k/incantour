import type { Metadata } from "next";
import { TerraMareClientContent } from "@/components/terra-mare/terra-mare-client-content";
import { getSiteUrl, siteName } from "@/lib/site";
import { getRelatedPosts, getTours } from "@/lib/wordpress/client";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "TerraMare Tour - Viaggi tra Terra e Mare in Campania | IncanTour",
  description:
    "Scopri i percorsi Terra e Mare con IncanTour: tour esperienziali 1 day/weekend e soggiorni integrati tra costiere, borghi antichi ed enogastronomia d'eccellenza.",
  alternates: { canonical: "/terra-mare-tour" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "TerraMare Tour - Viaggi tra Terra e Mare in Campania | IncanTour",
    description:
      "Dal mare alla terra, dalla terra al mare: suggestivi percorsi tra storia, ambiente, artigianato artistico, archeologia ed enogastronomia in Campania.",
    url: `${getSiteUrl().origin}/terra-mare-tour`,
    images: [{ url: "/assets/images/terra.png", alt: "TerraMare Tour IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TerraMare Tour - Viaggi in Campania | IncanTour",
    description: "Itinerari unici tra mare e terra in Campania con IncanTour.",
    images: ["/assets/images/terra.png"],
  },
};

export default async function TerraMareTourPage() {
  const [tours, relatedNews] = await Promise.all([
    getTours(50).catch((err) => {
      console.error("Error fetching tours for terra-mare-tour:", err);
      return [];
    }),
    getRelatedPosts("terramare", 3).catch(() => ({
      posts: [],
      hasExactMatch: false,
    })),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TerraMare Tour - IncanTour",
    description:
      "Suggestivi percorsi tra storia, ambiente, artigianato artistico, archeologia e tradizioni gastronomiche in Campania.",
    url: `${getSiteUrl().origin}/terra-mare-tour`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-white">
        <TerraMareClientContent
          allTours={tours}
          relatedPosts={relatedNews.posts}
        />
      </article>
    </>
  );
}
