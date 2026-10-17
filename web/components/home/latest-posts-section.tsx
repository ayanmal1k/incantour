import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import type { Post } from "@/lib/wordpress/types";

type LatestPostsSectionProps = {
  posts: readonly Post[];
  error?: string | null;
};

export function LatestPostsSection({ posts, error }: LatestPostsSectionProps) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="latest-posts py-20 bg-gray-50" aria-labelledby="blog-section-title">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="blog-section-title"
            className="text-4xl md:text-5xl font-bold text-gradient-incan mb-4"
          >
            INCANTOUR BLOG
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            racconti di viaggio, novità e pensieri in libertà
          </p>
        </div>

        {/* Content */}
        {displayPosts.length > 0 ? (
          <div id="posts-container" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                priority={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-[#E6A532]/40 bg-white/80 p-12 text-center backdrop-blur-sm shadow-card">
            <p className="text-2xl font-bold text-[#1B5E5F]">
              Blog in aggiornamento
            </p>
            <p className="mt-3 text-base text-gray-600">
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
