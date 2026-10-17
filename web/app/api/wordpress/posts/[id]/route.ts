import { NextRequest, NextResponse } from "next/server";

import { getPostById } from "@/lib/wordpress/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Unable to load WordPress post detail", error);
    return NextResponse.json({ error: "Post details are temporarily unavailable." }, { status: 502 });
  }
}
