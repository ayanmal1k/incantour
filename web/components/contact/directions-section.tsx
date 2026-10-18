import { CarIcon, PlaneIcon, ShipIcon, TrainIcon } from "@/components/ui/icons";

export function DirectionsSection() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">
            Indicazioni Stradali
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-teal-900 mt-1 mb-4">
            Come Raggiungerci
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Indicazioni chiare per raggiungerci con ogni mezzo di trasporto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: IN AUTO */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4 shrink-0">
              <CarIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
              IN AUTO
            </h3>
            <div className="space-y-4 text-xs text-gray-600 leading-relaxed grow">
              <div>
                <p className="font-bold text-amber-700 uppercase tracking-wider text-[11px]">
                  Via Autostrade
                </p>
                <p className="mt-1">
                  Per chi proviene dalle autostrade A1 (Milano–Napoli), A3 (Salerno–Reggio Calabria) e A16 (Napoli–Canosa), uscire a <strong>Napoli Porto</strong>.
                </p>
                <p className="mt-1.5">
                  Percorrere Via Nuova Marina verso Via A. De Gasperi, proseguire per Via Depretis, svoltare a destra in Piazza Municipio e nuovamente a destra in Via Medina.
                </p>
                <p className="mt-1.5">
                  Al semaforo proseguire dritto lungo Via Monteoliveto. Dopo circa 150 metri, svoltare a destra in Calata Trinità Maggiore.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="font-bold text-amber-700 uppercase tracking-wider text-[11px]">
                  Via Tangenziale di Napoli
                </p>
                <p className="mt-1">
                  Dalla Tangenziale di Napoli, uscita <strong>Capodimonte</strong>, proseguire lungo Via Santa Teresa degli Scalzi.
                </p>
                <p className="mt-1.5">
                  Continuare su Via Pessina fino a Piazza Dante. Proseguire lungo Via Toledo. Giunti a Piazza Carità, svoltare a sinistra verso Piazza Matteotti.
                </p>
                <p className="mt-1.5">
                  Seguire la rotonda e, al semaforo, svoltare a sinistra in Via Monteoliveto. Dopo circa 300 metri, svoltare a destra in Calata Trinità Maggiore.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: IN TRENO */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl mb-4 shrink-0">
              <TrainIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
              IN TRENO
            </h3>
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed grow">
              <p className="font-bold text-teal-800 uppercase tracking-wider text-[11px]">
                Dalla Stazione Centrale (Piazza Garibaldi):
              </p>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-2">
                <p className="font-medium">
                  • <strong>Autobus R2</strong> fino a Via Medina, poi a piedi fino a Calata Trinità Maggiore;
                </p>
                <p className="text-[11px] font-semibold text-gray-500 uppercase">oppure</p>
                <p className="font-medium">
                  • <strong>Metropolitana Linea 1</strong> direzione Piscinola, fermata <strong>Dante</strong>.
                </p>
              </div>
              <p className="mt-2 text-gray-600">
                Da Piazza Dante percorrere Via Toledo, attraversare Via Cisterna dell&apos;Olio e raggiungere Piazza del Gesù Nuovo. Da qui imboccare Calata Trinità Maggiore fino a Palazzo Pignatelli di Monteleone.
              </p>
            </div>
          </div>

          {/* Card 3: IN NAVE */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4 shrink-0">
              <ShipIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
              IN NAVE
            </h3>
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed grow">
              <p className="font-bold text-blue-800 uppercase tracking-wider text-[11px]">
                Dalla Stazione Marittima o Molo Beverello:
              </p>
              <p className="text-gray-700">
                Raggiungere a piedi o in taxi <strong>Piazza Municipio</strong>.
              </p>
              <p className="mt-1">
                Proseguire lungo Via Medina, poi risalire per Via Monteoliveto fino all&apos;incrocio con Calata Trinità Maggiore e raggiungere Piazza del Gesù Nuovo.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-blue-50/70 text-blue-900 text-[11px]">
                Distanza a piedi: circa 15 minuti di piacevole camminata attraverso il centro.
              </div>
            </div>
          </div>

          {/* Card 4: IN AEREO */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4 shrink-0">
              <PlaneIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
              IN AEREO
            </h3>
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed grow">
              <p className="font-bold text-amber-800 uppercase tracking-wider text-[11px]">
                Dall&apos;Aeroporto di Capodichino:
              </p>
              <p>
                Prendere la navetta <strong>Alibus</strong> (partenza ogni 15 minuti dal piazzale arrivi) fino a Piazza Municipio.
              </p>
              <p className="mt-1.5">
                Da Piazza Municipio prendere l&apos;autobus <strong>R1</strong> fino a Via Monteoliveto oppure raggiungere la sede con una breve passeggiata di 10 minuti.
              </p>
              <p className="mt-1.5">
                Proseguire a piedi lungo Calata Trinità Maggiore fino al portone storico della Maison Degas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
