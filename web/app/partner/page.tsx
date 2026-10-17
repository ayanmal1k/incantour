import type { Metadata } from "next";
import Link from "next/link";
import { CompanyHero } from "@/components/company/company-hero";
import { CompanyCard } from "@/components/company/company-card";
import {
  LinkIcon,
  BullhornIcon,
  ChartLineIcon,
  BuildingIcon,
  LightbulbIcon,
  LandmarkIcon,
  PaletteIcon,
  CameraIcon,
  GlobeIcon,
} from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Partner & Network Territoriale - IncanTour",
  description:
    "La piattaforma IncanTour: luogo di incontro digitale tra domanda e offerta per operatori turistici, imprese locali, enti pubblici e stakeholder in Campania e in Italia.",
  alternates: { canonical: "/partner" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Partner & Network - IncanTour",
    description:
      "La piattaforma INCANTOUR, luogo di incontro digitale tra domanda e offerta, tra territorio e viaggiatori nazionali ed internazionali.",
    url: `${getSiteUrl().origin}/partner`,
    images: [{ url: "/assets/images/campania experience.jpg", alt: "Partner IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner & Network - IncanTour",
    description: "Hub aperto a stakeholder pubblici e privati per la valorizzazione del territorio.",
    images: ["/assets/images/campania experience.jpg"],
  },
};

const STAKEHOLDERS = [
  { label: "Operatori pubblici e privati", icon: BuildingIcon },
  { label: "Imprese locali e creative", icon: LightbulbIcon },
  { label: "Enti pubblici e istituzioni", icon: LandmarkIcon },
  { label: "Strutture museali e media", icon: PaletteIcon },
  { label: "Professionisti e content creator", icon: CameraIcon },
  { label: "Partner nazionali e internazionali", icon: GlobeIcon },
];

export default function PartnerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Partner & Network - IncanTour",
    description:
      "La piattaforma IncanTour connette territori, esperienze e persone in un ecosistema integrato e dinamico.",
    url: `${getSiteUrl().origin}/partner`,
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
          title="PARTNER"
          subtitle="La piattaforma INCANTOUR, luogo di incontro digitale tra domanda e offerta, tra territorio e viaggiatori nazionali ed internazionali."
          eyebrow="Network Partner"
          bgImage="/assets/images/campania experience.jpg"
          breadcrumbLabel="Partner"
        />

        {/* 2. Feature Cards Section: Connette, Amplifica, Genera Valore */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <CompanyCard
                icon={LinkIcon}
                title="Connette"
                description="Connette territori, esperienze e persone in un unico ecosistema digitale integrato e dinamico."
                variant="solid-cool"
              />

              <CompanyCard
                icon={BullhornIcon}
                title="Amplifica"
                description="Amplifica la visibilità degli operatori e delle eccellenze territoriali su scala nazionale e internazionale."
                variant="solid-warm"
              />

              <CompanyCard
                icon={ChartLineIcon}
                title="Genera Valore"
                description="Genera valore concreto in ottica di sviluppo culturale e turistico sostenibile."
                variant="solid-primary"
              />
            </div>
          </div>
        </section>

        {/* 3. Hub Stakeholder Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532] block mb-2">
                Opportunità di Sinergia
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-950 mb-4 tracking-tight">
                Un Hub aperto a stakeholder pubblici e privati
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                Una community diversificata per creare sinergie e opportunità di collaborazione sul territorio
              </p>
              <div className="w-24 h-1 mx-auto mt-6 bg-gradient-warm rounded-full" />
            </div>

            {/* 6 Stakeholder Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STAKEHOLDERS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
                  >
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-900 transition-colors">
                      {item.label}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                href="/contatti?arg=partner"
                className="inline-block bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-extrabold px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:opacity-95 transform hover:scale-105 active:scale-95 transition-all text-base sm:text-lg"
              >
                Diventa Partner Incantour
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
