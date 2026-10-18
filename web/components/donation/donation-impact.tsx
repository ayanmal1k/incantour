import React from "react";
import { CompassIcon, HeartIcon, UsersIcon } from "@/components/ui/icons";

export function DonationImpact() {
  const pillars = [
    {
      icon: (
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 shadow-sm">
          <CompassIcon className="w-8 h-8" />
        </div>
      ),
      title: "Preservazione Culturale",
      description:
        "Sosteniamo attivamente la tutela, il restauro e la valorizzazione di siti storici meno conosciuti e delle antiche tradizioni dell'artigianato e della cucina campana.",
      metric: "Oltre 15 siti e borghi",
      metricLabel: "inclusi nei progetti di tutela",
    },
    {
      icon: (
        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 shadow-sm">
          <UsersIcon className="w-8 h-8" />
        </div>
      ),
      title: "Sostegno alla Comunità",
      description:
        "Supportiamo direttamente le piccole cooperative agricole, le guide abilitate locali e gli artigiani, favorendo uno sviluppo economico etico ed equilibrato.",
      metric: "100% Locale",
      metricLabel: "ricaduta economica diretta sul territorio",
    },
    {
      icon: (
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 shadow-sm">
          <HeartIcon className="w-8 h-8" />
        </div>
      ),
      title: "Educazione & Formazione",
      description:
        "Finanziamo percorsi didattici esperienziali per le scuole e borse di studio per giovani operatori del turismo sostenibile e dell'archeologia.",
      metric: "Programmi attivi",
      metricLabel: "per studenti e comunità scolastiche",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-200">
            Trasparenza &amp; Valore
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Il Tuo Impatto Concreto
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mt-3 leading-relaxed">
            Ogni contributo sostiene la salvaguardia del patrimonio culturale e lo sviluppo del turismo sostenibile sul territorio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-gray-50/70 rounded-3xl p-8 border border-gray-100 text-center flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {pillar.icon}
                <h3 className="text-xl font-bold text-teal-950 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/80">
                <span className="block text-xl font-extrabold text-teal-900 font-mono">
                  {pillar.metric}
                </span>
                <span className="text-xs text-gray-500">{pillar.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
