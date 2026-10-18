import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/contact-form";
import { DirectionsSection } from "@/components/contact/directions-section";
import { LocationSection } from "@/components/contact/location-section";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Dove Siamo & Contatti - IncanTour | Centro Storico di Napoli",
  description:
    "Vieni a trovarci a Napoli in Calata Trinità Maggiore 53, presso Palazzo Pignatelli di Monteleone (Maison Degas). Contatta IncanTour al 338 435 7143 o invia una richiesta online.",
  alternates: { canonical: "/contatti" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Dove Siamo & Contatti - IncanTour",
    description:
      "Vieni a trovarci nel cuore del Centro Storico di Napoli o inviaci un messaggio per le tue proposte di viaggio su misura.",
    url: `${getSiteUrl().origin}/contatti`,
    images: [{ url: "/assets/images/contact.png", alt: "Sede IncanTour a Napoli" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dove Siamo & Contatti - IncanTour",
    description: "Sede centrale IncanTour a Napoli e modulo di contatto diretto.",
    images: ["/assets/images/contact.png"],
  },
};

export default function ContattiPage() {
  const siteUrl = getSiteUrl().origin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["ContactPage", "TravelAgency"],
    name: "IncanTour - Sede & Contatti",
    description:
      "Sede centrale di IncanTour nel cuore del Centro Storico di Napoli presso Palazzo Pignatelli di Monteleone.",
    url: `${siteUrl}/contatti`,
    image: `${siteUrl}/assets/images/contact.png`,
    telephone: "+39 338 435 7143",
    email: "info@incantour.it",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calata Trinità Maggiore, 53 - 3° piano",
      addressLocality: "Napoli",
      postalCode: "80134",
      addressRegion: "Campania",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.8463283,
      longitude: 14.2505505,
    },
    containedInPlace: {
      "@type": "Place",
      name: "Palazzo Pignatelli di Monteleone - Maison Degas",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/contact.png"
              alt="Contatti e Sede IncanTour"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(230, 165, 50, 0.8), rgba(27, 94, 95, 0.85))",
              }}
            />
          </div>

          <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/20 px-4 py-1.5 rounded-full inline-block mb-3 backdrop-blur-sm">
              Sede &amp; Contatti
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-md tracking-tight text-gradient-hero">
              DOVE SIAMO
            </h1>
            <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto font-light leading-relaxed">
              Vieni a trovarci nel cuore del Centro Storico di Napoli
            </p>
          </div>
        </section>

        {/* Dove Siamo - Palazzo Pignatelli & Map Section */}
        <LocationSection />

        {/* Come Raggiungerci - Transport & Directions Section */}
        <DirectionsSection />

        {/* Dedicated Contact Us & Form Section */}
        <ContactForm />
      </main>
    </>
  );
}
