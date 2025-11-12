import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET all published events
export async function GET() {
  try {
    console.log("[v0] Fetching events from database...")
    const events = await sql("SELECT * FROM events WHERE published = true ORDER BY date DESC")
    console.log("[v0] Events fetched successfully:", events.length)
    return NextResponse.json(events)
  } catch (error) {
    console.error("[v0] Events API error details:", {
      message: error instanceof Error ? error.message : String(error),
      type: typeof error,
    })
    return NextResponse.json({ error: "Failed to fetch events. Please run /api/init-db" }, { status: 500 })
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, date, location, ticket_url } = body

    if (!title || !description || !date) {
      return NextResponse.json({ error: "Title, description, and date are required" }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    const result = await sql(
      "INSERT INTO events (title, slug, description, image_url, date, location, ticket_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, slug, description, image_url, date, location, ticket_url],
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
