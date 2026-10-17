import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CompanyHero } from "@/components/company/company-hero";
import {
  UsersIcon,
  MapPinIcon,
  HikingIcon,
  BicycleIcon,
  HotelIcon,
  CameraIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
} from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lavora Con Noi - Diventa Partner Territoriale | IncanTour",
  description:
    "Entra nel Network Terramare IncanTour: cerchiamo proloco, guide turistiche, operatori outdoor, cicloturismo, strutture ricettive e content creator in Campania.",
  alternates: { canonical: "/lavora-con-noi" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Lavora Con Noi - IncanTour",
    description: "Diventa attore del tuo territorio con il network esperienziale IncanTour.",
    url: `${getSiteUrl().origin}/lavora-con-noi`,
    images: [{ url: "/assets/images/campania experience.jpg", alt: "Lavora con noi IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavora Con Noi - IncanTour",
    description: "Diventa protagonista dell'offerta turistica esperienziale e slow in Campania.",
    images: ["/assets/images/campania experience.jpg"],
  },
};

const PROFILES = [
  { label: "Proloco e associazioni", icon: UsersIcon },
  { label: "Guide turistiche ed escursionistiche", icon: MapPinIcon },
  { label: "Operatori turismo esperienziale e outdoor", icon: HikingIcon },
  { label: "Cicloturismo e accompagnatori", icon: BicycleIcon },
  { label: "Ricettivo, alberghi e strutture extralberghiere", icon: HotelIcon },
  { label: "Travel blogger, storyteller e content creator", icon: CameraIcon },
];

export default function LavoraConNoiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Lavora Con Noi - IncanTour",
    description:
      "Diventa attore del tuo territorio! Entra a far parte del Network Terramare IncanTour.",
    url: `${getSiteUrl().origin}/lavora-con-noi`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        {/* 1. Hero Section */}
        <CompanyHero
          title="LAVORA CON NOI"
          highlight="Diventa attore del tuo territorio!"
          subtitle="Un racconto tra cultura, natura, borghi, acqua, terra, aria, fuoco, produzioni tipiche e artigianato artistico per coinvolgere tutti i sensi del viaggiatore."
          eyebrow="Collabora Con Noi"
          bgImage="/assets/images/campania experience.jpg"
          breadcrumbLabel="Lavora con noi"
        />

        {/* 2. Call to Action Banner Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="rounded-3xl p-8 sm:p-12 md:p-16 text-white shadow-2xl bg-gradient-primary">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                Entra a far parte del Network<br />Terramare IncanTour
              </h2>
              <p className="text-base sm:text-xl leading-relaxed opacity-95 max-w-3xl">
                Diventa protagonista dell&apos;offerta turistico-culturale esperienziale e slow IncanTour.
              </p>
              <div className="mt-8 pt-8 border-t border-white/30 flex items-center justify-between flex-wrap gap-4">
                <p className="text-xl sm:text-3xl font-extrabold text-amber-200">
                  ✨ CERCHIAMO TE ✨
                </p>
                <Link
                  href="/contatti?arg=candidatura"
                  className="bg-white text-teal-950 font-extrabold px-8 py-4 rounded-full shadow-lg hover:bg-amber-100 transition-all transform hover:scale-105 active:scale-95 text-base"
                >
                  Candidati Ora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Profiles Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532] block mb-2">
                Ricerca Professionisti
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-950 mb-4 tracking-tight">
                Profili che vogliamo coinvolgere
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                Siamo alla ricerca di professionisti e organizzazioni appassionati di turismo e cultura
              </p>
              <div className="w-24 h-1 mx-auto mt-6 bg-gradient-warm rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROFILES.map((profile, idx) => {
                const Icon = profile.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-8 text-center shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                  >
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-teal-900 transition-colors">
                      {profile.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Territory Collaboration Section */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-stretch">
              {/* Left Column */}
              <div className="rounded-3xl p-8 sm:p-12 shadow-xl text-white bg-gradient-cool flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-3">
                    Integrazione Terramare
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 leading-tight">
                    Raccontiamo insieme il nostro territorio
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed opacity-95 mb-8">
                    Rendiamo partecipi i viaggiatori di suggestioni dal viaggio alla scoperta della Campania, in una perfetta integrazione Terramare tra aree interne e fasce costiere.
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-amber-300 shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">
                      Collaborazione autentica e duratura
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-amber-300 shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">
                      Valorizzazione delle eccellenze locali
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact CTA Box */}
              <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532] block mb-2">
                    Entra in Contatto
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mb-4">
                    Invia la tua Candidatura
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                    Scrivici indicando la tua attività, la tua esperienza e la zona operativa di riferimento. Il nostro team ti ricontatterà per approfondire insieme le possibilità di collaborazione.
                  </p>
                </div>

                <Link
                  href="/contatti?arg=candidatura"
                  className="block text-center bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:opacity-95 transform hover:scale-105 active:scale-95 transition-all text-base"
                >
                  Contattaci Subito
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Full-Width Maison Degas - Dimora de Charme Section */}
        <section className="w-full py-16 sm:py-20 bg-gradient-to-r from-[#1B5E5F]/95 via-[#0F4142] to-[#1B5E5F] text-white shadow-2xl">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Logo & Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                <a
                  href="https://maisondegas.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block shrink-0 group"
                  aria-label="Scopri Maison Degas (apre in una nuova scheda)"
                >
                  <div className="bg-white/95 p-5 rounded-3xl border-2 border-amber-400/80 shadow-2xl group-hover:scale-105 group-hover:border-amber-300 transition-all duration-300">
                    <Image
                      src="/assets/images/mason-degas.png"
                      alt="Maison Degas - Dimora de Charme"
                      width={160}
                      height={96}
                      className="h-20 sm:h-24 w-auto object-contain"
                    />
                  </div>
                </a>

                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
                      Dimora de Charme
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    Maison Degas
                  </h2>
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl font-normal">
                    Sede ufficiale di Incantour al 3° piano dello storico Palazzo Pignatelli di Monteleone (XVI secolo) in Piazza del Gesù Nuovo, Napoli.
                  </p>
                </div>
              </div>

              {/* External CTA Link */}
              <div className="shrink-0">
                <a
                  href="https://maisondegas.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E6A532] to-[#D4941A] hover:from-[#D4941A] hover:to-[#E6A532] text-white font-extrabold px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-base sm:text-lg border border-amber-300/40"
                >
                  <span>Scopri Maison Degas</span>
                  <ExternalLinkIcon className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
