import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CalendarIcon } from "@/components/ui/icons";
import type { Post } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

type LatestPostsSectionProps = {
  posts: readonly Post[];
  error?: string | null;
};

export function LatestPostsSection({ posts, error }: LatestPostsSectionProps) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="bg-slate-50 py-24 sm:py-32" aria-labelledby="blog-section-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-incan-gold-dark">
            Storie e approfondimenti
          </p>
          <h2
            id="blog-section-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-gradient-incan sm:text-5xl"
          >
            INCANTOUR BLOG
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            racconti di viaggio, novità e pensieri in libertà
          </p>
        </div>

        {/* Content */}
        {displayPosts.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayPosts.map((post) => {
              const excerpt = post.excerpt?.rendered
                ? stripHtml(post.excerpt.rendered)
                : stripHtml(post.content?.rendered || "");
              const truncatedExcerpt =
                excerpt.length > 120 ? `${excerpt.substring(0, 120)}...` : excerpt;

              return (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={post.featuredImageUrl || "/assets/images/storia e visione.png"}
                      alt={post.title?.rendered ? stripHtml(post.title.rendered) : "IncanTour Blog"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <CalendarIcon className="h-4 w-4 text-incan-gold" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 font-display text-xl font-bold text-incan-teal group-hover:text-incan-ink transition-colors">
                      {post.title?.rendered ? stripHtml(post.title.rendered) : "Racconto di viaggio"}
                    </h3>

                    {/* Excerpt */}
                    {truncatedExcerpt ? (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {truncatedExcerpt}
                      </p>
                    ) : null}

                    {/* Read More Link */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-incan-gold-dark transition duration-300 group-hover:text-incan-teal group-hover:translate-x-1"
                      >
                        <span>Leggi di più</span>
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-16 mx-auto max-w-2xl rounded-3xl border border-dashed border-incan-gold/40 bg-white/80 p-12 text-center backdrop-blur-sm shadow-card">
            <p className="font-display text-2xl font-bold text-incan-teal">
              Blog in aggiornamento
            </p>
            <p className="mt-3 text-base text-slate-600">
              {error
                ? "Il feed editoriale dal CMS WordPress non è momentaneamente raggiungibile."
                : "Nuovi racconti di viaggio, curiosità e itinerari culturali sono in fase di pubblicazione."}
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cool px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Vai alla sezione Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
