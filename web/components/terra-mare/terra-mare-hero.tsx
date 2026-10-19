"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, HotelIcon } from "@/components/ui/icons";

export function TerraMareHero({
  activeFilter,
  onToggleFilter,
}: {
  activeFilter: "experience" | "soggiorni" | null;
  onToggleFilter: (filter: "experience" | "soggiorni") => void;
}) {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
      {/* Background Image */}
      <Image
        src="/assets/images/terra.png"
        alt="TerraMare Tour IncanTour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />

      {/* Legacy-matching subtle overlay to keep image bright and visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4142]/20 via-transparent to-[#E6A532]/15 pointer-events-none" />

      {/* Main Content */}
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
          <span className="text-amber-300 font-medium">TerraMare Tour</span>
        </nav>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-md text-gradient-hero">
          TerraMare Tour
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 max-w-2xl mx-auto text-amber-100 leading-snug drop-shadow">
          Con Incantour potrai scoprire mille e una sfumatura del viaggio culturale ed esperienziale.
        </p>

        {/* Narrative Card */}
        <div className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto bg-black/40 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 text-gray-100 shadow-2xl">
          <p className="leading-relaxed">
            Dal mare alla terra, dalla terra al mare: suggestivi percorsi tra storia, ambiente, artigianato artistico, archeologia, architettura, arte e tradizioni gastronomiche.
          </p>
          <p className="leading-relaxed mt-4 pt-4 border-t border-white/15 text-amber-100">
            Un viaggio tra aree interne ed aree costiere alla ricerca di &ldquo;tracce&rdquo; antiche, sedimenti culturali, accattivanti sapori.
          </p>
        </div>

        {/* Filter Buttons in Hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onToggleFilter("experience")}
            className={`flex items-center space-x-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all transform active:scale-95 cursor-pointer backdrop-blur-md shadow-lg ${
              activeFilter === "experience"
                ? "bg-gradient-warm text-white ring-4 ring-amber-400/30 scale-105"
                : "bg-white/15 hover:bg-white/25 text-white border border-white/25"
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-amber-300" />
            <span>TOUR EXPERIENCE 1 DAY/WEEKEND</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleFilter("soggiorni")}
            className={`flex items-center space-x-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all transform active:scale-95 cursor-pointer backdrop-blur-md shadow-lg ${
              activeFilter === "soggiorni"
                ? "bg-gradient-warm text-white ring-4 ring-amber-400/30 scale-105"
                : "bg-white/15 hover:bg-white/25 text-white border border-white/25"
            }`}
          >
            <HotelIcon className="w-4 h-4 text-amber-300" />
            <span>SOGGIORNI INTEGRATI</span>
          </button>
        </div>
      </div>
    </section>
  );
}
