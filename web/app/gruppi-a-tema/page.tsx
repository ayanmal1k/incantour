import type { Metadata } from "next";
import { getSiteUrl, siteName } from "@/lib/site";
import { GroupTourClientContent } from "@/components/group-tour/group-tour-client-content";
import { CategoryRelatedNews } from "@/components/travel-category/category-related-news";
import { getRelatedPosts } from "@/lib/wordpress/client";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gruppi a Tema - Tour di Gruppo su Misura in Campania | IncanTour",
  description:
    "Atmosfere condivise in convivialità, storie da vivere insieme. Disegna il tuo tour di gruppo su misura con IncanTour: sapori, castelli, cammini religiosi, musica e cicloturismo.",
  alternates: { canonical: "/gruppi-a-tema" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Gruppi a Tema - Tour di Gruppo su Misura | IncanTour",
    description:
      "Pianificazione completa per gruppi, CRAL, associazioni e agenzie: trasporti, guide specializzate, tour leader e itinerari personalizzati.",
    url: `${getSiteUrl().origin}/gruppi-a-tema`,
    images: [{ url: "/assets/images/theme.jpg", alt: "Gruppi a Tema IncanTour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gruppi a Tema | IncanTour",
    description: "Atmosfere condivise in convivialità: progetta il tuo tour di gruppo su misura.",
    images: ["/assets/images/theme.jpg"],
  },
};

export default async function GruppiATemaPage() {
  const relatedNews = await getRelatedPosts(["#gruppi", "gruppi"], 3).catch(() => ({
    posts: [],
    hasExactMatch: false,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gruppi a Tema - IncanTour",
    provider: {
      "@type": "TravelAgency",
      name: siteName,
      url: getSiteUrl().origin,
    },
    description:
      "Servizio tailor made per la progettazione di viaggi e tour tematici di gruppo per CRAL, associazioni e agenzie.",
    areaServed: "Campania, Italy",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-white">
        <GroupTourClientContent />
        <CategoryRelatedNews
          posts={relatedNews.posts}
          title="Notizie e Approfondimenti per Gruppi"
          subtitle="Idee, consigli e racconti per viaggi e tour tematici di gruppo"
        />
      </article>
    </>
  );
}
