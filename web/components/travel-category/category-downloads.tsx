import React from "react";
import {
  FilePdfSolidIcon,
  FileAltSolidIcon,
  GraduationCapSolidIcon,
} from "@/components/ui/icons";
import type { CategoryDownloadItem } from "@/lib/travel-categories";

export function CategoryDownloads({
  downloads,
}: {
  downloads: {
    badge: string;
    title: string;
    items: CategoryDownloadItem[];
  };
}) {
  return (
    <section className="py-14 sm:py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-1">
          {downloads.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-dark mb-8">
          <span className="inline-block pb-1">{downloads.title}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 1. Programma Button */}
          <a
            href="/assets/documents/Programma.pdf"
            download="Programma.pdf"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:opacity-95 transform hover:scale-105 transition-all group"
          >
            <FilePdfSolidIcon className="w-6 h-6 text-amber-200 group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-lg">Programma</span>
          </a>

          {/* 2. Laboratori Button (Connected to existing file) */}
          <a
            href="/assets/documents/Laboratori.pub"
            download="Laboratori.pub"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:opacity-95 transform hover:scale-105 transition-all group"
          >
            <FileAltSolidIcon className="w-6 h-6 text-teal-200 group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-lg">Laboratori</span>
          </a>

          {/* 3. Seminari Button */}
          <a
            href="/assets/documents/Seminari.pdf"
            download="Seminari.pdf"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:opacity-95 transform hover:scale-105 transition-all group"
          >
            <GraduationCapSolidIcon className="w-6 h-6 text-amber-200 group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-lg">Seminari</span>
          </a>
        </div>
      </div>
    </section>
  );
}
