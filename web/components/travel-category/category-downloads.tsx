"use client";

import React, { useState } from "react";
import {
  FilePdfSolidIcon,
  GraduationCapSolidIcon,
} from "@/components/ui/icons";
import type { CategoryDownloadItem } from "@/lib/travel-categories";

interface DocConfig {
  id: string;
  title: string;
  description: string;
  icon: "pdf" | "laboratori" | "seminari";
  colorClass: string;
  iconBgClass: string;
  files: {
    it: { label: string; url: string; filename: string };
    en: { label: string; url: string; filename: string };
  };
}

const DOCUMENTS: DocConfig[] = [
  {
    id: "programma",
    title: "Programma",
    description: "Scopri il programma completo dell'itinerario e delle attività didattiche.",
    icon: "pdf",
    colorClass: "from-amber-500 to-amber-600",
    iconBgClass: "text-amber-200",
    files: {
      it: {
        label: "Italiano",
        url: "/assets/documents/programma-it.pdf",
        filename: "Programma_Italiano.pdf",
      },
      en: {
        label: "English",
        url: "/assets/documents/programma-en.pdf",
        filename: "Program_English.pdf",
      },
    },
  },
  {
    id: "laboratori",
    title: "Laboratori",
    description: "Dettaglio dei workshop, laboratori culturali e attività esperienziali.",
    icon: "laboratori",
    colorClass: "from-[#1B5E5F] to-[#0F4142]",
    iconBgClass: "text-teal-200",
    files: {
      it: {
        label: "Italiano",
        url: "/assets/documents/laboratori-it.pdf",
        filename: "Laboratori_Italiano.pdf",
      },
      en: {
        label: "English",
        url: "/assets/documents/laboratori-en.pdf",
        filename: "Laboratories_English.pdf",
      },
    },
  },
  {
    id: "seminari",
    title: "Seminari",
    description: "Approfondimenti tematici, conferenze e seminari linguistici avanzati.",
    icon: "seminari",
    colorClass: "from-amber-500 to-amber-600",
    iconBgClass: "text-amber-200",
    files: {
      it: {
        label: "Italiano",
        url: "/assets/documents/seminari-it.pdf",
        filename: "Seminari_Italiano.pdf",
      },
      en: {
        label: "English",
        url: "/assets/documents/seminari-en.pdf",
        filename: "Seminars_English.pdf",
      },
    },
  },
];

export function CategoryDownloads({
  downloads,
}: {
  downloads: {
    badge: string;
    title: string;
    items?: CategoryDownloadItem[];
  };
}) {
  const [selectedDoc, setSelectedDoc] = useState<DocConfig | null>(null);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSelectedDoc(null);
  };

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-1">
          {downloads.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-dark mb-8">
          <span className="inline-block pb-1">{downloads.title}</span>
        </h2>

        {/* 3 Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setSelectedDoc(doc)}
              className={`flex items-center justify-center space-x-3 bg-gradient-to-r ${doc.colorClass} text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:opacity-95 transform hover:scale-105 transition-all group cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-300`}
            >
              {doc.icon === "seminari" ? (
                <GraduationCapSolidIcon
                  className={`w-6 h-6 ${doc.iconBgClass} group-hover:scale-110 transition-transform shrink-0`}
                />
              ) : (
                <FilePdfSolidIcon
                  className={`w-6 h-6 ${doc.iconBgClass} group-hover:scale-110 transition-transform shrink-0`}
                />
              )}
              <span className="text-lg">{doc.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selector Modal */}
      {selectedDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Chiudi finestra"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Document Badge / Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
              <FilePdfSolidIcon className="w-8 h-8" />
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {selectedDoc.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Scegli la lingua del documento per avviare il download
              <br />
              <span className="text-xs text-gray-400">
                Choose the document language to start download
              </span>
            </p>

            {/* Language Options */}
            <div className="space-y-3">
              {/* Italian Version */}
              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    selectedDoc.files.it.url,
                    selectedDoc.files.it.filename
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-200 hover:border-amber-500 bg-gray-50/50 hover:bg-amber-50/40 text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🇮🇹</span>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-amber-700">
                      Versione Italiana
                    </div>
                    <div className="text-xs text-gray-500">
                      Documento PDF in Italiano
                    </div>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 flex items-center justify-center text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </button>

              {/* English Version */}
              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    selectedDoc.files.en.url,
                    selectedDoc.files.en.filename
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-200 hover:border-[#1B5E5F] bg-gray-50/50 hover:bg-teal-50/40 text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🇬🇧</span>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-[#1B5E5F]">
                      English Version
                    </div>
                    <div className="text-xs text-gray-500">
                      PDF Document in English
                    </div>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 group-hover:bg-[#1B5E5F] group-hover:text-white group-hover:border-[#1B5E5F] flex items-center justify-center text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-xs text-gray-400 hover:text-gray-600 font-medium tracking-wide uppercase"
              >
                Annulla / Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
