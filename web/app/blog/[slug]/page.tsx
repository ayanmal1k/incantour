import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import { BlogPostShare } from "@/components/blog/blog-post-share";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { RelatedPackagesSection } from "@/components/blog/related-packages-section";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon, UsersIcon } from "@/components/ui/icons";
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

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function estimateReadingTime(text: string): string {
  const words = text.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  const minutes = Math.max(2, Math.ceil(words / 200));
  return `${minutes} min di lettura`;
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
  const formattedDate = formatDate(post.date);
  const readingTime = estimateReadingTime(post.content?.rendered || "");

  // Category & tags
  const category =
    post.terms?.find((t) => t.taxonomy === "category")?.name || "IncanTour Blog";
  const postTags =
    post.terms?.filter((t) => t.taxonomy === "post_tag") || [];

  // Fetch related travel packages
  let relatedTours: Tour[] = [];
  try {
    relatedTours = await getRelatedPackages(4);
  } catch {
    relatedTours = [];
  }

  // Fetch other blog posts for bottom recommendations
  let otherPosts = await getPosts(4);
  otherPosts = otherPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Schema.org BlogPosting Structured Data
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 pt-24 pb-28">
        {/* Header Hero Section */}
        <div className="bg-white border-b border-slate-100 pt-8 pb-12 mb-10">
          <div className="container mx-auto px-6 max-w-7xl">
            {/* Breadcrumbs Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-slate-500 font-medium">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-[#E6A532] transition">
                      Home
                    </Link>
                  </li>
                  <li className="text-slate-300">/</li>
                  <li>
                    <Link href="/blog" className="hover:text-[#E6A532] transition">
                      Blog
                    </Link>
                  </li>
                  <li className="text-slate-300">/</li>
                  <li className="text-[#1B5E5F] font-bold truncate max-w-[200px] sm:max-w-sm">
                    {title}
                  </li>
                </ol>
              </nav>

              <Link
                href="/blog"
                className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold text-[#1B5E5F] hover:text-[#E6A532] transition bg-slate-50 hover:bg-amber-50 px-4 py-2 rounded-full border border-slate-200"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                <span>Torna a tutti gli articoli</span>
              </Link>
            </div>

            {/* Post Title & Metadata Hero */}
            <div className="max-w-4xl">
              <span className="inline-block bg-amber-50 text-[#E6A532] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-amber-200/80 shadow-xs">
                {category}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B5E5F] leading-[1.2] tracking-tight mb-6">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-warm flex items-center justify-center text-white font-bold text-xs shadow-xs">
                    IT
                  </div>
                  <span className="font-bold text-slate-700">Redazione IncanTour</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-[#E6A532]" />
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4 text-[#E6A532]" />
                  <span>{readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image - Generous Width with Smooth Border Radius */}
        {post.featuredImageUrl && (
          <div className="container mx-auto px-6 max-w-7xl mb-12">
            <div className="relative h-[340px] sm:h-[480px] lg:h-[580px] w-full overflow-hidden rounded-3xl shadow-2xl bg-slate-200 border border-slate-100">
              <Image
                src={post.featuredImageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* 2-Column Content Layout: Main Reading Column + Modern Sidebar */}
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Main Reading Column (8 cols) */}
            <article className="lg:col-span-8 rounded-3xl bg-white p-6 sm:p-10 md:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100">
              {post.sanitizedContent ? (
                <div
                  className="tour-details-prose prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700 prose-headings:text-[#1B5E5F] prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-6 prose-a:text-[#E6A532] prose-strong:text-slate-900 prose-li:my-1.5 prose-blockquote:border-l-4 prose-blockquote:border-[#E6A532] prose-blockquote:bg-amber-50/50 prose-blockquote:py-3.5 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-hr:border-none prose-hr:h-6 prose-hr:my-0 [&_figure]:my-8 [&_figure]:block [&_img]:my-8 [&_img]:block [&_img]:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: post.sanitizedContent }}
                />
              ) : (
                <div className="py-8 text-slate-500 italic">
                  Nessun contenuto disponibile per questo articolo.
                </div>
              )}

              {/* Post Tags */}
              {postTags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                    Tag:
                  </span>
                  {postTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#E6A532] transition cursor-default"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Share & Back Action Bar */}
              <BlogPostShare title={title} url={postUrl} />
            </article>

            {/* Sidebar Column (4 cols) */}
            <div className="lg:col-span-4">
              <BlogSidebar featuredTours={relatedTours} articleTitle={title} />
            </div>
          </div>

          {/* Related Travel Packages Section (Full width at bottom) */}
          {relatedTours.length > 0 && (
            <RelatedPackagesSection tours={relatedTours.slice(0, 3)} />
          )}

          {/* More Blog Stories Section */}
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
