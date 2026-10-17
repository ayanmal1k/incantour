import { NextRequest, NextResponse } from "next/server";

import { getPosts } from "@/lib/wordpress/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get("per_page") || "12");
    const page = Number(searchParams.get("page") || "1");
    const posts = await getPosts(perPage, page);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Unable to load WordPress posts", error);
    return NextResponse.json({ error: "Editorial content is temporarily unavailable." }, { status: 502 });
  }
}
