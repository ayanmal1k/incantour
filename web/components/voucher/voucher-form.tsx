"use client";

import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, GiftIcon, InfoIcon, ShieldIcon } from "@/components/ui/icons";

interface VoucherFormProps {
  initialValue?: number;
}

const OCCASIONS = [
  { value: "Compleanno", label: "Compleanno" },
  { value: "Diciottesimo", label: "Diciottesimo (18 Anni)" },
  { value: "Prima Comunione", label: "Prima Comunione" },
  { value: "Battesimo", label: "Battesimo" },
  { value: "Cresima", label: "Cresima" },
  { value: "Matrimonio", label: "Matrimonio" },
  { value: "Fidanzamento", label: "Fidanzamento" },
  { value: "Anniversario", label: "Anniversario" },
  { value: "Pensione", label: "Pensione" },
  { value: "Laurea", label: "Laurea" },
  { value: "Natale", label: "Natale / Festività" },
  { value: "Altro", label: "Altra Occasione Speciale" },
];

const VOUCHER_VALUES = [
  { value: 50, label: "Importo €50" },
  { value: 100, label: "Importo €100" },
  { value: 150, label: "Importo €150" },
  { value: 200, label: "Importo €200" },
  { value: 250, label: "Importo €250" },
  { value: 300, label: "Importo €300" },
  { value: 350, label: "Importo €350" },
  { value: 400, label: "Importo €400" },
  { value: 500, label: "Importo €500" },
  { value: 600, label: "Importo €600" },
  { value: 700, label: "Importo €700" },
  { value: 800, label: "Importo €800" },
  { value: 900, label: "Importo €900" },
  { value: 1000, label: "Importo €1.000" },
  { value: 1500, label: "Importo €1.500" },
  { value: 2000, label: "Importo €2.000" },
  { value: 3000, label: "Importo €3.000" },
  { value: 5000, label: "Importo €5.000" },
];

export function VoucherForm({ initialValue = 100 }: VoucherFormProps) {
  const formId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successModalCloseRef = useRef<HTMLButtonElement>(null);

  const [value, setValue] = useState<number>(initialValue);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Compleanno");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [confirmedVoucher, setConfirmedVoucher] = useState<{
    code: string;
    beneficiary: string;
    value: number;
    occasion: string;
  } | null>(null);

  // Beneficiary display name for preview
  const previewName =
    firstName.trim() || lastName.trim()
      ? `${firstName.trim()} ${lastName.trim()}`.trim()
      : "Nome Cognome";

  const previewMessage =
    message.trim().length > 0
      ? message.trim()
      : "Il messaggio regalo e la tua dedica personalizzata compariranno in questa sezione...";

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!value || isNaN(value) || value < 50) {
      errs.value = "Seleziona un valore valido (minimo 50€).";
    }
    if (!firstName.trim()) {
      errs.firstName = "Il nome del beneficiario è obbligatorio.";
    }
    if (!lastName.trim()) {
      errs.lastName = "Il cognome del beneficiario è obbligatorio.";
    }
    if (!dob) {
      errs.dob = "La data di nascita del beneficiario è obbligatoria.";
    }
    if (!phone.trim()) {
      errs.phone = "Il recapito telefonico è obbligatorio per l'assistenza.";
    }
    if (!email.trim()) {
      errs.email = "L'indirizzo email del beneficiario è obbligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Inserisci un indirizzo email valido.";
    }
    if (!occasion) {
      errs.occasion = "Seleziona un'occasione per il buono regalo.";
    }
    if (!message.trim()) {
      errs.message = "La dedica o messaggio personale è obbligatoria.";
    } else if (message.trim().length > 250) {
      errs.message = "La dedica non può superare i 250 caratteri.";
    }
    if (!termsAccepted) {
      errs.terms = "È necessario accettare le Condizioni Generali per procedere.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      errorSummaryRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    const payload = {
      value,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      dob,
      phone: phone.trim(),
      email: email.trim(),
      occasion,
      message: message.trim(),
      website: honeypot,
    };

    try {
      const response = await fetch("/api/forms/gift-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400 && errorData?.errors) {
          setErrors(errorData.errors);
          throw new Error("Verifica i campi evidenziati nel modulo del voucher.");
        }
        throw new Error(
          "Impossibile completare la richiesta del buono regalo in questo momento. Riprova tra poco."
        );
      }

      // Generate a client reference ticket code
      const generatedCode = `INC-GFT-${Math.floor(100000 + Math.random() * 900000)}`;

      setConfirmedVoucher({
        code: generatedCode,
        beneficiary: `${firstName.trim()} ${lastName.trim()}`,
        value,
        occasion,
      });
      setIsSuccessOpen(true);

      // Reset form
      setFirstName("");
      setLastName("");
      setDob("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTermsAccepted(false);
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
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            className="mb-8 p-6 bg-red-50 border-2 border-red-400 rounded-2xl text-red-800 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Attenzione: Correggi i seguenti errori nel modulo
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {Object.entries(errors).map(([field, msg]) => (
                <li key={field}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {submitError && (
          <div
            role="alert"
            className="mb-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 flex items-start justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-sm sm:text-base">{submitError}</p>
              <p className="text-xs text-red-600 mt-1">
                Puoi contattare direttamente il nostro team via WhatsApp o email per assistenza immediata.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitError(null)}
              className="text-red-500 hover:text-red-800 text-sm font-bold px-2 py-1"
            >
              Chiudi
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left side: Voucher Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <GiftIcon className="w-5 h-5 text-amber-600" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight">
                Dettagli del Voucher
              </h2>
            </div>
            <p className="text-gray-500 text-sm sm:text-base mb-8">
              Personalizza il tuo regalo esperienziale. Il buono potrà essere utilizzato per qualsiasi tour o pacchetto su misura IncanTour.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Honeypot for anti-spam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${formId}-hp`}>Leave empty</label>
                <input
                  type="text"
                  id={`${formId}-hp`}
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Voucher Value */}
              <div>
                <label
                  htmlFor={`${formId}-value`}
                  className="block text-sm font-bold text-teal-950 mb-2"
                >
                  Valore del Voucher (€)*
                </label>
                <select
                  id={`${formId}-value`}
                  name="value"
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value, 10))}
                  aria-invalid={!!errors.value}
                  aria-describedby={errors.value ? `${formId}-value-err` : undefined}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 font-bold text-base sm:text-lg text-teal-950 focus:bg-white focus:border-amber-500 focus:outline-none transition-all shadow-sm"
                  required
                >
                  {VOUCHER_VALUES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.value && (
                  <p id={`${formId}-value-err`} className="text-xs text-red-600 font-semibold mt-1.5">
                    {errors.value}
                  </p>
                )}

                {/* WhatsApp Custom Amount Prompt */}
                <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-amber-900 text-center sm:text-left leading-relaxed">
                    <span className="font-semibold block sm:inline">Desideri un importo speciale?</span>{" "}
                    Possiamo creare un voucher personalizzato con qualsiasi cifra.
                  </div>
                  <a
                    href="https://wa.me/393384357143?text=Ciao!%20Vorrei%20acquistare%20un%20buono%20viaggio%20regalo%20con%20un%20importo%20personalizzato..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap active:scale-95"
                  >
                    <span>Contattaci su WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Beneficiary Details */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-teal-950 mb-4 flex items-center gap-2">
                  <span>Dati del Beneficiario</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor={`${formId}-first-name`}
                      className="block text-sm font-semibold text-teal-950 mb-1.5"
                    >
                      Nome*
                    </label>
                    <input
                      type="text"
                      id={`${formId}-first-name`}
                      name="first_name"
                      placeholder="Es. Mario"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? `${formId}-fn-err` : undefined}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                      required
                    />
                    {errors.firstName && (
                      <p id={`${formId}-fn-err`} className="text-xs text-red-600 font-semibold mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-last-name`}
                      className="block text-sm font-semibold text-teal-950 mb-1.5"
                    >
                      Cognome*
                    </label>
                    <input
                      type="text"
                      id={`${formId}-last-name`}
                      name="last_name"
                      placeholder="Es. Rossi"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? `${formId}-ln-err` : undefined}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                      required
                    />
                    {errors.lastName && (
                      <p id={`${formId}-ln-err`} className="text-xs text-red-600 font-semibold mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                  <div>
                    <label
                      htmlFor={`${formId}-dob`}
                      className="block text-sm font-semibold text-teal-950 mb-1.5"
                    >
                      Data di Nascita*
                    </label>
                    <input
                      type="date"
                      id={`${formId}-dob`}
                      name="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      aria-invalid={!!errors.dob}
                      aria-describedby={errors.dob ? `${formId}-dob-err` : undefined}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                      required
                    />
                    {errors.dob && (
                      <p id={`${formId}-dob-err`} className="text-xs text-red-600 font-semibold mt-1">
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-phone`}
                      className="block text-sm font-semibold text-teal-950 mb-1.5"
                    >
                      Telefono Beneficiario / Acquirente*
                    </label>
                    <input
                      type="tel"
                      id={`${formId}-phone`}
                      name="phone"
                      placeholder="Es. +39 338 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                      required
                    />
                    {errors.phone && (
                      <p id={`${formId}-phone-err`} className="text-xs text-red-600 font-semibold mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`${formId}-email`}
                    className="block text-sm font-semibold text-teal-950 mb-1.5"
                  >
                    Email per l&apos;Invio del Buono*
                  </label>
                  <input
                    type="email"
                    id={`${formId}-email`}
                    name="email"
                    placeholder="mario.rossi@email.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                    required
                  />
                  {errors.email && (
                    <p id={`${formId}-email-err`} className="text-xs text-red-600 font-semibold mt-1">
                      {errors.email}
                    </p>
                  )}
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Il voucher digitale e le istruzioni di prenotazione verranno recapitati a questo indirizzo.
                  </span>
                </div>
              </div>

              {/* Occasion Selection */}
              <div className="border-t border-gray-100 pt-6">
                <label
                  htmlFor={`${formId}-occasion`}
                  className="block text-sm font-semibold text-teal-950 mb-1.5"
                >
                  Occasione Speciale*
                </label>
                <select
                  id={`${formId}-occasion`}
                  name="occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  aria-invalid={!!errors.occasion}
                  aria-describedby={errors.occasion ? `${formId}-occ-err` : undefined}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                  required
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ.value} value={occ.value}>
                      {occ.label}
                    </option>
                  ))}
                </select>
                {errors.occasion && (
                  <p id={`${formId}-occ-err`} className="text-xs text-red-600 font-semibold mt-1">
                    {errors.occasion}
                  </p>
                )}
              </div>

              {/* Personal Dedication Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor={`${formId}-message`}
                    className="block text-sm font-semibold text-teal-950"
                  >
                    Dedica / Messaggio Personale*
                  </label>
                  <span className="text-xs text-gray-400 font-mono">
                    {message.length} / 250 caratteri
                  </span>
                </div>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  maxLength={250}
                  rows={4}
                  placeholder="Scrivi qui il messaggio da stampare sul voucher regalo (max 250 caratteri)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${formId}-msg-err` : undefined}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all resize-none"
                  required
                />
                {errors.message && (
                  <p id={`${formId}-msg-err`} className="text-xs text-red-600 font-semibold mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Transparency Notice Regarding Payment Gateway */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                  <ShieldIcon className="w-4 h-4 text-amber-700" />
                  <span>Modalità di Pagamento &amp; Trasparenza</span>
                </div>
                <p className="leading-relaxed">
                  Per garantire la massima sicurezza bancaria e verificare la disponibilità delle date, la richiesta del voucher viene registrata direttamente con il nostro ufficio prenotazioni.
                </p>
                <p className="leading-relaxed">
                  Riceverai via email la conferma del buono con le coordinate per il saldo tramite <strong>Bonifico Bancario</strong> o <strong>link di pagamento digitale assistito</strong>, oltre al PDF ad alta risoluzione pronto per la stampa o l&apos;inoltro al destinatario.
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`${formId}-terms`}
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  aria-invalid={!!errors.terms}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  required
                />
                <label
                  htmlFor={`${formId}-terms`}
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed cursor-pointer select-none"
                >
                  Dichiaro di aver letto e accettato integralmente le{" "}
                  <a
                    href="/footer%20con%20allegati/Termini%20e%20Condizioni%20Pacchetti%20Turistici.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 font-semibold underline"
                  >
                    Condizioni Generali di Vendita
                  </a>{" "}
                  e l&apos;Informativa sulla Privacy di IncanTour.*
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-600 font-semibold">{errors.terms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-xl transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Registrazione Buono in corso...</span>
                  </>
                ) : (
                  <>
                    <GiftIcon className="w-5 h-5 text-white" />
                    <span>Richiedi Buono Regalo (€{value})</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right side: Realtime Visual Luxury Ticket Stub Preview */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28 h-fit space-y-6">
            <div className="text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block mb-2 border border-teal-200">
                Anteprima Dinamica
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-teal-950">
                Il Tuo Voucher Regalo
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Visualizza in tempo reale come verrà composto il biglietto di viaggio personalizzato.
              </p>
            </div>

            {/* Boarding Pass Ticket Stub Card */}
            <div
              className="w-full rounded-[2rem] text-white flex relative shadow-2xl overflow-hidden select-none border border-white/20"
              style={{
                background: "linear-gradient(135deg, #1B5E5F 0%, #0F4142 55%, #D4941A 100%)",
                minHeight: "260px",
              }}
            >
              {/* Left Section: Main Ticket Body (70% width) */}
              <div className="w-[70%] p-6 sm:p-7 flex flex-col justify-between h-full relative z-10">
                {/* Brand Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 relative">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spirale_incantour_highres%20%281%29-7hzjNru1zG0Gbw6WqE4bJuWZ3FzOU2.png"
                          alt="IncanTour Logo"
                          fill
                          className="object-contain"
                          sizes="28px"
                        />
                      </div>
                      <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-300 bg-clip-text text-transparent">
                        IncanTour
                      </span>
                    </div>
                    <div className="text-[9px] tracking-widest uppercase opacity-80 mt-1 font-semibold text-amber-200">
                      BUONO REGALO VIAGGIO
                    </div>
                  </div>
                </div>

                {/* Recipient & Dedication */}
                <div className="my-4">
                  <div className="text-[9px] tracking-wider opacity-70 uppercase font-semibold text-gray-200">
                    Dedicato a
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-wide truncate text-white drop-shadow-sm mt-0.5">
                    {previewName}
                  </div>

                  <div className="mt-2.5 bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/10 min-h-[64px]">
                    <div className="text-[8px] tracking-wider opacity-60 uppercase mb-0.5 font-semibold text-amber-200">
                      Dedica Personale
                    </div>
                    <p className="text-[11px] leading-relaxed italic line-clamp-3 opacity-95 text-gray-100">
                      &ldquo;{previewMessage}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom: Occasion & Domain */}
                <div className="flex justify-between items-end border-t border-white/15 pt-3">
                  <div>
                    <span className="text-[8px] tracking-wider opacity-60 uppercase block font-semibold text-gray-200">
                      Occasione
                    </span>
                    <span className="text-xs font-bold text-amber-300">
                      {occasion}
                    </span>
                  </div>
                  <div className="text-[9px] opacity-60 font-mono tracking-wider">
                    incantour.it
                  </div>
                </div>
              </div>

              {/* Perforated dashed divider with circular notches */}
              <div className="w-[2px] relative flex flex-col justify-between items-center h-full">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full border-b border-white/20 z-20" />
                <div className="h-full border-l-2 border-dashed border-white/30 z-10" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full border-t border-white/20 z-20" />
              </div>

              {/* Right Section: Ticket Stub (30% width) */}
              <div className="w-[30%] bg-black/15 p-5 flex flex-col justify-between items-center h-full text-center relative z-10">
                <div className="text-[8px] tracking-widest uppercase opacity-70 font-semibold mt-1 text-gray-200">
                  Valore
                </div>

                <div className="my-auto">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tracking-tight drop-shadow-md">
                    €{value}
                  </div>
                  <div className="text-[8px] opacity-75 mt-0.5 uppercase font-semibold text-gray-300">
                    Euro
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="w-full">
                  <div className="flex space-x-[2px] justify-center opacity-40 h-6 w-full bg-white/10 p-1 rounded border border-white/10">
                    <div className="w-[3px] bg-white h-full" />
                    <div className="w-[1px] bg-white h-full" />
                    <div className="w-[2px] bg-white h-full" />
                    <div className="w-[4px] bg-white h-full" />
                    <div className="w-[1px] bg-white h-full" />
                    <div className="w-[3px] bg-white h-full" />
                    <div className="w-[2px] bg-white h-full" />
                    <div className="w-[1px] bg-white h-full" />
                    <div className="w-[3px] bg-white h-full" />
                  </div>
                  <div className="text-[7px] opacity-60 font-mono mt-1 uppercase tracking-widest text-center">
                    INC-GFT-2026
                  </div>
                </div>
              </div>
            </div>

            {/* Card Visual Design Notice */}
            <div className="mt-4 bg-orange-50 border border-orange-100 rounded-2xl p-4 text-xs text-orange-800 flex items-start gap-3">
              <InfoIcon className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Questo voucher è spendibile per la prenotazione di qualsiasi pacchetto turistico Incantour. Ha validità di 12 mesi dalla data di emissione ed è cumulabile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Success Confirmation Modal */}
      {isSuccessOpen && confirmedVoucher && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/70 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8" />
            </div>

            <h3
              id="success-modal-title"
              className="text-2xl font-extrabold text-teal-950 mb-2"
            >
              Richiesta Buono Inviata!
            </h3>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Grazie! Abbiamo preso in carico la tua richiesta per il voucher dedicato a{" "}
              <strong>{confirmedVoucher.beneficiary}</strong> per un valore di{" "}
              <strong>€{confirmedVoucher.value}</strong>.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 border border-gray-200 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Codice Riferimento:</span>
                <span className="font-mono font-bold text-teal-900">
                  {confirmedVoucher.code}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Beneficiario:</span>
                <span className="font-semibold text-gray-800">
                  {confirmedVoucher.beneficiary}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Occasione:</span>
                <span className="font-semibold text-gray-800">
                  {confirmedVoucher.occasion}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Importo:</span>
                <span className="font-bold text-amber-600 text-base">
                  €{confirmedVoucher.value}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Riceverai a breve un&apos;email con il PDF stampabile del voucher e le coordinate per completare il pagamento tramite bonifico o link assistito.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                ref={successModalCloseRef}
                type="button"
                onClick={() => setIsSuccessOpen(false)}
                className="w-full py-3 px-6 rounded-xl bg-teal-900 text-white font-bold text-sm hover:bg-teal-950 transition-colors"
              >
                Chiudi Conferma
              </button>
              <Link
                href="/tours"
                className="w-full py-3 px-6 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors flex items-center justify-center"
              >
                Esplora Tour &amp; Pacchetti
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
