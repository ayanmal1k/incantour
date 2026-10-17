import Link from "next/link";

import { ArrowLeftIcon, CalendarIcon, UsersIcon } from "@/components/ui/icons";
import type { Post } from "@/lib/wordpress/types";

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

type BlogPostHeaderProps = {
  post: Post;
};

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const title = post.title?.rendered ? stripHtml(post.title.rendered) : "Articolo del blog";
  const date = formatDate(post.date);

  // Extract category from terms if available
  const category =
    post.terms?.find((t) => t.taxonomy === "category")?.name || "Incantour Blog";

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
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
            <li className="text-[#1B5E5F] font-bold truncate max-w-[240px] sm:max-w-md">
              {title}
            </li>
          </ol>
        </nav>

        <Link
          href="/blog"
          className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold text-[#1B5E5F] hover:text-[#E6A532] transition bg-slate-100 hover:bg-amber-50 px-4 py-2 rounded-full border border-slate-200"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Torna al Blog</span>
        </Link>
      </div>

      {/* Article Header Heading */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <span className="inline-block bg-amber-100/90 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-amber-200/60 shadow-xs">
          {category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B5E5F] leading-tight mb-6">
          {title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium border-y border-slate-100 py-3.5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#E6A532]" />
            <span>Pubblicato il {date}</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-[#E6A532]" />
            <span>Redazione IncanTour</span>
          </div>
        </div>
      </div>
    </div>
  );
}
