import { NextResponse } from "next/server";

import { getTours } from "@/lib/wordpress/client";

export async function GET() {
  try {
    return NextResponse.json(await getTours());
  } catch (error) {
    console.error("Unable to load WordPress tours", error);
    return NextResponse.json({ error: "Tour content is temporarily unavailable." }, { status: 502 });
  }
}
