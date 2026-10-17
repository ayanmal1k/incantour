import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CalendarIcon } from "@/components/ui/icons";
import type { Post } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#8217;|&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;|&#038;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function RootsRelatedNews({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-14">
          <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
            Blog &amp; Storie
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
            <span className="inline-block pb-2">Le ultime notizie di Turismo delle Radici</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Resta aggiornato con le ultime novità, racconti e articoli sul Turismo delle Radici
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => {
            const title = stripHtml(post.title?.rendered || "Approfondimento Radici");
            const excerpt = stripHtml(post.excerpt?.rendered || "");
            const dateStr = post.date
              ? new Date(post.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "";
            const href = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`;
            const img = post.featuredImageUrl || "/assets/images/radici&cultura.jpg";

            return (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-warm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Radici
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1B5E5F] transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500 mt-auto">
                    {dateStr ? (
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>{dateStr}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    <Link
                      href={href}
                      className="text-[#1B5E5F] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Leggi di più</span>
                      <ArrowRightIcon className="w-3 h-3 text-[#1B5E5F]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
