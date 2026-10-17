import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { BlogPostShare } from "@/components/blog/blog-post-share";
import { RelatedPackagesSection } from "@/components/blog/related-packages-section";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  extractEntityMetadata,
  getPost,
  getPosts,
  getRelatedPackages,
} from "@/lib/wordpress/client";
import { getSiteUrl } from "@/lib/site";
import type { Tour } from "@/lib/wordpress/types";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#8217;|&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;|&#038;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Articolo non trovato - IncanTour",
      description: "L'articolo richiesto non è disponibile.",
    };
  }

  const baseMeta = extractEntityMetadata(post, "IncanTour");
  const rawTitle = post.title?.rendered ? stripHtml(post.title.rendered) : "Articolo Blog";
  const postUrl = `${getSiteUrl()}/blog/${post.slug || post.id}`;

  return {
    ...baseMeta,
    title: `${rawTitle} - IncanTour Blog`,
    description:
      baseMeta.description ||
      `Leggi "${rawTitle}" su IncanTour: guide di viaggio, approfondimenti e consigli per la tua vacanza.`,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${rawTitle} - IncanTour Blog`,
      description: baseMeta.description || undefined,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: ["IncanTour"],
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: rawTitle,
      description: baseMeta.description || undefined,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const title = post.title?.rendered ? stripHtml(post.title.rendered) : "Articolo Blog";
  const postUrl = `${getSiteUrl()}/blog/${post.slug || post.id}`;

  // Fetch related travel packages
  let relatedTours: Tour[] = [];
  try {
    relatedTours = await getRelatedPackages(3);
  } catch {
    relatedTours = [];
  }

  // Fetch other blog posts for bottom recommendations
  let otherPosts = await getPosts(4);
  otherPosts = otherPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Schema.org BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : title,
    image: post.featuredImageUrl,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Organization",
      name: "IncanTour",
      url: getSiteUrl().toString(),
    },
    publisher: {
      "@type": "Organization",
      name: "IncanTour",
      logo: {
        "@type": "ImageObject",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spirale_incantour_highres%20%281%29-7hzjNru1zG0Gbw6WqE4bJuWZ3FzOU2.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const postTags =
    post.terms?.filter((t) => t.taxonomy === "post_tag") || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 pt-28 pb-28">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Main Article Container */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl border border-slate-100">
            {/* Header: Breadcrumbs, category badge, title, author & date */}
            <BlogPostHeader post={post} />

            {/* Featured Image */}
            {post.featuredImageUrl && (
              <div className="relative h-[280px] sm:h-[420px] md:h-[520px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl mb-10 bg-slate-100">
                <Image
                  src={post.featuredImageUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Sanitized Body Content */}
            {post.sanitizedContent ? (
              <div
                className="tour-details-prose prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700 prose-headings:text-[#1B5E5F] prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-6 prose-a:text-[#E6A532] prose-strong:text-slate-900 prose-li:my-1.5 prose-blockquote:border-l-4 prose-blockquote:border-[#E6A532] prose-blockquote:bg-amber-50/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-hr:border-none prose-hr:h-6 prose-hr:my-0 [&_figure]:my-8 [&_figure]:block [&_img]:my-8 [&_img]:block [&_img]:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: post.sanitizedContent }}
              />
            ) : (
              <div className="py-8 text-slate-500 italic">
                Nessun contenuto disponibile per questo articolo.
              </div>
            )}

            {/* Post Tags */}
            {postTags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                  Tag:
                </span>
                {postTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#E6A532] transition cursor-default"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Share and Return Actions */}
            <BlogPostShare title={title} url={postUrl} />
          </article>

          {/* Related Travel Packages */}
          {relatedTours.length > 0 && (
            <RelatedPackagesSection tours={relatedTours} />
          )}

          {/* Other Blog Stories */}
          {otherPosts.length > 0 && (
            <section className="mt-20 pt-16 border-t border-slate-200" aria-labelledby="other-stories-heading">
              <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#E6A532]">
                    Altre Storie
                  </span>
                  <h3 id="other-stories-heading" className="text-2xl sm:text-3xl font-bold text-[#1B5E5F] mt-1">
                    Potrebbero interessarti dal Blog
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E6A532] hover:text-[#1B5E5F] transition"
                >
                  <span>Tutti gli articoli</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((otherPost) => (
                  <BlogCard key={otherPost.id} post={otherPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
