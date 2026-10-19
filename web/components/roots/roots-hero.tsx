"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompassIcon } from "@/components/ui/icons";

export function RootsHero() {
  return (
    <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
      {/* Background image */}
      <Image
        src="/assets/images/radici&cultura.jpg"
        alt="Turismo delle Radici Campania - IncanTour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />

      {/* Legacy-matching subtle overlay to keep image bright and visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4142]/20 via-transparent to-[#E6A532]/15 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-amber-300 font-medium">Turismo delle Radici</span>
        </nav>

        <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/15 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20 shadow-sm">
          Radici &amp; Cultura
        </span>

        {/* Hero Title with descender padding */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md">
          <span className="text-gradient-hero inline-block pb-2">TURISMO DELLE RADICI</span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl mb-6 font-semibold text-amber-100">
          Un viaggio verso le proprie origini
        </p>

        {/* Narrative Card */}
        <div className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto bg-black/45 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 text-gray-100 space-y-4 text-left sm:text-center shadow-2xl">
          <p className="font-semibold text-amber-200">
            Con Incantour, il recupero delle radici non è un dettaglio: è il cuore stesso del viaggio.
          </p>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Gli Italiani nel mondo desiderano ricostruire il legame con la propria cultura d&apos;origine, per dare nuova vita a un patrimonio che non deve perdersi, ma essere trasmesso, condiviso e vissuto nei propri spazi di vita attuali.
          </p>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Incantour ti accompagnerà a riscoprire borghi, luoghi, sapori, arte e storie, per ricordare racconti familiari, conoscere, riconoscere e riallacciare legami che uniscono passato e presente.
          </p>
        </div>

        {/* Hero CTA Button */}
        <div>
          <a
            href="#booking-form-section"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl bg-gradient-warm hover:opacity-95"
          >
            <CompassIcon className="w-5 h-5" />
            <span>Costruisci il tuo viaggio delle radici</span>
          </a>
        </div>
      </div>
    </section>
  );
}
