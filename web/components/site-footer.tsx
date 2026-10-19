"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GlobeIcon, HeartIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function subscribeToLang(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("incan_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("incan_lang_change", callback);
  };
}

function getLangSnapshot(): "it" | "en" | "es" {
  if (typeof window === "undefined") return "it";
  const lang = localStorage.getItem("incan_site_lang");
  if (lang === "en" || lang === "es") return lang;
  return "it";
}

function getLangServerSnapshot(): "it" | "en" | "es" {
  return "it";
}

export function SiteFooter() {
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const selectedLang = useSyncExternalStore(
    subscribeToLang,
    getLangSnapshot,
    getLangServerSnapshot
  );

  useEffect(() => {
    // 1. Pre-set cookie if language was already non-Italian
    const savedLang = getLangSnapshot();
    if (savedLang !== "it") {
      const langPair = "/it/" + savedLang;
      document.cookie = "googtrans=" + langPair + "; path=/;";
      document.cookie =
        "googtrans=" + langPair + "; domain=" + window.location.hostname + "; path=/;";
    }

    // 2. Define translate callback
    window.googleTranslateElementInit = function () {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "it",
            includedLanguages: "it,en,es",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // 3. Inject Google Translate script if not loaded
    if (!document.getElementById("google-translate-script")) {
      const gtScript = document.createElement("script");
      gtScript.id = "google-translate-script";
      gtScript.type = "text/javascript";
      gtScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      gtScript.async = true;
      document.body.appendChild(gtScript);
    }

    // 4. Outside click and escape listeners
    const handleOutsideClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangMenuOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectLanguage = (langCode: "it" | "en" | "es") => {
    const currentLang = getLangSnapshot();
    localStorage.setItem("incan_site_lang", langCode);
    window.dispatchEvent(new Event("incan_lang_change"));
    setLangMenuOpen(false);

    if (langCode === "it") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" +
        window.location.hostname +
        "; path=/;";
      document.cookie = "googtrans=/it/it; path=/;";
    } else {
      const langPair = "/it/" + langCode;
      document.cookie = "googtrans=" + langPair + "; path=/;";
      document.cookie =
        "googtrans=" + langPair + "; domain=" + window.location.hostname + "; path=/;";
    }

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }

    if (currentLang !== langCode) {
      setTimeout(() => {
        window.location.reload();
      }, 150);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Contatti Section */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-6 pb-2 border-b border-[#E6A532]"
              style={{ borderColor: "var(--primary-orange, #E6A532)" }}
            >
              Contatti
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Sede</p>
                <p className="text-sm leading-relaxed">
                  Calata Trinita&apos; Maggiore, 53
                  <br />
                  80134 – Napoli
                </p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <PhoneIcon
                    className="w-4 h-4 mr-2 text-[#E6A532] inline shrink-0"
                    style={{ color: "var(--primary-orange, #E6A532)" }}
                  />
                  <span>+39 081 0607948</span>
                </p>
                <p className="text-sm mt-1">
                  <a
                    href="https://wa.me/393384357143"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors duration-300 inline-flex items-center"
                  >
                    <WhatsAppIcon
                      className="w-4 h-4 mr-2 text-[#E6A532] inline shrink-0"
                      style={{ color: "var(--primary-orange, #E6A532)" }}
                    />
                    <span>3384357143</span>
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <MailIcon
                    className="w-4 h-4 mr-2 text-[#E6A532] inline shrink-0"
                    style={{ color: "var(--primary-orange, #E6A532)" }}
                  />
                  <a
                    href="mailto:info@incantour.it"
                    className="hover:text-orange-400"
                    style={{ color: "inherit" }}
                  >
                    info@incantour.it
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Per viaggiare sereni Section */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-6 pb-2 border-b border-[#E6A532]"
              style={{ borderColor: "var(--primary-orange, #E6A532)" }}
            >
              Per viaggiare sereni
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://webins.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  ASSICURAZIONI
                </a>
              </li>
              <li>
                <a
                  href="https://www.viaggiaresicuri.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  Viaggiare sicuri
                </a>
              </li>
              <li>
                <a
                  href="https://www.24timezones.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  Fusi orari
                </a>
              </li>
              <li>
                <a
                  href="https://dovesiamonelmondo.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  Dove siamo nel mondo
                </a>
              </li>
              <li>
                <a
                  href="https://businessmobility.travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  BLACK LIST
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  Viaggio a rate con Compass HEYLIGHT
                </a>
              </li>
            </ul>
          </div>

          {/* Info utili Section */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-6 pb-2 border-b border-[#E6A532]"
              style={{ borderColor: "var(--primary-orange, #E6A532)" }}
            >
              Info utili
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/footer%20con%20allegati/Termini%20e%20Condizioni%20Pacchetti%20Turistici.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  TERMINI E CONDIZIONI PACCHETTI TURISTICI
                </a>
              </li>
              <li>
                <a
                  href="/footer%20con%20allegati/Codice%20Etico%20Incantour.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  CODICE ETICO INCANTOUR
                </a>
              </li>
              <li>
                <Link
                  href="/disegna-il-tuo-viaggio"
                  className="hover:text-orange-400 transition font-semibold text-amber-300"
                >
                  DISEGNA IL TUO VIAGGIO
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  FAQ (Domande Frequenti)
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  PRIVACY &amp; COOKIE POLICY
                </Link>
              </li>
              <li>
                <Link
                  href="/lavora-con-noi"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  Lavora con noi
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="hover:text-orange-400 transition"
                  style={{ color: "inherit" }}
                >
                  AREA AGENZIE/OPERATORI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-6 pb-2 border-b border-[#E6A532]"
              style={{ borderColor: "var(--primary-orange, #E6A532)" }}
            >
              Informazioni
            </h3>
            <div className="text-sm space-y-3">
              <p>
                <strong>Incantour srl</strong>
                <br />
                P.IVA IT10071441215
              </p>
              <p>
                <strong>PEC:</strong>
                <br />
                <a
                  href="mailto:incantoursrl@legalmail.it"
                  className="hover:text-orange-400"
                  style={{ color: "inherit" }}
                >
                  incantoursrl@legalmail.it
                </a>
              </p>
              <p>
                <strong>Licenza:</strong> n.5 del 14/01/2009
              </p>
              <p>
                <strong>RC PROF.LE:</strong> Lloyd&apos;s Insurance n. DY504058-LB
              </p>
              <p>
                <strong>Fondo di Garanzia:</strong> Il Salvagente
                <br />
                <strong>Membro:</strong> AIAV
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Incantour - Tutti i diritti riservati</p>
            <p className="text-xs mt-2 flex items-center justify-center gap-1">
              <span>Made with</span>
              <HeartIcon
                className="w-3.5 h-3.5 text-[#E6A532] inline"
                style={{ color: "var(--primary-orange, #E6A532)" }}
              />
              <span>for travelers around the world</span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Language Switcher Widget (exact legacy positioning & style) */}
      <div className="fixed bottom-6 right-24 z-40" ref={langMenuRef}>
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
                onClick={() => handleSelectLanguage("it")}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLang === "it" ? "bg-amber-50 text-amber-700 font-bold" : "text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-base">🇮🇹</span> Italiano
                </span>
                {selectedLang === "it" ? <span className="text-amber-500 text-xs font-bold">✓</span> : null}
              </button>
              <button
                type="button"
                onClick={() => handleSelectLanguage("en")}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLang === "en" ? "bg-amber-50 text-amber-700 font-bold" : "text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-base">🇬🇧</span> English
                </span>
                {selectedLang === "en" ? <span className="text-amber-500 text-xs font-bold">✓</span> : null}
              </button>
              <button
                type="button"
                onClick={() => handleSelectLanguage("es")}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLang === "es" ? "bg-amber-50 text-amber-700 font-bold" : "text-gray-700"
                }`}
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

      {/* Floating WhatsApp Widget (exact legacy styling & positioning) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/393384357143"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatta con noi su WhatsApp"
          className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 text-white"
        >
          <WhatsAppIcon className="h-7 w-7 text-white" />
        </a>
      </div>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
    </footer>
  );
}
