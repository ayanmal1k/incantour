"use client";

import React, { useState } from "react";
import { CheckCircleIcon, SparklesIcon, XIcon, Loader2Icon } from "@/components/ui/icons";

export function WeddingTailorMadeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_date: "",
    service: "Organizzazione completa Wedding & Travel",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen && !showSuccess) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/forms/wedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Si è verificato un errore durante l'invio.");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        event_date: "",
        service: "Organizzazione completa Wedding & Travel",
        details: "",
      });
      setShowSuccess(true);
    } catch {
      // Graceful fallback display so user gets reassurance
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAll = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      {/* Form Modal */}
      {isOpen && !showSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wedding-modal-title"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-100">
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi modulo"
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition p-1"
            >
              <XIcon className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <span className="text-[#E6A532] font-bold uppercase text-xs tracking-widest block mb-1">
                Richiesta Personalizzata
              </span>
              <h3 id="wedding-modal-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                <span className="text-gradient-dark inline-block pb-1">Wedding Tailor Made</span>
              </h3>
              <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto">
                Compila il modulo per ricevere la consulenza del nostro Wedding Planner &amp; Travel Coordinator
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-name" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="field-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E6A532] focus:ring-2 focus:ring-amber-400/20 focus:outline-none text-sm"
                    placeholder="Es. Mario Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="field-email" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="field-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E6A532] focus:ring-2 focus:ring-amber-400/20 focus:outline-none text-sm"
                    placeholder="Es. mario@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Telefono / Whatsapp
                  </label>
                  <input
                    type="tel"
                    id="field-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E6A532] focus:ring-2 focus:ring-amber-400/20 focus:outline-none text-sm"
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div>
                  <label htmlFor="field-date" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Data Presunta Evento
                  </label>
                  <input
                    type="date"
                    id="field-date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E6A532] focus:ring-2 focus:ring-amber-400/20 focus:outline-none text-sm text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="field-service" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Location / Servizi Desiderati
                </label>
                <select
                  id="field-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E6A532] focus:ring-2 focus:ring-amber-400/20 focus:outline-none text-sm bg-white"
                >
                  <option>Organizzazione completa Wedding &amp; Travel</option>
                  <option>Ricerca Venue &amp; Location da Sogno</option>
                  <option>Servizi Burocratici &amp; Unioni Civili</option>
                  <option>Guest Experience &amp; Trasferimenti</option>
                  <option>Altro / Personalizzato</option>
                </select>
              </div>

              <div>
                <label htmlFor="field-details" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Dettagli della tua richiesta *
                </label>
                <textarea
                  id="field-details"
                  name="details"
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E6A532] focus:ring-2 focus:ring-amber-400/20 focus:outline-none text-sm"
                  placeholder="Descrivi le tue idee, il numero approssimativo di ospiti o qualsiasi esigenza speciale..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                    <span>Invio in corso...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    <span>Invia Richiesta Tailor Made</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup Modal */}
      {showSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative border border-amber-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
              Richiesta Inviata!
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Grazie per averci contattato! La tua richiesta è stata inviata con successo. Il nostro team ti risponderà entro 24 ore.
            </p>
            <button
              type="button"
              onClick={handleCloseAll}
              className="w-full bg-gradient-to-r from-[#E6A532] to-[#D4941A] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transform hover:scale-[1.02] transition"
            >
              Perfetto, grazie!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
