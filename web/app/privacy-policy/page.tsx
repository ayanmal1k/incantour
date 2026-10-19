import type { Metadata } from "next";
import Link from "next/link";
import { CompanyHero } from "@/components/company/company-hero";
import { getSiteUrl, siteName } from "@/lib/site";
import {
  ChevronRightIcon,
  PhoneIcon,
  MapPinIcon,
  FileTextIcon,
} from "@/components/ui/icons";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Privacy Policy - IncanTour | Trattamento Dati Personali GDPR",
  description:
    "Informativa completa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR) di Incantour S.r.l.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: "Privacy Policy - IncanTour",
    description:
      "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
    url: `${getSiteUrl().origin}/privacy-policy`,
    images: [{ url: "/assets/images/storia e visione.png", alt: "Privacy Policy IncanTour" }],
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
          Il Titolare del trattamento dei dati personali raccolti attraverso il sito web Incantour e nell&apos;ambito dei servizi offerti è:
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
        <p className="text-gray-600 text-sm leading-relaxed">
          Il Titolare tratta i dati personali degli utenti nel rispetto del Regolamento (UE) 2016/679 (&quot;GDPR&quot;) e della normativa italiana applicabile in materia di protezione dei dati personali.
        </p>
      </>
    ),
  },
  {
    id: "tipologie-dati",
    num: "2",
    title: "Tipologie di dati personali trattati",
    content: (
      <>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Attraverso il sito e nell&apos;ambito dell&apos;acquisto e della gestione dei servizi turistici, Incantour può trattare le seguenti categorie di dati personali:
        </p>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E6A532]"></span>
              2.1 Dati identificativi e di contatto
            </h4>
            <p className="text-sm text-gray-600">
              Nome e cognome, indirizzo di residenza o domicilio (ove necessario), indirizzo e-mail, numero di telefono, dati per comunicazioni WhatsApp e dati identificativi dei partecipanti al viaggio.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B5E5F]"></span>
              2.2 Dati necessari alla prenotazione e organizzazione del viaggio
            </h4>
            <p className="text-sm text-gray-600">
              Data di nascita, nazionalità, documenti di identità o di viaggio (quando necessari per legge/fornitori), informazioni per voli, trasferimenti, strutture ricettive, escursioni ed eventuali specifiche esigenze organizzative.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E6A532]"></span>
              2.3 Dati fiscali e di fatturazione
            </h4>
            <p className="text-sm text-gray-600">
              Codice fiscale, Partita IVA, indirizzo di fatturazione, codice SDI/PEC e dati connessi all&apos;emissione di documenti contabili e fiscali.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B5E5F]"></span>
              2.4 Dati relativi ai pagamenti
            </h4>
            <p className="text-sm text-gray-600">
              Dati della transazione ed esito del pagamento. I dati finanziari completi delle carte sono trattati direttamente dai gateway di pagamento certificati (es. Stripe, PayPal, Compass HeyLight) nel rispetto dei più rigorosi protocolli di sicurezza PCI-DSS.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              2.5 Dati forniti volontariamente e dati di navigazione
            </h4>
            <p className="text-sm text-gray-600">
              Richieste inviate via email, moduli o WhatsApp; indirizzo IP, tipo di browser, orario di accesso e parametri del sistema operativo trattati per finalità di sicurezza e corretto funzionamento del sito.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "finalita",
    num: "3",
    title: "Finalità del trattamento",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "A. Gestione delle richieste", desc: "Per rispondere a richieste di informazioni, preventivi, disponibilità o assistenza." },
          { title: "B. Gestione prenotazioni e acquisti", desc: "Per consentire all'utente di prenotare pacchetti turistici, escursioni e servizi." },
          { title: "C. Esecuzione del contratto", desc: "Per adempiere a tutti gli obblighi contrattuali ed erogare i servizi di viaggio concordati." },
          { title: "D. Adempimenti amministrativi e fiscali", desc: "Per rispettare gli obblighi di legge previsti in materia fiscale, contabile e tributaria." },
          { title: "E. Gestione dei pagamenti", desc: "Per verificare e contabilizzare le transazioni relative ai viaggi e servizi acquistati." },
          { title: "F. Assistenza al cliente", desc: "Per fornire supporto costante prima, durante e dopo lo svolgimento del viaggio." },
          { title: "G. Sicurezza del sito", desc: "Per prevenire frodi, accessi non autorizzati e utilizzi illeciti dei sistemi informatici." },
          { title: "H. Tutela dei diritti", desc: "Per l'accertamento, l'esercizio o la difesa di diritti in sede giudiziale o stragiudiziale." },
          { title: "I. Comunicazioni commerciali (facoltativo)", desc: "Previo esplicito consenso, per inviare aggiornamenti, newsletter e promozioni esclusive." },
          { title: "L. Miglioramento dei servizi", desc: "Analisi anonima e statistica per migliorare costantemente la qualità della navigazione e dei tour." },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <h5 className="font-bold text-[#1B5E5F] text-sm mb-1">{item.title}</h5>
            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "base-giuridica",
    num: "4",
    title: "Base giuridica del trattamento",
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>Il trattamento dei dati personali viene effettuato in conformità all&apos;art. 6 del GDPR:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
          <li><strong>Esecuzione contrattuale o precontrattuale:</strong> necessaria per gestire preventivi, itinerari, prenotazioni e servizi di viaggio.</li>
          <li><strong>Obbligo di legge:</strong> adempimenti di natura fiscale, contabile, tributaria e di pubblica sicurezza.</li>
          <li><strong>Legittimo interesse:</strong> sicurezza informatica, prevenzione delle frodi e tutela dei diritti del Titolare.</li>
          <li><strong>Consenso espresso:</strong> per l&apos;invio di comunicazioni promozionali o l&apos;uso di cookie opzionali.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "dati-particolari",
    num: "5",
    title: "Dati appartenenti a categorie particolari",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        Nell&apos;organizzazione del viaggio l&apos;utente potrebbe comunicare volontariamente dati particolari (es. intolleranze alimentari, allergie, condizioni di salute o mobilità ridotta). Tali informazioni vengono trattate esclusivamente per garantire la sicurezza e la corretta personalizzazione del viaggio con il consenso dell&apos;interessato o sulla base delle tutele applicabili.
      </p>
    ),
  },
  {
    id: "sicurezza",
    num: "6",
    title: "Modalità del trattamento e sicurezza",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        I trattamenti sono svolti con strumenti informatici e misure di sicurezza adeguate ad assicurare riservatezza, integrità e disponibilità dei dati, prevenendo accessi non autorizzati o dispersioni secondo quanto prescritto dall&apos;art. 32 del GDPR.
      </p>
    ),
  },
  {
    id: "destinatari",
    num: "7",
    title: "Destinatari dei dati",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        I dati possono essere comunicati unicamente a partner operativi strettamente coinvolti nell&apos;erogazione del viaggio: strutture ricettive, vettori e compagnie aeree, guide e accompagnatori turistici, fornitori di trasporti ed escursioni, istituti bancari, consulenti legali/fiscali e autorità competenti nei casi di legge.
      </p>
    ),
  },
  {
    id: "conservazione",
    num: "8",
    title: "Periodo di conservazione dei dati",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        I dati contrattuali e contabili sono conservati per 10 anni in ottemperanza agli obblighi civili e tributari. I dati di richiesta preventivi vengono conservati per il tempo necessario alla gestione della richiesta. I dati per comunicazioni promozionali sono conservati fino alla revoca del consenso.
      </p>
    ),
  },
  {
    id: "diritti",
    num: "9",
    title: "Diritti dell'interessato (Artt. 15-22 GDPR)",
    content: (
      <>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          In qualsiasi momento l&apos;interessato può esercitare i propri diritti garantiti dal GDPR:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
          <div className="p-3 bg-white rounded-xl border border-gray-100 font-medium text-gray-800">✓ Diritto di accesso ai dati personali</div>
          <div className="p-3 bg-white rounded-xl border border-gray-100 font-medium text-gray-800">✓ Diritto di rettifica o integrazione</div>
          <div className="p-3 bg-white rounded-xl border border-gray-100 font-medium text-gray-800">✓ Diritto alla cancellazione (&quot;oblio&quot;)</div>
          <div className="p-3 bg-white rounded-xl border border-gray-100 font-medium text-gray-800">✓ Diritto di limitazione del trattamento</div>
          <div className="p-3 bg-white rounded-xl border border-gray-100 font-medium text-gray-800">✓ Diritto alla portabilità dei dati</div>
          <div className="p-3 bg-white rounded-xl border border-gray-100 font-medium text-gray-800">✓ Diritto di opposizione e revoca consenso</div>
        </div>
        <p className="text-xs text-gray-500">
          Per esercitare tali diritti, è sufficiente inviare una richiesta scritta a <a href="mailto:info@incantour.it" className="text-[#E6A532] font-bold underline">info@incantour.it</a> oppure via PEC a <a href="mailto:incantoursrl@legalmail.it" className="text-[#1B5E5F] font-bold underline">incantoursrl@legalmail.it</a>.
        </p>
      </>
    ),
  },
  {
    id: "reclamo",
    num: "10",
    title: "Diritto di reclamo al Garante",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        Qualora l&apos;utente ritenga che il trattamento violi le disposizioni di legge, ha il diritto di proporre reclamo al <strong>Garante per la protezione dei dati personali</strong> (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#1B5E5F] hover:underline font-semibold">www.garanteprivacy.it</a>).
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="min-h-screen bg-slate-50/60">
      <CompanyHero
        title="Privacy Policy"
        subtitle="Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR)"
        eyebrow="Trasparenza & Sicurezza"
        bgImage="/assets/images/storia e visione.png"
        breadcrumbLabel="Privacy Policy"
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
                  La tutela dei tuoi dati è la nostra priorità
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Ai sensi degli Artt. 13 e 14 del Regolamento Europeo 2016/679 (GDPR) e della normativa italiana vigente.
                </p>
              </div>
            </div>
            <Link
              href="/cookie-policy"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#1B5E5F] to-[#0F4142] text-white px-5 py-3 rounded-xl hover:opacity-95 transform hover:scale-105 transition-all shadow-md shrink-0"
            >
              <span>Vedi Cookie Policy</span>
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
                  <span>Indice Informativa</span>
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

            {/* Main Policy Sections */}
            <div className="lg:col-span-8 space-y-8">
              {SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-gray-100 scroll-mt-28 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {sec.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {sec.title}
                    </h3>
                  </div>
                  <div>{sec.content}</div>
                </div>
              ))}

              {/* Contact Assistance Box */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1B5E5F] to-[#0F4142] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-1">Hai domande sul trattamento dei tuoi dati?</h4>
                  <p className="text-sm text-teal-100/90">
                    Il nostro Responsabile della Protezione Dati è a tua completa disposizione.
                  </p>
                </div>
                <a
                  href="mailto:info@incantour.it"
                  className="inline-flex items-center gap-2 bg-[#E6A532] hover:bg-[#d4941a] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all transform hover:scale-105 shrink-0 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Scrivici</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
