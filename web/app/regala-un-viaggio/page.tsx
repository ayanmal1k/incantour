import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VoucherForm } from "@/components/voucher/voucher-form";
import { ClockIcon, GiftIcon, ShieldIcon } from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Regala un Viaggio - Buono Regalo Esperienziale | IncanTour",
  description:
    "Dona un'esperienza indimenticabile con i voucher regalo IncanTour. Buoni viaggio personalizzati spendibili per tour in Campania e nel mondo, validi 12 mesi.",
  alternates: { canonical: "/regala-un-viaggio" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Regala un Viaggio - Buono Regalo Esperienziale | IncanTour",
    description:
      "Crea un voucher viaggio personalizzato per compleanni, matrimoni, lauree e occasioni speciali con IncanTour.",
    url: `${getSiteUrl().origin}/regala-un-viaggio`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Regala un Viaggio - IncanTour",
    description:
      "Dona un viaggio esclusivo o un'esperienza su misura con i buoni regalo IncanTour.",
  },
};

export default function RegalaUnViaggioPage() {
  const siteUrl = getSiteUrl().origin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Regala un Viaggio - IncanTour",
    description:
      "Voucher regalo personalizzati per viaggi ed esperienze culturali sostenibili in Campania e nel mondo.",
    url: `${siteUrl}/regala-un-viaggio`,
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

      <main className="bg-gray-50 min-h-screen text-gray-800">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden pt-24 pb-20 text-white">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2070&q=80"
              alt="Regala un Viaggio con IncanTour"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 0, 0, 0.72) 0%, rgba(27, 94, 95, 0.65) 50%, rgba(15, 65, 66, 0.78) 100%)",
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
              <span className="text-amber-300 font-medium">Regala un Viaggio</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/15 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/20">
              Buono Regalo Personalizzato
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight leading-tight text-gradient-hero drop-shadow-md">
              Regala un Viaggio
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Dona un&apos;esperienza indimenticabile ai tuoi cari. Crea un voucher viaggio su misura in pochi istanti per compleanni, nozze o anniversari.
            </p>

            {/* Value badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <GiftIcon className="w-4 h-4 text-amber-300" />
                <span>Buono Spendibile su Tutti i Tour</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ClockIcon className="w-4 h-4 text-amber-300" />
                <span>Validità 12 Mesi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ShieldIcon className="w-4 h-4 text-amber-300" />
                <span>Garanzia &amp; Assistenza IncanTour</span>
              </div>
            </div>
          </div>
        </section>

        {/* Voucher Form and Preview */}
        <VoucherForm initialValue={100} />
      </main>
    </>
  );
}
