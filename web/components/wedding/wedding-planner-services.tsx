import React from "react";
import Image from "next/image";
import {
  MapPinIcon,
  CheckCircleIcon,
  SparklesIcon,
  GlobeIcon,
  ShipIcon,
  StarIcon,
} from "@/components/ui/icons";

export function WeddingPlannerServices() {
  const specialServices = [
    { label: "Addio al nubilato e celibato", icon: "cocktail" },
    { label: "Viaggio dall'estero, sistemazione alberghiera e transfer", icon: "plane" },
    { label: "Interpreti multilingue", icon: "language" },
    { label: "Auto d’epoca, sportive, imbarcazioni d’epoca e di lusso", icon: "car" },
    { label: "Hotel guest experience", icon: "hotel" },
    { label: "Catering e banqueting d'eccellenza", icon: "utensils" },
    { label: "Corner dedicati - Cake & Bar Catering", icon: "cake" },
    { label: "Floral designer & scenografie floreali", icon: "flower" },
    { label: "Viaggi in elicottero e tour in barche da sogno", icon: "helicopter" },
    { label: "Fotografi e video d'autore", icon: "camera" },
    { label: "Trucco ed acconciatura professionale", icon: "sparkles" },
    { label: "Musica live band, DJ, singers e dancers", icon: "music" },
    { label: "Wedding site & book personalizzato", icon: "book" },
    { label: "Promessa di matrimonio", icon: "ring" },
    { label: "Disbrigo pratiche burocratiche & registro Unioni Civili", icon: "document" },
    {
      label: "Prenotazione SALA della loggia al Maschio Angioino a Napoli con servizi aggiuntivi",
      icon: "landmark",
      highlight: true,
    },
  ];

  return (
    <div>
      {/* Featured Image & Presentation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-gradient-to-br from-amber-50/70 via-white to-teal-50/60 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-amber-100/60 flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-2xl relative aspect-[4/3] group">
              <Image
                src="/assets/images/plan-wedding.png"
                alt="Wedding Planner Incantour"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                  Incantour Experience
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold leading-snug">
                  Pianificazione Matrimoni in Campania
                </h4>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <span className="text-teal-800 font-bold uppercase tracking-wider text-xs bg-teal-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Eccellenza &amp; Trasparenza
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Un&apos;esperienza da Sogno Senza Stress
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
                Uniamo la passione per il nostro territorio campano all&apos;esperienza professionale nel Travel Coordination per offrirvi un servizio completo a 360 gradi. Dalla burocrazia iniziale ai trasferimenti degli ospiti, fino ai dettagli stilistici più raffinati.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Staff Multilingue</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Assistenza Logistica</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Pratiche Burocratiche</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Tailor Made</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi Section */}
      <section id="servizi" className="py-20 bg-gray-50/70 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#E6A532] font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              Cosa Offriamo
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
              <span className="inline-block pb-2">I Nostri Servizi Esclusivi</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Pianifichiamo e coordiniamo ogni aspetto del vostro giorno speciale e dell&apos;accoglienza dei vostri ospiti in Campania.
            </p>
          </div>

          {/* Main 2 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 flex gap-6 hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                <MapPinIcon className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  DESTINATION E VENUE
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Le aree costiere ed interne della Campania un incontro con la bellezza tra arte, storia, musicalità, di terra e di mare. Ricerca e selezione delle migliori location in borghi storici, castelli incantati, chiostri, vigneti, cerimonie in spiaggia, in eleganti ville d&apos;epoca &amp; dimore di charme.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 flex gap-6 hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                <SparklesIcon className="w-8 h-8 text-teal-700" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  COORDINATOR &amp; PLANNER
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Regia completa dell&apos;evento, coordinamento fornitore per fornitore e supporto dedicato discreto e costante agli sposi e a tutti gli ospiti prima, durante e dopo le nozze.
                </p>
              </div>
            </div>
          </div>

          {/* Special Services Section */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 mb-16">
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">SPECIAL SERVICES</h3>
                <p className="text-sm text-gray-500">Servizi dedicati su misura per sposi ed ospiti</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialServices.map((srv, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl transition flex items-start gap-3 ${
                    srv.highlight
                      ? "col-span-1 md:col-span-2 lg:col-span-3 bg-amber-50/90 border-2 border-amber-300 shadow-sm"
                      : "bg-gray-50/80 hover:bg-amber-50/60 border border-gray-100"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6A532] mt-1.5 flex-shrink-0" />
                  <span
                    className={`text-sm leading-snug ${
                      srv.highlight ? "font-bold text-gray-900" : "font-medium text-gray-800"
                    }`}
                  >
                    {srv.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location da Sogno Luxury Banner */}
          <div className="bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/20">
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest bg-amber-400 text-teal-950 px-3.5 py-1.5 rounded-full mb-4 inline-block shadow-sm">
                Cornici Uniche
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
                LOCATION DA SOGNO
              </h3>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8">
                Scegliamo per voi solo le dimore più affascinanti: ville panoramiche a picco sul mare, dimore de charme ricche di storia, maestosi castelli medievali, lussuose imbarcazioni ed esclusivi luxury hotel a 5 stelle.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <GlobeIcon className="w-4 h-4 text-amber-300" />
                  <span>Ville storiche</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <SparklesIcon className="w-4 h-4 text-amber-300" />
                  <span>Castelli &amp; RELAIS</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <StarIcon className="w-4 h-4 text-amber-300" />
                  <span>Luxury hotel</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <ShipIcon className="w-4 h-4 text-amber-300" />
                  <span>Yacht</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <MapPinIcon className="w-4 h-4 text-amber-300" />
                  <span>Masserie</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <GlobeIcon className="w-4 h-4 text-amber-300" />
                  <span>Borghi</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-white/20">
                  <SparklesIcon className="w-4 h-4 text-amber-300" />
                  <span>Spiagge</span>
                </span>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
