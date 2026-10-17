import React from "react";
import Link from "next/link";
import { GiftIcon, CheckCircleIcon } from "@/components/ui/icons";

export function WeddingRegistryCard() {
  return (
    <div className="bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20 relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-400 text-teal-950 font-bold text-xs uppercase tracking-wider mb-4">
          Servizio Esclusivo
        </span>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
          Lista di Nozze Online per il tuo Matrimonio
        </h3>
        <p className="text-gray-200 text-base md:text-lg mb-6 leading-relaxed">
          Rendi semplice e memorabile il regalo di nozze per i tuoi ospiti in Italia e all&apos;estero.
          Attraverso la nostra piattaforma di Lista di Nozze, i tuoi invitati potranno
          contribuire direttamente al tuo Destination Wedding o alla tua Luna di Miele in Campania con pochi click.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-amber-300 font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-amber-300" />
            Contributi Online Sicuri
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-amber-300" />
            Personalizzazione Grafica
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-amber-300" />
            Assistenza h24 per gli Ospiti
          </span>
        </div>
      </div>
      <div className="w-full md:w-auto flex-shrink-0 text-center relative z-10">
        <Link
          href="/viaggi-di-nozze#lista-nozze-form-section"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-95 transform hover:scale-105 transition-all text-center"
        >
          <GiftIcon className="w-5 h-5" />
          <span>Crea la tua Lista di Nozze</span>
        </Link>
      </div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
