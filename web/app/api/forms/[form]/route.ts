import { NextRequest, NextResponse } from "next/server";

import { getCustomApiBase, getWordPressUrl } from "@/lib/wordpress/client";

const formTargets = {
  booking: { base: "tourism", endpoint: "submit-booking" },
  "gift-voucher": { base: "tourism", endpoint: "submit-gift-voucher" },
  donation: { base: "incantour", endpoint: "donation-request", fallback: "contact-request" },
  contact: { base: "incantour", endpoint: "contact-request", fallback: "wedding-request" },
  wedding: { base: "incantour", endpoint: "wedding-request" },
  "lista-nozze": { base: "incantour", endpoint: "lista-nozze-request", fallback: "wedding-request" },
  group: { base: "incantour", endpoint: "group-request", fallback: "wedding-request" },
  roots: { base: "incantour", endpoint: "roots-request", fallback: "wedding-request" },
  "custom-trip": { base: "incantour", endpoint: "custom-trip-request", fallback: "wedding-request" },
} as const;

type FormName = keyof typeof formTargets;

function isFormName(value: string): value is FormName {
  return value in formTargets;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ form: string }> }
) {
  const { form } = await params;
  if (!isFormName(form)) {
    return NextResponse.json({ error: "Unknown form." }, { status: 404 });
  }

  const rawBody = await request.text();
  if (rawBody.length > 100_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let forwardBody = rawBody;

  // Server-side validation & spam protection for contact form
  if (form === "contact") {
    try {
      const data = JSON.parse(rawBody);

      // Honeypot spam check (silently accept bot submissions)
      if (data.website || data.hp_check || data.honeypot) {
        return NextResponse.json({ success: true, message: "Richiesta ricevuta." }, { status: 200 });
      }

      const errors: Record<string, string> = {};
      const name = typeof data.name === "string" ? data.name.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim() : "";
      const phone = typeof data.phone === "string" ? data.phone.trim() : "";
      const subject = typeof data.subject === "string" ? data.subject.trim() : "";
      const details =
        typeof data.details === "string"
          ? data.details.trim()
          : typeof data.message === "string"
          ? data.message.trim()
          : "";

      if (!name) {
        errors.name = "Il nome completo è obbligatorio.";
      }
      if (!email) {
        errors.email = "L'indirizzo email è obbligatorio.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Inserisci un indirizzo email valido.";
      }
      if (!phone) {
        errors.phone = "Il recapito telefonico è obbligatorio.";
      }
      if (!subject) {
        errors.subject = "L'oggetto della richiesta è obbligatorio.";
      }
      if (!details) {
        errors.details = "Il messaggio è obbligatorio.";
      }

      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          {
            error: "Alcuni campi obbligatori mancano o non sono validi.",
            errors,
          },
          { status: 400 }
        );
      }

      forwardBody = JSON.stringify({
        name,
        email,
        phone,
        subject,
        details,
        service: data.service || "Contatti General Inquiry",
      });
    } catch {
      return NextResponse.json({ error: "Dati richiesta non validi." }, { status: 400 });
    }
  }

  // Server-side validation & spam protection for booking form
  if (form === "booking") {
    try {
      const data = JSON.parse(rawBody);

      // Honeypot spam check (silently accept bot submissions)
      if (data.website || data.hp_check || data.honeypot) {
        return NextResponse.json({ success: true, message: "Prenotazione ricevuta." }, { status: 200 });
      }

      const errors: Record<string, string> = {};
      const name = typeof data.name === "string" ? data.name.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim() : "";
      const tour = data.tour ? String(data.tour).trim() : "";
      const date = typeof data.date === "string" ? data.date.trim() : "";
      const quantityRaw = data.quantity;
      const quantity = parseInt(String(quantityRaw), 10);
      const totalRaw = data.total;
      const total = typeof totalRaw === "string" ? totalRaw.replace(/[^0-9.]/g, "") : String(totalRaw || "0");
      const message = typeof data.message === "string" ? data.message.trim() : "";

      if (!name) {
        errors.name = "Il nome completo è obbligatorio.";
      }
      if (!email) {
        errors.email = "L'indirizzo email è obbligatorio.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Inserisci un indirizzo email valido.";
      }
      if (!tour) {
        errors.tour = "Seleziona un tour valido.";
      }
      if (!date) {
        errors.date = "Seleziona una data per il tour.";
      }
      if (isNaN(quantity) || quantity < 1 || quantity > 50) {
        errors.quantity = "Il numero di partecipanti deve essere compreso tra 1 e 50.";
      }

      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          {
            error: "Alcuni campi obbligatori mancano o non sono validi.",
            errors,
          },
          { status: 400 }
        );
      }

      forwardBody = JSON.stringify({
        name,
        email,
        tour,
        date,
        quantity,
        total,
        message,
      });
    } catch {
      return NextResponse.json({ error: "Dati richiesta non validi." }, { status: 400 });
    }
  }

  // Server-side validation & spam protection for gift-voucher form
  if (form === "gift-voucher") {
    try {
      const data = JSON.parse(rawBody);

      // Honeypot spam check (silently accept bot submissions)
      if (data.website || data.hp_check || data.honeypot) {
        return NextResponse.json(
          { success: true, message: "Richiesta voucher ricevuta." },
          { status: 200 }
        );
      }

      const errors: Record<string, string> = {};
      const value = parseInt(String(data.value), 10);
      const firstName = typeof data.first_name === "string" ? data.first_name.trim() : "";
      const lastName = typeof data.last_name === "string" ? data.last_name.trim() : "";
      const dob = typeof data.dob === "string" ? data.dob.trim() : "";
      const phone = typeof data.phone === "string" ? data.phone.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim() : "";
      const occasion = typeof data.occasion === "string" ? data.occasion.trim() : "";
      const message = typeof data.message === "string" ? data.message.trim() : "";

      if (isNaN(value) || value < 50) {
        errors.value = "L'importo minimo per un voucher regalo è di 50€.";
      }
      if (!firstName) {
        errors.first_name = "Il nome del beneficiario è obbligatorio.";
      }
      if (!lastName) {
        errors.last_name = "Il cognome del beneficiario è obbligatorio.";
      }
      if (!dob) {
        errors.dob = "La data di nascita del beneficiario è obbligatoria.";
      }
      if (!phone) {
        errors.phone = "Il recapito telefonico è obbligatorio.";
      }
      if (!email) {
        errors.email = "L'indirizzo email del beneficiario è obbligatorio.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Inserisci un indirizzo email valido.";
      }
      if (!occasion) {
        errors.occasion = "Seleziona un'occasione per il regalo.";
      }
      if (!message) {
        errors.message = "La dedica o messaggio personale è obbligatoria.";
      } else if (message.length > 250) {
        errors.message = "La dedica non può superare i 250 caratteri.";
      }

      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          {
            error: "Alcuni campi obbligatori mancano o non sono validi.",
            errors,
          },
          { status: 400 }
        );
      }

      forwardBody = JSON.stringify({
        value,
        first_name: firstName,
        last_name: lastName,
        dob,
        phone,
        email,
        occasion,
        message,
        payment_method_id: typeof data.payment_method_id === "string" ? data.payment_method_id : undefined,
      });
    } catch {
      return NextResponse.json({ error: "Dati richiesta voucher non validi." }, { status: 400 });
    }
  }

  // Server-side validation & spam protection for donation form
  if (form === "donation") {
    try {
      const data = JSON.parse(rawBody);

      // Honeypot spam check (silently accept bot submissions)
      if (data.website || data.hp_check || data.honeypot) {
        return NextResponse.json(
          { success: true, message: "Donazione registrata con successo." },
          { status: 200 }
        );
      }

      const errors: Record<string, string> = {};
      const name = typeof data.name === "string" ? data.name.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim() : "";
      const phone = typeof data.phone === "string" ? data.phone.trim() : "";
      const amount = parseFloat(String(data.amount));
      const frequency =
        data.frequency === "mensile" || data.frequency === "monthly" ? "mensile" : "una-tantum";
      const cause = typeof data.cause === "string" ? data.cause.trim() : "Supporto Generale";
      const message = typeof data.message === "string" ? data.message.trim() : "";

      if (!name) {
        errors.name = "Il nome completo o ragione sociale è obbligatorio.";
      }
      if (!email) {
        errors.email = "L'indirizzo email per la ricevuta è obbligatorio.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Inserisci un indirizzo email valido.";
      }
      if (isNaN(amount) || amount < 5) {
        errors.amount = "L'importo minimo per una donazione è di 5€.";
      }

      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          {
            error: "Alcuni campi obbligatori mancano o non sono validi.",
            errors,
          },
          { status: 400 }
        );
      }

      forwardBody = JSON.stringify({
        name,
        email,
        phone,
        amount,
        frequency,
        cause,
        message,
        service: "Donazione IncanTour",
        details: `Donazione di €${amount.toFixed(2)} (${frequency === "mensile" ? "Mensile" : "Una tantum"}). Causa: ${cause}. Note: ${message || "Nessuna"}.`,
      });
    } catch {
      return NextResponse.json({ error: "Dati donazione non validi." }, { status: 400 });
    }
  }

  // Server-side validation & spam protection for custom-trip (Disegna il Tuo Viaggio) form
  if (form === "custom-trip") {
    try {
      const data = JSON.parse(rawBody);

      // Honeypot spam check (silently accept bot submissions)
      if (data.website || data.hp_check || data.honeypot) {
        return NextResponse.json(
          { success: true, message: "Richiesta ricevuta con successo." },
          { status: 200 }
        );
      }

      const errors: Record<string, string> = {};
      const tripType = data.trip_type === "outgoing" ? "outgoing" : "incoming";
      const firstName = typeof data.first_name === "string" ? data.first_name.trim() : (typeof data.name === "string" ? data.name.trim() : "");
      const lastName = typeof data.last_name === "string" ? data.last_name.trim() : "";
      const address = typeof data.address === "string" ? data.address.trim() : "";
      const city = typeof data.city === "string" ? data.city.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim() : "";
      const phone = typeof data.phone === "string" ? data.phone.trim() : "";

      if (!firstName) {
        errors.first_name = "Il nome è obbligatorio.";
      }
      if (!lastName) {
        errors.last_name = "Il cognome è obbligatorio.";
      }
      if (!email) {
        errors.email = "L'indirizzo email è obbligatorio.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Inserisci un indirizzo email valido.";
      }
      if (!phone) {
        errors.phone = "Il recapito telefonico è obbligatorio.";
      }
      if (!data.privacy_accepted && !data.privacy) {
        errors.privacy = "È necessario confermare il consenso al trattamento dei dati personali.";
      }

      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          {
            error: "Alcuni campi obbligatori mancano o non sono validi.",
            errors,
          },
          { status: 400 }
        );
      }

      const detailsLines = [
        `Tipo Richiesta: ${tripType.toUpperCase()}`,
        `Richiedente: ${firstName} ${lastName}`,
        `Indirizzo: ${address || "Non specificato"}, Città: ${city || "Non specificata"}`,
        `Contatti: Email: ${email} | Telefono: ${phone}`,
        `Attese di viaggio: ${data.travel_expectations || "Non specificato"}${data.date_start ? ` (Dal ${data.date_start} al ${data.date_end || "..."})` : ""}`,
        `Tipologia viaggio: ${data.travel_type || "Non specificato"}`,
        `Partenza da: ${data.departure_city || "Non specificata"} | Con: ${data.transport_mode || "Non specificato"}`,
        `Destinazione: ${data.destination || "Non specificata"}${data.other_destination_text ? ` (${data.other_destination_text})` : ""}`,
        `Preferenze: ${Array.isArray(data.preferences) ? data.preferences.join(", ") : (data.preferences || "Nessuna")}`,
      ];

      if (tripType === "outgoing") {
        if (data.when_option) detailsLines.push(`Quando: ${data.when_option}`);
        if (data.accommodation) detailsLines.push(`Alloggio desiderato: ${data.accommodation}`);
        if (data.budget_type) {
          detailsLines.push(
            `Budget: ${data.budget_type === "more_than" ? `Più di €${data.budget_more_than || 0}` : `Da €${data.budget_min || 0} a €${data.budget_max || 0}`}`
          );
        }
      }

      if (data.notes) {
        detailsLines.push(`Note/Richieste aggiuntive: ${data.notes}`);
      }

      forwardBody = JSON.stringify({
        ...data,
        trip_type: tripType,
        name: `${firstName} ${lastName}`.trim(),
        first_name: firstName,
        last_name: lastName,
        address,
        city,
        email,
        phone,
        privacy_accepted: true,
        service: `Disegna il Tuo Viaggio (${tripType.toUpperCase()})`,
        details: detailsLines.join("\n"),
      });
    } catch {
      return NextResponse.json({ error: "Dati richiesta viaggio su misura non validi." }, { status: 400 });
    }
  }

  const target = formTargets[form];
  const base =
    target.base === "tourism"
      ? getCustomApiBase()
      : `${getWordPressUrl()}/wp-json/incantour/v1`;

  try {
    let response = await fetch(`${base}/${target.endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: forwardBody,
      cache: "no-store",
    });

    // If endpoint fails and there is a fallback defined (e.g. roots or contact -> wedding-request)
    if (!response.ok && "fallback" in target && target.fallback) {
      console.warn(`Primary endpoint ${target.endpoint} failed with ${response.status}, trying fallback ${target.fallback}`);
      response = await fetch(`${base}/${target.fallback}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: forwardBody,
        cache: "no-store",
      });
    }

    const payload = await response.text();
    return new NextResponse(payload, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("content-type") ?? "application/json" },
    });
  } catch (error) {
    console.error(`Unable to submit ${form} form`, error);
    return NextResponse.json(
      { error: "The form service is temporarily unavailable." },
      { status: 502 }
    );
  }
}
