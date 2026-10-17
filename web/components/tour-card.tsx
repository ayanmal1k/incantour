import Image from "next/image";
import Link from "next/link";

import { CalendarIcon, EyeIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

function formatPrice(price?: string | number): string {
  if (price === undefined || price === null || price === "") return "";
  const num = typeof price === "number" ? price : parseFloat(String(price).replace(",", "."));
  if (isNaN(num)) return String(price);
  return num.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export type TourCardProps = {
  tour?: Tour;
  id?: number | string;
  title?: string;
  image?: string;
  description?: string;
  price?: string | number;
  type?: string;
  detailsHref?: string;
  bookHref?: string;
  detailsLabel?: string;
  bookLabel?: string;
  priority?: boolean;
};

export function TourCard({
  tour,
  id = tour?.id,
  title = tour?.title?.rendered ? stripHtml(tour.title.rendered) : "Esperienza su misura",
  image = tour?.featuredImageUrl || "/assets/images/viaggi.jpg",
  description = tour?.acf?.description
    ? String(tour.acf.description)
    : tour?.content?.rendered
      ? stripHtml(tour.content.rendered)
      : "",
  price = tour?.acf?.Price,
  type = (tour?.acf?.type as string) || "Tour",
  detailsHref = tour?.slug ? `/tours/${tour.slug}` : id ? `/tours/${id}` : "/tours",
  bookHref = id ? `/prenota?tour=${id}` : "/prenota",
  detailsLabel = "View Details",
  bookLabel = "Book Now",
  priority = false,
}: TourCardProps) {
  const formattedPrice = formatPrice(price);
  const isIncoming = (type || "").toLowerCase() === "incoming";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
      {/* Image container: exactly h-64 in legacy */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-200">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Legacy subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Type badge (top-left): cool gradient if incoming, warm if outgoing */}
        <div
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white shadow-sm ${
            isIncoming ? "bg-gradient-cool" : "bg-gradient-warm"
          }`}
        >
          {type || "Tour"}
        </div>

        {/* Price badge (top-right): bg-white/90 backdrop-blur-sm */}
        {formattedPrice ? (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 backdrop-blur-sm shadow-sm">
            <span className="font-bold text-[#E6A532] text-sm sm:text-base">{formattedPrice}</span>
          </div>
        ) : null}
      </div>

      {/* Card body: p-6 */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-4 text-xl font-bold text-gray-800 line-clamp-2 leading-snug">
          {title}
        </h3>

        {description ? (
          <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-2">
            {description}
          </p>
        ) : (
          <div className="mb-6 flex-1" />
        )}

        {/* Action buttons: dual pill buttons */}
        <div className="mt-auto flex space-x-3">
          <Link
            href={detailsHref}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-cool px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E5F]"
          >
            <EyeIcon className="mr-2 h-4 w-4" />
            <span>{detailsLabel}</span>
          </Link>

          <Link
            href={bookHref}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-warm px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A532]"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{bookLabel}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
