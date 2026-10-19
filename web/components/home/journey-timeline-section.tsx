import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, GlobeIcon, HeartIcon, PencilIcon, QuoteIcon, UsersIcon } from "@/components/ui/icons";

export function JourneyTimelineSection() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32" aria-labelledby="journey-timeline-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header with Rotating Spiral */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <h2
              id="journey-timeline-title"
              className="font-display text-3xl font-bold tracking-tight text-gradient-incan sm:text-5xl"
            >
              Il Tuo Viaggio con Incantour
            </h2>
            <div className="relative h-12 w-12 shrink-0 animate-spin-slow motion-reduce:animate-none">
              <Image
                src="/assets/images/icon.png"
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Il tuo cuore batterà forte, non sarà adrenalina ma pura emozione, suggestioni da condividere, in incoming come in outgoing, tra compagni di viaggio e le genti dei luoghi. Il nostro approccio è circolare come la spirale che ci rappresenta: ogni esperienza è un ritorno al senso e all&apos;essenza del viaggio.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="mx-auto mt-20 max-w-4xl">
          {/* Steps & Central Line Wrapper */}
          <div className="relative">
            {/* Vertical Center Line - Layered strictly below icons (z-0) and stops at the steps */}
            <div
              className="absolute left-1/2 top-8 bottom-8 w-1 -translate-x-1/2 rounded-full bg-gradient-primary z-0 hidden sm:block"
              aria-hidden="true"
            />

            <div className="space-y-12 sm:space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col items-center sm:flex-row">
                <div className="w-full text-center sm:w-1/2 sm:pr-8 sm:text-right">
                  <h3 className="font-display text-xl font-bold text-slate-800 sm:text-2xl">
                    Ascoltiamo il tuo desiderio di scoperta
                  </h3>
                </div>
                <div className="relative z-10 my-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-warm text-white shadow-gold sm:my-0">
                  <HeartIcon className="h-7 w-7 text-white" />
                </div>
                <div className="hidden sm:block sm:w-1/2 sm:pl-8" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center sm:flex-row">
                <div className="hidden sm:block sm:w-1/2 sm:pr-8" />
                <div className="relative z-10 my-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-cool text-white shadow-md sm:my-0">
                  <PencilIcon className="h-7 w-7 text-white" />
                </div>
                <div className="w-full text-center sm:w-1/2 sm:pl-8 sm:text-left">
                  <h3 className="font-display text-xl font-bold text-slate-800 sm:text-2xl">
                    Disegniamo insieme la tua esperienza
                  </h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center sm:flex-row">
                <div className="w-full text-center sm:w-1/2 sm:pr-8 sm:text-right">
                  <h3 className="font-display text-xl font-bold text-slate-800 sm:text-2xl">
                    Vivi il viaggio come incontro
                  </h3>
                </div>
                <div className="relative z-10 my-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white shadow-md sm:my-0">
                  <GlobeIcon className="h-7 w-7 text-white" />
                </div>
                <div className="hidden sm:block sm:w-1/2 sm:pl-8" />
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center sm:flex-row">
                <div className="hidden sm:block sm:w-1/2 sm:pr-8" />
                <div className="relative z-10 my-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-warm text-white shadow-gold sm:my-0">
                  <QuoteIcon className="h-7 w-7 text-white" />
                </div>
                <div className="w-full text-center sm:w-1/2 sm:pl-8 sm:text-left">
                  <blockquote className="font-display text-xl font-bold italic text-slate-800 sm:text-2xl">
                    &ldquo;Non si viaggia per trovare se stessi ma per ritornare a casa trasformati&rdquo;
                  </blockquote>
                  <p className="mt-2 text-sm font-semibold text-slate-500">— Ralph Waldo Emerson</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs - Placed outside the timeline line wrapper */}
          <div className="relative z-10 mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/disegna-il-tuo-viaggio"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-warm px-8 py-4 text-base font-bold text-white shadow-gold transition duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
            >
              <span>Disegna il TUO VIAGGIO</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-cool px-8 py-4 text-base font-bold text-white shadow transition duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-teal"
            >
              <UsersIcon className="h-5 w-5" />
              <span>Scopri il TEAM</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
