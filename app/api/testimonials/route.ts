import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET all published testimonials
export async function GET() {
  try {
    console.log("[v0] Fetching testimonials from database...")
    const testimonials = await sql("SELECT * FROM testimonials WHERE published = true ORDER BY created_at DESC")
    console.log("[v0] Testimonials fetched successfully:", testimonials.length)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("[v0] Testimonials API error details:", {
      message: error instanceof Error ? error.message : String(error),
      type: typeof error,
    })
    return NextResponse.json({ error: "Failed to fetch testimonials. Please run /api/init-db" }, { status: 500 })
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { author_name, role, content, rating, image_url } = body

    if (!author_name || !content) {
      return NextResponse.json({ error: "Author name and content are required" }, { status: 400 })
    }

    const result = await sql(
      "INSERT INTO testimonials (author_name, role, content, rating, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [author_name, role, content, rating, image_url],
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
