import { CompassIcon, HeartIcon, LightbulbIcon } from "@/components/ui/icons";

export function BlogHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-br from-slate-900 via-[#0F4142] to-[#1B5E5F]">
      {/* Background Image with Warm Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(230, 165, 50, 0.3) 0%, rgba(27, 94, 95, 0.65) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center text-white">
        <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 border border-white/25 mb-4 shadow-sm">
          Blog &amp; Storie
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-md">
          Racconti di Viaggio &amp; Approfondimenti
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto font-medium leading-relaxed mb-8 drop-shadow">
          Scopri racconti di viaggio autentici, consigli degli esperti e meraviglie nascoste della Campania e del mondo. Lasciati ispirare per la tua prossima avventura.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-sm">
            <CompassIcon className="h-4 w-4 text-[#E6A532]" />
            <span>Guide di Viaggio</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-sm">
            <LightbulbIcon className="h-4 w-4 text-[#E6A532]" />
            <span>Consigli &amp; Curiosità</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-sm">
            <HeartIcon className="h-4 w-4 text-[#E6A532]" />
            <span>Esperienze Autentiche</span>
          </div>
        </div>
      </div>
    </section>
  );
}
