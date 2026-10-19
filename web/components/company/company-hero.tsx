import React from "react";
import Image from "next/image";
import Link from "next/link";

export type CompanyHeroProps = {
  title: string;
  subtitle: string;
  eyebrow: string;
  bgImage: string;
  breadcrumbLabel: string;
  breadcrumbParent?: { href: string; label: string };
  highlight?: string;
};

export function CompanyHero({
  title,
  subtitle,
  eyebrow,
  bgImage,
  breadcrumbLabel,
  breadcrumbParent,
  highlight,
}: CompanyHeroProps) {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[66vh] flex items-center justify-center overflow-hidden pt-28 pb-16 text-white">
      {/* Background image */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />

      {/* Legacy-matching subtle overlay to keep image bright and visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4142]/20 via-transparent to-[#E6A532]/15 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        {/* Accessible Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          {breadcrumbParent && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <Link href={breadcrumbParent.href} className="hover:text-amber-300 transition-colors">
                {breadcrumbParent.label}
              </Link>
            </>
          )}
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-amber-300 font-medium">{breadcrumbLabel}</span>
        </nav>

        {/* Eyebrow badge */}
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/20 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/25 shadow-xs">
          {eyebrow}
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md">
          <span className="text-gradient-hero inline-block pb-2">{title}</span>
        </h1>

        {highlight && (
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-200 mb-3 drop-shadow-sm">
            {highlight}
          </p>
        )}

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-semibold opacity-95 max-w-3xl mx-auto leading-relaxed text-amber-100 drop-shadow">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
