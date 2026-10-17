import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CalendarIcon, CheckIcon, MapPinIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

function formatCurrency(amount?: string | number): string {
  if (!amount) return "";
  const num = typeof amount === "number" ? amount : parseFloat(String(amount).replace(",", "."));
  if (isNaN(num)) return String(amount);
  return num.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

type BlogSidebarProps = {
  featuredTours?: Tour[];
  articleTitle: string;
};

export function BlogSidebar({ featuredTours = [], articleTitle }: BlogSidebarProps) {
  const whatsappUrl = `https://wa.me/393288293469?text=${encodeURIComponent(
    `Salve IncanTour, ho letto l'articolo "${articleTitle}" e vorrei maggiori informazioni sui vostri viaggi.`
  )}`;

  return (
    <aside className="space-y-8 sticky top-28 self-start">
      {/* Travel Specialist Concierge Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1B5E5F] to-[#0F4142] p-7 text-white shadow-[0_15px_40px_rgba(27,94,95,0.25)] border border-teal-700/50 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-[#E6A532]/10 rounded-full blur-2xl pointer-events-none" />

        <span className="inline-block rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 border border-white/20 mb-3.5">
          IncanTour Concierge
        </span>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2.5">
          Vuoi vivere questa esperienza?
        </h3>

        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
          I nostri consulenti di viaggio disegnano itinerari esclusivi e personalizzati in Campania e nel mondo.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
            <CheckIcon className="h-4 w-4 text-[#E6A532] shrink-0" />
            <span>Itinerari personalizzati su misura</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
            <CheckIcon className="h-4 w-4 text-[#E6A532] shrink-0" />
            <span>Assistenza h24 prima e durante il tour</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
            <CheckIcon className="h-4 w-4 text-[#E6A532] shrink-0" />
            <span>Guide locali ed esperienze autentiche</span>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-warm py-3.5 px-5 text-center text-sm font-bold text-white shadow-gold transition hover:scale-[1.02] focus:outline-none"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>Parla con un consulente</span>
        </a>

        <div className="mt-4 text-center">
          <a
            href="tel:+390810607948"
            className="text-xs text-slate-300 hover:text-white transition inline-flex items-center gap-1.5 font-medium"
          >
            <span>Oppure chiamaci:</span>
            <span className="font-bold text-[#E6A532]">+39 081 0607948</span>
          </a>
        </div>
      </div>

      {/* Featured Travel Experiences Widget */}
      {featuredTours.length > 0 && (
        <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E6A532]">
                Viaggi Consigliati
              </span>
              <h4 className="text-lg font-bold text-[#1B5E5F] mt-0.5">
                Itinerari da Non Perdere
              </h4>
            </div>
            <Link
              href="/tours"
              className="text-xs font-bold text-[#E6A532] hover:text-[#1B5E5F] transition flex items-center gap-1"
            >
              <span>Vedi tutti</span>
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredTours.slice(0, 3).map((tour) => {
              const tourTitle = tour.title?.rendered ? stripHtml(tour.title.rendered) : "Tour";
              const tourPrice = formatCurrency(tour.acf?.Price);
              const tourImg = tour.featuredImageUrl || "/assets/images/default-tour.jpg";
              const tourLocation = tour.acf?.Location ? String(tour.acf.Location) : null;
              const tourUrl = `/tours/${tour.slug || tour.id}`;

              return (
                <Link
                  key={tour.id}
                  href={tourUrl}
                  className="group flex items-center gap-3.5 p-2 rounded-2xl transition hover:bg-slate-50 border border-transparent hover:border-slate-100"
                >
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    <Image
                      src={tourImg}
                      alt={tourTitle}
                      fill
                      sizes="72px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {tourLocation && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                        <MapPinIcon className="h-3 w-3 text-[#E6A532]" />
                        <span className="truncate">{tourLocation}</span>
                      </span>
                    )}
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-[#E6A532] transition-colors">
                      {tourTitle}
                    </h5>
                    {tourPrice && (
                      <span className="text-xs font-extrabold text-[#E6A532] mt-0.5 block">
                        da {tourPrice}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Explore More Articles Banner */}
      <div className="rounded-3xl bg-amber-50/80 p-6 border border-amber-200/70 text-center">
        <h4 className="font-bold text-[#1B5E5F] text-base mb-1.5">
          Hai sete di nuove storie?
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Esplora la nostra collezione completa di articoli, tradizioni e guide per viaggiare in Italia e nel mondo.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6A532] hover:text-[#1B5E5F] transition"
        >
          <span>Tutti gli articoli del blog</span>
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
