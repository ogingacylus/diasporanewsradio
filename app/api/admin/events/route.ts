import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events =
      await sql`SELECT id, title, slug, description, image_url, TO_CHAR(date, 'YYYY-MM-DD"T"HH24:MI') as date, location, ticket_url, published, created_at, updated_at FROM events ORDER BY created_at DESC`;

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
