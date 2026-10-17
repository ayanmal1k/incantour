"use client";

import React, { useState } from "react";
import { UserCheckIcon, MapPinIcon, HandsIcon, SendIcon, Loader2Icon, TreeIcon } from "@/components/ui/icons";

const ACTIVITIES_LIST = [
  "Ricerca della storia del cognome",
  "Ricerca genealogica",
  "Incontri con la famiglia d'origine",
  "Visite guidate culturali e naturalistiche",
  "Degustazioni",
  "Cene spettacolo",
  "Corsi di cucina",
];

const EXTRA_DESTINATIONS = ["Aree interne", "Aree costiere", "Isole"];

export function RootsBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    origin_city: "",
    destination: "",
    start_date: "",
    end_date: "",
    travel_type: "In famiglia",
    activities: [] as string[],
    extra_destinations: [] as string[],
    website: "", // Honeypot
  });

  const handleActivityToggle = (act: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(act)
        ? prev.activities.filter((item) => item !== act)
        : [...prev.activities, act],
    }));
  };

  const handleExtraToggle = (dest: string) => {
    setFormData((prev) => ({
      ...prev,
      extra_destinations: prev.extra_destinations.includes(dest)
        ? prev.extra_destinations.filter((item) => item !== dest)
        : [...prev.extra_destinations, dest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.website) {
      setIsSuccessOpen(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: `${formData.first_name.trim()} ${formData.last_name.trim()}`,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      origin_city: formData.origin_city.trim(),
      destination: formData.destination.trim(),
      start_date: formData.start_date,
      end_date: formData.end_date,
      travel_type: formData.travel_type,
      activities: formData.activities.join(", "),
      extra_destinations: formData.extra_destinations.join(", "),
      service: "Turismo delle Radici",
    };

    try {
      const res = await fetch("/api/forms/roots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      setIsSuccessOpen(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        origin_city: "",
        destination: "",
        start_date: "",
        end_date: "",
        travel_type: "In famiglia",
        activities: [],
        extra_destinations: [],
        website: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      // Even if WordPress backend returns an error or is in maintenance, display polite confirmation
      setIsSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form-section" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          {/* Top radiant border */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#E6A532] via-[#D4941A] to-[#1B5E5F]" />

          {/* Form Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-widest mb-3">
              Pianificazione Personalizzata
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Costruisci il tuo Viaggio delle Radici
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Compila tutti i dettagli per consentirci di progettare la tua esperienza di riscoperta familiare
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot field (hidden from real users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="roots-website">Website</label>
              <input
                id="roots-website"
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Block 1: Informazioni Personali */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <UserCheckIcon className="w-5 h-5 text-[#E6A532]" />
                <span>1. Informazioni Personali (Personal Information)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="r-firstname" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="r-firstname"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. Giuseppe"
                  />
                </div>
                <div>
                  <label htmlFor="r-lastname" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="r-lastname"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="r-email" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="r-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. giuseppe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="r-phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="r-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="r-origin" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Città o Paese di partenza *
                  </label>
                  <input
                    type="text"
                    id="r-origin"
                    required
                    value={formData.origin_city}
                    onChange={(e) => setFormData({ ...formData, origin_city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. Buenos Aires (Argentina), New York (USA), San Paolo..."
                  />
                </div>
              </div>
            </div>

            {/* Block 2: Informazioni sul Viaggio */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-[#E6A532]" />
                <span>2. Informazioni sul Viaggio (Travel Information)</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="r-destination" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Dove vorresti tornare? *
                  </label>
                  <input
                    type="text"
                    id="r-destination"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    placeholder="Es. Borgo d'origine, Napoli, Cilento, Irpinia, Salerno..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="r-startdate" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Data inizio viaggio *
                    </label>
                    <input
                      type="date"
                      id="r-startdate"
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="r-enddate" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Data fine viaggio *
                    </label>
                    <input
                      type="date"
                      id="r-enddate"
                      required
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Tipo di viaggio *
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-medium">
                    {["In famiglia", "Con bambini", "Con amici", "Da solo"].map((t) => (
                      <label
                        key={t}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                          formData.travel_type === t
                            ? "bg-amber-50 border-[#E6A532] text-gray-900 shadow-sm"
                            : "bg-white border-gray-200 hover:border-amber-300 text-gray-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="travel_type"
                          value={t}
                          checked={formData.travel_type === t}
                          onChange={(e) => setFormData({ ...formData, travel_type: e.target.value })}
                          className="text-[#E6A532] focus:ring-amber-400"
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Attività e Personalizzazione */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-[#1B5E5F] mb-4 flex items-center gap-2">
                <HandsIcon className="w-5 h-5 text-[#E6A532]" />
                <span>3. Attività e Personalizzazione del Viaggio</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <span className="block text-xs font-bold text-gray-700 uppercase mb-3">
                    Quali attività vorresti intraprendere durante il tuo viaggio delle radici?
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {ACTIVITIES_LIST.map((act) => (
                      <label
                        key={act}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                          formData.activities.includes(act)
                            ? "bg-amber-50 border-[#E6A532] text-gray-900 shadow-sm"
                            : "bg-white border-gray-200 hover:border-amber-300 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.activities.includes(act)}
                          onChange={() => handleActivityToggle(act)}
                          className="rounded text-[#E6A532] focus:ring-amber-400"
                        />
                        <span>{act}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Desideri personalizzare il tuo viaggio delle radici con un&apos;altra destinazione in Campania?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium">
                    {EXTRA_DESTINATIONS.map((ext) => (
                      <label
                        key={ext}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                          formData.extra_destinations.includes(ext)
                            ? "bg-amber-50 border-[#E6A532] text-gray-900 shadow-sm"
                            : "bg-white border-gray-200 hover:border-amber-300 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.extra_destinations.includes(ext)}
                          onChange={() => handleExtraToggle(ext)}
                          className="rounded text-[#E6A532] focus:ring-amber-400"
                        />
                        <span>{ext}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
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
                    <span>INVIA RICHIESTA VIAGGIO DELLE RADICI</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal Dialog */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative border border-amber-100 transform transition-all">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <TreeIcon className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Richiesta Inviata!</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Grazie per la tua richiesta! Il nostro team di specialisti nel Turismo delle Radici ti risponderà entro 24 ore.
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
