import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CalendarIcon, InfoIcon } from "@/components/ui/icons";
import type { Post } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#8217;|&#8216;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&rdquo;|&ldquo;/g, '"')
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
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

type RelatedBlogsSidebarProps = {
  posts: Post[];
  hasExactMatch?: boolean;
  tourTags?: string[];
};

export function RelatedBlogsSidebar({
  posts,
  hasExactMatch = true,
}: RelatedBlogsSidebarProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100">
      <div className="mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E6A532]">
          {hasExactMatch ? "Approfondimenti" : "Ispirazioni di Viaggio"}
        </span>
        <h3 className="text-xl font-bold text-[#1B5E5F] mt-0.5">
          {hasExactMatch ? "Articoli del Blog Correlati" : "Storie dal Nostro Blog"}
        </h3>
      </div>

      {!hasExactMatch && (
        <div className="mb-5 rounded-xl bg-amber-50/90 border border-amber-200/80 p-3.5 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <InfoIcon className="h-4 w-4 text-[#E6A532] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                Nessun articolo per questa tematica specifica
              </p>
              <p className="mt-1 text-slate-600 leading-relaxed">
                Non abbiamo ancora storie dedicate a questi specifici tag. Ecco alcuni racconti dal nostro blog che potrebbero interessarti:
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => {
          const title = post.title?.rendered ? stripHtml(post.title.rendered) : "Articolo del blog";
          const image = post.featuredImageUrl || "/assets/images/default-blog.jpg";
          const date = formatDate(post.date);

          return (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-slate-50 transition-all duration-300 hover:shadow-md hover:bg-white border border-slate-100"
            >
              <Link href={`/blog/${post.slug || post.id}`} className="block focus:outline-none">
                <div className="relative h-36 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-[#E6A532]" />
                    <time dateTime={post.date}>{date}</time>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 line-clamp-2 leading-snug group-hover:text-[#E6A532] transition-colors">
                    {title}
                  </h4>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#E6A532] group-hover:text-[#1B5E5F] transition-colors">
                    <span>Leggi articolo</span>
                    <ArrowRightIcon className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6A532] hover:text-[#1B5E5F] transition-colors"
        >
          <span>Tutti gli articoli del blog</span>
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
