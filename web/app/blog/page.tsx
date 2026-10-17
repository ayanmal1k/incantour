import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { BlogCard } from "@/components/blog-card";
import { BlogHero } from "@/components/blog/blog-hero";
import { getPosts } from "@/lib/wordpress/client";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog & Storie di Viaggio - IncanTour",
  description:
    "Esplora la raccolta di storie di viaggio, guide pratiche, approfondimenti storici e tradizioni enogastronomiche della Campania e del mondo a cura di IncanTour.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Storie di Viaggio - IncanTour",
    description:
      "Scopri racconti autentici, itinerari ed esperienze di viaggio della Campania e del mondo.",
    url: `${getSiteUrl()}/blog`,
    type: "website",
    locale: "it_IT",
  },
};

type BlogPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const { id } = await searchParams;
  if (id) {
    redirect(`/blog/${id}`);
  }

  const posts = await getPosts(18);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "IncanTour Blog - Racconti di Viaggio & Approfondimenti",
    description:
      "Esplora articoli di approfondimento, consigli per viaggiatori e storie culturali a cura di IncanTour.",
    url: `${getSiteUrl()}/blog`,
    publisher: {
      "@type": "TravelAgency",
      name: "IncanTour",
      url: getSiteUrl().toString(),
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title?.rendered ? post.title.rendered.replace(/<[^>]*>?/gm, "").trim() : "Articolo",
      datePublished: post.date,
      dateModified: post.modified || post.date,
      image: post.featuredImageUrl,
      url: `${getSiteUrl()}/blog/${post.slug || post.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 pb-28">
        {/* Hero Section */}
        <BlogHero />

        {/* Blog Posts Grid Section */}
        <section className="py-20 bg-slate-50" aria-labelledby="blog-articles-heading">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532]">
                Il Nostro Blog
              </span>
              <h2
                id="blog-articles-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B5E5F] mt-1 mb-3"
              >
                Ultimi Articoli &amp; Approfondimenti
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
                Esplora la nostra raccolta di esperienze di viaggio, storie dal territorio e consigli dei nostri consulenti
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    priority={idx < 3}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100 max-w-xl mx-auto">
                <p className="text-slate-600 text-lg font-medium">
                  Nessun articolo del blog attualmente disponibile.
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Torna presto per nuove storie e aggiornamenti di viaggio.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
