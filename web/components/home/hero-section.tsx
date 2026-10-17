"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, CompassIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export const heroSlides = [
  {
    src: "/assets/images/CAROSELLO HOME/ABBAZIA GOLETO 3.webp",
    alt: "Abbazia del Goleto, Sant'Angelo dei Lombardi",
  },
  {
    src: "/assets/images/CAROSELLO HOME/ANFITEATRO .jpeg",
    alt: "Anfiteatro Campano, Santa Maria Capua Vetere",
  },
  {
    src: "/assets/images/CAROSELLO HOME/AtraniAmalfi-1134x750.jpg",
    alt: "Atrani e la Costiera Amalfitana",
  },
  {
    src: "/assets/images/CAROSELLO HOME/CUSANO MUTRI.jpg",
    alt: "Borgo storico di Cusano Mutri",
  },
  {
    src: "/assets/images/CAROSELLO HOME/FLORIDA-INSOLITA1.jpg",
    alt: "Florida insolita, suggestioni dal mondo",
  },
  {
    src: "/assets/images/CAROSELLO HOME/PANAMA.jpg",
    alt: "Panama, orizzonti esotici",
  },
  {
    src: "/assets/images/CAROSELLO HOME/PROCIDA2.jpeg",
    alt: "Scorcio caratteristico dell'isola di Procida",
  },
  {
    src: "/assets/images/CAROSELLO HOME/Parco archeologico di Pompei - Parco archeologico di Longola1.jpg",
    alt: "Parco archeologico di Pompei e Longola",
  },
  {
    src: "/assets/images/CAROSELLO HOME/S. AGATA DEI GOTI .jpeg",
    alt: "Veduta del borgo di Sant'Agata de' Goti",
  },
  {
    src: "/assets/images/CAROSELLO HOME/campi flegrei.jpeg",
    alt: "Paesaggio vulcanico dei Campi Flegrei",
  },
  {
    src: "/assets/images/CAROSELLO HOME/marina corricella.jpeg",
    alt: "Marina Corricella con case colorate a Procida",
  },
  {
    src: "/assets/images/CAROSELLO HOME/monastero s. chiara .jpg",
    alt: "Chiostro maiolicato del Monastero di Santa Chiara a Napoli",
  },
  {
    src: "/assets/images/CAROSELLO HOME/panorama isole.jfif",
    alt: "Panorama del Golfo di Napoli e delle isole",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isPlaying = !prefersReducedMotion && !isUserPaused;

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-incan-ink text-white"
      aria-roledescription="carousel"
      aria-label="Carosello destinazioni ed esperienze"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-incan-ink/50 via-transparent to-incan-ink/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="animate-floating motion-reduce:animate-none">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Immergiti in atmosfere
            <span className="mt-2 block bg-gradient-to-r from-incan-gold via-amber-300 to-incan-gold-dark bg-clip-text text-transparent drop-shadow-sm">
              incantevoli
            </span>
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/95 sm:text-xl md:text-2xl font-light leading-relaxed">
          Viaggi culturali esperienziali tra racconti, natura, sapori e tradizioni dalla Campania e dal mondo
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#featured-tours"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-incan-gold to-incan-gold-dark px-8 py-4 text-base font-bold text-white shadow-gold transition duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
          >
            <CompassIcon className="h-5 w-5 transition duration-500 group-hover:rotate-45" />
            <span>Inizia il tuo viaggio</span>
          </Link>
        </div>
      </div>

      {/* Accessible Controls & Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-12">
        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsUserPaused((prev) => !prev)}
          aria-label={isPlaying ? "Sospendi rotazione automatica" : "Avvia rotazione automatica"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-incan-gold"
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Slide Dots */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-[60vw] py-2 px-3 rounded-full bg-black/30 backdrop-blur-md">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Vai alla diapositiva ${idx + 1}: ${slide.alt}`}
              aria-current={idx === currentSlide}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-incan-gold" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Diapositiva precedente"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-incan-gold"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Diapositiva successiva"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-incan-gold"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
