import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { TourCard } from "@/components/tour-card";
import { RelatedBlogsSidebar } from "@/components/tours/related-blogs-sidebar";
import { TourBookingCard } from "@/components/tours/tour-booking-card";
import { TourDetailContent } from "@/components/tours/tour-detail-content";
import { TourDetailHero } from "@/components/tours/tour-detail-hero";
import { TourGallery } from "@/components/tours/tour-gallery";
import { ArrowRightIcon } from "@/components/ui/icons";
import { extractEntityMetadata, getRelatedPackages, getRelatedPosts, getTour } from "@/lib/wordpress/client";
import type { Tour } from "@/lib/wordpress/types";

type TourDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#8217;|&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;|&#038;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .trim();
}

function formatPrice(price?: string | number): string {
  if (price === undefined || price === null || price === "") return "";
  const num = typeof price === "number" ? price : parseFloat(String(price).replace(",", "."));
  if (isNaN(num)) return String(price);
  return num.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export const revalidate = 300;

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: "Tour non trovato - IncanTour",
      description: "Il tour selezionato non è disponibile.",
    };
  }

  const baseMeta = extractEntityMetadata(tour, "IncanTour");
  const rawTitle = tour.title?.rendered ? stripHtml(tour.title.rendered) : "Dettaglio Tour";

  return {
    ...baseMeta,
    title: `${rawTitle} - IncanTour`,
    description:
      baseMeta.description ||
      `Scopri i dettagli, il programma e le tariffe per ${rawTitle} organizzato da IncanTour.`,
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  const rawTags = tour.acf?.Tags
    ? String(tour.acf.Tags)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Fetch related blog articles matching tour tags (or fallback with notice)
  const relatedPostsResult = await getRelatedPosts(rawTags, 3);

  // Fetch related tour packages for bottom recommendations
  let relatedTours: Tour[] = [];
  try {
    const packages = await getRelatedPackages(4);
    relatedTours = packages.filter((t) => t.id !== tour.id).slice(0, 3);
  } catch {
    relatedTours = [];
  }

  const title = tour.title?.rendered ? stripHtml(tour.title.rendered) : "Tour IncanTour";
  const formattedPrice = formatPrice(tour.acf?.Price);

  const rawGallery = Array.isArray(tour.acf?.gallery)
    ? (tour.acf?.gallery as Array<string | { url: string; alt?: string }>)
    : [];

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: tour.excerpt?.rendered ? stripHtml(tour.excerpt.rendered) : title,
    image: tour.featuredImageUrl,
    touristType: tour.acf?.type || "Tour",
    offers: tour.acf?.Price
      ? {
          "@type": "Offer",
          price: String(tour.acf.Price).replace(/[^0-9.]/g, ""),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    provider: {
      "@type": "TravelAgency",
      name: "IncanTour",
      url: "https://www.incantour.it",
    },
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 pb-28">
        {/* Hero Section */}
        <TourDetailHero tour={tour} />

        {/* Content Section: 2 Columns Layout */}
        <div className="container mx-auto mt-12 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Main Content Column (2/3) */}
            <div className="lg:col-span-2 space-y-10">
              <TourDetailContent tour={tour} />

              {/* Tags Section if available */}
              {rawTags.length > 0 && (
                <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100">
                  <h3 className="text-xl font-bold text-[#1B5E5F] mb-4">Tematiche e Tag</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {rawTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gradient-cool px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tour Photo Gallery */}
              {rawGallery.length > 0 && (
                <TourGallery gallery={rawGallery} tourTitle={title} />
              )}
            </div>

            {/* Sidebar Column (1/3) - Booking card and vertically stacked related blogs */}
            <aside className="lg:col-span-1 space-y-8">
              <TourBookingCard tour={tour} />
              <RelatedBlogsSidebar
                posts={relatedPostsResult.posts}
                hasExactMatch={relatedPostsResult.hasExactMatch}
                tourTags={rawTags}
              />
            </aside>
          </div>

          {/* Related Tours / Consigliati ("Sideways Relevant Tours") */}
          {relatedTours.length > 0 && (
            <section className="mt-20 pt-16 border-t border-slate-200" aria-labelledby="related-tours-heading">
              <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#E6A532]">
                    Continua a esplorare
                  </span>
                  <h3 id="related-tours-heading" className="text-2xl sm:text-3xl font-bold text-[#1B5E5F] mt-1">
                    Potrebbero interessarti anche
                  </h3>
                </div>
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E6A532] hover:text-[#1B5E5F] transition"
                >
                  <span>Tutti i tour</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedTours.map((relTour) => (
                  <TourCard key={relTour.id} tour={relTour} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Mobile Floating Bottom Bar (Sticky only on mobile screens) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-3.5 shadow-2xl flex items-center justify-between lg:hidden">
          <div>
            <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              A partire da
            </span>
            <span className="block text-xl font-extrabold text-[#E6A532]">
              {formattedPrice || "Su richiesta"}
            </span>
          </div>
          <Link
            href={`/prenota?tour=${tour.id}`}
            className="rounded-full bg-gradient-warm px-6 py-2.5 text-sm font-bold text-white shadow-gold hover:scale-105 transition"
          >
            Prenota Ora
          </Link>
        </div>
      </main>
    </>
  );
}
