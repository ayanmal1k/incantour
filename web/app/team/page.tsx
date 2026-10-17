import type { Metadata } from "next";
import Link from "next/link";
import { CompanyHero } from "@/components/company/company-hero";
import { CompanyCard } from "@/components/company/company-card";
import { PlaneArrivalIcon, HeartIcon, PlaneDepartureIcon, MapPinIcon } from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Il Nostro Team - Consulenti di Viaggio & Destination Experts | IncanTour",
  description:
    "Incontra il team di IncanTour: consulenti di viaggio e destination locals experts a Napoli in Piazza del Gesù Nuovo, specializzati in incoming, wedding e outgoing.",
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Il Nostro Team - IncanTour",
    description: "Professionalità, passione e dedizione al servizio dei viaggiatori.",
    url: `${getSiteUrl().origin}/team`,
    images: [{ url: "/assets/images/IL nostro TEAM.png", alt: "Il nostro Team IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Il Nostro Team - IncanTour",
    description: "Consulenti di viaggio e destination locals experts.",
    images: ["/assets/images/IL nostro TEAM.png"],
  },
};

export default function TeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Il Nostro Team - IncanTour",
    description:
      "Professionalità, passione e dedizione al servizio dei viaggiatori. Consulenti di viaggio e destination locals expert.",
    url: `${getSiteUrl().origin}/team`,
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
          title="IL NOSTRO TEAM"
          subtitle="Professionalità, passione e dedizione al servizio dei viaggiatori."
          eyebrow="Chi Siamo"
          bgImage="/assets/images/IL nostro TEAM.png"
          breadcrumbLabel="Il nostro Team"
        />

        {/* 2. Philosophy & Engagement Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532] block mb-2">
                Esperienze Sartoriali
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-gradient-dark leading-tight">
                Come possiamo rendere il tuo tempo di viaggio una singolare e seducente esperienza?
              </h2>

              <div className="space-y-4 max-w-3xl mx-auto leading-relaxed">
                <p className="text-xl sm:text-2xl font-bold text-teal-900">
                  Ascoltiamo i tuoi desideri
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#E6A532]">
                  Progettiamo insieme
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-2">
                  Dai percorsi narrati, ai borghi più autentici, alle mete più insolite: siamo pronti a trasformare le tue attese in un&apos;esperienza ammaliante, che parla di te.
                </p>
              </div>
            </div>

            {/* 3. Destination Local Experts & Contact Cards */}
            <div className="mb-20">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-900">
                Contatta i nostri CONSULENTI DI VIAGGIO &amp; DESTINATION LOCALS EXPERT:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <CompanyCard
                  icon={PlaneArrivalIcon}
                  title="Incoming"
                  description="Scopri l'Italia e la Campania con noi: percorsi culturali, borghi autentici, dimore storiche e radici."
                  linkHref="/contatti?arg=incoming"
                  linkLabel="Contatta per Incoming"
                  iconGradient="warm"
                />

                <CompanyCard
                  icon={HeartIcon}
                  title="Wedding"
                  description="Il tuo matrimonio da sogno e la tua luna di miele da favola, con cura sartoriale di ogni dettaglio."
                  linkHref="/wedding-planner"
                  linkLabel="Scopri Wedding & Coordination"
                  iconGradient="cool"
                />

                <CompanyCard
                  icon={PlaneDepartureIcon}
                  title="Outgoing"
                  description="Viaggia nel mondo con itinerari unici, avventure atipiche e tour su misura costruiti per te."
                  linkHref="/contatti?arg=outgoing"
                  linkLabel="Contatta per Outgoing"
                  iconGradient="primary"
                />
              </div>
            </div>

            {/* 4. Travel Café & Historic Headquarters Card */}
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-amber-50/70 via-white to-teal-50/70 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-[#E6A532] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MapPinIcon className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E5F] block mb-2">
                Napoli Centro Storico
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 text-teal-950">
                Vieni a trovarci!
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
                Venite ad incontrarci nel nostro spazio Travel Cafè, in pieno centro storico a Napoli, nella splendida cornice di Piazza del Gesù Nuovo, all&apos;interno del 500esco Palazzo dei principi Pignatelli di Monteleone.
              </p>
              <Link
                href="/contatti"
                className="inline-block bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-extrabold px-10 py-4.5 rounded-full shadow-lg hover:shadow-xl hover:opacity-95 transform hover:scale-105 active:scale-95 transition-all text-base"
              >
                Vi aspettiamo!
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
