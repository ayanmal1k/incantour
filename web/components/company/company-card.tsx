import React from "react";
import Link from "next/link";

export type CompanyCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  badge?: string;
  linkHref?: string;
  linkLabel?: string;
  variant?: "white" | "solid-warm" | "solid-cool" | "solid-primary";
  iconGradient?: "warm" | "cool" | "primary" | "orange";
};

export function CompanyCard({
  icon: Icon,
  title,
  description,
  badge,
  linkHref,
  linkLabel,
  variant = "white",
  iconGradient = "warm",
}: CompanyCardProps) {
  // Solid gradient cards (e.g. for Partner page)
  if (variant.startsWith("solid-")) {
    const bgClass =
      variant === "solid-warm"
        ? "bg-gradient-warm text-white"
        : variant === "solid-cool"
        ? "bg-gradient-cool text-white"
        : "bg-gradient-primary text-white";

    const content = (
      <div className={`rounded-3xl p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${bgClass}`}>
        <div>
          <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white shadow-md">
            <Icon className="w-7 h-7" />
          </div>
          {badge && (
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
              {badge}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">{title}</h3>
          {description && (
            <p className="text-sm sm:text-base leading-relaxed opacity-95">{description}</p>
          )}
        </div>
        {linkHref && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <span className="font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              {linkLabel || "Scopri di più"} &rarr;
            </span>
          </div>
        )}
      </div>
    );

    return linkHref ? (
      <Link href={linkHref} className="block group">
        {content}
      </Link>
    ) : (
      content
    );
  }

  // White base cards with colored icon container (e.g. for Storia & Visione, Team, Lavora Con Noi)
  const iconBg =
    iconGradient === "cool"
      ? "bg-gradient-cool text-white"
      : iconGradient === "primary"
      ? "bg-gradient-primary text-white"
      : iconGradient === "orange"
      ? "bg-amber-100 text-amber-600"
      : "bg-gradient-warm text-white";

  const cardContent = (
    <div className="h-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 hover:border-amber-300/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between group">
      <div>
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-6 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        {badge && (
          <span className="text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full inline-block mb-3">
            {badge}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#1B5E5F] transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
        )}
      </div>

      {linkHref && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <span className="text-sm font-bold text-[#E6A532] group-hover:text-[#D4941A] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
            {linkLabel || "Approfondisci"} &rarr;
          </span>
        </div>
      )}
    </div>
  );

  return linkHref ? (
    <Link href={linkHref} className="block group h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
