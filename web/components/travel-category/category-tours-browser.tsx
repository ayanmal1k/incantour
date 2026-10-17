"use client";

import React, { useMemo, useState } from "react";
import { TourCard } from "@/components/tour-card";
import { SearchIcon } from "@/components/ui/icons";
import type { TravelCategoryConfig } from "@/lib/travel-categories";
import type { Tour } from "@/lib/wordpress/types";

export function CategoryToursBrowser({
  allTours,
  config,
}: {
  allTours: Tour[];
  config: TravelCategoryConfig;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const keywords = useMemo(() => config.toursSection.filterKeywords || [], [config.toursSection.filterKeywords]);

  const categoryTours = useMemo(() => {
    return allTours.filter((tour) => {
      const cat = String(tour.acf?.category || "").toLowerCase();
      const title = String(tour.title?.rendered || "").toLowerCase();
      const tags = String(tour.acf?.Tags || "").toLowerCase();
      return keywords.some((kw) => cat.includes(kw) || title.includes(kw) || tags.includes(kw));
    });
  }, [allTours, keywords]);

  // Apply search query filter
  const visibleTours = useMemo(() => {
    if (!searchTerm.trim()) return categoryTours;
    const q = searchTerm.toLowerCase().trim();
    return categoryTours.filter((tour) => {
      const title = String(tour.title?.rendered || "").toLowerCase();
      const desc = String(tour.acf?.description || "").toLowerCase();
      const loc = String(tour.acf?.Location || "").toLowerCase();
      const cat = String(tour.acf?.category || "").toLowerCase();
      return title.includes(q) || desc.includes(q) || loc.includes(q) || cat.includes(q);
    });
  }, [categoryTours, searchTerm]);

  return (
    <div className="relative">
      {/* Floating Search Container */}
      <section className="relative z-20 -mt-10 px-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100">
          <div className="text-center mb-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gradient-dark mb-1">
              <span className="inline-block pb-1">{config.search.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {config.search.subtitle}
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={config.search.placeholder}
              aria-label={config.search.title}
              className="w-full pl-5 pr-12 py-3.5 sm:py-4 rounded-full border-2 border-gray-200 focus:border-[#E6A532] focus:ring-4 focus:ring-amber-400/20 outline-none text-sm sm:text-base text-gray-800 transition-all placeholder:text-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              {config.toursSection.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
              <span className="inline-block pb-2">{config.toursSection.title}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {config.toursSection.subtitle}
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
                    type={config.toursSection.cardBadge}
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
                {config.toursSection.emptyMessage}
              </p>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
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
