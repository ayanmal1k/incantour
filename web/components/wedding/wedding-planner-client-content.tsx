"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TourCard } from "@/components/tour-card";
import { WeddingPlannerServices } from "./wedding-planner-services";
import { WeddingTailorMadeCTA } from "./wedding-tailor-made-cta";
import { WeddingTailorMadeModal } from "./wedding-tailor-made-modal";
import { CategoryRelatedNews } from "@/components/travel-category/category-related-news";
import { SparklesIcon, ArrowDownIcon, HeartIcon } from "@/components/ui/icons";
import type { Tour, Post } from "@/lib/wordpress/types";

export function WeddingPlannerClientContent({
  tours,
  relatedPosts = [],
}: {
  tours: Tour[];
  relatedPosts?: Post[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter for Destination Wedding tours to showcase
  const weddingTours = tours
    .filter((tour) => {
      const cat = String(tour.acf?.category || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
      return cat === "destination wedding";
    })
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
        <Image
          src="/assets/images/wedding.jpg"
          alt="Wedding Planner Campania IncanTour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4142]/45 via-transparent to-[#E6A532]/25 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/destination-wedding" className="hover:text-amber-300 transition-colors">
              Destination Wedding
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-amber-300 font-medium">Wedding Travel coordinator</span>
          </nav>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/15 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20 shadow-sm">
            Regia &amp; Coordinamento Nozze
          </span>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-md">
            WEDDING PLANNER &amp; <br />
            <span className="text-gradient-hero inline-block pb-2">TRAVEL COORDINATOR</span>
          </h1>

          {/* Narrative Card */}
          <div className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto bg-black/40 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 text-gray-100 shadow-2xl">
            <p className="leading-relaxed">
              Un’accoglienza dedicata agli sposi stranieri, innanzitutto turisti e viaggiatori, che scelgono l’Italia per trasformare il sogno del matrimonio in un’esperienza autentica, unica e indimenticabile.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:opacity-95 transform hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Wedding Tailor Made</span>
            </button>
            <a
              href="#servizi"
              className="bg-white/20 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full hover:bg-white/30 border border-white/30 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Scopri i Servizi</span>
              <ArrowDownIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Presentation & Services Section */}
      <WeddingPlannerServices />

      {/* Featured Wedding Packages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              Esperienze Incantour
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
              <span className="inline-block pb-2">Matrimonio &amp; Tour</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              le nostre proposte di luna di miele in Campania tra terra e mare
            </p>
          </div>

          {weddingTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weddingTours.map((tour, index) => (
                <div key={tour.id} className="h-full">
                  <TourCard
                    tour={tour}
                    badge="Wedding"
                    type={tour.acf?.type || "Incoming"}
                    detailsLabel="Dettagli"
                    bookLabel="Prenota"
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-amber-50/60 rounded-3xl border border-amber-200 max-w-2xl mx-auto">
              <HeartIcon className="w-12 h-12 text-[#E6A532] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Organizzazione Pacchetti Matrimonio su Misura
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                Contattaci direttamente per richiedere la quotazione e la progettazione del tuo pacchetto wedding personalizzato.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-warm text-white font-bold px-7 py-3 rounded-full text-sm shadow-md hover:scale-105 transition-transform"
              >
                Richiedi Pacchetto
              </button>
            </div>
          )}
        </div>
      </section>

      {/* News Box underneath the list of relevant packages */}
      <CategoryRelatedNews
        posts={relatedPosts}
        title="Notizie e Approfondimenti Wedding"
        subtitle="Ispirazioni, tendenze e consigli per organizzare il tuo matrimonio da sogno in Campania"
      />

      {/* Tailor Made Big CTA Banner */}
      <WeddingTailorMadeCTA onOpenModal={() => setIsModalOpen(true)} />

      {/* Modal Dialog */}
      <WeddingTailorMadeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Wedding Tailor Made"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 bg-gradient-warm hover:shadow-[0_10px_25px_rgba(230,165,50,0.5)] cursor-pointer"
        >
          <HeartIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );
}
