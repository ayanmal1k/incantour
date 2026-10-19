import type { Metadata } from "next";
import { WeddingPlannerClientContent } from "@/components/wedding/wedding-planner-client-content";
import { getSiteUrl, siteName } from "@/lib/site";
import { getRelatedPosts, getTours } from "@/lib/wordpress/client";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Wedding Planner & Travel Coordinator in Campania | IncanTour",
  description:
    "Pianificazione e regia completa delle tue nozze in Campania. Venue esclusive, catering d'eccellenza, pratiche burocratiche e wedding tailor made con IncanTour.",
  alternates: { canonical: "/wedding-planner" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Wedding Planner & Travel Coordinator in Campania | IncanTour",
    description:
      "Un’accoglienza dedicata agli sposi stranieri, innanzitutto turisti e viaggiatori, che scelgono l’Italia per trasformare il sogno del matrimonio in un’esperienza autentica, unica e indimenticabile.",
    url: `${getSiteUrl().origin}/wedding-planner`,
    images: [{ url: "/assets/images/plan-wedding.png", alt: "Wedding Planner IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Planner & Travel Coordinator | IncanTour",
    description: "Pianificazione nozze ed accoglienza in Campania per sposi ed ospiti.",
    images: ["/assets/images/plan-wedding.png"],
  },
};

export default async function WeddingPlannerPage() {
  const [tours, relatedNews] = await Promise.all([
    getTours(50).catch((err) => {
      console.error("Error fetching tours for wedding-planner:", err);
      return [];
    }),
    getRelatedPosts(["#wedding", "wedding"], 3).catch(() => ({
      posts: [],
      hasExactMatch: false,
    })),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wedding Planner & Travel Coordinator - IncanTour",
    provider: {
      "@type": "TravelAgency",
      name: siteName,
      url: getSiteUrl().origin,
    },
    description:
      "Pianificazione completa matrimoni ed eventi in Campania: venue, catering, pratiche burocratiche e coordinamento logistico.",
    areaServed: "Campania, Italy",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-white">
        <WeddingPlannerClientContent tours={tours} relatedPosts={relatedNews.posts} />
      </article>
    </>
  );
}
