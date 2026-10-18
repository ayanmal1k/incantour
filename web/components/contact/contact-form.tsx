"use client";

import React, { useRef, useState } from "react";
import { CheckCircleIcon, Loader2Icon, MailIcon, MapPinIcon, PaperPlaneIcon, PhoneIcon } from "@/components/ui/icons";

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "Il nome è obbligatorio.";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Il cognome è obbligatorio.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'indirizzo email è obbligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Inserisci un indirizzo email valido.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Il numero di telefono è obbligatorio.";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "L'oggetto della richiesta è obbligatorio.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return false;
    }

    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Bot detection check
    if (formData.website) {
      setIsSuccessOpen(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: `${formData.firstname.trim()} ${formData.lastname.trim()}`,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      details: formData.message.trim(),
      service: "Contatti General Inquiry",
    };

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400 && errorData?.errors) {
          setErrors(errorData.errors);
          throw new Error("Verifica i campi evidenziati nel modulo.");
        }
        throw new Error(
          "Impossibile completare l'invio in questo momento. Riprova tra poco."
        );
      }

      setIsSuccessOpen(true);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        website: "",
      });
      setErrors({});

      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Si è verificato un errore durante l'invio.";
      setSubmitError(msg);
      errorSummaryRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form-section" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Direct Contacts Column */}
          <div className="space-y-8 bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">
                Contatti Diretti
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                Parla con noi
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Siamo a tua completa disposizione per informazioni su itinerari, esperienze private e soggiorni su misura.
              </p>
            </div>

            <div className="space-y-6">
              {/* Telefono */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Telefono</p>
                  <a
                    href="tel:+393384357143"
                    className="text-base font-bold text-gray-900 hover:text-amber-600 transition"
                  >
                    338 435 7143
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1B5E5F] text-white flex items-center justify-center text-xl shadow-md shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
                  <a
                    href="mailto:info@incantour.it"
                    className="text-base font-bold text-gray-900 hover:text-[#1B5E5F] transition break-all"
                  >
                    info@incantour.it
                  </a>
                </div>
              </div>

              {/* Indirizzo */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center text-xl shadow-md shrink-0">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Indirizzo</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    Calata Trinità Maggiore 53, 80134 Napoli
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">3° piano, Palazzo Pignatelli</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200/80 text-xs text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700">Orari di apertura:</p>
              <p>Lunedì – Venerdì: 09:30 – 18:30</p>
              <p className="text-[11px] text-gray-400">Sabato e Domenica su appuntamento</p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
              Inviaci un Messaggio
            </h3>
            <p className="text-sm text-gray-500 mb-8">
              Compila il form per richiedere informazioni sulle nostre proposte di viaggio
            </p>

            {/* Error summary for screen readers & visual users */}
            {submitError && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-live="polite"
                className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm">Attenzione</h4>
                    <p className="text-xs mt-1">{submitError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="text-red-600 hover:text-red-800 text-xs font-bold underline shrink-0"
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Anti-spam honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="c-website">Website</label>
                <input
                  type="text"
                  name="website"
                  id="c-website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Nome & Cognome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="c-firstname"
                    className="block text-xs font-bold text-gray-700 uppercase mb-1"
                  >
                    Nome <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="c-firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.firstname}
                    aria-describedby={errors.firstname ? "c-firstname-error" : undefined}
                    placeholder="Il tuo nome"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      errors.firstname
                        ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                        : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                    }`}
                  />
                  {errors.firstname && (
                    <p id="c-firstname-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.firstname}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="c-lastname"
                    className="block text-xs font-bold text-gray-700 uppercase mb-1"
                  >
                    Cognome <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="c-lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.lastname}
                    aria-describedby={errors.lastname ? "c-lastname-error" : undefined}
                    placeholder="Il tuo cognome"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      errors.lastname
                        ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                        : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                    }`}
                  />
                  {errors.lastname && (
                    <p id="c-lastname-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Telefono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="c-email"
                    className="block text-xs font-bold text-gray-700 uppercase mb-1"
                  >
                    Email <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="c-email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "c-email-error" : undefined}
                    placeholder="la-tua-email@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                        : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                    }`}
                  />
                  {errors.email && (
                    <p id="c-email-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="c-phone"
                    className="block text-xs font-bold text-gray-700 uppercase mb-1"
                  >
                    Telefono <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="c-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "c-phone-error" : undefined}
                    placeholder="+39 333 1234567"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                        : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                    }`}
                  />
                  {errors.phone && (
                    <p id="c-phone-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Oggetto */}
              <div>
                <label
                  htmlFor="c-subject"
                  className="block text-xs font-bold text-gray-700 uppercase mb-1"
                >
                  Oggetto <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="c-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "c-subject-error" : undefined}
                  placeholder="Oggetto della richiesta"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                      : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                  }`}
                />
                {errors.subject && (
                  <p id="c-subject-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Messaggio */}
              <div>
                <label
                  htmlFor="c-message"
                  className="block text-xs font-bold text-gray-700 uppercase mb-1"
                >
                  Messaggio <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  name="message"
                  id="c-message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "c-message-error" : undefined}
                  placeholder="Scrivi qui il tuo messaggio..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                      : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                  }`}
                />
                {errors.message && (
                  <p id="c-message-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold py-4 rounded-xl shadow-lg hover:opacity-95 transform hover:scale-[1.01] active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      <span>Invio in corso...</span>
                    </>
                  ) : (
                    <>
                      <PaperPlaneIcon className="w-5 h-5" />
                      <span>INVIA</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Accessible Success Popup Modal */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative border border-amber-100 transform transition-all">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
            <h3
              id="success-modal-title"
              className="text-2xl font-extrabold text-gray-900 mb-3"
            >
              Messaggio Inviato!
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Grazie per averci contattato! Il nostro team ti risponderà entro 24 ore.
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsSuccessOpen(false)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transform hover:scale-[1.02] active:scale-[0.99] transition cursor-pointer"
            >
              Perfetto, grazie!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
