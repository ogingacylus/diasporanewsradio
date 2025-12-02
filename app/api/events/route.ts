import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

// GET all published events
export async function GET() {
  try {
    console.log("[v0] Fetching events from database...");
    const events = await sql`
      SELECT * FROM events WHERE published = true ORDER BY date DESC
    `;

    return NextResponse.json(events);
  } catch (error) {
    console.error("[v0] Events API error details:", {
      message: error instanceof Error ? error.message : String(error),
      type: typeof error,
    });
    return NextResponse.json(
      { error: "Failed to fetch events. Please run /api/init-db" },
      { status: 500 }
    );
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      image_url,
      date,
      location,
      ticket_url,
      published,
      edit,
    } = body;

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Title, description, and date are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const result = await sql`
      INSERT INTO events (title, slug, description, image_url, 
      date, location, ticket_url, published) VALUES 
      (${title}, ${slug}, ${description}, ${image_url}, ${date},
       ${location}, ${ticket_url}, ${published})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
