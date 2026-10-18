import { NextRequest, NextResponse } from "next/server";

import { getCustomApiBase, getWordPressUrl } from "@/lib/wordpress/client";

const formTargets = {
  booking: { base: "tourism", endpoint: "submit-booking" },
  "gift-voucher": { base: "tourism", endpoint: "submit-gift-voucher" },
  contact: { base: "incantour", endpoint: "contact-request", fallback: "wedding-request" },
  wedding: { base: "incantour", endpoint: "wedding-request" },
  "lista-nozze": { base: "incantour", endpoint: "lista-nozze-request", fallback: "wedding-request" },
  group: { base: "incantour", endpoint: "group-request", fallback: "wedding-request" },
  roots: { base: "incantour", endpoint: "roots-request", fallback: "wedding-request" },
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
