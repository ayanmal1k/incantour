import { NextRequest, NextResponse } from "next/server";

import { getCustomApiBase, getWordPressUrl } from "@/lib/wordpress/client";

const formTargets = {
  booking: { base: "tourism", endpoint: "submit-booking" },
  "gift-voucher": { base: "tourism", endpoint: "submit-gift-voucher" },
  contact: { base: "incantour", endpoint: "contact-request", fallback: "wedding-request" },
  wedding: { base: "incantour", endpoint: "wedding-request" },
  group: { base: "incantour", endpoint: "group-request" },
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

  const body = await request.text();
  if (body.length > 100_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
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
      body,
      cache: "no-store",
    });

    // If endpoint fails and there is a fallback defined (e.g. roots or contact -> wedding-request)
    if (!response.ok && "fallback" in target && target.fallback) {
      console.warn(`Primary endpoint ${target.endpoint} failed with ${response.status}, trying fallback ${target.fallback}`);
      response = await fetch(`${base}/${target.fallback}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body,
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
