import type { Metadata } from "next";
import Link from "next/link";
import { CompanyHero } from "@/components/company/company-hero";
import { FaqAccordion } from "@/components/company/faq-accordion";
import { PaperPlaneIcon } from "@/components/ui/icons";
import { getFaqs } from "@/lib/wordpress/client";
import { getSiteUrl, siteName } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Domande Frequenti (FAQ) - IncanTour",
  description:
    "Trova le risposte alle domande più frequenti su tour, prenotazioni, Turismo delle Radici, Viaggi di Nozze, pagamenti e contatti con IncanTour a Napoli.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Domande Frequenti (FAQ) - IncanTour",
    description: "Le risposte alle domande più comuni sui nostri viaggi e servizi.",
    url: `${getSiteUrl().origin}/faq`,
    images: [{ url: "/assets/images/contact.png", alt: "FAQ IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domande Frequenti (FAQ) - IncanTour",
    description: "Tutto quello che c'è da sapere sui viaggi e le esperienze IncanTour.",
    images: ["/assets/images/contact.png"],
  },
};

export default async function FaqPage() {
  const faqs = await getFaqs().catch(() => []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>?/gm, "").trim(),
      },
    })),
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
          title="Domande Frequenti (FAQ)"
          subtitle="Le risposte alle domande più comuni sui nostri viaggi e servizi."
          eyebrow="Assistenza & Risposte"
          bgImage="/assets/images/contact.png"
          breadcrumbLabel="FAQ"
        />

        {/* 2. Interactive Search & Accordion Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <FaqAccordion initialFaqs={faqs} />
          </div>
        </section>

        {/* 3. Ask Question CTA Banner */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-500 via-amber-600 to-teal-800 text-white text-center">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              Hai altre domande per il nostro team?
            </h2>
            <p className="text-base sm:text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
              Siamo sempre a tua disposizione per personalizzare il tuo viaggio ed offrirti la massima assistenza.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2.5 bg-white text-teal-950 font-extrabold px-8 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-2xl hover:bg-amber-100 transition-all transform hover:scale-105 active:scale-95 text-base"
            >
              <PaperPlaneIcon className="w-5 h-5 text-[#E6A532]" />
              <span>Scrivici un Messaggio</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
