import Link from "next/link";

import { TourCard } from "@/components/tour-card";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

type RelatedPackagesSectionProps = {
  tours: Tour[];
};

export function RelatedPackagesSection({ tours }: RelatedPackagesSectionProps) {
  if (!tours || tours.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 pt-16 border-t border-slate-200" aria-labelledby="related-tours-heading">
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#E6A532]">
            Ispirazioni dal Territorio
          </span>
          <h2 id="related-tours-heading" className="text-2xl sm:text-3xl font-bold text-[#1B5E5F] mt-1">
            Proposte di Viaggio Correlate
          </h2>
        </div>
        <Link
          href="/tours"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E6A532] hover:text-[#1B5E5F] transition"
        >
          <span>Tutti i tour</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
