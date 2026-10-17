import { HeartIcon, LightbulbIcon } from "@/components/ui/icons";

export function BlogHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0,0,0,0.65), rgba(15,65,66,0.6)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Warm Gradient Overlay matching legacy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(230, 165, 50, 0.35), rgba(27, 94, 95, 0.45))",
        }}
      />

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/20 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/20 shadow-xs">
          Blog &amp; Storie
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-md text-white">
          Racconti di Viaggio &amp; Approfondimenti
        </h1>

        <p className="text-lg md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-sm text-slate-100">
          Scopri racconti di viaggio autentici, consigli degli esperti e meraviglie nascoste della Campania e del mondo. Lasciati ispirare per la tua prossima avventura.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs md:text-sm font-semibold text-white shadow-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-300">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>Guide di Viaggio</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs md:text-sm font-semibold text-white shadow-xs">
            <LightbulbIcon className="h-4 w-4 text-amber-300" />
            <span>Consigli &amp; Curiosità</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs md:text-sm font-semibold text-white shadow-xs">
            <HeartIcon className="h-4 w-4 text-amber-300" />
            <span>Esperienze Autentiche</span>
          </div>
        </div>
      </div>
    </section>
  );
}
