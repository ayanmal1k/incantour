import Image from "next/image";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Caricamento in corso"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/90 shadow-[0_20px_50px_rgba(27,94,95,0.12)] border border-gray-100 max-w-sm text-center">
        {/* Animated Spiral Logo with Outer Glow Ring */}
        <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
          {/* Subtle spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E6A532] border-r-[#1B5E5F] animate-spin" />
          
          {/* Brand Spiral Logo */}
          <div className="relative w-12 h-12 animate-pulse motion-reduce:animate-none">
            <Image
              src="/assets/images/icon.png"
              alt="IncanTour"
              fill
              className="object-contain"
              sizes="48px"
              priority
            />
          </div>
        </div>

        {/* Brand Name & Loading Message */}
        <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532] mb-1">
          IncanTour
        </span>
        <h2 className="text-lg font-bold text-teal-950 mb-1">
          Stiamo preparando il tuo viaggio
        </h2>
        <p className="text-xs text-gray-400">
          Un istante, carichiamo le migliori esperienze...
        </p>

        {/* Smooth horizontal progress bar */}
        <div className="w-36 h-1 bg-gray-100 rounded-full overflow-hidden mt-4">
          <div className="w-full h-full bg-gradient-to-r from-[#E6A532] via-[#D4941A] to-[#1B5E5F] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
