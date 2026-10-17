import { NextResponse } from "next/server";

import { getPosts } from "@/lib/wordpress/client";

export async function GET() {
  try {
    return NextResponse.json(await getPosts());
  } catch (error) {
    console.error("Unable to load WordPress posts", error);
    return NextResponse.json({ error: "Editorial content is temporarily unavailable." }, { status: 502 });
  }
}
