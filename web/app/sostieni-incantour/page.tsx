import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DonationForm } from "@/components/donation/donation-form";
import { DonationImpact } from "@/components/donation/donation-impact";
import { DonationFAQ } from "@/components/donation/donation-faq";
import { HeartIcon, ShieldIcon, UsersIcon } from "@/components/ui/icons";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Sostieni la Nostra Missione - Donazioni & Turismo Sostenibile | IncanTour",
  description:
    "Contribuisci alla salvaguardia del patrimonio culturale, archeologico e naturale della Campania. Sostieni le comunità locali e i progetti educativi di IncanTour.",
  alternates: { canonical: "/sostieni-incantour" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Sostieni la Nostra Missione - IncanTour",
    description:
      "Dona per tutelare i borghi, il patrimonio storico e le tradizioni artigianali campane con percorsi sostenibili e inclusivi.",
    url: `${getSiteUrl().origin}/sostieni-incantour`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sostieni IncanTour - Tutela e Patrimonio Culturale",
    description:
      "Partecipa attivamente alla salvaguardia delle tradizioni e delle bellezze della Campania.",
  },
};

export default function SostieniIncantourPage() {
  const siteUrl = getSiteUrl().origin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sostieni la Nostra Missione - IncanTour",
    description:
      "Raccolta fondi ed erogazioni liberali a favore della tutela culturale e del turismo sostenibile.",
    url: `${siteUrl}/sostieni-incantour`,
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
              src="/assets/images/slides/istockphoto-955332870-2048x2048.jpg"
              alt="Sostieni la Missione di IncanTour"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 0, 0, 0.72) 0%, rgba(27, 94, 95, 0.65) 50%, rgba(15, 65, 66, 0.8) 100%)",
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
              <span className="text-amber-300 font-medium">Sostieni la Nostra Missione</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/15 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/20">
              Turismo Etico &amp; Sostenibile
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight leading-tight text-gradient-hero drop-shadow-md">
              Sostieni la Nostra Missione
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Aiutaci a preservare e valorizzare il patrimonio culturale, archeologico e naturale attraverso il turismo rigenerativo e comunitario.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <HeartIcon className="w-4 h-4 text-amber-300" />
                <span>Erogazioni Deducibili</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ShieldIcon className="w-4 h-4 text-amber-300" />
                <span>100% Trasparenza Fondi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <UsersIcon className="w-4 h-4 text-amber-300" />
                <span>Impatto Diretto sulle Comunità</span>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <DonationForm />

        {/* Impact Pillars */}
        <DonationImpact />

        {/* FAQ Accordion */}
        <DonationFAQ />
      </main>
    </>
  );
}
