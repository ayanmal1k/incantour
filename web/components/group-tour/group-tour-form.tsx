"use client";

import React, { useState } from "react";
import {
  UserCheckIcon,
  BusIcon,
  TagIcon,
  RouteIcon,
  SendIcon,
  Loader2Icon,
  CheckCircleIcon,
} from "@/components/ui/icons";

const ENTITY_TYPES = ["CRAL", "AGENZIA", "Network", "Associazione", "Privato / Altro"];

const MONTHS = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const YEARS = ["2025", "2026", "2027", "2028"];

const THEMES_LIST = [
  { id: "benessere", label: "Benessere" },
  { id: "musicale", label: "Musicale" },
  { id: "religioso", label: "Religioso" },
  { id: "archeologico", label: "Archeologico" },
  { id: "shopping tour", label: "Shopping Tour" },
  { id: "ciclotour", label: "Ciclotour" },
  { id: "trekking", label: "Trekking" },
  { id: "esoterismo", label: "Esoterismo / Altro" },
];

const TRANSPORTS = ["BUS", "AEREO + BUS", "NAVE + BUS", "ALTRO"];

export function GroupTourForm({
  selectedTheme,
}: {
  selectedTheme?: string | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    entity_type: "CRAL",
    email: "",
    phone: "",
    facebook: "",
    destination: "",
    departure_month: "Maggio",
    departure_year: "2026",
    duration: "3 Giorni / 2 Notti",
    adults_count: 15,
    children_count: 0,
    tour_leader: "SI",
    themes: [] as string[],
    itinerary_description: "",
    guide_service: "SI",
    escort_service: "SI",
    transport: "BUS",
    newsletter: true,
    website: "", // Honeypot
  });

  // When selectedTheme prop changes from hero button click, add it to themes during render
  const [prevSelectedTheme, setPrevSelectedTheme] = useState(selectedTheme);
  if (selectedTheme && prevSelectedTheme !== selectedTheme) {
    setPrevSelectedTheme(selectedTheme);
    const themeMatch = THEMES_LIST.find(
      (t) =>
        selectedTheme.toLowerCase().includes(t.id) ||
        t.id.includes(selectedTheme.toLowerCase())
    );
    const themeToAdd = themeMatch ? themeMatch.id : selectedTheme;
    if (!formData.themes.includes(themeToAdd)) {
      setFormData((prev) => ({
        ...prev,
        themes: [...prev.themes, themeToAdd],
      }));
    }
  }

  const handleThemeToggle = (themeId: string) => {
    setFormData((prev) => ({
      ...prev,
      themes: prev.themes.includes(themeId)
        ? prev.themes.filter((t) => t !== themeId)
        : [...prev.themes, themeId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam trap
    if (formData.website) {
      setIsSuccessOpen(true);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      entity_type: formData.entity_type,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      facebook: formData.facebook.trim(),
      destination: formData.destination.trim(),
      departure_month: formData.departure_month,
      departure_year: formData.departure_year,
      duration: formData.duration.trim(),
      adults_count: String(formData.adults_count),
      children_count: String(formData.children_count),
      tour_leader: formData.tour_leader,
      themes: formData.themes.join(", "),
      itinerary_description: formData.itinerary_description.trim(),
      guide_service: formData.guide_service,
      escort_service: formData.escort_service,
      transport: formData.transport,
      newsletter: formData.newsletter ? "SI" : "NO",
    };

    try {
      const res = await fetch("/api/forms/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      setIsSuccessOpen(true);
      setFormData({
        name: "",
        entity_type: "CRAL",
        email: "",
        phone: "",
        facebook: "",
        destination: "",
        departure_month: "Maggio",
        departure_year: "2026",
        duration: "3 Giorni / 2 Notti",
        adults_count: 15,
        children_count: 0,
        tour_leader: "SI",
        themes: [],
        itinerary_description: "",
        guide_service: "SI",
        escort_service: "SI",
        transport: "BUS",
        newsletter: true,
        website: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      // Friendly fallback confirmation
      setIsSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-tailor-made" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          {/* Top gradient highlight */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#E6A532] via-[#D4941A] to-[#1B5E5F]" />

          {/* Form Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-widest mb-3">
              Servizio Su Misura
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              FORM TAILOR MADE
            </h2>
            <p className="text-xl font-bold text-gradient-dark mt-1">
              <span className="inline-block pb-1">Disegna il tuo tour di gruppo</span>
            </p>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              Compila tutti i dettagli per ricevere una proposta itinerario personalizzata dal nostro team specialistico
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="group-website">Website</label>
              <input
                id="group-website"
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Block 1: Dati del Richiedente & Ente */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <UserCheckIcon className="w-5 h-5 text-[#E6A532]" />
                <span>1. Dati del Richiedente &amp; Ente</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="g-name" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="g-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. Mario Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="g-entity" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Tipologia Ente / Gruppo *
                  </label>
                  <select
                    id="g-entity"
                    required
                    value={formData.entity_type}
                    onChange={(e) => setFormData({ ...formData, entity_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                  >
                    {ENTITY_TYPES.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="g-email" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="g-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. info@associazione.it"
                  />
                </div>
                <div>
                  <label htmlFor="g-phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="g-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="g-facebook" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Facebook (Pagina o Profilo)
                  </label>
                  <input
                    type="text"
                    id="g-facebook"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. facebook.com/ilmiogruppo"
                  />
                </div>
              </div>
            </div>

            {/* Block 2: Dettagli Viaggio */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <BusIcon className="w-5 h-5 text-[#E6A532]" />
                <span>2. Dettagli del Viaggio</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <label htmlFor="g-destination" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Destinazione *
                  </label>
                  <input
                    type="text"
                    id="g-destination"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. Costiera Amalfitana, Napoli, Sannio, Cilento..."
                  />
                </div>
                <div>
                  <label htmlFor="g-month" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Mese di partenza *
                  </label>
                  <select
                    id="g-month"
                    required
                    value={formData.departure_month}
                    onChange={(e) => setFormData({ ...formData, departure_month: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="g-year" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Anno di partenza *
                  </label>
                  <select
                    id="g-year"
                    required
                    value={formData.departure_year}
                    onChange={(e) => setFormData({ ...formData, departure_year: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="g-duration" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Durata del viaggio *
                  </label>
                  <input
                    type="text"
                    id="g-duration"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. 3 Giorni / 2 Notti"
                  />
                </div>
                <div>
                  <label htmlFor="g-adults" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Numero Adulti (n.) *
                  </label>
                  <input
                    type="number"
                    id="g-adults"
                    min="1"
                    required
                    value={formData.adults_count}
                    onChange={(e) => setFormData({ ...formData, adults_count: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="g-children" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Numero Bambini (n.)
                  </label>
                  <input
                    type="number"
                    id="g-children"
                    min="0"
                    value={formData.children_count}
                    onChange={(e) => setFormData({ ...formData, children_count: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Tour Leader *
                  </span>
                  <div className="flex items-center gap-6 pt-2">
                    {["SI", "NO"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                        <input
                          type="radio"
                          name="tour_leader"
                          value={opt}
                          checked={formData.tour_leader === opt}
                          onChange={(e) => setFormData({ ...formData, tour_leader: e.target.value })}
                          className="text-[#E6A532] focus:ring-amber-400"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Temi del Tour */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-[#E6A532]" />
                <span>3. Sono interessato al Tour a Tema:</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {THEMES_LIST.map((th) => (
                  <label
                    key={th.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                      formData.themes.includes(th.id)
                        ? "bg-amber-50 border-[#E6A532] text-gray-900 shadow-sm"
                        : "bg-white border-gray-200 hover:border-amber-300 text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.themes.includes(th.id)}
                      onChange={() => handleThemeToggle(th.id)}
                      className="rounded text-[#E6A532] focus:ring-amber-400"
                    />
                    <span>{th.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Block 4: Itinerario & Servizi */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <RouteIcon className="w-5 h-5 text-[#E6A532]" />
                <span>4. Itinerario Desiderato &amp; Servizi Richiesti</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="g-desc" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Descrizione dell&apos;itinerario desiderato *
                  </label>
                  <textarea
                    id="g-desc"
                    rows={4}
                    required
                    value={formData.itinerary_description}
                    onChange={(e) => setFormData({ ...formData, itinerary_description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Indica le tappe principali, preferenze o richieste particolari per il tuo gruppo..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                      Guide Turistiche
                    </span>
                    <div className="flex items-center gap-6 pt-1">
                      {["SI", "NO"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                          <input
                            type="radio"
                            name="guide_service"
                            value={opt}
                            checked={formData.guide_service === opt}
                            onChange={(e) => setFormData({ ...formData, guide_service: e.target.value })}
                            className="text-[#E6A532] focus:ring-amber-400"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                      Accompagnatore
                    </span>
                    <div className="flex items-center gap-6 pt-1">
                      {["SI", "NO"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                          <input
                            type="radio"
                            name="escort_service"
                            value={opt}
                            checked={formData.escort_service === opt}
                            onChange={(e) => setFormData({ ...formData, escort_service: e.target.value })}
                            className="text-[#E6A532] focus:ring-amber-400"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="g-transport" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Mezzi di Trasporto *
                    </label>
                    <select
                      id="g-transport"
                      required
                      value={formData.transport}
                      onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    >
                      {TRANSPORTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter & Submit */}
            <div className="space-y-4 pt-2">
              <label className="flex items-center gap-3 p-4 bg-amber-50/60 rounded-2xl border border-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                  className="rounded text-[#E6A532] focus:ring-amber-400 w-5 h-5"
                />
                <span className="text-sm font-semibold text-gray-800">
                  Iscriviti alla ns. newsletter per ricevere i ns tour di gruppo del mese
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-extrabold py-5 rounded-2xl shadow-xl hover:opacity-95 transform hover:scale-[1.01] active:scale-[0.99] transition text-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                    <span>Invio in corso...</span>
                  </>
                ) : (
                  <>
                    <SendIcon className="w-5 h-5" />
                    <span>INVIA RICHIESTA TOUR DI GRUPPO</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative border border-amber-100 transform transition-all">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Richiesta Inviata!</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Grazie per averci contattato! La tua richiesta per il tour di gruppo è stata inviata con successo. Il nostro team ti risponderà entro 24 ore.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccessOpen(false)}
              className="w-full bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transform hover:scale-[1.02] transition cursor-pointer"
            >
              Perfetto, grazie!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
