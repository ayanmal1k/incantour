import { ClockIcon, HeartIcon, ShieldIcon } from "@/components/ui/icons";

export function CustomTripFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto px-6">
      {/* Feature 1: Risposta in 24 Ore */}
      <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shrink-0">
          <ClockIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-teal-900 mb-3">Risposta in 24 Ore</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          I nostri consulenti analizzano le tue aspettative e ti ricontattano entro un giorno con una proposta preliminare o chiarimenti mirati.
        </p>
      </div>

      {/* Feature 2: 100% Su Misura */}
      <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white shadow-md shrink-0">
          <HeartIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-teal-900 mb-3">Itinerario Sartoriale</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Nessun pacchetto prefabbricato: ogni sosta, alloggio ed esperienza enogastronomica o culturale è calibrata esattamente sul tuo stile di viaggio.
        </p>
      </div>

      {/* Feature 3: Assistenza & Riservatezza */}
      <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shrink-0">
          <ShieldIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-teal-900 mb-3">Assistenza & Sicurezza</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Dati tutelati dal GDPR e supporto continuo da parte della nostra agenzia autorizzata prima, durante e dopo la partenza.
        </p>
      </div>
    </div>
  );
}
