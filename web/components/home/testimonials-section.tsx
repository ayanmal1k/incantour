import Image from "next/image";

import { MapPinIcon, QuoteIcon, StarIcon } from "@/components/ui/icons";

export const testimonials = [
  {
    name: "Marco Rossini",
    location: "Milano, Italia",
    rating: 5,
    image: "/assets/images/testimonial_marco.png",
    text: "IncanTour ha superato ogni nostra aspettativa. La cura dei dettagli nei percorsi storici e la passione delle guide ci hanno fatto vivere un'esperienza indimenticabile.",
  },
  {
    name: "Elena Bianchi",
    location: "Napoli, Italia",
    rating: 5,
    image: "/assets/images/testimonial_elena.png",
    text: "Esperienza straordinaria con il tour Campania Experience! Abbiamo scoperto borghi autentici e sapori genuini che non avremmo mai trovato da soli. Consigliatissimo!",
  },
  {
    name: "Giuseppe Moretti",
    location: "Roma, Italia",
    rating: 5,
    image: "/assets/images/testimonial_giuseppe.png",
    text: "Il turismo delle radici è stata un'emozione indescrivibile. Rivedere i luoghi dei miei nonni con il supporto attento e discreto di Incantour è stato magico.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/20 to-white py-24 sm:py-32">
      {/* Decorative Blur Orbs */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-incan-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-incan-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-incan-gold-dark">
            Recensioni e testimonianze
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gradient-incan sm:text-5xl">
            I viaggiatori Incantour dicono di noi
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Esperienze reali condivise da chi ha viaggiato con noi
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-card backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
            >
              {/* Decorative Quote Mark */}
              <div
                className="pointer-events-none absolute -right-2 -top-2 select-none text-slate-100 transition-colors duration-500 group-hover:text-amber-100/60"
                aria-hidden="true"
              >
                <QuoteIcon className="h-28 w-28" />
              </div>

              <div className="relative z-10">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400" aria-label={`Valutazione: ${item.rating} su 5 stelle`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-6 font-sans text-base italic leading-relaxed text-slate-700 sm:text-lg">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
              </div>

              {/* Author footer */}
              <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-incan-gold/50 shadow-md transition-colors duration-300 group-hover:border-incan-gold">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-incan-teal transition-colors group-hover:text-incan-ink">
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500 sm:text-sm">
                    <MapPinIcon className="h-3.5 w-3.5 text-incan-gold" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
