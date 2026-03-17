import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[v0] Fetching news from database...");
    const news =
      await sql`SELECT * FROM news WHERE published = true ORDER BY published_at DESC LIMIT 50
    `;

    return NextResponse.json(news);
  } catch (error) {
    console.error("[v0] News API error details:", {
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
    const { title, author, description, published, category, paragraphs } =
      body;

    const timeNow = new Date();
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    const para = JSON.stringify(paragraphs);
    const result = await sql`
      INSERT INTO health (title, author, published, paragraphs) VALUES (${title}, ${author},  ${published}, ${para})
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
