import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CalendarIcon } from "@/components/ui/icons";
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

export type BlogCardProps = {
  post?: Post;
  id?: number | string;
  title?: string;
  excerpt?: string;
  image?: string;
  date?: string;
  href?: string;
  readMoreLabel?: string;
  priority?: boolean;
};

export function BlogCard({
  post,
  id = post?.id,
  title = post?.title?.rendered ? stripHtml(post.title.rendered) : "Racconto di viaggio",
  excerpt = post?.excerpt?.rendered
    ? stripHtml(post.excerpt.rendered)
    : post?.content?.rendered
      ? stripHtml(post.content.rendered)
      : "",
  image = post?.featuredImageUrl || "/assets/images/storia e visione.png",
  date = post?.date,
  href = id ? `/blog/${id}` : "/blog",
  readMoreLabel = "Leggi di più",
  priority = false,
}: BlogCardProps) {
  // Legacy logic: clamp excerpt at 90-120 chars if very long
  const cleanExcerpt = excerpt.length > 120 ? `${excerpt.substring(0, 120)}...` : excerpt;
  const formattedDate = formatDate(date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
      {/* Blog Card Image: exactly 250px height in legacy */}
      <div className="relative h-[250px] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Blog Card Content: padding 2rem (p-8) */}
      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-4 text-2xl font-semibold leading-tight text-[#1B5E5F] transition-colors duration-200 group-hover:text-[#E6A532]">
          <Link href={href} className="hover:underline focus:outline-none">
            {title}
          </Link>
        </h3>

        {cleanExcerpt ? (
          <p className="mb-6 flex-1 text-base leading-relaxed text-[#6b7280] line-clamp-3">
            {cleanExcerpt}
          </p>
        ) : (
          <div className="mb-6 flex-1" />
        )}

        {/* Blog Card Meta: border-t border-[#f3f4f6] pt-4 */}
        <div className="mt-auto flex items-center justify-between border-t border-[#f3f4f6] pt-4">
          <div className="flex items-center gap-2 text-[0.9rem] text-[#9ca3af]">
            <CalendarIcon className="h-4 w-4 text-[#E6A532]" />
            <time dateTime={date}>{formattedDate}</time>
          </div>

          <Link
            href={href}
            className="flex items-center gap-2 text-sm font-semibold text-[#E6A532] transition-all duration-300 hover:text-[#1B5E5F] hover:translate-x-1.5 focus:outline-none focus-visible:underline"
          >
            <span>{readMoreLabel}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
