import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DestinationWeddingToursBrowser } from "@/components/wedding/destination-wedding-tours-browser";
import { CategoryRelatedNews } from "@/components/travel-category/category-related-news";
import { CategoryFloatingAction } from "@/components/travel-category/category-floating-action";
import { getSiteUrl, siteName } from "@/lib/site";
import { getRelatedPosts, getTours } from "@/lib/wordpress/client";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Destination Wedding in Campania & Amalfi Coast | IncanTour",
  description:
    "Organizza il tuo Destination Wedding in Campania con IncanTour: borghi storici, costiere da favola e castelli incantati. Assistenza burocratica, wedding tour e lista di nozze online.",
  alternates: { canonical: "/destination-wedding" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Destination Wedding in Campania & Amalfi Coast | IncanTour",
    description:
      "La Destinazione Campania come plus per i matrimoni dall'estero: aree costiere, castelli, masserie e panorami imperdibili con IncanTour.",
    url: `${getSiteUrl().origin}/destination-wedding`,
    images: [{ url: "/assets/images/wedding.jpg", alt: "Destination Wedding IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destination Wedding in Campania | IncanTour",
    description: "Location da sogno, wedding tour e assistenza logistica per le tue nozze in Italia.",
    images: ["/assets/images/wedding.jpg"],
  },
};

export default async function DestinationWeddingPage() {
  const [tours, relatedNews] = await Promise.all([
    getTours(50).catch((err) => {
      console.error("Error fetching tours for destination-wedding:", err);
      return [];
    }),
    getRelatedPosts("wedding", 3).catch(() => ({
      posts: [],
      hasExactMatch: false,
    })),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Destination Wedding in Campania - IncanTour",
    description:
      "La Destinazione Campania come plus per i matrimoni dall'estero: aree costiere, borghi, castelli medievali e location suggestive.",
    url: `${getSiteUrl().origin}/destination-wedding`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
          <Image
            src="/assets/images/wedding.jpg"
            alt="Destination Wedding IncanTour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4142]/45 via-transparent to-[#E6A532]/25 pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
              <Link href="/" className="hover:text-amber-300 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/tours" className="hover:text-amber-300 transition-colors">
                Tour Packages
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-amber-300 font-medium">Destination Wedding</span>
            </nav>

            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/15 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20 shadow-sm">
              Campania Experience
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-md text-gradient-hero">
              DESTINATION WEDDING
            </h1>

            {/* Narrative Card */}
            <div className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto bg-black/40 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 text-gray-100 shadow-2xl">
              <p className="leading-relaxed">
                La Destinazione Campania come plus per i matrimoni dall&apos;estero: aree costiere, piccole ed antiche chiese in centri storici e borghi, castelli medievali, masserie, ville e dimore storiche, spiagge, aree montane e laghi scelti come scenario suggestivo per celebrare le unioni tra profumi e musicalità, lussureggianti boschi, mormorii di torrenti e imperdibili panorami .
              </p>
            </div>

            {/* Hero Quick Feature Links */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-sm text-xs sm:text-sm font-semibold tracking-wide">
                <span>💍 Wedding Tour</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-sm text-xs sm:text-sm font-semibold tracking-wide">
                <span>✈️ Wedding Honeymoon</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-sm text-xs sm:text-sm font-semibold tracking-wide">
                <span>🏰 Location da Sogno</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-sm text-xs sm:text-sm font-semibold tracking-wide">
                <span>🎁 Lista di Nozze</span>
              </span>
            </div>
          </div>
        </section>

        {/* Dynamic Tours Section with Registry & Sub-Category Filter */}
        <DestinationWeddingToursBrowser allTours={tours} />

        {/* Related News Section */}
        <CategoryRelatedNews
          posts={relatedNews.posts}
          title="Notizie e Approfondimenti"
          subtitle="Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog"
        />

        {/* Floating Quick Action */}
        <CategoryFloatingAction
          icon="ring"
          title="Richiedi informazioni sul tuo matrimonio"
          href="/contatti?arg=destination-wedding"
        />
      </article>
    </>
  );
}
