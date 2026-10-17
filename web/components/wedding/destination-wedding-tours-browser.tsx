"use client";

import React, { useMemo, useState } from "react";
import { TourCard } from "@/components/tour-card";
import { SearchIcon, PlaneIcon } from "@/components/ui/icons";
import { WeddingRegistryCard } from "./wedding-registry-card";
import type { Tour } from "@/lib/wordpress/types";

export type WeddingFilterCategory =
  | "all"
  | "wedding tour"
  | "wedding honeymoon"
  | "location da sogno"
  | "lista di nozze";

export function DestinationWeddingToursBrowser({
  allTours,
  initialCategory = "all",
}: {
  allTours: Tour[];
  initialCategory?: WeddingFilterCategory;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<WeddingFilterCategory>(initialCategory);
  const [activeType, setActiveType] = useState<"all" | "incoming" | "outgoing">("all");

  // Filter tours strictly for Destination Wedding / Wedding category first
  const weddingTours = useMemo(() => {
    return allTours.filter((tour) => {
      const cat = String(tour.acf?.category || "").toLowerCase();
      const title = String(tour.title?.rendered || "").toLowerCase();
      const tags = String(tour.acf?.Tags || "").toLowerCase();
      return (
        cat.includes("destination wedding") ||
        cat.includes("nozze") ||
        cat.includes("wedding") ||
        tags.includes("wedding") ||
        tags.includes("honeymoon") ||
        title.includes("wedding") ||
        title.includes("nozze") ||
        title.includes("luna di miele")
      );
    });
  }, [allTours]);

  // Apply category and type filters
  const visibleTours = useMemo(() => {
    let result = [...weddingTours];

    // Filter by type: Incoming / Outgoing
    if (activeType !== "all") {
      result = result.filter(
        (tour) => String(tour.acf?.type || "").toLowerCase() === activeType
      );
    }

    // Filter by wedding sub-category (except lista di nozze which shows registry card)
    if (activeCategory !== "all" && activeCategory !== "lista di nozze") {
      result = result.filter((tour) => {
        const title = String(tour.title?.rendered || "").toLowerCase();
        const desc = String(tour.acf?.description || "").toLowerCase();
        const tags = String(tour.acf?.Tags || "").toLowerCase();
        const loc = String(tour.acf?.Location || "").toLowerCase();

        return (
          title.includes(activeCategory) ||
          desc.includes(activeCategory) ||
          tags.includes(activeCategory) ||
          loc.includes(activeCategory)
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
  }, [weddingTours, activeCategory, activeType, searchTerm]);

  return (
    <div className="relative">
      {/* Search & Category Filter Section */}
      <section className="relative z-20 -mt-10 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gradient-dark mb-1">
              <span className="inline-block pb-1">Trova il tuo Pacchetto Matrimonio</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Filtra per tipologia ed esplora le nostre proposte su misura
            </p>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per location, tipologia o servizio..."
              aria-label="Cerca pacchetti matrimonio"
              className="w-full pl-5 pr-12 py-3.5 sm:py-4 rounded-full border-2 border-gray-200 focus:border-[#E6A532] focus:ring-4 focus:ring-amber-400/20 outline-none text-sm sm:text-base text-gray-800 transition-all placeholder:text-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Sub-Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-gradient-warm text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tutti
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("wedding tour")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "wedding tour"
                  ? "bg-gradient-warm text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Wedding Tour
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("wedding honeymoon")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "wedding honeymoon"
                  ? "bg-gradient-warm text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Wedding Honeymoon
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("location da sogno")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "location da sogno"
                  ? "bg-gradient-warm text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Location da Sogno
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("lista di nozze")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "lista di nozze"
                  ? "bg-gradient-warm text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Lista di Nozze
            </button>
          </div>

          {/* Type Filter Pills: Incoming / Outgoing */}
          <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-xs">
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

      {/* Wedding Packages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              Proposte Esclusive
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
              <span className="inline-block pb-2">Wedding Packages</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of carefully curated wedding packages in stunning locations
            </p>
          </div>

          {/* Show Wedding Registry Card when "Lista di Nozze" is selected */}
          {activeCategory === "lista di nozze" && <WeddingRegistryCard />}

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
                    type="Destination Wedding"
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
                Nessun pacchetto trovato
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                Modifica i criteri di ricerca per trovare il tuo pacchetto matrimonio ideale o richiedi una quotazione su misura.
              </p>
              {(searchTerm || activeCategory !== "all" || activeType !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                    setActiveType("all");
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#1B5E5F] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#0F4142] transition-colors"
                >
                  Mostra tutti i pacchetti
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
