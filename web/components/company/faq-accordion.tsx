"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { SearchIcon, ChevronDownIcon, HelpCircleIcon, CloseIcon } from "@/components/ui/icons";
import type { FAQItem } from "@/lib/wordpress/types";

export function FaqAccordion({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [isLoading, setIsLoading] = useState(false);
  const baseId = useId();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fetch from the WordPress endpoint as legacy faq.html did, falling back to initial FAQs
  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/wordpress/faqs");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setFaqs(data);
          }
        }
      } catch (err) {
        console.warn("Unable to fetch FAQs from API, keeping initial list", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFaqs = faqs.filter((faq) => {
    if (!normalizedQuery) return true;
    const q = (faq.question || "").toLowerCase();
    const a = (faq.answer || "").replace(/<[^>]*>?/gm, "").toLowerCase();
    return q.includes(normalizedQuery) || a.includes(normalizedQuery);
  });

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % filteredFaqs.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + filteredFaqs.length) % filteredFaqs.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[filteredFaqs.length - 1]?.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar Section */}
      <div className="relative -mt-10 sm:-mt-12 mb-12 z-20 max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-gray-100 flex items-center gap-3">
          <div className="pl-3 text-gray-400">
            <SearchIcon className="w-6 h-6 text-[#E6A532]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca una domanda o parola chiave..."
            aria-label="Cerca nelle domande frequenti"
            className="w-full py-2.5 pr-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Cancella ricerca"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="text-center py-6 text-sm text-gray-500 animate-pulse">
          Aggiornamento domande frequenti...
        </div>
      )}

      {/* Accordion list */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4 max-w-4xl mx-auto px-4" role="presentation">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const headingId = `${baseId}-heading-${idx}`;
            const panelId = `${baseId}-panel-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-amber-400 bg-gradient-to-b from-white to-amber-50/20 shadow-md ring-1 ring-amber-400/20"
                    : "border-gray-200 bg-white hover:border-amber-300/70 hover:shadow-sm"
                }`}
              >
                <button
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  id={headingId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors text-sm font-bold ${
                        isOpen
                          ? "bg-[#E6A532] text-white shadow-xs"
                          : "bg-amber-100 text-amber-800 group-hover:bg-amber-200"
                      }`}
                    >
                      <HelpCircleIcon className="w-5 h-5" />
                    </span>
                    <span className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-amber-100 text-[#E6A532] rotate-180" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  hidden={!isOpen}
                  className={`px-6 pb-6 pt-2 border-t border-amber-100/60 text-gray-700 text-sm sm:text-base leading-relaxed ${
                    isOpen ? "block animate-rise" : "hidden"
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <HelpCircleIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nessuna domanda trovata</h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Non abbiamo trovato risultati per &ldquo;{searchQuery}&rdquo;. Prova a cercare con altre parole chiave o contattaci direttamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              Mostra tutte le FAQ
            </button>
            <Link
              href="/contatti"
              className="px-6 py-3 rounded-full bg-gradient-warm text-white font-bold text-sm shadow-md hover:opacity-95 transition-all text-center"
            >
              Contatta il Supporto
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
