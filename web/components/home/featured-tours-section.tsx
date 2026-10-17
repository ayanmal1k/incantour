import Image from "next/image";
import Link from "next/link";

import { CalendarIcon, EyeIcon, GiftIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

function formatPrice(price?: string | number): string {
  if (price === undefined || price === null || price === "") return "";
  const num = typeof price === "number" ? price : parseFloat(String(price).replace(",", "."));
  if (isNaN(num)) return String(price);
  return num.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

type FeaturedToursSectionProps = {
  tours: readonly Tour[];
  error?: string | null;
};

export function FeaturedToursSection({ tours, error }: FeaturedToursSectionProps) {
  // Legacy logic: select up to 2 incoming and 2 outgoing, or first 4 tours
  const incoming = tours.filter((t) => t.acf?.type?.toLowerCase() === "incoming").slice(0, 2);
  const outgoing = tours.filter((t) => t.acf?.type?.toLowerCase() === "outgoing").slice(0, 2);
  const selectedTours = [...incoming, ...outgoing];

  // If type filtering resulted in fewer than 4 tours, backfill from remaining tours
  const displayTours =
    selectedTours.length > 0
      ? [
          ...selectedTours,
          ...tours.filter((t) => !selectedTours.some((st) => st.id === t.id)).slice(0, 4 - selectedTours.length),
        ]
      : tours.slice(0, 4);

  return (
    <section id="featured-tours" className="bg-incan-sand/50 py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-incan-gold-dark">
            Esperienze in evidenza
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gradient-incan sm:text-5xl">
            LA VETRINA INCANTOUR
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Scopri le destinazioni e le esperienze più amate.
          </p>
        </div>

        {/* Content Grid or Fallback */}
        {displayTours.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {displayTours.map((tour) => {
              const formattedPrice = formatPrice(tour.acf?.Price);
              const tourType = tour.acf?.type || "Tour";
              const isIncoming = tourType.toLowerCase() === "incoming";
              const rawDesc = tour.acf?.description
                ? String(tour.acf.description)
                : stripHtml(tour.content?.rendered || "");

              return (
                <div
                  key={tour.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
                >
                  {/* Card Media */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={tour.featuredImageUrl || "/assets/images/viaggi.jpg"}
                      alt={tour.title?.rendered ? stripHtml(tour.title.rendered) : "Tour IncanTour"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge type */}
                    <div
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${
                        isIncoming ? "bg-gradient-cool" : "bg-gradient-warm"
                      }`}
                    >
                      {tourType}
                    </div>

                    {/* Price tag */}
                    {formattedPrice ? (
                      <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-incan-gold-dark shadow-sm backdrop-blur-sm">
                        {formattedPrice}
                      </div>
                    ) : null}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-incan-teal line-clamp-2">
                      {tour.title?.rendered ? stripHtml(tour.title.rendered) : "Esperienza su misura"}
                    </h3>

                    {rawDesc ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {rawDesc}
                      </p>
                    ) : null}

                    {/* Action Buttons */}
                    <div className="mt-auto pt-6 flex items-center gap-2">
                      <Link
                        href={`/tour/${tour.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-cool px-3 py-2.5 text-xs font-bold text-white shadow transition hover:brightness-110"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        <span>Dettagli</span>
                      </Link>
                      <Link
                        href={`/prenota?tour=${tour.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-warm px-3 py-2.5 text-xs font-bold text-white shadow transition hover:brightness-110"
                      >
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <span>Prenota</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border border-dashed border-incan-gold/40 bg-white/80 p-12 text-center backdrop-blur-sm shadow-card max-w-2xl mx-auto">
            <p className="font-display text-2xl font-bold text-incan-teal">
              Catalogo tour in aggiornamento
            </p>
            <p className="mt-3 text-base text-slate-600">
              {error
                ? "Il catalogo tour dal CMS WordPress non è momentaneamente raggiungibile."
                : "Stiamo preparando le nuove proposte ed esperienze per la stagione."}
              <br />
              Puoi comunque esplorare tutte le nostre destinazioni o creare un itinerario personalizzato con noi.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/tour"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cool px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Esplora tutti i tour
              </Link>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 rounded-full border-2 border-incan-teal px-6 py-3 text-sm font-bold text-incan-teal transition hover:bg-incan-teal hover:text-white"
              >
                Crea il tuo itinerario
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA: Regala un Viaggio */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/regala-un-viaggio"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-warm px-8 py-4 text-base font-bold text-white shadow-gold transition duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
          >
            <GiftIcon className="h-5 w-5 transition duration-300 group-hover:scale-110" />
            <span>REGALA UN VIAGGIO</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
