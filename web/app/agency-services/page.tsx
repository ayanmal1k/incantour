import type { Metadata } from "next";
import Link from "next/link";
import { AgencyServicesContent } from "@/components/agency/agency-services-content";
import { getSiteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agency Services | Biglietteria Treni, Bus & Servizi per Agenzie - IncanTour",
  description:
    "Servizi dedicati per agenzie di viaggio e clienti: biglietteria ferroviaria Trenitalia e Italo, linee bus nazionali e internazionali Flixbus e MarinoBus, noleggio bus e transfer.",
  alternates: { canonical: "/agency-services" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Agency Services | Biglietteria Treni, Bus & Servizi per Agenzie - IncanTour",
    description:
      "Servizio completo di biglietteria treni e bus, noleggio con conducente e assistenza logistica per agenzie partner e clienti IncanTour.",
    url: `${getSiteUrl().origin}/agency-services`,
    images: [{ url: "/assets/images/campania experience.jpg", alt: "Agency Services IncanTour" }],
  },
};

export default function AgencyServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agency Services IncanTour",
    provider: {
      "@type": "TravelAgency",
      name: siteName,
      url: getSiteUrl().origin,
    },
    description:
      "Servizi dedicati di biglietteria treni e bus, transfer e supporto logistico per agenzie e tour operator.",
    areaServed: "Italy",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgencyServicesContent />
    </>
  );
}
