import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

// GET all published shows
export async function GET() {
  try {
    console.log("[v0] Fetching shows from database...");
    const shows = await sql`
      SELECT * FROM shows WHERE published = true ORDER BY title
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
    const { title, description, host, schedule, genre, published } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const result = await sql`
      INSERT INTO shows (title, slug, description, host, 
      schedule, genre, published) VALUES (${title}, ${slug}, ${description},
       ${host}, ${schedule}, ${genre}, ${published})
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
