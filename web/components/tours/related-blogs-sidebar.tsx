import Image from "next/image";
import Link from "next/link";

import { CalendarIcon } from "@/components/ui/icons";
import type { Post } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("it-IT");
  } catch {
    return dateString;
  }
}

type RelatedBlogsSidebarProps = {
  posts: Post[];
};

export function RelatedBlogsSidebar({ posts }: RelatedBlogsSidebarProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100">
      <h3 className="text-xl font-bold text-[#1B5E5F] mb-6">
        Articoli del Blog Correlati
      </h3>

      <div className="space-y-6">
        {posts.map((post) => {
          const title = post.title?.rendered ? stripHtml(post.title.rendered) : "Articolo del blog";
          const image = post.featuredImageUrl || "/assets/images/default-blog.jpg";
          const date = formatDate(post.date);

          return (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-slate-50 transition-all duration-300 hover:shadow-md hover:bg-white border border-slate-100"
            >
              <Link href={`/blog/${post.id}`} className="block focus:outline-none">
                <div className="relative h-44 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#E6A532] transition-colors">
                    {title}
                  </h4>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <CalendarIcon className="h-3.5 w-3.5 text-[#E6A532]" />
                    <time dateTime={post.date}>{date}</time>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
