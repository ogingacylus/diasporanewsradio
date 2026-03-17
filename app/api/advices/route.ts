import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[v0] Fetching advice from database...");
    const news =
      await sql`SELECT * FROM advices WHERE published = true ORDER BY created_at DESC LIMIT 50
    `;

    return NextResponse.json(news);
  } catch (error) {
    console.error("[v0] advice API error details:", {
      message: error instanceof Error ? error.message : String(error),
      type: typeof error,
    });
    return NextResponse.json(
      { error: "Failed to fetch news. Please run /api/init-db" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, published, paragraphs } = body;

    const timeNow = new Date();
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const para = JSON.stringify(paragraphs);
    const content_ = "";
    const result = await sql`
      INSERT INTO advices (title, content, published, 
      created_at, updated_at, paragraphs) VALUES (${title}, ${content_}, ${published}, ${timeNow} , ${timeNow}, ${para})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[v0] News POST error:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 },
    );
  }
}
