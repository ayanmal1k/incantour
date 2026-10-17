"use client";

import React from "react";
import { SparklesIcon, SendIcon } from "@/components/ui/icons";

export function WeddingTailorMadeCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-500 via-amber-600 to-teal-800 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30 shadow-xl">
          <SparklesIcon className="w-9 h-9 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Desideri un Matrimonio Su Misura?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-amber-100 font-light leading-relaxed">
          Il nostro team di Wedding Planner &amp; Travel Coordinator è pronto a creare una proposta completamente personalizzata per le tue nozze in Campania.
        </p>
        <button
          type="button"
          onClick={onOpenModal}
          className="bg-white text-teal-950 hover:bg-amber-100 font-extrabold px-10 py-5 rounded-full shadow-2xl text-lg transform hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer"
        >
          <SendIcon className="w-5 h-5 text-amber-500" />
          <span>Wedding Tailor Made</span>
        </button>
      </div>

      <div className="absolute -left-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-900/30 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
