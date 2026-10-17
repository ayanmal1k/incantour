import Link from "next/link";

import { TourCard } from "@/components/tour-card";
import { GiftIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

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
    <section id="featured-tours" className="featured-tours py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-incan mb-4">
            LA VETRINA INCANTOUR
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri le destinazioni e le esperienze più amate.
          </p>
        </div>

        {/* Content Grid or Fallback */}
        {displayTours.length > 0 ? (
          <div id="tours-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayTours.map((tour, index) => (
              <TourCard
                key={tour.id}
                tour={tour}
                priority={index < 2}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#E6A532]/40 bg-white/80 p-12 text-center backdrop-blur-sm shadow-card max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-[#1B5E5F]">
              Catalogo tour in aggiornamento
            </p>
            <p className="mt-3 text-base text-gray-600">
              {error
                ? "Il catalogo tour dal CMS WordPress non è momentaneamente raggiungibile."
                : "Stiamo preparando le nuove proposte ed esperienze per la stagione."}
              <br />
              Puoi comunque esplorare tutte le nostre destinazioni o creare un itinerario personalizzato con noi.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cool px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Esplora tutti i tour
              </Link>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1B5E5F] px-6 py-3 text-sm font-bold text-[#1B5E5F] transition hover:bg-[#1B5E5F] hover:text-white"
              >
                Crea il tuo itinerario
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA: Regala un Viaggio */}
        <div className="flex justify-center mt-12">
          <Link
            href="/regala-un-viaggio"
            className="text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center bg-gradient-warm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6A532]"
          >
            <GiftIcon className="mr-3 h-5 w-5 text-xl" />
            <span>REGALA UN VIAGGIO</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
