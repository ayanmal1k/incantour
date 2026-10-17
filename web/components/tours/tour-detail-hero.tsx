import Image from "next/image";
import Link from "next/link";

import { ClockIcon, MapPinIcon } from "@/components/ui/icons";
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

type TourDetailHeroProps = {
  tour: Tour;
};

export function TourDetailHero({ tour }: TourDetailHeroProps) {
  const title = tour.title?.rendered ? stripHtml(tour.title.rendered) : "Dettaglio Tour";
  const image = tour.featuredImageUrl || "/assets/images/default-tour.jpg";
  const formattedPrice = formatPrice(tour.acf?.Price);
  const location = tour.acf?.Location ? String(tour.acf.Location) : null;
  const duration = tour.acf?.Duration ? String(tour.acf.Duration) : null;
  const type = tour.acf?.type ? String(tour.acf.type) : "Tour";
  const isIncoming = type.toLowerCase() === "incoming";

  return (
    <div className="relative h-[65vh] min-h-[480px] w-full overflow-hidden rounded-b-[30px] shadow-lg">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dual Gradient Overlay matching legacy */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-between px-6 pb-12 pt-28">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-sm font-medium text-white/80">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#E6A532] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tours" className="hover:text-[#E6A532] transition-colors">
                I Nostri Tour
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#E6A532] font-semibold truncate max-w-xs sm:max-w-md">
              {title}
            </li>
          </ol>
        </nav>

        {/* Hero Title & Meta */}
        <div>
          {/* Type Badge */}
          <div className="mb-4 inline-block">
            <span
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md ${
                isIncoming ? "bg-gradient-cool" : "bg-gradient-warm"
              }`}
            >
              {type}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            {title}
          </h1>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white">
            {formattedPrice && (
              <div className="flex items-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 text-xl sm:text-2xl font-bold text-[#E6A532] shadow-sm">
                <span>{formattedPrice}</span>
              </div>
            )}

            {duration && (
              <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 text-sm sm:text-base font-medium shadow-sm">
                <ClockIcon className="h-4 w-4 text-[#E6A532]" />
                <span>{duration}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 text-sm sm:text-base font-medium shadow-sm">
                <MapPinIcon className="h-4 w-4 text-[#E6A532]" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
