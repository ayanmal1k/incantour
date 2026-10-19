"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  CheckCircleIcon,
  PaperPlaneIcon,
  PhoneIcon,
  MailIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  ArrowRightIcon,
  ShieldIcon,
  ClockIcon,
} from "@/components/ui/icons";

export function AgencyServicesContent() {
  const [formData, setFormData] = useState({
    agency_name: "",
    contact_person: "",
    email: "",
    phone: "",
    service_type: "Biglietteria Treni (Trenitalia / Italo)",
    departure_city: "",
    destination_city: "",
    departure_date: "",
    return_date: "",
    passengers: 1,
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.agency_name} - ${formData.contact_person}`.trim(),
          email: formData.email,
          phone: formData.phone,
          subject: `Richiesta Agency Services: ${formData.service_type}`,
          details: `
Richiesta Agency Services:
- Agenzia: ${formData.agency_name}
- Referente: ${formData.contact_person}
- Servizio: ${formData.service_type}
- Tratta: da ${formData.departure_city} a ${formData.destination_city}
- Data Andata: ${formData.departure_date}
- Data Ritorno: ${formData.return_date || "Solo andata"}
- Numero Passeggeri: ${formData.passengers}
- Note/Richieste: ${formData.notes}
          `.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Errore durante l'invio della richiesta.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg("Si è verificato un errore durante l'invio. Riprova o contattaci telefonicamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const transportPartners = [
    {
      name: "Trenitalia / Frecciarossa",
      category: "Alta Velocità & Regionale",
      desc: "Emissione immediata biglietti Frecce, Intercity, Eurocity e treni regionali in tutta Italia ed Europa.",
      badge: "Treni Alta Velocità",
      color: "from-red-600 to-rose-700",
      iconText: "FRECCIAROSSA",
    },
    {
      name: "Italo Treno",
      category: "Alta Velocità Nazionale",
      desc: "Tariffe dedicate, gestione carrozze Club Executive, Prima e Smart per viaggi d'affari o di piacere.",
      badge: "Italo Più & Corporate",
      color: "from-red-700 to-stone-900",
      iconText: "ITALO",
    },
    {
      name: "Flixbus",
      category: "Linee Bus Nazionali & Europee",
      desc: "Collegamenti capillari a medio e lungo raggio in oltre 40 paesi, con soluzioni flessibili ed economiche.",
      badge: "Bus Internazionali",
      color: "from-lime-600 to-emerald-700",
      iconText: "FLIXBUS",
    },
    {
      name: "MarinoBus",
      category: "Linee Bus Nazionali & Veloci",
      desc: "Autolinee a lunga percorrenza confortevoli che collegano il Sud Italia con le principali città del Centro-Nord ed Europa.",
      badge: "Comfort & Qualità",
      color: "from-blue-600 to-indigo-800",
      iconText: "MARINOBUS",
    },
    {
      name: "Noleggio Bus & Minivan NCC",
      category: "Transfer Privati & Gruppi",
      desc: "Pullman Gran Turismo da 16 a 54 posti, minivan con autista per escursioni, matrimoni e meeting in Campania.",
      badge: "Servizio Dedicato",
      color: "from-[#1B5E5F] to-[#0F4142]",
      iconText: "BUS & NCC",
    },
  ];

  return (
    <article className="min-h-screen bg-gray-50 text-gray-800">
      {/* 1. Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white bg-gradient-to-br from-[#1B5E5F] via-[#0F4142] to-teal-950">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-gray-300">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-amber-300 font-medium">Agency Services</span>
          </nav>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/15 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20 shadow-sm">
            Biglietteria &amp; Servizi per Agenzie
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-md text-white">
            AGENCY SERVICES
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Il punto di riferimento per agenzie di viaggio, operatori e clienti: biglietteria ferroviaria Trenitalia ed Italo, autolinee nazionali ed internazionali Flixbus e MarinoBus, noleggio pullman GT e transfer su misura.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#richiesta-servizi"
              className="bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-extrabold px-8 py-4 rounded-full shadow-2xl hover:opacity-95 transform hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <PaperPlaneIcon className="w-5 h-5" />
              <span>Richiedi Biglietti o Servizi</span>
            </a>
            <a
              href="#partner-trasporti"
              className="bg-white/15 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full hover:bg-white/25 border border-white/25 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Vettori &amp; Partner</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Partners & Loghi Section */}
      <section id="partner-trasporti" className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              I Nostri Accordi Commerciali
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-dark mb-4">
              Vettori Treni e Bus Convenzionati
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Emissione diretta, supporto rapido per gruppi e singoli, cambi prenotazione e tariffe dedicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transportPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-gray-50/80 hover:bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-3 py-1 rounded-full">
                      {partner.badge}
                    </span>
                    <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${partner.color} text-white font-extrabold text-xs tracking-wider shadow-sm`}>
                      {partner.iconText}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                  <p className="text-xs text-amber-600 font-semibold mb-3">{partner.category}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{partner.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-teal-800">
                  <CheckCircleIcon className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Emissione e assistenza immediata</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Highlights */}
      <section className="py-20 bg-gradient-to-br from-amber-50/60 via-white to-teal-50/60">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
                <ClockIcon className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Velocità &amp; Flessibilità</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risposte rapide via email o WhatsApp con preventivi chiari, emissione in tempo reale e gestione tempestiva delle variazioni di orario o data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl mb-6 shadow-inner">
                <ShieldIcon className="w-7 h-7 text-teal-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Soluzioni per Agenzie</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Supportiamo agenzie partner su tutto il territorio nazionale per la gestione della biglietteria complessa, itinerari combinati treno+bus e transfer privati.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl mb-6 shadow-md">
                <SparklesIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Assistenza Dedicata</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Uno staff sempre reperibile per risolvere imprevisti, cambi passeggero o richieste di rimborsi nel pieno rispetto delle condizioni dei vettori.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Request Form Section */}
      <section id="richiesta-servizi" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#E6A532] via-[#D4941A] to-[#1B5E5F]" />

            <div className="text-center mb-10 pt-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3">
                Richiesta Preventivo &amp; Biglietti
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                MODULO RICHIESTA AGENCY SERVICES
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                Compila i dati del viaggio o del servizio richiesto. Il nostro operatore ti invierà la migliore soluzione disponibile in poche ore.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 px-6 bg-teal-50 rounded-2xl border border-teal-200">
                <div className="w-16 h-16 bg-[#1B5E5F] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B5E5F] mb-2">Richiesta Inviata con Successo!</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm mb-6">
                  Grazie per averci contattato. Il team biglietteria di IncanTour prenderà in carico la tua richiesta e ti risponderà nel più breve tempo possibile.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#1B5E5F] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#0F4142] transition"
                >
                  Invia un&apos;altra richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="agency_name" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Nome Agenzia o Azienda *
                    </label>
                    <input
                      type="text"
                      id="agency_name"
                      required
                      value={formData.agency_name}
                      onChange={(e) => setFormData({ ...formData, agency_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                      placeholder="Es. Agenzia Viaggi Sole o Privato"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_person" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Nome e Cognome Referente *
                    </label>
                    <input
                      type="text"
                      id="contact_person"
                      required
                      value={formData.contact_person}
                      onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                      placeholder="Es. Mario Rossi"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                      placeholder="Es. agenzia@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Telefono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                      placeholder="Es. +39 333 1234567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Tipologia di Servizio Richiesto *
                  </label>
                  <select
                    id="service_type"
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm font-medium"
                  >
                    <option value="Biglietteria Treni (Trenitalia / Italo)">Biglietteria Treni (Trenitalia / Italo)</option>
                    <option value="Biglietteria Bus (Flixbus / MarinoBus)">Biglietteria Bus (Flixbus / MarinoBus)</option>
                    <option value="Noleggio Pullman Gran Turismo / Minivan NCC">Noleggio Pullman Gran Turismo / Minivan NCC</option>
                    <option value="Prenotazione Gruppi e Tariffe Corporate">Prenotazione Gruppi e Tariffe Corporate</option>
                    <option value="Altro Servizio / Combinato">Altro Servizio / Combinato</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="departure_city" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Città di Partenza *
                    </label>
                    <input
                      type="text"
                      id="departure_city"
                      required
                      value={formData.departure_city}
                      onChange={(e) => setFormData({ ...formData, departure_city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                      placeholder="Es. Napoli Centrale"
                    />
                  </div>

                  <div>
                    <label htmlFor="destination_city" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Città di Destinazione *
                    </label>
                    <input
                      type="text"
                      id="destination_city"
                      required
                      value={formData.destination_city}
                      onChange={(e) => setFormData({ ...formData, destination_city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                      placeholder="Es. Milano, Roma, Parigi..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="departure_date" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Data Partenza *
                    </label>
                    <input
                      type="date"
                      id="departure_date"
                      required
                      value={formData.departure_date}
                      onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="return_date" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Data Ritorno (opzionale)
                    </label>
                    <input
                      type="date"
                      id="return_date"
                      value={formData.return_date}
                      onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="passengers" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Numero Passeggeri
                    </label>
                    <input
                      type="number"
                      id="passengers"
                      min="1"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value, 10) || 1 })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Note / Preferenze Orario o Sistemazione
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                    placeholder="Specificare fasce orarie preferite, classe di viaggio, bagagli speciali o richieste particolari..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl hover:opacity-95 transform hover:scale-[1.01] transition-all text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <PaperPlaneIcon className="w-5 h-5" />
                  )}
                  <span>Invia Richiesta Biglietteria</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. Contact & Social Channels */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-2xl font-bold mb-3">Hai Bisogno di Supporto Immediato?</h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Contatta direttamente i nostri operatori dedicati ai servizi per agenzie.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <a
              href="tel:+390810607948"
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-sm font-semibold transition"
            >
              <PhoneIcon className="w-4 h-4 text-amber-400" />
              <span>+39 081 0607948</span>
            </a>
            <a
              href="https://wa.me/393384357143"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-sm font-semibold transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: 3384357143</span>
            </a>
            <a
              href="mailto:info@incantour.it"
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-sm font-semibold transition"
            >
              <MailIcon className="w-4 h-4 text-amber-400" />
              <span>info@incantour.it</span>
            </a>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">
              I Nostri Canali Social Ufficiali
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/incantour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6A532] text-white flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Facebook IncanTour"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/incantour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6A532] text-white flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Instagram IncanTour"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
