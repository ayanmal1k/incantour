import type { Metadata } from "next";
import { getSiteUrl, siteName } from "@/lib/site";
import { getRelatedPosts, getTours } from "@/lib/wordpress/client";
import { RootsHero } from "@/components/roots/roots-hero";
import { RootsToursBrowser } from "@/components/roots/roots-tours-browser";
import { RootsBookingForm } from "@/components/roots/roots-booking-form";
import { RootsRelatedNews } from "@/components/roots/roots-related-news";
import { CompassIcon } from "@/components/ui/icons";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Turismo delle Radici - IncanTour | Un Viaggio Verso le Proprie Origini",
  description:
    "Con Incantour il recupero delle radici è il cuore del viaggio: itinerari su misura in Campania e in Italia per riscoprire borghi, storie familiari, genealogia e tradizioni.",
  alternates: { canonical: "/turismo-radici" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Turismo delle Radici | Nozze, Borghi e Famiglia - IncanTour",
    description:
      "Riscopri le tue origini italiane con itinerari personalizzati, ricerca genealogica ed esperienze autentiche tra terra e mare.",
    url: `${getSiteUrl().origin}/turismo-radici`,
    images: [{ url: "/assets/images/radici&cultura.jpg", alt: "Turismo delle Radici IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turismo delle Radici - IncanTour",
    description: "Un viaggio verso le proprie origini: borghi, genealogia ed incontri autentici.",
    images: ["/assets/images/radici&cultura.jpg"],
  },
};

export default async function TurismoRadiciPage() {
  const [tours, relatedNews] = await Promise.all([
    getTours(50).catch((err) => {
      console.error("Error fetching tours for turismo-radici:", err);
      return [];
    }),
    getRelatedPosts("#turismodelleradici", 3).catch(async () => {
      return getRelatedPosts("radici", 3).catch(() => ({
        posts: [],
        hasExactMatch: false,
      }));
    }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Turismo delle Radici - IncanTour",
    description:
      "Itinerari ed esperienze dedicate alla riscoperta delle radici e della cultura familiare in Campania ed in Italia.",
    url: `${getSiteUrl().origin}/turismo-radici`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tours
        .filter((tour) => {
          const cat = String(tour.acf?.category || "").trim().toLowerCase();
          return cat === "turismo delle radici" || cat.includes("radici");
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
      <article className="min-h-screen bg-white">
        <RootsHero />
        <RootsToursBrowser allTours={tours} />
        <RootsBookingForm />
        <RootsRelatedNews posts={relatedNews.posts} />

        {/* Floating Booking Action Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <a
            href="#booking-form-section"
            aria-label="Costruisci il tuo viaggio delle radici"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 bg-gradient-warm hover:shadow-[0_10px_25px_rgba(230,165,50,0.5)]"
          >
            <CompassIcon className="w-6 h-6 text-white" />
          </a>
        </div>
      </article>
    </>
  );
}
