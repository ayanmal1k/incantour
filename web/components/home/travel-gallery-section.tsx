"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/icons";

export const galleryItems = [
  {
    src: "/assets/images/campania experience.jpg",
    title: "Campania Experience",
    caption: "Scorci suggestivi tra natura e antichi borghi",
  },
  {
    src: "/assets/images/destination wedding 1.jpg",
    title: "Destination Wedding",
    caption: "Location da favola per matrimoni esclusivi",
  },
  {
    src: "/assets/images/percorsi di lingua e cultura.jpg",
    title: "Percorsi di Lingua e Cultura",
    caption: "Immersione viva nell'identità e nella lingua italiana",
  },
  {
    src: "/assets/images/radici&cultura.jpg",
    title: "Radici e Cultura",
    caption: "Viaggi genealogici ed emozionali nelle terre di origine",
  },
  {
    src: "/assets/images/storia e visione.png",
    title: "Storia e Visione",
    caption: "La filosofia del turismo consapevole firmata IncanTour",
  },
  {
    src: "/assets/images/suggestioni dal mondo (2).jpg",
    title: "Suggestioni dal Mondo",
    caption: "Orizzonti lontani disegnati con cura artigianale",
  },
  {
    src: "/assets/images/turismo delle radici 2.jpg",
    title: "Turismo delle Radici",
    caption: "L'emozione di ritrovare le proprie origini familiari",
  },
  {
    src: "/assets/images/viaggi di nozze.jpg",
    title: "Viaggi di Nozze",
    caption: "Itinerari romantici e indimenticabili per coppie",
  },
];

export function TravelGallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") {
        setActiveIdx(null);
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) =>
          prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="travel-gallery-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-incan-gold-dark">
            Istantanee di viaggio
          </p>
          <h2
            id="travel-gallery-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-gradient-incan sm:text-5xl"
          >
            Travel Gallery
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Stunning moments captured by our travelers
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {galleryItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIdx(index)}
              aria-label={`Visualizza ${item.title}`}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                <div className="text-left text-white">
                  <p className="text-sm font-bold leading-tight drop-shadow">{item.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeIdx !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryItems[activeIdx].title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setActiveIdx(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveIdx(null)}
            aria-label="Chiudi finestra modale"
            className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-incan-gold"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) =>
                prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
              );
            }}
            aria-label="Immagine precedente"
            className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-incan-gold"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) =>
                prev !== null ? (prev + 1) % galleryItems.length : null
              );
            }}
            aria-label="Immagine successiva"
            className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-incan-gold"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-[85vw] max-w-4xl">
              <Image
                src={galleryItems[activeIdx].src}
                alt={galleryItems[activeIdx].title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <div className="bg-incan-ink/90 p-6 text-center text-white backdrop-blur">
              <h3 className="font-display text-2xl font-bold text-incan-cream">
                {galleryItems[activeIdx].title}
              </h3>
              <p className="mt-1 text-sm text-white/80">
                {galleryItems[activeIdx].caption}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
