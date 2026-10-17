import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  GlobeIcon,
  MapPinIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

type TourDetailContentProps = {
  tour: Tour;
};

export function TourDetailContent({ tour }: TourDetailContentProps) {
  const location = tour.acf?.Location ? String(tour.acf.Location) : "Campania & Oltre";
  const duration = tour.acf?.Duration ? String(tour.acf.Duration) : "Itinerario esclusivo";
  const type = tour.acf?.type ? String(tour.acf.type) : "Esperienza su misura";
  const title = tour.title?.rendered ? stripHtml(tour.title.rendered) : "Tour";
  const rawDesc = tour.acf?.description ? String(tour.acf.description) : "";

  // Standard included features curated for Incantour packages
  const defaultIncluded = [
    "Assistenza dedicata 24/7 prima, durante e dopo il viaggio",
    "Itinerario culturale e visite guidate con accompagnatori certificati",
    "Polizza assicurativa medico/bagaglio RC Lloyd's inclusa",
    "Kit di viaggio digitale con voucher, itinerario dettagliato e consigli locali",
    "Esperienze enogastronomiche o degustazioni selezionate (dove specificato)",
  ];

  const defaultExcluded = [
    "Voli aerei o trasporti principali non espressamente indicati",
    "Mance, facchinaggio e spese di natura personale",
    "Tassa di soggiorno comunale (da regolare in loco in hotel)",
    "Pasti o bevande extra non menzionati nel programma",
    "Eventuali ingressi a musei o siti monumentali facoltativi",
  ];

  return (
    <div className="space-y-10">
      {/* Quick Facts Strip (Key Highlights) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#E6A532]">
            <MapPinIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Destinazione
            </span>
            <span className="block text-sm font-bold text-slate-800 truncate">{location}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#1B5E5F]">
            <ClockIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Durata
            </span>
            <span className="block text-sm font-bold text-slate-800 truncate">{duration}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <GlobeIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tipologia
            </span>
            <span className="block text-sm font-bold text-slate-800 truncate">{type}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <UsersIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Gruppo
            </span>
            <span className="block text-sm font-bold text-slate-800 truncate">
              Individuale / Gruppi
            </span>
          </div>
        </div>
      </div>

      {/* Main Overview Card */}
      <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6A532]">
            Panoramica del Viaggio
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1B5E5F] tracking-tight">
            Descrizione &amp; Esperienza
          </h2>
        </div>

        {tour.sanitizedContent ? (
          <div
            className="prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700 prose-headings:text-[#1B5E5F] prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-5 prose-a:text-[#E6A532] prose-strong:text-slate-900 prose-li:my-1.5"
            dangerouslySetInnerHTML={{ __html: tour.sanitizedContent }}
          />
        ) : rawDesc ? (
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
            <p className="font-medium text-slate-800 text-lg sm:text-xl">
              {rawDesc}
            </p>
            <p className="text-slate-600">
              Questo itinerario è stato attentamente studiato dai nostri Travel Specialist per offrirti un&apos;immersione completa nelle tradizioni autentiche, nei panorami più suggestivi e nei ritmi rilassati del territorio.
            </p>
          </div>
        ) : (
          <div className="text-slate-600 text-base leading-relaxed space-y-4">
            <p className="font-medium text-slate-800 text-lg">
              Vivi un&apos;esperienza indimenticabile firmata IncanTour.
            </p>
            <p>
              I nostri viaggi combinano autenticità, cultura, natura ed eccellenza organizzativa. Contattaci per ricevere la scheda tecnica completa dell&apos;itinerario o per personalizzare tappe, durata e sistemazioni secondo le tue preferenze.
            </p>
          </div>
        )}
      </div>

      {/* What's Included / Excluded (2-Column Card) */}
      <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-[#1B5E5F] mb-6 flex items-center gap-3">
          <span>Servizi Inclusi ed Esclusi</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Included */}
          <div className="rounded-xl bg-emerald-50/60 p-6 border border-emerald-100">
            <h4 className="text-base font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs">
                ✓
              </span>
              <span>Cosa include il pacchetto</span>
            </h4>
            <ul className="space-y-3">
              {defaultIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div className="rounded-xl bg-rose-50/60 p-6 border border-rose-100">
            <h4 className="text-base font-bold text-rose-900 mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white text-xs">
                ✕
              </span>
              <span>Cosa non è incluso</span>
            </h4>
            <ul className="space-y-3">
              {defaultExcluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CloseIcon className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Important Travel Information & FAQs Accordion Style */}
      <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-[#1B5E5F] mb-6">
          Informazioni Importanti per il Viaggio
        </h3>

        <div className="divide-y divide-slate-100 space-y-4">
          <div className="pt-3">
            <h4 className="text-base font-bold text-slate-800 mb-1.5 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-[#E6A532]" />
              <span>Modalità di Prenotazione e Conferma</span>
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              La prenotazione è soggetta a disponibilità. Dopo l&apos;invio della richiesta, il nostro team ti contatterà entro 24 ore per la conferma dei dettagli e la gestione del piano di viaggio.
            </p>
          </div>

          <div className="pt-4">
            <h4 className="text-base font-bold text-slate-800 mb-1.5 flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-[#E6A532]" />
              <span>Personalizzazione dell&apos;Itinerario</span>
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              Tutti i nostri pacchetti possono essere personalizzati aggiungendo notti supplementari, tappe speciali o trasferimenti privati dedicati.
            </p>
          </div>

          <div className="pt-4">
            <h4 className="text-base font-bold text-slate-800 mb-1.5 flex items-center gap-2">
              <GlobeIcon className="h-4 w-4 text-[#E6A532]" />
              <span>Assistenza e Sicurezza Incantour</span>
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              Viaggiare sereni è la nostra priorità. Mettiamo a disposizione assistenza telefonica dedicata 24/7 e coperture assicurative affidabili per ogni destinazione.
            </p>
          </div>
        </div>
      </div>

      {/* Assistance Card */}
      <div className="rounded-2xl bg-gradient-cool p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
            Supporto Dedicato
          </span>
          <h3 className="text-2xl font-bold mt-1 text-white">
            Desideri maggiori informazioni su questo tour?
          </h3>
          <p className="text-slate-200 text-sm mt-2 max-w-lg">
            I nostri Travel Designer sono a tua completa disposizione per chiarire qualsiasi dubbio, verificare disponibilità per date specifiche o creare un preventivo gratuito su misura.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <a
            href={`https://wa.me/393288293469?text=${encodeURIComponent(
              `Salve, vorrei parlare con un consulente per il tour "${title}".`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Chatta su WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
