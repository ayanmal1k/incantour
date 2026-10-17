import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";

export const travelStyles = [
  {
    title: "Campania Experience",
    subtitle: "L'incanto dei 5 sensi.",
    image: "/assets/images/campania experience.jpg",
    href: "/terra-mare-tour",
  },
  {
    title: "Radici & Cultura",
    subtitle: "In viaggio alla ricerca delle proprie origini.",
    image: "/assets/images/radici&cultura.jpg",
    href: "/percorsi-lingua-italiana",
  },
  {
    title: "GRUPPI A TEMA",
    subtitle: "Dettagli per accendere l'immaginazione.",
    image: "/assets/images/theme.jpg",
    href: "/gruppi-a-tema",
  },
  {
    title: "Destination Wedding",
    subtitle: "Sposarsi in Campania, un racconto fantastico.",
    image: "/assets/images/destination wedding 1.jpg",
    href: "/destination-wedding",
  },
];

export function TravelStylesSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gradient-incan sm:text-5xl">
            Scegli la tua esperienza in Campania
          </h2>
          <blockquote className="mt-4 text-lg italic text-slate-600 sm:text-xl">
            &ldquo;In viaggio la cosa migliore è perdersi…&rdquo; <span className="not-italic text-slate-500">— Nicolas Bouvier</span>
          </blockquote>
        </div>

        {/* 2x2 Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {travelStyles.map((style) => (
            <Link
              key={style.title}
              href={style.href}
              className="group relative flex h-80 items-end overflow-hidden rounded-3xl shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-card-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
            >
              {/* Background Image */}
              <Image
                src={style.image}
                alt={style.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-85" />

              {/* Content */}
              <div className="relative z-10 w-full p-8 text-center text-white">
                <h3 className="font-display text-2xl font-bold sm:text-3xl text-incan-cream">
                  {style.title}
                </h3>
                <p className="mt-2 text-sm text-white/90 sm:text-base">
                  {style.subtitle}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-incan-gold transition duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                  <span>Esplora l&apos;esperienza</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
