import type { Metadata } from "next";
import { WeddingPlannerClientContent } from "@/components/wedding/wedding-planner-client-content";
import { getSiteUrl, siteName } from "@/lib/site";
import { getTours } from "@/lib/wordpress/client";

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
      "La Destinazione Campania come plus per i matrimoni dall'estero: location da sogno, coordinamento fornitore per fornitore e wedding tailor made.",
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
  const tours = await getTours(50).catch((err) => {
    console.error("Error fetching tours for wedding-planner:", err);
    return [];
  });

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
        <WeddingPlannerClientContent tours={tours} />
      </article>
    </>
  );
}
