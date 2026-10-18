import { ClockIcon, HeartIcon, ShieldIcon } from "@/components/ui/icons";

export function BookingFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto px-6">
      {/* Feature 1: Risposta Rapida */}
      <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shrink-0">
          <ClockIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-teal-900 mb-3">Risposta Rapida</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Ti risponderemo entro 24 ore con l&apos;itinerario dettagliato, i dettagli di disponibilità e le opzioni su misura.
        </p>
      </div>

      {/* Feature 2: Sicuro e Protetto */}
      <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white shadow-md shrink-0">
          <ShieldIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-teal-900 mb-3">Sicuro e Protetto</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          I tuoi dati sono tutelati secondo le più rigorose norme di riservatezza. Nessun addebito automatico non concordato.
        </p>
      </div>

      {/* Feature 3: Esperienza Personalizzata */}
      <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shrink-0">
          <HeartIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-teal-900 mb-3">Esperienza Personalizzata</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Ogni itinerario è calibrato sulle tue preferenze, con guide autorizzate e accoglienza autentica del territorio.
        </p>
      </div>
    </div>
  );
}
