"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { TourCard } from "@/components/tour-card";
import { GlobeIcon, PlaneArrivalIcon, PlaneDepartureIcon, SearchIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

type ToursCatalogProps = {
  initialTours: Tour[];
};

export function ToursCatalog({ initialTours }: ToursCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "incoming" | "outgoing">("all");

  const filteredTours = useMemo(() => {
    return initialTours.filter((tour) => {
      // 1. Type filter
      if (selectedType !== "all") {
        const tourType = (tour.acf?.type as string)?.toLowerCase() || "";
        if (tourType !== selectedType) {
          return false;
        }
      }

      // 2. Search query filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const title = tour.title?.rendered ? stripHtml(tour.title.rendered).toLowerCase() : "";
        const desc = tour.acf?.description
          ? String(tour.acf.description).toLowerCase()
          : tour.content?.rendered
            ? stripHtml(tour.content.rendered).toLowerCase()
            : "";
        const location = tour.acf?.Location ? String(tour.acf.Location).toLowerCase() : "";
        const tags = tour.acf?.Tags ? String(tour.acf.Tags).toLowerCase() : "";

        return title.includes(query) || desc.includes(query) || location.includes(query) || tags.includes(query);
      }

      return true;
    });
  }, [initialTours, selectedType, searchTerm]);

  return (
    <div>
      {/* Search & Filter Container (Legacy overlapping design) */}
      <div className="relative z-10 mx-auto -mt-14 max-w-4xl px-4 sm:px-6">
        <div className="rounded-[20px] bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per destinazione, nome tour, parole chiave..."
              className="w-full rounded-full border-2 border-slate-200 py-3.5 pl-12 pr-6 text-base sm:text-lg text-slate-800 placeholder-slate-400 transition-all duration-300 focus:border-[#E6A532] focus:outline-none focus:ring-4 focus:ring-[#E6A532]/10"
              aria-label="Cerca tour"
            />
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon className="h-5 w-5" />
            </div>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
              >
                Cancella
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedType("all")}
              className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedType === "all"
                  ? "border-[#E6A532] bg-gradient-warm text-white shadow-md transform -translate-y-0.5"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#E6A532] hover:text-[#E6A532]"
              }`}
            >
              <GlobeIcon className="h-4 w-4" />
              <span>Tutte le Tipologie</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("incoming")}
              className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedType === "incoming"
                  ? "border-[#1B5E5F] bg-gradient-cool text-white shadow-md transform -translate-y-0.5"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#1B5E5F] hover:text-[#1B5E5F]"
              }`}
            >
              <PlaneArrivalIcon className="h-4 w-4" />
              <span>Incoming</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("outgoing")}
              className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedType === "outgoing"
                  ? "border-[#E6A532] bg-gradient-warm text-white shadow-md transform -translate-y-0.5"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#E6A532] hover:text-[#E6A532]"
              }`}
            >
              <PlaneDepartureIcon className="h-4 w-4" />
              <span>Outgoing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tours Grid Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient-incan mb-3">
              Tour Disponibili
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Scegli tra la nostra vasta collezione di esperienze di viaggio accuratamente selezionate
            </p>
            <div className="mt-4 text-sm font-medium text-slate-500">
              Mostrando <span className="font-bold text-[#1B5E5F]">{filteredTours.length}</span> di{" "}
              {initialTours.length} tour
            </div>
          </div>

          {filteredTours.length > 0 ? (
            <div
              id="tours-container"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredTours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  priority={index < 4}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-lg rounded-3xl bg-white p-12 text-center shadow-lg border border-slate-100">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-[#E6A532]">
                <SearchIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Nessun tour trovato</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Prova a modificare i criteri di ricerca o esplora tutte le tipologie disponibili.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                }}
                className="inline-flex items-center rounded-full bg-gradient-warm px-6 py-3 text-sm font-semibold text-white shadow-md hover:scale-105 transition-transform"
              >
                Reimposta filtri
              </button>
            </div>
          )}

          {/* Bottom Custom Experience CTA */}
          <div className="mt-20 rounded-3xl bg-gradient-cool p-8 sm:p-12 text-white shadow-xl text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Non trovi l&apos;itinerario che desideri?
            </h3>
            <p className="text-slate-200 max-w-xl mx-auto mb-8 text-base">
              Creiamo viaggi personalizzati e su misura per singoli viaggiatori, coppie e gruppi.
              Raccontaci i tuoi desideri e disegneremo l&apos;esperienza ideale per te.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contatti"
                className="rounded-full bg-gradient-warm px-8 py-3.5 text-base font-bold text-white shadow-gold hover:scale-105 transition-transform"
              >
                Crea il tuo tour su misura
              </Link>
              <Link
                href="/regala-un-viaggio"
                className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3.5 text-base font-bold text-white hover:bg-white hover:text-[#1B5E5F] transition-all"
              >
                Regala un Viaggio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
