"use client";

import Link from "next/link";
import { useState } from "react";

import { GlobeIcon, HeartIcon, WhatsAppIcon } from "@/components/ui/icons";

export function SiteFooter() {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"it" | "en" | "es">("it");

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Contatti Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 pb-2 border-b-2 border-[#E6A532]">
              Contatti
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-white mb-1.5 text-base">Sede</p>
                <p className="text-[15px] sm:text-base font-medium leading-relaxed text-gray-200">
                  Calata Trinita&apos; Maggiore, 53
                  <br />
                  80134 – Napoli
                </p>
              </div>
              <div className="space-y-2.5">
                <p className="text-[15px] sm:text-base">
                  <a
                    href="tel:+390810607948"
                    className="hover:text-orange-400 transition-colors inline-flex items-center gap-2.5 font-semibold text-gray-200 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#E6A532" strokeWidth="2.5" className="h-4.5 w-4.5 shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+39 081 0607948</span>
                  </a>
                </p>
                <p className="text-[15px] sm:text-base">
                  <a
                    href="https://wa.me/393384357143"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors inline-flex items-center gap-2.5 font-semibold text-gray-200 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4.5 w-4.5 text-[#E6A532] shrink-0" />
                    <span>3384357143</span>
                  </a>
                </p>
              </div>
              <div>
                <p className="text-[15px] sm:text-base">
                  <a
                    href="mailto:info@incantour.it"
                    className="hover:text-orange-400 transition-colors inline-flex items-center gap-2.5 font-semibold text-gray-200 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#E6A532" strokeWidth="2.5" className="h-4.5 w-4.5 shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>info@incantour.it</span>
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Per viaggiare sereni Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 pb-2 border-b-2 border-[#E6A532]">
              Per viaggiare sereni
            </h3>
            <ul className="space-y-3.5 text-[15px] sm:text-base font-semibold">
              <li>
                <a
                  href="https://webins.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  ASSICURAZIONI
                </a>
              </li>
              <li>
                <a
                  href="https://www.viaggiaresicuri.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  Viaggiare sicuri
                </a>
              </li>
              <li>
                <a
                  href="https://www.24timezones.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  Fusi orari
                </a>
              </li>
              <li>
                <a
                  href="https://dovesiamonelmondo.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  Dove siamo nel mondo
                </a>
              </li>
              <li>
                <a
                  href="https://businessmobility.travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  BLACK LIST
                </a>
              </li>
              <li>
                <span className="text-gray-400 font-medium">
                  Viaggio a rate con Compass HEYLIGHT
                </span>
              </li>
            </ul>
          </div>

          {/* Info utili Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 pb-2 border-b-2 border-[#E6A532]">
              Info utili
            </h3>
            <ul className="space-y-3.5 text-[15px] sm:text-base font-semibold">
              <li>
                <a
                  href="/footer%20con%20allegati/Termini%20e%20Condizioni%20Pacchetti%20Turistici.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  TERMINI E CONDIZIONI PACCHETTI TURISTICI
                </a>
              </li>
              <li>
                <a
                  href="/footer%20con%20allegati/Codice%20Etico%20Incantour.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors text-gray-200"
                >
                  CODICE ETICO INCANTOUR
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-400 transition-colors text-gray-200">
                  FAQ (Domande Frequenti)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors text-gray-200">
                  PRIVACY &amp; COOKIE POLICY
                </Link>
              </li>
              <li>
                <Link href="/lavora-con-noi" className="hover:text-orange-400 transition-colors text-gray-200">
                  Lavora con noi
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-orange-400 transition-colors text-gray-200">
                  AREA AGENZIE/OPERATORI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 pb-2 border-b-2 border-[#E6A532]">
              Informazioni
            </h3>
            <div className="text-[15px] sm:text-base space-y-3.5 leading-relaxed text-gray-200">
              <p>
                <strong className="text-white font-bold text-base">Incantour srl</strong>
                <br />
                P.IVA IT10071441215
              </p>
              <p>
                <strong className="text-white font-bold">PEC:</strong>
                <br />
                <a
                  href="mailto:incantoursrl@legalmail.it"
                  className="hover:text-orange-400 transition-colors font-semibold"
                >
                  incantoursrl@legalmail.it
                </a>
              </p>
              <p>
                <strong className="text-white font-bold">Licenza:</strong> n.5 del 14/01/2009
              </p>
              <p>
                <strong className="text-white font-bold">RC PROF.LE:</strong> Lloyd&apos;s Insurance n. DY504058-LB
              </p>
              <p>
                <strong className="text-white font-bold">Fondo di Garanzia:</strong> Il Salvagente
                <br />
                <strong className="text-white font-bold">Membro:</strong> AIAV
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/80 pt-8 mt-12">
          {/* Copyright */}
          <div className="text-center text-gray-300 text-[15px] font-semibold">
            <p>&copy; {new Date().getFullYear()} Incantour - Tutti i diritti riservati</p>
            <p className="text-sm mt-2 flex items-center justify-center gap-1.5 text-gray-400 font-medium">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-[#E6A532]" />
              <span>for travelers around the world</span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Language Switcher Widget (exactly like legacy footer) */}
      <div className="fixed bottom-6 right-24 z-40">
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangMenuOpen((prev) => !prev)}
            aria-label="Seleziona lingua"
            aria-expanded={langMenuOpen}
            className="flex items-center justify-center h-14 px-4 bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20 gap-2 font-medium text-sm cursor-pointer"
          >
            <GlobeIcon className="h-5 w-5 text-amber-400" />
            <span className="uppercase font-bold tracking-wider text-xs">
              {selectedLang}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`h-3 w-3 transition-transform duration-300 ${langMenuOpen ? "rotate-180" : ""}`}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>

          {/* Language Menu Dropdown */}
          {langMenuOpen ? (
            <div className="absolute bottom-16 right-0 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 z-50 text-gray-800">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
                Seleziona Lingua
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedLang("it");
                  setLangMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-base">🇮🇹</span> Italiano
                </span>
                {selectedLang === "it" ? <span className="text-amber-500 text-xs font-bold">✓</span> : null}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLang("en");
                  setLangMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-base">🇬🇧</span> English
                </span>
                {selectedLang === "en" ? <span className="text-amber-500 text-xs font-bold">✓</span> : null}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLang("es");
                  setLangMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-base">🇪🇸</span> Español
                </span>
                {selectedLang === "es" ? <span className="text-amber-500 text-xs font-bold">✓</span> : null}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Floating WhatsApp Widget (exactly like legacy footer) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/393384357143"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatta con noi su WhatsApp"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full hover:bg-[#20ba5a] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 text-white"
        >
          <WhatsAppIcon className="h-7 w-7 text-white" />
        </a>
      </div>
    </footer>
  );
}
