import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ToursCatalog } from "@/components/tours/tours-catalog";
import { getTours } from "@/lib/wordpress/client";
import type { Tour } from "@/lib/wordpress/types";

export const metadata: Metadata = {
  title: "I Nostri Tour - IncanTour | Esperienze Autentiche",
  description:
    "Scopri la collezione di tour IncanTour: viaggi culturali, turismo delle radici, itinerari tematici e percorsi esperienziali in Campania e nel mondo.",
  openGraph: {
    title: "I Nostri Tour - IncanTour",
    description: "Esplora i pacchetti tour accuratamente selezionati dal team di IncanTour.",
  },
};

export const revalidate = 300;

export default async function ToursPage() {
  let tours: Tour[] = [];

  try {
    tours = await getTours(50);
  } catch (error) {
    console.error("Unable to fetch tours for /tours catalog:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header (Legacy-styled hero banner) */}
      <section className="relative h-[48vh] min-h-[380px] w-full overflow-hidden bg-slate-900">
        <Image
          src="/assets/images/slides/1240X500_sant_agata_de_goti_destination.webp"
          alt="I Nostri Tour - IncanTour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/40" />

        <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-6 pb-20 pt-28 text-white">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm font-medium text-white/80">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#E6A532] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#E6A532] font-semibold">I Nostri Tour</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gradient-hero mb-3">
            I Nostri Tour
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light">
            Scopri le nostre esperienze uniche e indimenticabili, in Campania e nel mondo.
          </p>
        </div>
      </section>

      {/* Catalog with Interactive Search, Type Filters, and Exact TourCards */}
      <ToursCatalog initialTours={tours} />
    </main>
  );
}
