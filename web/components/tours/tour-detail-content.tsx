import { ClockIcon, GlobeIcon, MapPinIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

type TourDetailContentProps = {
  tour: Tour;
};

export function TourDetailContent({ tour }: TourDetailContentProps) {
  const location = tour.acf?.Location ? String(tour.acf.Location) : null;
  const duration = tour.acf?.Duration ? String(tour.acf.Duration) : null;
  const type = tour.acf?.type ? String(tour.acf.type) : null;
  const rawDesc = tour.acf?.description ? String(tour.acf.description) : "";

  return (
    <div className="space-y-8">
      {/* Quick Info Bar - only renders fields that actually exist in ACF */}
      {(location || duration || type) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {location && (
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#E6A532]">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Destinazione
                </span>
                <span className="block text-sm font-bold text-slate-800 truncate">{location}</span>
              </div>
            </div>
          )}

          {duration && (
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#1B5E5F]">
                <ClockIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Durata
                </span>
                <span className="block text-sm font-bold text-slate-800 truncate">{duration}</span>
              </div>
            </div>
          )}

          {type && (
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                <GlobeIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Tipologia
                </span>
                <span className="block text-sm font-bold text-slate-800 truncate">{type}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Tour Overview / Description Card */}
      <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B5E5F] mb-6">
          Descrizione del Tour
        </h2>

        {tour.sanitizedContent ? (
          <div
            className="tour-details-prose prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700 prose-headings:text-[#1B5E5F] prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-5 prose-a:text-[#E6A532] prose-strong:text-slate-900 prose-li:my-1.5 prose-hr:border-none prose-hr:h-6 prose-hr:my-0 [&_figure]:my-9 [&_figure]:block [&_img]:my-9 [&_img]:block [&_img]:rounded-2xl [&_p:has(img)]:my-9"
            dangerouslySetInnerHTML={{ __html: tour.sanitizedContent }}
          />
        ) : rawDesc ? (
          <div className="prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700">
            <p>{rawDesc}</p>
          </div>
        ) : (
          <p className="text-slate-500 italic">
            Nessuna descrizione disponibile per questo tour.
          </p>
        )}
      </div>
    </div>
  );
}
