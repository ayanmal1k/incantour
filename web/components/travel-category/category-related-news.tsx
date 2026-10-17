import React from "react";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Post } from "@/lib/wordpress/types";

export function CategoryRelatedNews({
  posts,
  title = "Notizie e Approfondimenti",
  subtitle = "Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog",
}: {
  posts: Post[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 text-center md:text-left">
          <div>
            <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-1">
              Blog &amp; Storie
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-dark">
              <span className="inline-block pb-2">{title}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl">
              {subtitle}
            </p>
          </div>

          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-[#1B5E5F] hover:text-[#E6A532] transition-colors group"
          >
            <span>Tutti gli articoli del blog</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id} className="h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">Nessun articolo correlato trovato in questa sezione.</p>
          </div>
        )}
      </div>
    </section>
  );
}
