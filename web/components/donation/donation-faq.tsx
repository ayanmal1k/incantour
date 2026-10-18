"use client";

import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@/components/ui/icons";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Come viene utilizzata la mia donazione?",
    answer:
      "I contributi raccolti finanziano direttamente la manutenzione di sentieri storici, il restauro di manufatti artistici tradizionali, iniziative di pulizia e salvaguardia ambientale e borse di studio per guide e ricercatori locali. Ogni anno IncanTour redige un rendiconto trasparente sulle attività sostenute.",
  },
  {
    question: "La donazione è fiscalmente deducibile o detraibile?",
    answer:
      "Sì. Le erogazioni liberali effettuate a sostegno dei progetti culturali e di tutela ambientale beneficiano delle agevolazioni fiscali previste dalla normativa italiana vigente (art. 83 D.Lgs. 117/2017). Per usufruire della detrazione o deduzione è sufficiente conservare la ricevuta di pagamento e la quietanza inviata via email da IncanTour.",
  },
  {
    question: "Come funzionano le donazioni ricorrenti mensili?",
    answer:
      "La donazione mensile permette di pianificare sul lungo periodo i restauri e le attività educative. Riceverai aggiornamenti periodici sui risultati raggiunti grazie al tuo sostegno continuativo. Puoi modificare o sospendere il tuo impegno in qualsiasi momento contattando il nostro servizio dedicato.",
  },
  {
    question: "Posso destinare il mio contributo a uno specifico progetto o territorio?",
    answer:
      "Certamente. Nel modulo di donazione puoi indicare una delle aree prioritarie (Preservazione Culturale, Sostegno alla Comunità, Educazione & Formazione) o specificare un comune o sito archeologico d'interesse nelle note della donazione.",
  },
  {
    question: "Quali modalità di pagamento sono supportate?",
    answer:
      "Attualmente le donazioni vengono perfezionate tramite Bonifico Bancario intestato a IncanTour Srl con causale specifica 'Erogazione Liberale per Tutela Patrimonio'. I gateway di addebito diretto su carta sono in fase di aggiornamento e certificazione bancaria.",
  },
];

export function DonationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-200">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Domande Frequenti sulle Donazioni
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Tutto quello che c&apos;è da sapere su trasparenza, deducibilità e destinazione dei fondi.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-btn-${index}`;
            const regionId = `faq-content-${index}`;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <span className="font-bold text-base sm:text-lg text-teal-950">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <MinusIcon className="w-4 h-4" />
                    ) : (
                      <PlusIcon className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={regionId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
