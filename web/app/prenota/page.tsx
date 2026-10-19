import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingFeatures } from "@/components/booking/booking-features";
import { BookingForm } from "@/components/booking/booking-form";
import { ClockIcon, PhoneIcon, ShieldIcon } from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";
import { getTours } from "@/lib/wordpress/client";
import type { Tour } from "@/lib/wordpress/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Prenota il Tuo Tour - IncanTour | Esperienze e Viaggi su Misura",
  description:
    "Prenota il tuo tour o esperienza in Campania e nel mondo con IncanTour. Calcolo immediato, opzioni personalizzate e assistenza dedicata entro 24 ore.",
  alternates: { canonical: "/prenota" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Prenota il Tuo Tour - IncanTour",
    description:
      "Richiedi la disponibilità per il tuo itinerario esclusivo in Campania e nel mondo con IncanTour.",
    url: `${getSiteUrl().origin}/prenota`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Prenota il Tuo Tour - IncanTour",
    description: "Modulo di prenotazione tour ed esperienze con IncanTour.",
  },
};

interface PrenotaPageProps {
  searchParams: Promise<{
    tour?: string;
    quantity?: string;
    price?: string;
  }>;
}

export default async function PrenotaPage({ searchParams }: PrenotaPageProps) {
  const resolvedParams = await searchParams;
  const tourParam = resolvedParams.tour;
  const quantityParam = resolvedParams.quantity ? parseInt(resolvedParams.quantity, 10) : undefined;
  const priceParam = resolvedParams.price ? parseFloat(resolvedParams.price) : undefined;

  let tours: Tour[] = [];
  try {
    tours = await getTours(50);
  } catch (err) {
    console.error("Error retrieving tours for booking page:", err);
  }

  const siteUrl = getSiteUrl().origin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Prenota il Tuo Tour - IncanTour",
    description: "Modulo di prenotazione tour ed esperienze culturali ed esperienziali.",
    url: `${siteUrl}/prenota`,
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
        {/* Booking Hero Section */}
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-28 text-white">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/campania experience.jpg"
              alt="Prenotazione Tour IncanTour"
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
              <span className="text-amber-300 font-medium">Prenota un Tour</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/15 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/20">
              Booking Online
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight leading-tight text-gradient-hero drop-shadow-md">
              Prenota il Tuo Viaggio da Sogno
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Compila il modulo per verificare la disponibilità e riservare i tuoi posti. Il nostro team ti ricontatterà entro 24 ore.
            </p>

            {/* Value badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ShieldIcon className="w-4 h-4 text-amber-300" />
                <span>Prenotazione Sicura</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <PhoneIcon className="w-4 h-4 text-amber-300" />
                <span>H/24 Viaggi in Sicurezza
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ClockIcon className="w-4 h-4 text-amber-300" />
                <span>Senza Impegno</span>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <BookingForm
          initialTours={tours}
          initialTourId={tourParam}
          initialQuantity={quantityParam}
          initialPrice={priceParam}
        />

        {/* Value Proposition Features */}
        <BookingFeatures />
      </main>
    </>
  );
}
