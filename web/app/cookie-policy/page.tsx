import type { Metadata } from "next";
import Link from "next/link";
import { CompanyHero } from "@/components/company/company-hero";
import { getSiteUrl, siteName } from "@/lib/site";
import {
  ChevronRightIcon,
  PhoneIcon,
  FileTextIcon,
} from "@/components/ui/icons";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Cookie Policy - IncanTour | Informativa Uso Cookie",
  description:
    "Informativa completa sull'utilizzo di cookie e strumenti di tracciamento sul sito Incantour S.r.l. ai sensi della normativa vigente.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Cookie Policy - IncanTour",
    description:
      "Scopri come Incantour utilizza i cookie per garantire la migliore esperienza di navigazione.",
    url: `${getSiteUrl().origin}/cookie-policy`,
    images: [{ url: "/assets/images/storia e visione.png", alt: "Cookie Policy IncanTour" }],
  },
};

const SECTIONS = [
  {
    id: "titolare",
    num: "1",
    title: "Titolare del trattamento",
    content: (
      <>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Il Titolare del trattamento è:
        </p>
        <div className="bg-gradient-to-br from-amber-50/70 to-teal-50/50 p-6 rounded-2xl border border-amber-200/50 mb-4 shadow-sm">
          <p className="font-extrabold text-[#1B5E5F] text-lg mb-2">Incantour S.r.l.</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>P. IVA:</strong> IT10071441215</li>
            <li><strong>Sede legale:</strong> Calata Trinità Maggiore, 53 – 80134 Napoli (NA), Italia</li>
            <li><strong>Telefono:</strong> <a href="tel:+390810607948" className="text-[#1B5E5F] hover:underline font-semibold">+39 081 0607948</a></li>
            <li><strong>WhatsApp:</strong> <a href="https://wa.me/393384357143" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-semibold">+39 338 4357143</a></li>
            <li><strong>E-mail:</strong> <a href="mailto:info@incantour.it" className="text-[#E6A532] hover:underline font-semibold">info@incantour.it</a></li>
            <li><strong>PEC:</strong> <a href="mailto:incantoursrl@legalmail.it" className="text-gray-800 hover:underline font-semibold">incantoursrl@legalmail.it</a></li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "cosa-sono",
    num: "2",
    title: "Cosa sono i cookie",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        I cookie sono piccoli file di testo che i siti web visitati dall&apos;utente inviano al dispositivo utilizzato per la navigazione, dove vengono memorizzati e successivamente ritrasmessi agli stessi siti durante visite successive. I cookie consentono di garantire il corretto funzionamento del sito, ricordare preferenze, raccogliere informazioni statistiche aggregate o mostrare contenuti pertinenti. Oltre ai cookie possono essere impiegate tecnologie analoghe (pixel, tag o identificatori online).
      </p>
    ),
  },
  {
    id: "tipologie",
    num: "3",
    title: "Tipologie di cookie utilizzati",
    content: (
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              3.1 Cookie tecnici o necessari
            </h4>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">Sempre Attivi</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Indispensabili per consentire la navigazione sicura, gestire sessioni, mantenere le preferenze di prenotazione e carrello, memorizzare il consenso ai cookie. Per questi cookie <strong>non è richiesto il preventivo consenso</strong>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B5E5F]"></span>
              3.2 Cookie di funzionalità
            </h4>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-teal-100 text-teal-800 rounded-full">Funzionali</span>
          </div>
          <p className="text-sm text-gray-600">
            Consentono al sito di ricordare scelte effettuate dall&apos;utente (come la lingua o le impostazioni di visualizzazione) per un&apos;esperienza più personalizzata.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6A532]"></span>
              3.3 Cookie analitici e statistici
            </h4>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">Statistici</span>
          </div>
          <p className="text-sm text-gray-600">
            Utilizzati per comprendere in modo aggregato come gli utenti navigano il sito e migliorare contenuti e prestazioni generali.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              3.4 Cookie di profilazione e marketing
            </h4>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">Previo Consenso</span>
          </div>
          <p className="text-sm text-gray-600">
            Qualora attivati, consentono di proporre contenuti commerciali o offerte rilevanti. Tali cookie non vengono mai installati senza il tuo consenso libero e facoltativo.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "terze-parti",
    num: "4",
    title: "Cookie di terze parti",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        Alcune funzionalità del sito possono avvalersi di servizi erogati da terze parti (es. fornitori di pagamenti, mappe interattive, video, strumenti statistici). Tali soggetti terzi possono installare propri cookie soggetti alle rispettive policy e normative di settore.
      </p>
    ),
  },
  {
    id: "gestione-consenso",
    num: "5",
    title: "Gestione del consenso",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        L&apos;utente può in qualsiasi momento scegliere di accettare, rifiutare o personalizzare le categorie di cookie. La revoca o la modifica del consenso è libera e non pregiudica la possibilità di navigare o acquistare i pacchetti di viaggio.
      </p>
    ),
  },
  {
    id: "durata",
    num: "6",
    title: "Durata dei cookie",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h5 className="font-bold text-[#1B5E5F] mb-1">Cookie di Sessione</h5>
          <p className="text-xs text-gray-600">Vengono cancellati automaticamente alla chiusura della finestra del browser.</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h5 className="font-bold text-[#E6A532] mb-1">Cookie Persistenti</h5>
          <p className="text-xs text-gray-600">Rimangono memorizzati sul dispositivo fino alla loro data di scadenza prestabilita o alla cancellazione manuale.</p>
        </div>
      </div>
    ),
  },
  {
    id: "browser",
    num: "7",
    title: "Come gestire o disabilitare i cookie dal browser",
    content: (
      <>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          È possibile bloccare o rimuovere i cookie direttamente tramite le impostazioni del proprio browser:
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700">Google Chrome</span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700">Mozilla Firefox</span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700">Apple Safari</span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700">Microsoft Edge</span>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Nota: la disattivazione dei cookie tecnici necessari potrebbe compromettere la navigazione o il processo di prenotazione online.
        </p>
      </>
    ),
  },
  {
    id: "contatti",
    num: "8",
    title: "Contatti e chiarimenti",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        Per qualsiasi domanda relativa alla presente Cookie Policy o per esercitare i tuoi diritti in merito ai tuoi dati personali, puoi contattare Incantour S.r.l. all&apos;indirizzo <a href="mailto:info@incantour.it" className="text-[#E6A532] font-bold underline">info@incantour.it</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <article className="min-h-screen bg-slate-50/60">
      <CompanyHero
        title="Cookie Policy"
        subtitle="Informativa sull'utilizzo dei cookie e di tecnologie analoghe sul sito web Incantour"
        eyebrow="Trasparenza Web"
        bgImage="/assets/images/storia e visione.png"
        breadcrumbLabel="Cookie Policy"
        highlight="Ultimo aggiornamento: 1 ottobre 2026"
      />

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Quick Notice Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Navigazione trasparente e controllata
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  La presente informativa descrive le modalità con cui Incantour S.r.l. utilizza cookie e tecnologie equivalenti.
                </p>
              </div>
            </div>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-3 rounded-xl hover:opacity-95 transform hover:scale-105 transition-all shadow-md shrink-0"
            >
              <span>Vedi Privacy Policy</span>
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table of Contents & Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 pb-3 mb-2 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-[#1B5E5F]">
                  <FileTextIcon className="w-4 h-4 text-[#E6A532]" />
                  <span>Indice Cookie Policy</span>
                </div>
                <nav className="space-y-1 text-xs">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block px-3 py-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-colors font-medium"
                    >
                      {s.num}. {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Sections */}
            <div className="lg:col-span-8 space-y-8">
              {SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-gray-100 scroll-mt-28 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-700 to-teal-800 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {sec.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {sec.title}
                    </h3>
                  </div>
                  <div>{sec.content}</div>
                </div>
              ))}

              {/* Assistance Box */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1B5E5F] to-[#0F4142] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-1">Maggiori informazioni</h4>
                  <p className="text-sm text-teal-100/90">
                    Leggi anche la nostra Privacy Policy completa o contattaci per ogni delucidazione.
                  </p>
                </div>
                <a
                  href="mailto:info@incantour.it"
                  className="inline-flex items-center gap-2 bg-[#E6A532] hover:bg-[#d4941a] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all transform hover:scale-105 shrink-0 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contattaci</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
