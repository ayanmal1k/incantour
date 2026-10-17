import Image from "next/image";
import Link from "next/link";
import { CategoryIcon } from "./category-icon";
import type { TravelCategoryConfig } from "@/lib/travel-categories";

export function CategoryHero({ config }: { config: TravelCategoryConfig }) {
  const { hero } = config;

  return (
    <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
      {/* Background Image */}
      <Image
        src={hero.bgImage}
        alt={hero.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />

      {/* Layered brand gradients for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4142]/45 via-transparent to-[#E6A532]/25 pointer-events-none" />


      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-amber-300 font-medium">{hero.breadcrumb}</span>
        </nav>

        {/* Optional Tag Badge */}
        {hero.tagBadge ? (
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/15 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20 shadow-sm">
            {hero.tagBadge}
          </span>
        ) : null}

        {/* Hero Title with radiant brand gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-md text-gradient-hero">
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 max-w-2xl mx-auto text-amber-100 leading-snug drop-shadow">
          {hero.subtitle}
        </p>

        {/* Frosted Glass Narrative Card */}
        <div className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto bg-black/40 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 text-gray-100 shadow-2xl">
          <p className="leading-relaxed">{hero.description}</p>
          {hero.quote ? (
            <div className="mt-5 pt-4 border-t border-white/15 text-left md:text-center">
              <p className="italic text-amber-300 text-sm md:text-base">
                &ldquo;{hero.quote.text}&rdquo;
              </p>
              <p className="text-xs text-amber-200/80 mt-1 uppercase tracking-wider font-semibold">
                — {hero.quote.author}
              </p>
            </div>
          ) : null}
        </div>

        {/* Feature Badges / Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {hero.featurePills.map((pill, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2.5 bg-white/15 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-sm transition-all"
            >
              <CategoryIcon name={pill.icon} className="w-4 h-4 text-amber-300" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">{pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
