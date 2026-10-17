"use client";

import { useId, useState } from "react";
import Link from "next/link";

import { CalendarIcon, ChatIcon, CheckIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

function parseBasePrice(price?: string | number): number {
  if (price === undefined || price === null || price === "") return 0;
  const num = typeof price === "number" ? price : parseFloat(String(price).replace(",", "."));
  return isNaN(num) ? 0 : num;
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

type TourBookingCardProps = {
  tour: Tour;
  className?: string;
};

export function TourBookingCard({ tour, className = "" }: TourBookingCardProps) {
  const quantityInputId = useId();
  const basePrice = parseBasePrice(tour.acf?.Price);
  const [quantity, setQuantity] = useState(1);
  const title = tour.title?.rendered ? stripHtml(tour.title.rendered) : "Tour";

  const totalPrice = basePrice * quantity;

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(10, prev + 1));
  };

  const bookingUrl = `/prenota?tour=${encodeURIComponent(tour.id)}&quantity=${encodeURIComponent(quantity)}&price=${encodeURIComponent(basePrice.toFixed(2))}`;
  const whatsappUrl = `https://wa.me/393288293469?text=${encodeURIComponent(
    `Salve Incantour, vorrei richiedere informazioni e disponibilità per il tour: "${title}" (ID: ${tour.id}).`
  )}`;

  return (
    <div
      className={`rounded-2xl bg-white p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.08)] border border-slate-100 ${className}`}
    >
      {/* Price Header */}
      <div className="text-center pb-6 border-b border-slate-100">
        <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
          Quota individuale
        </span>
        <div className="mt-1 flex items-baseline justify-center gap-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-[#E6A532] tracking-tight">
            {basePrice > 0 ? formatCurrency(basePrice) : "Su richiesta"}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 font-medium">Tasse e assicurazione base incluse</p>
      </div>

      {/* Quantity & Calculation */}
      {basePrice > 0 && (
        <div className="py-6 border-b border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor={quantityInputId} className="block text-sm font-bold text-slate-800">
                Numero Viaggiatori
              </label>
              <span className="text-xs text-slate-500">Da 1 a 10 persone</span>
            </div>
            <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1.5 shadow-inner">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-[#E6A532] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Riduci partecipanti"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <input
                id={quantityInputId}
                type="number"
                value={quantity}
                readOnly
                aria-label="Numero di partecipanti"
                className="w-12 text-center text-base font-bold text-slate-900 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= 10}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-[#E6A532] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Aumenta partecipanti"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
            <span className="text-sm font-semibold text-slate-700">Prezzo Totale:</span>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#1B5E5F]">
                {formatCurrency(totalPrice)}
              </span>
              <span className="block text-[11px] text-slate-500">
                {quantity} {quantity === 1 ? "persona" : "persone"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="pt-6 space-y-3">
        <Link
          href={bookingUrl}
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-warm py-4 px-6 text-center text-base font-bold text-white shadow-gold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#E6A532]/25"
        >
          <CalendarIcon className="h-5 w-5" />
          <span>Prenota Ora</span>
        </Link>

        <Link
          href={`/contatti?tour=${encodeURIComponent(tour.id)}`}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1B5E5F] py-3.5 px-6 text-center text-sm font-bold text-[#1B5E5F] transition-all duration-300 hover:bg-[#1B5E5F] hover:text-white focus:outline-none"
        >
          <ChatIcon className="h-4 w-4" />
          <span>Richiedi Informazioni</span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 py-3 px-6 text-center text-xs sm:text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 focus:outline-none"
        >
          <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
          <span>Chiedi su WhatsApp</span>
        </a>
      </div>

      {/* Trust & Guarantees */}
      <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Assistenza concierge 24/7 prima e durante il viaggio</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Polizza RC Lloyd&apos;s Insurance inclusa</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Tour Operator autorizzato e certificato AIAV</span>
        </div>
      </div>
    </div>
  );
}
