"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UtensilsIcon,
  CastleIcon,
  PrayIcon,
  BicycleIcon,
  MusicIcon,
  WandIcon,
  SpaIcon,
} from "@/components/ui/icons";

export const GROUP_THEMES = [
  { id: "sapori in tour", label: "Sapori in Tour", icon: UtensilsIcon },
  { id: "castelli in tour", label: "Castelli in Tour", icon: CastleIcon },
  { id: "cammini e percorsi religiosi", label: "Cammini e Percorsi Religiosi", icon: PrayIcon },
  { id: "outdoor & cicloturismo", label: "Outdoor & Cicloturismo", icon: BicycleIcon },
  { id: "musicali", label: "Musicali", icon: MusicIcon },
  { id: "esoterismo", label: "Esoterismo", icon: WandIcon },
  { id: "benessere", label: "Benessere", icon: SpaIcon },
] as const;

export function GroupTourHero({
  onSelectTheme,
}: {
  onSelectTheme: (themeId: string) => void;
}) {
  return (
    <section className="page-header-bg min-h-[66vh] flex items-center justify-center relative overflow-hidden pt-28 pb-16 text-white">
      {/* Background Image */}
      <Image
        src="/assets/images/theme.jpg"
        alt="Gruppi a Tema Campania - IncanTour"
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
          <Link href="/tours" className="hover:text-amber-300 transition-colors">
            Tour Packages
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-amber-300 font-medium">Gruppi a tema</span>
        </nav>

        <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/15 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20 shadow-sm">
          Esperienze Condivise
        </span>

        {/* Hero Title with descender padding */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md">
          <span className="text-gradient-hero inline-block pb-2">GRUPPI A TEMA</span>
        </h1>

        <p className="text-lg sm:text-2xl md:text-3xl mb-8 font-semibold text-amber-100 max-w-3xl mx-auto leading-relaxed">
          Atmosfere condivise in convivialita’ , storie da vivere insieme
        </p>

        {/* 7 Interactive Theme Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {GROUP_THEMES.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelectTheme(theme.id)}
                className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-gradient-warm hover:text-white hover:border-transparent backdrop-blur-md text-white border border-white/30 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
              >
                <Icon className="w-4 h-4 text-amber-300 group-hover:text-white transition-colors" />
                <span>{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
