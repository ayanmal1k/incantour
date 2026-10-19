"use client";

import React, { useId, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  GlobeIcon,
  HeartIcon,
  Loader2Icon,
  LockIcon,
  MapPinIcon,
  PaperPlaneIcon,
  PlaneArrivalIcon,
  PlaneDepartureIcon,
  ShieldIcon,
  SparklesIcon,
  UsersIcon,
} from "@/components/ui/icons";

export type TripType = "incoming" | "outgoing";

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  travel_expectations?: string;
  departure_city?: string;
  privacy?: string;
}

export function CustomTripForm() {
  const formId = useId();

  // Mode: Incoming vs Outgoing
  const [tripType, setTripType] = useState<TripType>("incoming");

  // Form State
  const [formData, setFormData] = useState({
    // Personal information
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    email: "",
    phone: "",

    // Expectations & Dates
    travel_expectations: "DAL... AL...",
    date_start: "",
    date_end: "",
    other_expectations_text: "",
    travel_type: "PACCHETTO ALL INCLUSIVE",

    // Departure & Transport
    departure_city: "",
    transport_mode: "AEREO",

    // Destination
    destination: "NAPOLI CITTA' D'ARTE",
    other_destination_text: "",

    // Preferences (array of selected items)
    preferences: ["Percorso ENO-GASTRONOMICO"] as string[],
    other_preferences_notes: "",

    // Outgoing specific
    when_option: "1 SETTIMANA",
    accommodation: "HOTEL****",
    budget_type: "from_to" as "more_than" | "from_to",
    budget_more_than: "1500",
    budget_min: "1000",
    budget_max: "2500",

    // Notes & Privacy
    notes: "",
    privacy_accepted: false,

    // Honeypot
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    personal: true,
    tripDetails: true,
    destination: true,
    accommodation: true,
    notes: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    if (type === "incoming") {
      setFormData((prev) => ({
        ...prev,
        destination: prev.destination === "EUROPA" ? "NAPOLI CITTA' D'ARTE" : prev.destination,
        travel_type: "PACCHETTO ALL INCLUSIVE",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        destination: "EUROPA",
        travel_type: "PACCHETTO all inclusive",
      }));
    }
    setErrors({});
  };

  const handlePreferenceToggle = (pref: string) => {
    setFormData((prev) => {
      const exists = prev.preferences.includes(pref);
      if (exists) {
        return { ...prev, preferences: prev.preferences.filter((p) => p !== pref) };
      } else {
        return { ...prev, preferences: [...prev.preferences, pref] };
      }
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Il nome è obbligatorio.";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Il cognome è obbligatorio.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'indirizzo email è obbligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Inserisci un indirizzo email valido.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Il recapito telefonico è obbligatorio.";
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Seleziona una destinazione.";
    }
    if (!formData.privacy_accepted) {
      newErrors.privacy = "È necessario accettare l'informativa sulla privacy per procedere.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstErrorEl = document.querySelector("[aria-invalid='true']");
      if (firstErrorEl) {
        (firstErrorEl as HTMLElement).focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        trip_type: tripType,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),

        travel_expectations: formData.travel_expectations,
        date_start: formData.date_start,
        date_end: formData.date_end,
        other_expectations_text: formData.other_expectations_text,
        travel_type: formData.travel_type,

        departure_city: formData.departure_city.trim(),
        transport_mode: formData.transport_mode,

        destination: formData.destination,
        other_destination_text: formData.other_destination_text.trim(),

        preferences: formData.preferences,
        other_preferences_notes: formData.other_preferences_notes.trim(),

        when_option: tripType === "outgoing" ? formData.when_option : undefined,
        accommodation: tripType === "outgoing" ? formData.accommodation : undefined,
        budget_type: tripType === "outgoing" ? formData.budget_type : undefined,
        budget_more_than: tripType === "outgoing" && formData.budget_type === "more_than" ? formData.budget_more_than : undefined,
        budget_min: tripType === "outgoing" && formData.budget_type === "from_to" ? formData.budget_min : undefined,
        budget_max: tripType === "outgoing" && formData.budget_type === "from_to" ? formData.budget_max : undefined,

        notes: formData.notes.trim(),
        privacy_accepted: true,
        website: formData.website, // honeypot
      };

      const res = await fetch("/api/forms/custom-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Errore durante l'invio della richiesta. Riprova più tardi.");
      }

      setIsSuccessOpen(true);
    } catch (err: unknown) {
      console.error("Custom trip submit error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Si è verificato un errore imprevisto. Ti invitiamo a contattarci direttamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Options configuration based on specs
  const incomingExpectationOptions = ["DAL... AL...", "WEEK END", "1 SETTIMANA", "ALTRO"];
  const incomingTravelTypes = [
    "PACCHETTO ALL INCLUSIVE",
    "SOLO VOLO",
    "SOLO SOGGIORNO",
    "OFFERTE LAST MINUTE",
  ];
  const incomingDestinations = [
    "NAPOLI CITTA' D'ARTE",
    "TUTTE ISOLE",
    "MONTAGNA",
    "MARE",
    "VACANZE VERDI",
    "SALUTE & BENESSERE",
    "AREE INTERNE",
    "REGIONE",
    "ALTRO",
  ];
  const incomingPreferencesList = [
    "Percorso ENO-GASTRONOMICO",
    "Culturale",
    "A tema",
  ];

  const outgoingTravelExpectations = [
    "PACCHETTO all inclusive",
    "SOLO VOLO",
    "SOLO SOGGIORNO",
    "OFFERTE LAST MINUTE",
  ];
  const outgoingDestinations = [
    "TUTTE",
    "EUROPA",
    "CITTA' D'ARTE",
    "CROCIERE",
    "EGITTO",
    "ORIENTE",
    "STATI UNITI",
    "ISLANDA",
    "ALTRO",
  ];
  const outgoingPreferencesList = [
    "TOUR ENO-GASTRONOMICO",
    "CULTURALE",
    "TEMATICO",
  ];
  const outgoingWhenOptions = ["WEEK END", "1 SETTIMANA", "ALTRO (DAL..AL..)"];
  const outgoingAccommodations = [
    "HOTEL****",
    "HOTEL***",
    "B&B",
    "AGRITURISMO",
    "DIMORE STORICHE",
    "HOSTEL",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-10">
      {/* Incoming / Outgoing Switcher Header */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
          Personalizzazione del Viaggio
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mb-3">
          Incoming o Outgoing?
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">
          Scegli la direzione del tuo viaggio. Il modulo si adatterà automaticamente alle tue esigenze.
        </p>

        {/* Big Switch Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Incoming Card */}
          <button
            type="button"
            onClick={() => handleTripTypeChange("incoming")}
            className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 border-2 cursor-pointer ${
              tripType === "incoming"
                ? "border-[#1B5E5F] bg-teal-50/50 shadow-md ring-2 ring-[#1B5E5F]/20"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-xl shrink-0 transition-colors ${
                tripType === "incoming"
                  ? "bg-[#1B5E5F] text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <PlaneArrivalIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-gray-900">INCOMING</span>
                {tripType === "incoming" && (
                  <span className="bg-[#1B5E5F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Selezionato
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Campania, Napoli, Costiera, Isole e le più belle regioni d&apos;Italia.
              </p>
            </div>
          </button>

          {/* Outgoing Card */}
          <button
            type="button"
            onClick={() => handleTripTypeChange("outgoing")}
            className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 border-2 cursor-pointer ${
              tripType === "outgoing"
                ? "border-[#E6A532] bg-amber-50/60 shadow-md ring-2 ring-[#E6A532]/30"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-xl shrink-0 transition-colors ${
                tripType === "outgoing"
                  ? "bg-[#E6A532] text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <PlaneDepartureIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-gray-900">OUTGOING</span>
                {tripType === "outgoing" && (
                  <span className="bg-[#E6A532] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Selezionato
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Europa, Americhe, Oriente, Islanda, grandi itinerari e crociere nel mondo.
              </p>
            </div>
          </button>
        </div>

        {/* Prominent Mandatory Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-teal-900/10 to-amber-500/10 border border-amber-300/40 text-teal-900 max-w-2xl mx-auto flex items-center gap-3 text-left">
          <ClockIcon className="w-6 h-6 text-amber-600 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            Per il tuo viaggio su misura, scrivi ai ns. consulenti di viaggio! Sarai contattato da un nostro{" "}
            <span className="text-[#1B5E5F] font-bold underline decoration-amber-500 underline-offset-2">
              Travel expert in 24 h.
            </span>
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Honeypot for spam bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`${formId}-hp`}>Lascia vuoto questo campo</label>
          <input
            type="text"
            id={`${formId}-hp`}
            name="website"
            value={formData.website}
            onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 shadow-sm"
          >
            <span className="text-lg">⚠️</span>
            <div>
              <p className="font-bold">Attenzione</p>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        {/* SECTION 1: DATI PERSONALI */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
          <button
            type="button"
            onClick={() => toggleSection("personal")}
            className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 cursor-pointer"
            aria-expanded={openSections.personal}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#1B5E5F] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-teal-950">Informazioni Personali</h3>
                <p className="text-xs text-gray-500">I tuoi contatti per ricevere la proposta personalizzata</p>
              </div>
            </div>
            {openSections.personal ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {openSections.personal && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <label htmlFor={`${formId}-first_name`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`${formId}-first_name`}
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData((p) => ({ ...p, first_name: e.target.value }))}
                    placeholder="Mario"
                    aria-invalid={!!errors.first_name}
                    aria-describedby={errors.first_name ? `${formId}-first_name-err` : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.first_name
                        ? "border-red-400 bg-red-50/30 focus:ring-red-400"
                        : "border-gray-200 focus:border-[#1B5E5F] focus:ring-[#1B5E5F]/20"
                    }`}
                  />
                  {errors.first_name && (
                    <p id={`${formId}-first_name-err`} className="text-xs text-red-600 mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                {/* Cognome */}
                <div>
                  <label htmlFor={`${formId}-last_name`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Cognome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`${formId}-last_name`}
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData((p) => ({ ...p, last_name: e.target.value }))}
                    placeholder="Rossi"
                    aria-invalid={!!errors.last_name}
                    aria-describedby={errors.last_name ? `${formId}-last_name-err` : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.last_name
                        ? "border-red-400 bg-red-50/30 focus:ring-red-400"
                        : "border-gray-200 focus:border-[#1B5E5F] focus:ring-[#1B5E5F]/20"
                    }`}
                  />
                  {errors.last_name && (
                    <p id={`${formId}-last_name-err`} className="text-xs text-red-600 mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Indirizzo */}
                <div>
                  <label htmlFor={`${formId}-address`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    id={`${formId}-address`}
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    placeholder="Via Roma, 12"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:ring-2 focus:ring-[#1B5E5F]/20 focus:outline-none"
                  />
                </div>

                {/* Città */}
                <div>
                  <label htmlFor={`${formId}-city`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Città
                  </label>
                  <input
                    type="text"
                    id={`${formId}-city`}
                    value={formData.city}
                    onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                    placeholder="Napoli"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:ring-2 focus:ring-[#1B5E5F]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor={`${formId}-email`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id={`${formId}-email`}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="mario.rossi@email.it"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 bg-red-50/30 focus:ring-red-400"
                        : "border-gray-200 focus:border-[#1B5E5F] focus:ring-[#1B5E5F]/20"
                    }`}
                  />
                  {errors.email && (
                    <p id={`${formId}-email-err`} className="text-xs text-red-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Telefono */}
                <div>
                  <label htmlFor={`${formId}-phone`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Telefono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id={`${formId}-phone`}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+39 333 1234567"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-400 bg-red-50/30 focus:ring-red-400"
                        : "border-gray-200 focus:border-[#1B5E5F] focus:ring-[#1B5E5F]/20"
                    }`}
                  />
                  {errors.phone && (
                    <p id={`${formId}-phone-err`} className="text-xs text-red-600 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: ATTESE DI VIAGGIO, TRASPORTO & PARTENZA */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
          <button
            type="button"
            onClick={() => toggleSection("tripDetails")}
            className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 cursor-pointer"
            aria-expanded={openSections.tripDetails}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-teal-950">
                  {tripType === "incoming" ? "Che Attese di Viaggio & Mezzi?" : "Quali Attese & Trasporti?"}
                </h3>
                <p className="text-xs text-gray-500">Durata, tipologia di viaggio e mezzo con cui vuoi arrivare</p>
              </div>
            </div>
            {openSections.tripDetails ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {openSections.tripDetails && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* CHE ATTESE DI VIAGGIO? (Incoming) vs Quali Attese? (Outgoing) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  {tripType === "incoming" ? "CHE ATTESE DI VIAGGIO?" : "QUALI ATTESE?"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(tripType === "incoming" ? incomingExpectationOptions : outgoingTravelExpectations).map((opt) => {
                    const isSelected =
                      tripType === "incoming"
                        ? formData.travel_expectations === opt
                        : formData.travel_type === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          if (tripType === "incoming") {
                            setFormData((p) => ({ ...p, travel_expectations: opt }));
                          } else {
                            setFormData((p) => ({ ...p, travel_type: opt }));
                          }
                        }}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          isSelected
                            ? "bg-[#1B5E5F] text-white border-[#1B5E5F] shadow-sm"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* If Incoming and DAL... AL... or ALTRO selected, show date picker or custom text */}
                {tripType === "incoming" && formData.travel_expectations === "DAL... AL..." && (
                  <div className="mt-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-date_start`} className="block text-xs font-semibold text-teal-900 mb-1">
                        Dal (Data Inizio)
                      </label>
                      <input
                        type="date"
                        id={`${formId}-date_start`}
                        value={formData.date_start}
                        onChange={(e) => setFormData((p) => ({ ...p, date_start: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-teal-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E5F]"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-date_end`} className="block text-xs font-semibold text-teal-900 mb-1">
                        Al (Data Fine)
                      </label>
                      <input
                        type="date"
                        id={`${formId}-date_end`}
                        value={formData.date_end}
                        onChange={(e) => setFormData((p) => ({ ...p, date_end: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-teal-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E5F]"
                      />
                    </div>
                  </div>
                )}

                {tripType === "incoming" && formData.travel_expectations === "ALTRO" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Specifica il periodo desiderato o durata personalizzata..."
                      value={formData.other_expectations_text}
                      onChange={(e) => setFormData((p) => ({ ...p, other_expectations_text: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Type of travel for Incoming */}
              {tripType === "incoming" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    TIPO DI VIAGGIO
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {incomingTravelTypes.map((tType) => (
                      <button
                        key={tType}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, travel_type: tType }))}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          formData.travel_type === tType
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {tType}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Departure & Arrival (Departure City & Transportation) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-gray-100">
                {/* DA DOVE PARTI? */}
                <div>
                  <label htmlFor={`${formId}-dep_city`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    DA DOVE PARTI?
                  </label>
                  <input
                    type="text"
                    id={`${formId}-dep_city`}
                    placeholder="Es. Milano, Roma, Londra, New York..."
                    value={formData.departure_city}
                    onChange={(e) => setFormData((p) => ({ ...p, departure_city: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:ring-2 focus:ring-[#1B5E5F]/20 focus:outline-none"
                  />
                </div>

                {/* COME VUOI ARRIVARE? */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    COME VUOI ARRIVARE?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["AEREO", "TRENO", "NAVE"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, transport_mode: mode }))}
                        className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                          formData.transport_mode === mode
                            ? "bg-[#1B5E5F] text-white border-[#1B5E5F]"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {mode === "AEREO" ? "✈️ AEREO" : mode === "TRENO" ? "🚆 TRENO" : "🚢 NAVE"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* QUANDO? for Outgoing */}
              {tripType === "outgoing" && (
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    QUANDO?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {outgoingWhenOptions.map((wOpt) => (
                      <button
                        key={wOpt}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, when_option: wOpt }))}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          formData.when_option === wOpt
                            ? "bg-[#E6A532] text-white border-[#E6A532] shadow-sm"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {wOpt}
                      </button>
                    ))}
                  </div>

                  {formData.when_option === "ALTRO (DAL..AL..)" && (
                    <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${formId}-out_date_start`} className="block text-xs font-semibold text-amber-900 mb-1">
                          Dal (Data Inizio)
                        </label>
                        <input
                          type="date"
                          id={`${formId}-out_date_start`}
                          value={formData.date_start}
                          onChange={(e) => setFormData((p) => ({ ...p, date_start: e.target.value }))}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6A532]"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${formId}-out_date_end`} className="block text-xs font-semibold text-amber-900 mb-1">
                          Al (Data Fine)
                        </label>
                        <input
                          type="date"
                          id={`${formId}-out_date_end`}
                          value={formData.date_end}
                          onChange={(e) => setFormData((p) => ({ ...p, date_end: e.target.value }))}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6A532]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 3: DESTINAZIONE & PREFERENZE */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
          <button
            type="button"
            onClick={() => toggleSection("destination")}
            className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 cursor-pointer"
            aria-expanded={openSections.destination}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#1B5E5F] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-teal-950">Quale Destinazione & Preferenze?</h3>
                <p className="text-xs text-gray-500">Mete desiderate e tipologia di esperienza</p>
              </div>
            </div>
            {openSections.destination ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {openSections.destination && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* QUALE DESTINAZIONE? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  QUALE DESTINAZIONE?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(tripType === "incoming" ? incomingDestinations : outgoingDestinations).map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, destination: dest }))}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left flex items-center justify-between ${
                        formData.destination === dest
                          ? "bg-[#1B5E5F] text-white border-[#1B5E5F] shadow-sm"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{dest}</span>
                      {formData.destination === dest && <CheckCircleIcon className="w-4 h-4 text-amber-300" />}
                    </button>
                  ))}
                </div>

                {formData.destination === "ALTRO" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Specifica la destinazione o le tappe desiderate..."
                      value={formData.other_destination_text}
                      onChange={(e) => setFormData((p) => ({ ...p, other_destination_text: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* PREFERENZE */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  {tripType === "incoming" ? "PREFERENZE:" : "TOUR PREFERENCES & TIPOLOGIA:"}
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Seleziona una o più preferenze per aiutarci a calibrare il percorso perfetto per te:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {(tripType === "incoming" ? incomingPreferencesList : outgoingPreferencesList).map((pref) => {
                    const isSelected = formData.preferences.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => handlePreferenceToggle(pref)}
                        className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-white border-gray-200 text-gray-700 hover:border-amber-400"
                        }`}
                      >
                        <span>{pref}</span>
                        {isSelected && <CheckCircleIcon className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Subcategories or 'Altre proposte' clarification as requested in specs */}
                <div className="mt-4">
                  <label htmlFor={`${formId}-pref_notes`} className="block text-xs font-semibold text-gray-700 mb-1">
                    Altre proposte / Desideri specifici o subcategorie di viaggio:
                  </label>
                  <textarea
                    id={`${formId}-pref_notes`}
                    rows={2}
                    value={formData.other_preferences_notes}
                    onChange={(e) => setFormData((p) => ({ ...p, other_preferences_notes: e.target.value }))}
                    placeholder="Es. Itinerario archeologico esclusivo, degustazioni cantine bio, escursioni in barca privata, trekking natura..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: ALLOGGIO & BUDGET (OUTGOING EXCLUSIVE) */}
        {tripType === "outgoing" && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection("accommodation")}
              className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 cursor-pointer"
              aria-expanded={openSections.accommodation}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg text-teal-950">Dove Vuoi Dormire & Budget</h3>
                  <p className="text-xs text-gray-500">Struttura ricettiva e fascia economica per il viaggio</p>
                </div>
              </div>
              {openSections.accommodation ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {openSections.accommodation && (
              <div className="p-6 sm:p-8 space-y-6">
                {/* DOVE VUOI DORMIRE? */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    DOVE VUOI DORMIRE?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {outgoingAccommodations.map((acc) => (
                      <button
                        key={acc}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, accommodation: acc }))}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          formData.accommodation === acc
                            ? "bg-[#1B5E5F] text-white border-[#1B5E5F]"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {acc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BUDGET */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    BUDGET
                  </label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-800">
                      <input
                        type="radio"
                        name="budget_choice"
                        checked={formData.budget_type === "from_to"}
                        onChange={() => setFormData((p) => ({ ...p, budget_type: "from_to" }))}
                        className="text-[#1B5E5F] focus:ring-[#1B5E5F] w-4 h-4"
                      />
                      <span>DA... A... (Fascia di prezzo)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-800">
                      <input
                        type="radio"
                        name="budget_choice"
                        checked={formData.budget_type === "more_than"}
                        onChange={() => setFormData((p) => ({ ...p, budget_type: "more_than" }))}
                        className="text-[#1B5E5F] focus:ring-[#1B5E5F] w-4 h-4"
                      />
                      <span>PIU&apos; DI... (Budget minimo garantito)</span>
                    </label>
                  </div>

                  {formData.budget_type === "from_to" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                      <div>
                        <label htmlFor={`${formId}-b_min`} className="block text-xs font-semibold text-gray-700 mb-1">
                          Da (€ a persona)
                        </label>
                        <input
                          type="number"
                          id={`${formId}-b_min`}
                          step="50"
                          value={formData.budget_min}
                          onChange={(e) => setFormData((p) => ({ ...p, budget_min: e.target.value }))}
                          placeholder="1000"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1B5E5F] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${formId}-b_max`} className="block text-xs font-semibold text-gray-700 mb-1">
                          A (€ a persona)
                        </label>
                        <input
                          type="number"
                          id={`${formId}-b_max`}
                          step="50"
                          value={formData.budget_max}
                          onChange={(e) => setFormData((p) => ({ ...p, budget_max: e.target.value }))}
                          placeholder="2500"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1B5E5F] focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 max-w-sm">
                      <label htmlFor={`${formId}-b_more`} className="block text-xs font-semibold text-gray-700 mb-1">
                        Più di (€ a persona)
                      </label>
                      <input
                        type="number"
                        id={`${formId}-b_more`}
                        step="100"
                        value={formData.budget_more_than}
                        onChange={(e) => setFormData((p) => ({ ...p, budget_more_than: e.target.value }))}
                        placeholder="1500"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1B5E5F] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 5: NOTE, PRIVACY & INVIO */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-6">
          {/* Note / Messaggio */}
          <div>
            <label htmlFor={`${formId}-notes`} className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Note o Richieste Speciali
            </label>
            <textarea
              id={`${formId}-notes`}
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Segnalaci eventuali esigenze particolari (intolleranze, bambini, persone a mobilità ridotta, occasioni speciali, anniversari...)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1B5E5F] focus:ring-2 focus:ring-[#1B5E5F]/20 focus:outline-none"
            />
          </div>

          {/* Privacy Checkbox (Item 18 from specifications) */}
          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.privacy_accepted}
                onChange={(e) => setFormData((p) => ({ ...p, privacy_accepted: e.target.checked }))}
                aria-invalid={!!errors.privacy}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-[#1B5E5F] focus:ring-[#1B5E5F]"
              />
              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Dichiaro di aver letto integralmente il testo sulla legge per la Privacy, e quindi di acconsentire al
                trattamento dei miei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.privacy && (
              <p className="text-xs text-red-600 mt-1 pl-8">
                {errors.privacy}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-8 rounded-full bg-gradient-to-r from-[#1B5E5F] via-[#207071] to-[#0F4142] hover:from-[#164d4e] hover:to-[#0a2e2f] text-white font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="w-5 h-5 animate-spin text-amber-300" />
                  <span>Invio richiesta in corso...</span>
                </>
              ) : (
                <>
                  <PaperPlaneIcon className="w-5 h-5 text-amber-300" />
                  <span>Invia una RICHIESTA DI PRENOTAZIONE</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-2">
              <LockIcon className="w-3.5 h-3.5 text-gray-400" />
              <span>I tuoi dati sono protetti e gestiti con la massima riservatezza. Nessun obbligo di acquisto.</span>
            </p>
          </div>
        </div>
      </form>

      {/* SUCCESS MODAL */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border border-gray-100 relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-800 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/20">
              <CheckCircleIcon className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Richiesta Ricevuta!
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-3 mb-2">
              Grazie, {formData.first_name}!
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Abbiamo ricevuto la tua richiesta per un viaggio su misura per{" "}
              <strong className="text-teal-900">{formData.destination}</strong> in modalità{" "}
              <strong className="text-teal-900">{tripType.toUpperCase()}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm text-left mb-6 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                <ClockIcon className="w-4 h-4 text-amber-600" />
                <span>Travel Expert a tua disposizione</span>
              </div>
              Un nostro consulente di viaggio dedicato ti contatterà entro <strong>24 ore</strong> all&apos;indirizzo{" "}
              <strong>{formData.email}</strong> o al numero <strong>{formData.phone}</strong> per definire insieme
              l&apos;itinerario esclusivo.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSuccessOpen(false);
                  window.location.reload();
                }}
                className="w-full py-3 px-6 rounded-full bg-[#1B5E5F] text-white font-bold text-sm hover:bg-[#154a4b] transition-colors cursor-pointer"
              >
                Invia un&apos;altra richiesta
              </button>
              <Link
                href="/"
                className="w-full py-3 px-6 rounded-full border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
