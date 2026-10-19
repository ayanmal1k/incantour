import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CustomTripFeatures } from "@/components/custom-trip/custom-trip-features";
import { CustomTripForm } from "@/components/custom-trip/custom-trip-form";
import { ClockIcon, GlobeIcon, HeartIcon, ShieldIcon } from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Disegna il Tuo Viaggio su Misura - IncanTour | Incoming & Outgoing",
  description:
    "Crea il tuo itinerario personalizzato in Campania, in Italia o nel mondo con IncanTour. Compila il modulo e un nostro Travel Expert ti contatterà entro 24 ore.",
  alternates: { canonical: "/disegna-il-tuo-viaggio" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Disegna il Tuo Viaggio su Misura - IncanTour",
    description:
      "Per il tuo viaggio su misura, scrivi ai ns. consulenti di viaggio! Sarai contattato da un nostro Travel expert in 24 h.",
    url: `${getSiteUrl().origin}/disegna-il-tuo-viaggio`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Disegna il Tuo Viaggio su Misura - IncanTour",
    description: "Modulo di richiesta viaggio su misura incoming & outgoing con IncanTour.",
  },
};

export default function DisegnaViaggioPage() {
  const siteUrl = getSiteUrl().origin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Disegna il Tuo Viaggio su Misura - IncanTour",
    description:
      "Modulo per la richiesta di itinerari personalizzati incoming e outgoing gestito da esperti di viaggio.",
    url: `${siteUrl}/disegna-il-tuo-viaggio`,
    publisher: {
      "@type": "TravelAgency",
      name: "IncanTour",
      url: siteUrl,
      telephone: "+39 338 435 7143",
      email: "info@incantour.it",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-gray-50 min-h-screen pb-24 text-gray-800">
        {/* Hero Section matching /prenota styling */}
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-28 text-white">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/campania experience.jpg"
              alt="Disegna il Tuo Viaggio su Misura con IncanTour"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 0, 0, 0.72) 0%, rgba(27, 94, 95, 0.65) 50%, rgba(15, 65, 66, 0.75) 100%)",
              }}
            />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
              <Link href="/" className="hover:text-amber-300 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-amber-300 font-medium">Disegna il Tuo Viaggio</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/15 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/20">
              Viaggi & Esperienze su Misura
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight leading-tight text-gradient-hero drop-shadow-md">
              Disegna il TUO VIAGGIO
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Per il tuo viaggio su misura, scrivi ai ns. consulenti di viaggio! Sarai contattato da un nostro Travel expert in 24 h.
            </p>

            {/* Value badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <HeartIcon className="w-4 h-4 text-amber-300" />
                <span>100% Su Misura</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ClockIcon className="w-4 h-4 text-amber-300" />
                <span>Risposta entro 24h</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <GlobeIcon className="w-4 h-4 text-amber-300" />
                <span>Incoming & Outgoing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Trip Form Section */}
        <CustomTripForm />

        {/* Value Proposition Features */}
        <CustomTripFeatures />
      </main>
    </>
  );
}
