"use client";

import React, { useMemo, useState } from "react";
import { TourCard } from "@/components/tour-card";
import { SearchIcon, PlaneIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

export function TerraMareToursBrowser({
  allTours,
  activeFilter,
  onClearFilter,
}: {
  allTours: Tour[];
  activeFilter: "experience" | "soggiorni" | null;
  onClearFilter: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<"all" | "incoming" | "outgoing">("all");

  // Strictly filter for Terra Mare tours
  const terraMareTours = useMemo(() => {
    return allTours.filter((tour) => {
      const cat = String(tour.acf?.category || "").toLowerCase();
      const title = String(tour.title?.rendered || "").toLowerCase();
      return cat.includes("terra mare") || cat.includes("terramare") || title.includes("terra mare");
    });
  }, [allTours]);

  // Apply sub-type (experience / soggiorni) and search query
  const visibleTours = useMemo(() => {
    let result = [...terraMareTours];

    // Filter by type: Incoming / Outgoing
    if (activeType !== "all") {
      result = result.filter(
        (tour) => String(tour.acf?.type || "").toLowerCase() === activeType
      );
    }

    // Filter by experience / soggiorni
    if (activeFilter === "experience") {
      result = result.filter((tour) => {
        const type = String(tour.acf?.type || "").toLowerCase();
        const tags = String(tour.acf?.Tags || "").toLowerCase();
        return (
          type.includes("experience") ||
          type.includes("day") ||
          type.includes("weekend") ||
          tags.includes("experience") ||
          tags.includes("day") ||
          tags.includes("weekend")
        );
      });
    } else if (activeFilter === "soggiorni") {
      result = result.filter((tour) => {
        const type = String(tour.acf?.type || "").toLowerCase();
        const tags = String(tour.acf?.Tags || "").toLowerCase();
        return (
          type.includes("soggiorni") ||
          type.includes("integrati") ||
          type.includes("soggiorno") ||
          tags.includes("soggiorni") ||
          tags.includes("integrati") ||
          tags.includes("soggiorno")
        );
      });
    }

    // Filter by search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter((tour) => {
        const title = String(tour.title?.rendered || "").toLowerCase();
        const desc = String(tour.acf?.description || "").toLowerCase();
        const loc = String(tour.acf?.Location || "").toLowerCase();
        return title.includes(q) || desc.includes(q) || loc.includes(q);
      });
    }

    return result;
  }, [terraMareTours, activeFilter, activeType, searchTerm]);

  return (
    <div className="relative">
      {/* Search & Filter Container */}
      <section className="relative z-20 -mt-10 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gradient-dark mb-1">
              <span className="inline-block pb-1">Trova il tuo Tour Terra &amp; Mare</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Esplora i percorsi tra aree costiere e borghi autentici della Campania
            </p>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca tour per nome, destinazione o attività..."
              aria-label="Cerca tour Terra e Mare"
              className="w-full pl-5 pr-12 py-3.5 sm:py-4 rounded-full border-2 border-gray-200 focus:border-[#E6A532] focus:ring-4 focus:ring-amber-400/20 outline-none text-sm sm:text-base text-gray-800 transition-all placeholder:text-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Active sub-filter badge */}
          {activeFilter && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs text-gray-500">Filtro attivo:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                {activeFilter === "experience"
                  ? "TOUR EXPERIENCE 1 DAY/WEEKEND"
                  : "SOGGIORNI INTEGRATI"}
                <button
                  type="button"
                  onClick={onClearFilter}
                  aria-label="Rimuovi filtro"
                  className="hover:text-red-600 transition font-extrabold ml-1 cursor-pointer"
                >
                  &times;
                </button>
              </span>
            </div>
          )}

          {/* Type Filter: Incoming / Outgoing */}
          <div className="flex justify-center items-center gap-2 pt-3 border-t border-gray-100 text-xs">
            <span className="text-gray-400 font-medium mr-1">Tipologia:</span>
            <button
              type="button"
              onClick={() => setActiveType("all")}
              className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                activeType === "all"
                  ? "bg-[#1B5E5F] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tutte
            </button>
            <button
              type="button"
              onClick={() => setActiveType("incoming")}
              className={`px-3 py-1 rounded-full font-medium transition inline-flex items-center gap-1 cursor-pointer ${
                activeType === "incoming"
                  ? "bg-gradient-cool text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <PlaneIcon className="w-3 h-3" />
              Incoming
            </button>
            <button
              type="button"
              onClick={() => setActiveType("outgoing")}
              className={`px-3 py-1 rounded-full font-medium transition inline-flex items-center gap-1 cursor-pointer ${
                activeType === "outgoing"
                  ? "bg-gradient-warm text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <PlaneIcon className="w-3 h-3 rotate-45" />
              Outgoing
            </button>
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              Esperienze Autentiche
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
              <span className="inline-block pb-2">Terra &amp; Mare Experiences</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Esplora la nostra selezione di itinerari tra terra e mare in Campania
            </p>
          </div>

          {/* Results Count & Clear */}
          {searchTerm && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 max-w-6xl mx-auto">
              <p className="text-sm text-gray-600">
                Risultati trovati per &ldquo;<span className="font-semibold text-gray-900">{searchTerm}</span>&rdquo;: {visibleTours.length}
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-xs font-semibold text-[#1B5E5F] hover:underline"
              >
                Azzera ricerca
              </button>
            </div>
          )}

          {/* Tours Grid */}
          {visibleTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visibleTours.map((tour, index) => (
                <div key={tour.id} className="h-full">
                  <TourCard
                    tour={tour}
                    type="Terra &amp; Mare"
                    detailsLabel="Dettagli"
                    bookLabel="Prenota"
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl max-w-2xl mx-auto border border-gray-200 p-8">
              <div className="w-16 h-16 bg-amber-100 text-[#E6A532] rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nessun tour trovato
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                Modifica i criteri di ricerca o esplora tutti i percorsi disponibili in catalogo.
              </p>
              {(searchTerm || activeFilter || activeType !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveType("all");
                    onClearFilter();
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#1B5E5F] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#0F4142] transition-colors"
                >
                  Mostra tutti i tour
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
