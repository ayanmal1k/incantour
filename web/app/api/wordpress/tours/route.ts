import { NextRequest, NextResponse } from "next/server";

import { getTours } from "@/lib/wordpress/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get("per_page") || "12");
    const tours = await getTours(perPage);
    return NextResponse.json(tours);
  } catch (error) {
    console.error("Unable to load WordPress tours", error);
    return NextResponse.json({ error: "Tour content is temporarily unavailable." }, { status: 502 });
  }
}
