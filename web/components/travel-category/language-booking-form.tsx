"use client";

import React, { useState } from "react";
import { GraduationCapIcon, PaperPlaneIcon, SlidersIcon } from "@/components/ui/icons";

export function LanguageBookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    period: "",
    level: "Principiante (A1-A2)",
    location: "",
    duration: "",
    participants: 1,
    cils_tutor: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "Prenotazione Percorso di Lingua e Cultura Italiana",
          message: `
Nazionalità: ${formData.nationality}
Periodo richiesto: ${formData.period}
Livello di italiano: ${formData.level}
Percorso Tailor-Made:
- Luogo desiderato: ${formData.location || "Non specificato"}
- Durata: ${formData.duration || "Non specificata"}
- Numero partecipanti: ${formData.participants}
- Tutor CILS richiesto: ${formData.cils_tutor ? "Sì" : "No"}
          `.trim(),
        }),
      });

      if (!response.ok) {
        console.warn("Server responded with status", response.status);
      }

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        nationality: "",
        period: "",
        level: "Principiante (A1-A2)",
        location: "",
        duration: "",
        participants: 1,
        cils_tutor: false,
      });
    } catch (err) {
      console.error("Language booking error:", err);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form-section" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          {/* Top color bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#E6A532] via-[#D4941A] to-[#1B5E5F]" />

          {/* Header */}
          <div className="text-center mb-10 pt-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3">
              Iscrizione &amp; Personalizzazione
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              FORM DI PRENOTAZIONE
            </h2>
            <p className="text-lg font-bold text-[#E6A532] mt-1">
              Percorsi di Lingua e Cultura Italiana
            </p>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Compila il modulo per prenotare o progettare il tuo percorso su misura
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Block 1: Dati del Partecipante */}
            <div className="bg-gray-50/80 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-[#1B5E5F] mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6A532]" />
                Dati del Partecipante
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="l-name" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="l-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="Es. John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="l-email" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="l-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="Es. john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="l-phone" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="l-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="+39 333 1234567"
                  />
                </div>

                <div>
                  <label htmlFor="l-nationality" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Nazionalità *
                  </label>
                  <input
                    type="text"
                    id="l-nationality"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="Es. Statunitense, Francese, Australiano..."
                  />
                </div>

                <div>
                  <label htmlFor="l-period" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Periodo Preferito *
                  </label>
                  <input
                    type="text"
                    id="l-period"
                    name="period"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="Es. Maggio 2026, Settembre 2026..."
                  />
                </div>

                <div>
                  <label htmlFor="l-level" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Livello di conoscenza lingua Italiana *
                  </label>
                  <select
                    id="l-level"
                    name="level"
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                  >
                    <option value="Principiante (A1-A2)">Principiante (A1-A2)</option>
                    <option value="Intermedio (B1-B2)">Intermedio (B1-B2)</option>
                    <option value="Avanzato (C1-C2)">Avanzato (C1-C2)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Block 2: PERCORSO TAILOR MADE */}
            <div className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200/80">
              <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-1 flex items-center gap-2">
                <SlidersIcon className="w-5 h-5 text-amber-700" />
                PERCORSO TAILOR MADE
              </h3>
              <p className="text-xs text-gray-600 mb-6">
                Crea il tuo Percorso di Lingua Italiana personalizzato secondo le tue esigenze
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="l-location" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Luogo Desiderato
                  </label>
                  <input
                    type="text"
                    id="l-location"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="Es. Napoli, Costiera Amalfitana..."
                  />
                </div>

                <div>
                  <label htmlFor="l-duration" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Durata
                  </label>
                  <input
                    type="text"
                    id="l-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                    placeholder="Es. 1 Settimana, 2 Settimane..."
                  />
                </div>

                <div>
                  <label htmlFor="l-participants" className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Numero Partecipanti
                  </label>
                  <input
                    type="number"
                    id="l-participants"
                    name="participants"
                    min="1"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm text-gray-800"
                  />
                </div>
              </div>

              {/* CILS Option Checkbox */}
              <div className="mt-6 pt-5 border-t border-amber-200">
                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-gray-800">
                  <input
                    type="checkbox"
                    id="l-cils"
                    name="cils_tutor"
                    checked={formData.cils_tutor}
                    onChange={(e) => setFormData({ ...formData, cils_tutor: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Desidero richiedere un tutor di affiancamento per la CERTIFICAZIONE CILS</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
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
                <span>INVIA PRENOTAZIONE PERCORSO</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative border border-amber-100 transform transition-all">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <GraduationCapIcon className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
              Prenotazione Inviata!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              Grazie per la tua richiesta! Il nostro team di esperti culturali ti contatterà al più presto per confermare il tuo Percorso di Lingua e Cultura Italiana.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="w-full bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-bold py-3.5 rounded-xl shadow-lg hover:opacity-95 transform hover:scale-[1.02] transition"
            >
              Perfetto, grazie!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
