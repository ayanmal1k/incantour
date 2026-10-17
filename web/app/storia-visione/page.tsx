import type { Metadata } from "next";
import { CompanyHero } from "@/components/company/company-hero";
import { CompanyCard } from "@/components/company/company-card";
import { DocumentCta } from "@/components/company/document-cta";
import { CompassIcon, GlobeIcon, HeartIcon } from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Storia & Visione - IncanTour | Tour Operator Autore in Campania",
  description:
    "Scopri la storia di IncanTour, fondata nel 2009 da Francesco ed Emanuela: agenzia di viaggi e tour operator autore per l'incoming turistico-culturale tra terra e mare in Campania.",
  alternates: { canonical: "/storia-visione" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Storia & Visione - IncanTour",
    description:
      "La nostra storia, la nostra visione del turismo e dell'accoglienza esperienziale in Campania e in Italia.",
    url: `${getSiteUrl().origin}/storia-visione`,
    images: [{ url: "/assets/images/storia e visione.png", alt: "Storia e Visione IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storia & Visione - IncanTour",
    description: "La storia e la visione del turismo culturale ed esperienziale in Campania.",
    images: ["/assets/images/storia e visione.png"],
  },
};

export default function StoriaVisionePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Storia & Visione - IncanTour",
    description:
      "Incantour nasce nel 2009 come agenzia di viaggi e tour operator autore per l'incoming turistico-culturale in Campania.",
    url: `${getSiteUrl().origin}/storia-visione`,
    publisher: {
      "@type": "TravelAgency",
      name: "IncanTour",
      url: getSiteUrl().origin,
      foundingDate: "2009",
      founders: [
        { "@type": "Person", name: "Francesco" },
        { "@type": "Person", name: "Emanuela" },
      ],
    },
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
          title="Storia & Visione"
          subtitle="La nostra storia, la nostra visione del turismo e dell'accoglienza esperienziale in Campania"
          eyebrow="Chi Siamo"
          bgImage="/assets/images/storia e visione.png"
          breadcrumbLabel="Storia & Visione"
        />

        {/* 2. Story Narrative Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532] block mb-2">
                Dal 2009
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-gradient-dark">
                La Nostra Storia
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 font-normal">
                Incantour nasce nel 2009 come agenzia di viaggi &amp; turismo &amp; &ldquo;tour operator autore&rdquo; per l&apos;incoming turistico – culturale in Campania: il sogno realizzato di due imprenditori, Francesco ed Emanuela, esperti in marketing territoriale.
              </p>

              {/* Document Download CTA */}
              <div className="pt-2">
                <DocumentCta
                  href="/assets/documents/Rassegna_Stampa_TerraMare.pdf"
                  filename="Rassegna_Stampa_TerraMare.pdf"
                  label="Rassegna stampa TerraMare"
                />
              </div>
            </div>

            {/* 3. Three Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <CompanyCard
                icon={CompassIcon}
                title="Alla scoperta dell'inconsueto"
                description="Da sempre accompagnati da una profonda consapevolezza: l'offerta di soggiorno contempla un &ldquo;tempo&rdquo; prezioso che appartiene unicamente all'ospite. Consci dell'estrema delicatezza di tale tempo, vi accompagniamo nel racconto del territorio alla riscoperta di luoghi ed atmosfere lontani dai tradizionali flussi del turismo di massa."
                iconGradient="warm"
              />

              <CompanyCard
                icon={GlobeIcon}
                title="Incoming e Outgoing"
                description="Nell'incoming come nell'outgoing, ci rivolgiamo agli operatori che considerano il turismo un soddisfacimento della sfera emotiva e rievocativa del viaggiatore. Nel tempo abbiamo selezionato tour operator nazionali ed internazionali che ricercano le soluzioni più rispondenti alla personalizzazione del soggiorno."
                iconGradient="cool"
              />

              <CompanyCard
                icon={HeartIcon}
                title="Accoglienza e Cura dei Dettagli"
                description="La ricerca costante, l'attenzione ai particolari, la cura autentica dell'ospite e la qualità eccellente dei servizi sono gli ingredienti fondamentali dei nostri percorsi di viaggio, curati con passione dai nostri product manager e dai partner locali sul territorio."
                iconGradient="primary"
              />
            </div>

            {/* 4. Terra e Mare Integration Box */}
            <div className="bg-gradient-to-r from-amber-50/70 via-teal-50/50 to-amber-50/70 rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E5F] block mb-2">
                Visione Esperienziale
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mb-4">
                L&apos;Integrazione tra Terra e Mare
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                In questi anni abbiamo disegnato offerte di soggiorno integrando i segni della cultura della terra e del mare, le aree interne ancora da svelare e le celebri aree costiere.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Si è così sviluppata la nostra passione di immaginare continui parallelismi tra i vari linguaggi culturali internazionali e le tradizioni autentiche dell&apos;Italia.
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
