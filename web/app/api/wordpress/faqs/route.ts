import { NextResponse } from "next/server";

import { getFaqs } from "@/lib/wordpress/client";

export async function GET() {
  try {
    const faqs = await getFaqs();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Unable to load WordPress FAQs", error);
    return NextResponse.json({ error: "FAQs are temporarily unavailable." }, { status: 502 });
  }
}
