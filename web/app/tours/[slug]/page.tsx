import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { TourCard } from "@/components/tour-card";
import { TourBookingCard } from "@/components/tours/tour-booking-card";
import { TourDetailContent } from "@/components/tours/tour-detail-content";
import { TourDetailHero } from "@/components/tours/tour-detail-hero";
import { TourGallery } from "@/components/tours/tour-gallery";
import { ArrowRightIcon, CalendarIcon } from "@/components/ui/icons";
import { extractEntityMetadata, getRelatedPackages, getRelatedPosts, getTour } from "@/lib/wordpress/client";
import type { Post, Tour } from "@/lib/wordpress/types";

type TourDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("it-IT");
  } catch {
    return dateString;
  }
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

  // Fetch related blog articles matching tags
  let relatedPosts: Post[] = [];
  if (tour.acf?.Tags) {
    const tags = String(tour.acf.Tags).split(",").map((t) => t.trim());
    relatedPosts = await getRelatedPosts(tags, 3);
  } else {
    relatedPosts = await getRelatedPosts([], 3);
  }

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
  const rawTags = tour.acf?.Tags
    ? String(tour.acf.Tags)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

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

            {/* Sidebar Column (1/3) - Isolated Sticky Container that never overlaps content or sibling widgets */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 self-start">
                <TourBookingCard tour={tour} />
              </div>
            </aside>
          </div>

          {/* Related Blog Stories Section (Clean full-width row preventing scroll collision) */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-16 border-t border-slate-200" aria-labelledby="related-stories-heading">
              <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#E6A532]">
                    Approfondimenti &amp; Guide
                  </span>
                  <h3 id="related-stories-heading" className="text-2xl sm:text-3xl font-bold text-[#1B5E5F] mt-1">
                    Storie dal Blog Correlate
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E6A532] hover:text-[#1B5E5F] transition"
                >
                  <span>Tutti gli articoli</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => {
                  const postTitle = post.title?.rendered ? stripHtml(post.title.rendered) : "Articolo";
                  const postImage = post.featuredImageUrl || "/assets/images/default-blog.jpg";
                  const postDate = formatDate(post.date);
                  const postExcerpt = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : "";
                  const truncatedExcerpt =
                    postExcerpt.length > 110 ? `${postExcerpt.substring(0, 110)}...` : postExcerpt;

                  return (
                    <article
                      key={post.id}
                      className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 border border-slate-100"
                    >
                      <Link href={`/blog/${post.id}`} className="block focus:outline-none flex-1 flex flex-col">
                        <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                          <Image
                            src={postImage}
                            alt={postTitle}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2.5">
                              <CalendarIcon className="h-3.5 w-3.5 text-[#E6A532]" />
                              <time dateTime={post.date}>{postDate}</time>
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 line-clamp-2 leading-snug group-hover:text-[#E6A532] transition-colors">
                              {postTitle}
                            </h4>
                            {truncatedExcerpt && (
                              <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                {truncatedExcerpt}
                              </p>
                            )}
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E6A532] group-hover:text-[#1B5E5F] transition-colors">
                            <span>Leggi racconto</span>
                            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

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
