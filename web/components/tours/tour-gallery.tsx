"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "@/components/ui/icons";

type GalleryItem = string | { url: string; alt?: string };

type TourGalleryProps = {
  gallery?: GalleryItem[];
  tourTitle?: string;
};

export function TourGallery({ gallery = [], tourTitle = "Tour" }: TourGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images: { url: string; alt: string }[] = gallery
    .map((item, idx) => {
      if (typeof item === "string" && item.trim()) {
        return { url: item, alt: `${tourTitle} - foto ${idx + 1}` };
      }
      if (item && typeof item === "object" && item.url) {
        return { url: item.url, alt: item.alt || `${tourTitle} - foto ${idx + 1}` };
      }
      return null;
    })
    .filter((img): img is { url: string; alt: string } => img !== null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
    }

    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-slate-100">
      <h2 className="text-2xl font-bold text-[#1B5E5F] mb-6">Galleria Fotografica</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveImageIndex(idx)}
            className="group relative h-44 sm:h-52 w-full overflow-hidden rounded-xl bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6A532]"
            aria-label={`Visualizza immagine ${idx + 1}: ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition focus:outline-none"
              aria-label="Chiudi visualizzatore"
            >
              <XIcon className="h-6 w-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[activeImageIndex].url}
                alt={images[activeImageIndex].alt}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : images.length - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/80 transition"
                  aria-label="Immagine precedente"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev !== null && prev < images.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/80 transition"
                  aria-label="Immagine successiva"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Caption & Counter */}
            <div className="mt-4 text-center text-sm text-white/80">
              <span>{images[activeImageIndex].alt}</span>
              <span className="mx-2">•</span>
              <span>
                {activeImageIndex + 1} di {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
