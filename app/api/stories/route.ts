import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

// GET all published shows
export async function GET() {
  try {
    console.log("[v0] Fetching shows from database...");
    const shows = await sql`
      SELECT * FROM stories WHERE published = true ORDER BY created_at DESC
    `;
    console.log("[v0] Shows fetched successfully:", shows.length);
    return NextResponse.json(shows);
  } catch (error) {
    console.error("[v0] Shows API error details:", {
      message: error instanceof Error ? error.message : String(error),
      type: typeof error,
    });
    return NextResponse.json(
      { error: "Failed to fetch shows. Please run /api/init-db" },
      { status: 500 }
    );
  }
}

// POST create new show
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      author,
      excerpt,
      category,
      paragraph1,
      paragraph2,
      paragraph3,
      published,
      created_at,
      updated_at,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    const date = new Date();

    const result = await sql`
      INSERT INTO stories (title,author,
      category,
      excerpt,
      paragraph1,
      paragraph2,
      paragraph3,
      published,
      created_at,
      updated_at) VALUES (${title}, ${author},${category}, ${excerpt}, ${paragraph1}, ${paragraph2}, 
      ${paragraph3}, ${published}, ${date}, ${date})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create show" },
      { status: 500 }
    );
  }
}
