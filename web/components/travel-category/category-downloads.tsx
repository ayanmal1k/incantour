import React from "react";
import { DownloadIcon, FilePdfIcon, FileTextIcon, InfoIcon } from "@/components/ui/icons";
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
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-1">
          {downloads.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-dark mb-8 tracking-tight">
          {downloads.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloads.items.map((item, index) => {
            const isPub = item.type === "pub";

            return (
              <div
                key={index}
                className="flex flex-col justify-between bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.exists
                          ? "bg-teal-100 text-[#1B5E5F]"
                          : "bg-amber-100 text-[#E6A532]"
                      }`}
                    >
                      {isPub ? (
                        <FileTextIcon className="w-6 h-6" />
                      ) : (
                        <FilePdfIcon className="w-6 h-6" />
                      )}
                    </div>
                    {item.exists ? (
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Disponibile ({item.size})
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Su Richiesta
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 font-mono">
                    {item.filename}
                  </p>

                  {item.note && (
                    <p className="text-xs text-amber-800 bg-amber-50/70 p-2.5 rounded-lg mb-4 flex items-start gap-1.5 leading-relaxed">
                      <InfoIcon className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                      <span>{item.note}</span>
                    </p>
                  )}
                </div>

                <a
                  href={item.href}
                  download={item.exists ? item.filename : undefined}
                  className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-sm transition-all ${
                    item.exists
                      ? "bg-gradient-cool text-white hover:opacity-95 hover:scale-[1.02]"
                      : "bg-gradient-warm text-white hover:opacity-95 hover:scale-[1.02]"
                  }`}
                  title={
                    item.exists
                      ? `Scarica ${item.filename}`
                      : `Richiedi ${item.title}`
                  }
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>{item.exists ? `Scarica ${item.title}` : `Richiedi ${item.title}`}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
