"use client";

import React, { useId, useRef, useState } from "react";
import Link from "next/link";
import { CheckIcon, HeartIcon, ShieldIcon } from "@/components/ui/icons";

const PRESET_AMOUNTS = [10, 25, 50, 100, 200];

const CAUSES = [
  { value: "Preservazione Culturale", label: "Preservazione Culturale (Restauro e valorizzazione siti)" },
  { value: "Sostegno alla Comunità", label: "Sostegno alla Comunità (Supporto ad artigiani e borghi)" },
  { value: "Educazione & Formazione", label: "Educazione & Formazione (Programmi didattici e borse di studio)" },
  { value: "Fondo Generale Turismo Sostenibile", label: "Fondo Generale per il Turismo Sostenibile" },
];

export function DonationForm() {
  const formId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successModalCloseRef = useRef<HTMLButtonElement>(null);

  const [frequency, setFrequency] = useState<"una-tantum" | "mensile">("una-tantum");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState<string>("Preservazione Culturale");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [confirmedDonation, setConfirmedDonation] = useState<{
    code: string;
    donorName: string;
    amount: number;
    frequency: string;
    cause: string;
  } | null>(null);

  // Determine effective donation amount
  const effectiveAmount: number =
    selectedPreset !== null
      ? selectedPreset
      : customAmount
      ? parseFloat(customAmount) || 0
      : 0;

  const handleSelectPreset = (amt: number) => {
    setSelectedPreset(amt);
    setCustomAmount("");
    if (errors.amount) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.amount;
        return copy;
      });
    }
  };

  const handleCustomAmountChange = (val: string) => {
    setSelectedPreset(null);
    setCustomAmount(val);
    if (errors.amount) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.amount;
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!effectiveAmount || isNaN(effectiveAmount) || effectiveAmount < 5) {
      errs.amount = "L'importo minimo per sostenere i progetti è di 5€.";
    }
    if (!name.trim()) {
      errs.name = "Il nome completo o ragione sociale è obbligatorio.";
    }
    if (!email.trim()) {
      errs.email = "L'indirizzo email per la ricevuta fiscale è obbligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Inserisci un indirizzo email valido.";
    }
    if (!cause) {
      errs.cause = "Seleziona la destinazione del contributo.";
    }
    if (!termsAccepted) {
      errs.terms = "È necessario confermare il consenso al trattamento dati per la ricevuta.";
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
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      amount: effectiveAmount,
      frequency,
      cause,
      message: message.trim(),
      website: honeypot,
    };

    try {
      const response = await fetch("/api/forms/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400 && errorData?.errors) {
          setErrors(errorData.errors);
          throw new Error("Verifica i campi evidenziati nel modulo di donazione.");
        }
        throw new Error(
          "Impossibile registrare la donazione in questo momento. Riprova tra poco."
        );
      }

      const generatedCode = `DON-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      setConfirmedDonation({
        code: generatedCode,
        donorName: name.trim(),
        amount: effectiveAmount,
        frequency: frequency === "mensile" ? "Donazione Mensile" : "Donazione Singola (Una Tantum)",
        cause,
      });

      setIsSuccessOpen(true);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
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
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
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
                Puoi contattare direttamente la nostra segreteria per effettuare il sostegno tramite bonifico bancario diretto.
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

        {/* Donation Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="text-center mb-10 pb-6 border-b border-gray-100">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full mb-3 border border-amber-200">
              Erogazione Liberale
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
              Scegli il Tuo Livello di Sostegno
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto">
              Contribuisci alla salvaguardia del patrimonio archeologico, artistico e naturale.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Honeypot */}
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

            {/* Frequency Selector: Una Tantum vs Mensile */}
            <div>
              <label className="block text-sm font-bold text-teal-950 mb-3 text-center sm:text-left">
                Frequenza del Contributo
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-gray-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setFrequency("una-tantum")}
                  className={`py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                    frequency === "una-tantum"
                      ? "bg-white text-teal-950 shadow-md"
                      : "text-gray-600 hover:text-teal-900"
                  }`}
                >
                  Donazione Singola (Una Tantum)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("mensile")}
                  className={`py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                    frequency === "mensile"
                      ? "bg-white text-teal-950 shadow-md"
                      : "text-gray-600 hover:text-teal-900"
                  }`}
                >
                  <HeartIcon className="w-4 h-4 text-amber-500" />
                  <span>Sostegno Mensile</span>
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-bold text-teal-950 mb-3">
                Importo della Donazione (€)*
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                {PRESET_AMOUNTS.map((amt) => {
                  const isSelected = selectedPreset === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSelectPreset(amt)}
                      className={`py-3.5 px-3 rounded-2xl font-extrabold text-base sm:text-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-amber-500 bg-amber-50 text-amber-950 shadow-sm"
                          : "border-gray-200 bg-gray-50/50 text-gray-700 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      €{amt}
                      {frequency === "mensile" && (
                        <span className="block text-[10px] font-normal text-gray-500">
                          /mese
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-lg">
                  €
                </span>
                <input
                  type="number"
                  min="5"
                  step="1"
                  placeholder="Oppure inserisci un importo personalizzato (min. 5€)"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  aria-invalid={!!errors.amount}
                  aria-describedby={errors.amount ? `${formId}-amount-err` : undefined}
                  className="w-full pl-9 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 font-bold text-teal-950 placeholder:font-normal placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>
              {errors.amount && (
                <p id={`${formId}-amount-err`} className="text-xs text-red-600 font-semibold mt-1.5">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Cause / Project Destination */}
            <div className="border-t border-gray-100 pt-6">
              <label
                htmlFor={`${formId}-cause`}
                className="block text-sm font-bold text-teal-950 mb-2"
              >
                Destinazione del Tuo Contributo*
              </label>
              <select
                id={`${formId}-cause`}
                name="cause"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                aria-invalid={!!errors.cause}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 font-medium focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                required
              >
                {CAUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.cause && (
                <p className="text-xs text-red-600 font-semibold mt-1.5">{errors.cause}</p>
              )}
            </div>

            {/* Donor Contact Details */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-teal-950 mb-4">
                Dati del Donatore (per ricevuta fiscale)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor={`${formId}-name`}
                    className="block text-sm font-semibold text-teal-950 mb-1.5"
                  >
                    Nome Completo o Ragione Sociale*
                  </label>
                  <input
                    type="text"
                    id={`${formId}-name`}
                    name="name"
                    placeholder="Es. Mario Rossi o Nome Azienda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                    required
                  />
                  {errors.name && (
                    <p id={`${formId}-name-err`} className="text-xs text-red-600 font-semibold mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="block text-sm font-semibold text-teal-950 mb-1.5"
                  >
                    Indirizzo Email (per attestazione)*
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
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                <div>
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block text-sm font-semibold text-teal-950 mb-1.5"
                  >
                    Telefono (opzionale)
                  </label>
                  <input
                    type="tel"
                    id={`${formId}-phone`}
                    name="phone"
                    placeholder="Es. +39 338 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-message`}
                    className="block text-sm font-semibold text-teal-950 mb-1.5"
                  >
                    Messaggio / Dedica (opzionale)
                  </label>
                  <input
                    type="text"
                    id={`${formId}-message`}
                    name="message"
                    placeholder="Motivazione o dedica speciale..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-teal-950 placeholder:text-gray-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment & Settlement Transparency Banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                <ShieldIcon className="w-4 h-4 text-amber-700" />
                <span>Trasparenza Erogazioni &amp; Modalità di Pagamento</span>
              </div>
              <p className="leading-relaxed">
                In ottemperanza alla normativa sulle erogazioni liberali e per garantire la tracciabilità fiscale del tuo contributo, le donazioni vengono canalizzate tramite <strong>Bonifico Bancario ordinario</strong> intestato al conto vincolato di IncanTour Srl.
              </p>
              <p className="leading-relaxed">
                I moduli di pagamento diretto automatico su carta sono in fase di aggiornamento. Confermando questo modulo, registrerai la tua donazione e riceverai immediatamente per email le coordinate IBAN e la quietanza fiscale deducibile.
              </p>
            </div>

            {/* Privacy Checkbox */}
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
                Presto il consenso al trattamento dei miei dati personali per l&apos;emissione della ricevuta di donazione secondo l&apos;Informativa sulla Privacy di IncanTour Srl.*
              </label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-600 font-semibold">{errors.terms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-xl transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-gradient-to-r from-teal-800 to-teal-950 hover:from-teal-700 hover:to-teal-900"
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
                  <span>Registrazione Donazione...</span>
                </>
              ) : (
                <>
                  <HeartIcon className="w-5 h-5 text-amber-400" />
                  <span>
                    Conferma Donazione di €{effectiveAmount.toFixed(2)}
                    {frequency === "mensile" ? " / Mese" : ""}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Accessible Success Confirmation Modal */}
      {isSuccessOpen && confirmedDonation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-success-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/70 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8" />
            </div>

            <h3
              id="donation-success-title"
              className="text-2xl font-extrabold text-teal-950 mb-2"
            >
              Grazie per il Tuo Sostegno!
            </h3>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              La tua adesione è stata registrata con successo. Il tuo contributo sosterrà direttamente il progetto <strong>{confirmedDonation.cause}</strong>.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 border border-gray-200 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Riferimento Donazione:</span>
                <span className="font-mono font-bold text-teal-900">
                  {confirmedDonation.code}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Intestatario:</span>
                <span className="font-semibold text-gray-800">
                  {confirmedDonation.donorName}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Tipologia:</span>
                <span className="font-semibold text-gray-800">
                  {confirmedDonation.frequency}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Importo:</span>
                <span className="font-bold text-amber-600 text-base">
                  €{confirmedDonation.amount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-teal-50/70 rounded-2xl p-4 text-left text-xs text-teal-950 mb-6 border border-teal-200/80 space-y-1">
              <p className="font-bold">Coordinate per il Bonifico Bancario:</p>
              <p>Beneficiario: <strong>Incantour srl</strong></p>
              <p>IBAN: <strong>IT00X0000000000000000000000</strong> (comunicato via email)</p>
              <p>Causale: <strong>Erogazione liberale ref. {confirmedDonation.code}</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                ref={successModalCloseRef}
                type="button"
                onClick={() => setIsSuccessOpen(false)}
                className="w-full py-3 px-6 rounded-xl bg-teal-900 text-white font-bold text-sm hover:bg-teal-950 transition-colors"
              >
                Chiudi Notifica
              </button>
              <Link
                href="/"
                className="w-full py-3 px-6 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors flex items-center justify-center"
              >
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
