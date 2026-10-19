import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, GlobeIcon, HeartIcon, PencilIcon, QuoteIcon, UsersIcon } from "@/components/ui/icons";

export function JourneyTimelineSection() {
  const steps = [
    {
      num: "01",
      title: "Ascoltiamo il tuo desiderio di scoperta",
      subtitle: "Comprensione profonda delle tue passioni e preferenze",
      icon: HeartIcon,
      gradient: "from-[#E6A532] to-[#D4941A]",
      shadow: "shadow-[0_8px_20px_rgba(230,165,50,0.3)]",
      align: "right",
    },
    {
      num: "02",
      title: "Disegniamo insieme la tua esperienza",
      subtitle: "Itinerari su misura tra storia, tradizioni e bellezza",
      icon: PencilIcon,
      gradient: "from-[#1B5E5F] to-[#0F4142]",
      shadow: "shadow-[0_8px_20px_rgba(27,94,95,0.3)]",
      align: "left",
    },
    {
      num: "03",
      title: "Vivi il viaggio come incontro",
      subtitle: "Connessione autentica con i luoghi, la cultura e le genti",
      icon: GlobeIcon,
      gradient: "from-[#E6A532] via-[#2A7576] to-[#0F4142]",
      shadow: "shadow-[0_8px_20px_rgba(230,165,50,0.25)]",
      align: "right",
    },
    {
      num: "04",
      quote: "Non si viaggia per trovare se stessi ma per ritornare a casa trasformati",
      author: "Ralph Waldo Emerson",
      icon: QuoteIcon,
      gradient: "from-[#E6A532] to-[#D4941A]",
      shadow: "shadow-[0_8px_20px_rgba(230,165,50,0.3)]",
      align: "left",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="journey-timeline-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <h2
              id="journey-timeline-title"
              className="font-display text-2xl font-extrabold tracking-tight text-gradient-incan sm:text-4xl lg:text-5xl"
            >
              Il Tuo Viaggio con Incantour
            </h2>
            <div className="relative h-9 w-9 sm:h-12 sm:w-12 shrink-0 animate-spin-slow motion-reduce:animate-none">
              <Image
                src="/assets/images/icon.png"
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl mx-auto">
            Il tuo cuore batterà forte, non sarà adrenalina ma pura emozione, suggestioni da condividere tra compagni di viaggio e le genti dei luoghi. Il nostro approccio è circolare come la spirale che ci rappresenta: ogni esperienza è un ritorno all&apos;essenza del viaggio.
          </p>
        </div>

        {/* ============================================================ */}
        {/* MOBILE VIEW (< sm): Clean, elegant left-aligned vertical line */}
        {/* ============================================================ */}
        <div className="block sm:hidden mt-12 max-w-md mx-auto relative pl-3 pr-2">
          {/* Continuous Vertical Timeline Line on Left */}
          <div
            className="absolute left-[31px] top-4 bottom-8 w-1 rounded-full bg-gradient-to-b from-[#E6A532] via-[#1B5E5F] to-[#E6A532]"
            aria-hidden="true"
          />

          <div className="space-y-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex items-start gap-4 group">
                  {/* Icon Node on the Line */}
                  <div
                    className={`relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center ${step.shadow} ring-4 ring-slate-50 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    {/* Small number badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border border-white/60">
                      {step.num}
                    </span>
                  </div>

                  {/* Content Card next to Icon */}
                  <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-amber-200">
                    {step.title ? (
                      <>
                        <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
                          {step.title}
                        </h3>
                        {step.subtitle && (
                          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            {step.subtitle}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <blockquote className="font-display text-sm font-bold italic text-slate-800 leading-snug">
                          &ldquo;{step.quote}&rdquo;
                        </blockquote>
                        <p className="mt-2 text-xs font-semibold text-amber-600">— {step.author}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW (>= sm): Centered alternating timeline           */}
        {/* ============================================================ */}
        <div className="hidden sm:block mx-auto mt-20 max-w-4xl relative">
          {/* Vertical Center Line */}
          <div
            className="absolute left-1/2 top-8 bottom-8 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#E6A532] via-[#1B5E5F] to-[#E6A532] z-0"
            aria-hidden="true"
          />

          <div className="space-y-16 relative z-10">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-10 text-right">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E6A532] block mb-1">FASE 01</span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Ascoltiamo il tuo desiderio di scoperta
                </h3>
              </div>
              <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E6A532] to-[#D4941A] text-white shadow-[0_8px_20px_rgba(230,165,50,0.3)] ring-8 ring-slate-50 transition-transform duration-300 hover:scale-110">
                <HeartIcon className="h-7 w-7 text-white" />
              </div>
              <div className="w-1/2 pl-10" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-10" />
              <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B5E5F] to-[#0F4142] text-white shadow-[0_8px_20px_rgba(27,94,95,0.3)] ring-8 ring-slate-50 transition-transform duration-300 hover:scale-110">
                <PencilIcon className="h-7 w-7 text-white" />
              </div>
              <div className="w-1/2 pl-10 text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B5E5F] block mb-1">FASE 02</span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Disegniamo insieme la tua esperienza
                </h3>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-10 text-right">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E6A532] block mb-1">FASE 03</span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Vivi il viaggio come incontro
                </h3>
              </div>
              <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E6A532] via-[#2A7576] to-[#0F4142] text-white shadow-[0_8px_20px_rgba(230,165,50,0.25)] ring-8 ring-slate-50 transition-transform duration-300 hover:scale-110">
                <GlobeIcon className="h-7 w-7 text-white" />
              </div>
              <div className="w-1/2 pl-10" />
            </div>

            {/* Step 4 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-10" />
              <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E6A532] to-[#D4941A] text-white shadow-[0_8px_20px_rgba(230,165,50,0.3)] ring-8 ring-slate-50 transition-transform duration-300 hover:scale-110">
                <QuoteIcon className="h-7 w-7 text-white" />
              </div>
              <div className="w-1/2 pl-10 text-left">
                <blockquote className="font-display text-2xl font-bold italic text-slate-800 leading-snug">
                  &ldquo;Non si viaggia per trovare se stessi ma per ritornare a casa trasformati&rdquo;
                </blockquote>
                <p className="mt-2 text-sm font-semibold text-slate-500">— Ralph Waldo Emerson</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="relative z-10 mt-14 sm:mt-20 flex flex-col items-center justify-center gap-4 sm:gap-6 sm:flex-row px-4">
          <Link
            href="/disegna-il-tuo-viaggio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-warm px-8 py-4 text-sm sm:text-base font-bold text-white shadow-gold transition duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold text-center"
          >
            <span>Disegna il TUO VIAGGIO</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/team"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-cool px-8 py-4 text-sm sm:text-base font-bold text-white shadow transition duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-teal text-center"
          >
            <UsersIcon className="h-5 w-5" />
            <span>Scopri il TEAM</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
