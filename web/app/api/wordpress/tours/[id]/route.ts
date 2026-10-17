import { NextRequest, NextResponse } from "next/server";

import { getTourById } from "@/lib/wordpress/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tour = await getTourById(id);
    if (!tour) {
      return NextResponse.json({ error: "Tour not found." }, { status: 404 });
    }
    return NextResponse.json(tour);
  } catch (error) {
    console.error("Unable to load WordPress tour detail", error);
    return NextResponse.json({ error: "Tour details are temporarily unavailable." }, { status: 502 });
  }
}
