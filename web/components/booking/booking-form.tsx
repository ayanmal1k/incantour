"use client";

import React, { useId, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CreditCardIcon,
  Loader2Icon,
  LockIcon,
  MapPinIcon,
  PaperPlaneIcon,
  TagIcon,
  UsersIcon,
} from "@/components/ui/icons";
import type { Tour } from "@/lib/wordpress/types";

interface BookingFormProps {
  initialTours: Tour[];
  initialTourId?: string;
  initialQuantity?: number;
  initialPrice?: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  tour?: string;
  date?: string;
  quantity?: string;
}

export function BookingForm({
  initialTours,
  initialTourId,
  initialQuantity,
  initialPrice,
}: BookingFormProps) {
  const formId = useId();

  // Find tour if initialTourId was passed
  const initialSelectedTour = initialTours.find(
    (t) =>
      String(t.id) === String(initialTourId) ||
      t.slug === String(initialTourId)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourId: initialSelectedTour ? String(initialSelectedTour.id) : (initialTourId || ""),
    date: "",
    quantity: initialQuantity && initialQuantity > 0 ? initialQuantity : 1,
    message: "",
    website: "", // honeypot
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; tourTitle: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    personal: true,
    tour: true,
    requirements: true,
    payment: true,
  });

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successModalCloseRef = useRef<HTMLButtonElement>(null);

  // Determine current selected tour object
  const selectedTour = initialTours.find(
    (t) => String(t.id) === String(formData.tourId) || t.slug === String(formData.tourId)
  );

  // Determine unit price
  const getUnitPrice = (): number => {
    if (selectedTour?.acf?.Price) {
      const parsed = parseFloat(String(selectedTour.acf.Price));
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    if (initialPrice && initialPrice > 0) return initialPrice;
    return 0;
  };

  const unitPrice = getUnitPrice();
  const subtotal = unitPrice * formData.quantity;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCouponApply = () => {
    const clean = couponCode.trim().toUpperCase();
    if (!clean) {
      setCouponMessage({ text: "Inserisci un codice promozionale.", isError: true });
      return;
    }
    if (clean === "SAVE20") {
      setDiscountPercent(20);
      setCouponMessage({ text: "Sconto del 20% applicato con successo!", isError: false });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ text: "Codice coupon non valido o scaduto.", isError: true });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Il nome e cognome sono obbligatori.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'indirizzo email è obbligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Inserisci un indirizzo email valido.";
    }
    if (!formData.tourId) {
      newErrors.tour = "Seleziona un tour per procedere con la prenotazione.";
    }
    if (!formData.date) {
      newErrors.date = "Seleziona la data desiderata per il tour.";
    }
    if (formData.quantity < 1 || formData.quantity > 50) {
      newErrors.quantity = "Il numero di partecipanti deve essere compreso tra 1 e 50.";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, parseInt(value, 10) || 1) : value,
    }));

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

    // Bot honeypot detection
    if (formData.website) {
      setIsSuccessOpen(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const tourTitle = selectedTour?.title.rendered || `Tour #${formData.tourId}`;
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      tour: tourTitle,
      tour_id: formData.tourId,
      date: formData.date,
      quantity: formData.quantity,
      total: finalTotal.toFixed(2),
      discount: discountPercent > 0 ? `${discountPercent}%` : undefined,
      message: formData.message.trim(),
    };

    try {
      const response = await fetch("/api/forms/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400 && errorData?.errors) {
          setErrors(errorData.errors);
          throw new Error("Verifica i campi evidenziati nel modulo di prenotazione.");
        }
        throw new Error(
          "Impossibile registrare la prenotazione in questo momento. Riprova tra poco."
        );
      }

      setSubmittedData({
        name: formData.name.trim(),
        tourTitle,
      });
      setIsSuccessOpen(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        tourId: "",
        date: "",
        quantity: 1,
        message: "",
        website: "",
      });
      setCouponCode("");
      setDiscountPercent(0);
      setCouponMessage(null);
      setErrors({});

      setTimeout(() => {
        successModalCloseRef.current?.focus();
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-24 relative z-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-10 md:p-12">
        <div className="text-center mb-10 pb-6 border-b border-gray-100">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full mb-3 border border-amber-200">
            Modulo di Prenotazione
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Completa la Tua Prenotazione
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto">
            Indica le tue preferenze di viaggio: il nostro team verificherà la disponibilità e ti invierà la conferma dettagliata.
          </p>
        </div>

        {/* Accessible Error Summary */}
        {submitError && (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            aria-live="polite"
            className="mb-8 p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base">Si è verificato un problema</h3>
                <p className="text-xs sm:text-sm mt-1">{submitError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitError(null)}
                className="text-xs font-bold text-red-700 hover:text-red-900 underline shrink-0 cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`${formId}-website`}>Website</label>
            <input
              type="text"
              name="website"
              id={`${formId}-website`}
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Section 1: Informazioni Personali */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection("personal")}
              aria-expanded={openSections.personal}
              className="w-full bg-gray-50 hover:bg-gray-100/80 p-5 flex items-center justify-between text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <UsersIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    1. Informazioni di Contatto
                  </h3>
                  <p className="text-xs text-gray-500">I tuoi dati per la conferma</p>
                </div>
              </div>
              {openSections.personal ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {openSections.personal && (
              <div className="p-6 bg-white space-y-5 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="block text-xs font-bold text-gray-700 uppercase mb-1"
                    >
                      Nome e Cognome <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id={`${formId}-name`}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                      placeholder="Mario Rossi"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                      }`}
                    />
                    {errors.name && (
                      <p id={`${formId}-name-error`} role="alert" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-email`}
                      className="block text-xs font-bold text-gray-700 uppercase mb-1"
                    >
                      Indirizzo Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id={`${formId}-email`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                      placeholder="mario.rossi@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                      }`}
                    />
                    {errors.email && (
                      <p id={`${formId}-email-error`} role="alert" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block text-xs font-bold text-gray-700 uppercase mb-1"
                  >
                    Recapito Telefonico / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id={`${formId}-phone`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+39 333 1234567"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40 focus:outline-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Consigliato per comunicazioni rapide o aggiornamenti in tempo reale sulle partenze.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Dettagli del Tour */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection("tour")}
              aria-expanded={openSections.tour}
              className="w-full bg-gray-50 hover:bg-gray-100/80 p-5 flex items-center justify-between text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#1B5E5F] flex items-center justify-center shrink-0">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    2. Dettagli del Tour &amp; Partecipanti
                  </h3>
                  <p className="text-xs text-gray-500">Seleziona itinerario, numero persone e data</p>
                </div>
              </div>
              {openSections.tour ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {openSections.tour && (
              <div className="p-6 bg-white space-y-5 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor={`${formId}-tour`}
                      className="block text-xs font-bold text-gray-700 uppercase mb-1"
                    >
                      Pacchetto Tour <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      name="tourId"
                      id={`${formId}-tour`}
                      value={formData.tourId}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.tour}
                      aria-describedby={errors.tour ? `${formId}-tour-error` : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                        errors.tour
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                      }`}
                    >
                      <option value="">-- Seleziona un tour package --</option>
                      {initialTours.map((t) => {
                        const price = t.acf?.Price ? parseFloat(String(t.acf.Price)) : null;
                        const priceLabel = price ? `(da € ${price.toFixed(2)})` : "";
                        return (
                          <option key={t.id} value={t.id}>
                            {t.title.rendered} {priceLabel}
                          </option>
                        );
                      })}
                    </select>
                    {errors.tour && (
                      <p id={`${formId}-tour-error`} role="alert" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.tour}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-quantity`}
                      className="block text-xs font-bold text-gray-700 uppercase mb-1"
                    >
                      Numero di Partecipanti <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id={`${formId}-quantity`}
                      min={1}
                      max={20}
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.quantity}
                      aria-describedby={errors.quantity ? `${formId}-quantity-error` : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                        errors.quantity
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                      }`}
                    />
                    {errors.quantity && (
                      <p id={`${formId}-quantity-error`} role="alert" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor={`${formId}-date`}
                      className="block text-xs font-bold text-gray-700 uppercase mb-1"
                    >
                      Data Desiderata <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      id={`${formId}-date`}
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? `${formId}-date-error` : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                        errors.date
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-amber-400 focus:ring-amber-300/40"
                      }`}
                    />
                    {errors.date && (
                      <p id={`${formId}-date-error`} role="alert" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-total`}
                      className="block text-xs font-bold text-gray-700 uppercase mb-1"
                    >
                      Prezzo Stimato
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id={`${formId}-total`}
                        readOnly
                        value={
                          unitPrice > 0
                            ? `€ ${finalTotal.toFixed(2)}${discountPercent > 0 ? ` (-${discountPercent}%)` : ""}`
                            : "Su richiesta / Da verificare"
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-amber-50/60 font-bold text-amber-900 text-sm focus:outline-none cursor-default"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {unitPrice > 0
                        ? `Prezzo base: € ${unitPrice.toFixed(2)} × ${formData.quantity} persona/e`
                        : "La quotazione finale ti verrà confermata dall'ufficio prenotazioni."}
                    </p>
                  </div>
                </div>

                {/* Coupon Code input */}
                <div className="pt-2 border-t border-gray-100">
                  <label
                    htmlFor={`${formId}-coupon`}
                    className="block text-xs font-bold text-gray-700 uppercase mb-1"
                  >
                    Hai un codice coupon promozionale?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id={`${formId}-coupon`}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Es. SAVE20"
                      disabled={discountPercent > 0}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm uppercase font-mono tracking-wider focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40 disabled:bg-gray-100"
                    />
                    <button
                      type="button"
                      onClick={handleCouponApply}
                      disabled={discountPercent > 0 || !couponCode.trim()}
                      className="bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Applica
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      role="alert"
                      className={`text-xs mt-1.5 font-medium ${
                        couponMessage.isError ? "text-red-600" : "text-emerald-700"
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Richieste Aggiuntive */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection("requirements")}
              aria-expanded={openSections.requirements}
              className="w-full bg-gray-50 hover:bg-gray-100/80 p-5 flex items-center justify-between text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <TagIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    3. Richieste Aggiuntive o Note
                  </h3>
                  <p className="text-xs text-gray-500">Esigenze particolari, intolleranze o domande</p>
                </div>
              </div>
              {openSections.requirements ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {openSections.requirements && (
              <div className="p-6 bg-white border-t border-gray-100">
                <label
                  htmlFor={`${formId}-message`}
                  className="block text-xs font-bold text-gray-700 uppercase mb-1"
                >
                  Messaggio / Note Speciali
                </label>
                <textarea
                  name="message"
                  id={`${formId}-message`}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Segnalaci eventuali esigenze di accessibilità, allergie o richieste personalizzate per il tuo gruppo..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Section 4: Modalità di Pagamento & Stato Checkout */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection("payment")}
              aria-expanded={openSections.payment}
              className="w-full bg-gray-50 hover:bg-gray-100/80 p-5 flex items-center justify-between text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <CreditCardIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    4. Modalità di Pagamento &amp; Checkout
                  </h3>
                  <p className="text-xs text-gray-500">Stato del servizio e garanzia di prenotazione</p>
                </div>
              </div>
              {openSections.payment ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {openSections.payment && (
              <div className="p-6 bg-white space-y-4 border-t border-gray-100">
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center gap-3 mb-2">
                    <LockIcon className="w-5 h-5 text-amber-700 shrink-0" />
                    <h4 className="font-bold text-gray-900 text-sm">
                      Checkout Diretto &amp; Pagamento Online: Richiesta Confermata
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full ml-auto">
                      In Verifica
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Il gateway per il pagamento istantaneo con carta e il checkout automatico WooCommerce sono attualmente in fase di finalizzazione con l&apos;istituto bancario (endpoint Store API riservato).
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed mt-2 font-medium">
                    <strong>Nessun addebito anticipato:</strong> Inviando questa richiesta, blocchi la tua prenotazione. Un operatore di IncanTour verificherà le disponibilità effettive e ti invierà la conferma formale con le coordinate di pagamento (bonifico bancario sicuro o saldo all&apos;arrivo in agenzia).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] transition duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                  <span>Invio richiesta di prenotazione in corso...</span>
                </>
              ) : (
                <>
                  <PaperPlaneIcon className="w-5 h-5" />
                  <span>INVIA RICHIESTA DI PRENOTAZIONE</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              Riceverai una conferma via email con tutti i dettagli e il riepilogo della richiesta.
            </p>
          </div>
        </form>
      </div>

      {/* Accessible Success Confirmation Dialog */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-success-title`}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 sm:p-10 shadow-2xl text-center relative border border-amber-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
            <h3
              id={`${formId}-success-title`}
              className="text-2xl font-extrabold text-gray-900 mb-3"
            >
              Richiesta di Prenotazione Ricevuta!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {submittedData?.name ? (
                <>
                  Grazie <strong>{submittedData.name}</strong>! Abbiamo preso in carico la tua richiesta per{" "}
                  <strong>{submittedData.tourTitle}</strong>.
                </>
              ) : (
                "Grazie! Abbiamo registrato la tua richiesta di prenotazione."
              )}
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 text-amber-900 text-xs text-left mb-8 border border-amber-200 space-y-1">
              <p className="font-bold">Cosa succede adesso?</p>
              <p>1. Verifichiamo i posti e le disponibilità per la data richiesta.</p>
              <p>2. Ti inviamo via email l&apos;itinerario confermato e le indicazioni sul saldo.</p>
              <p>3. Nessun importo ti è stato addebitato in questa fase.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tours"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold py-3.5 px-6 rounded-xl transition text-center"
              >
                Esplora altri tour
              </Link>
              <button
                ref={successModalCloseRef}
                type="button"
                onClick={() => setIsSuccessOpen(false)}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow hover:opacity-95 transition cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
