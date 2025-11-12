import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("[v0] Fetching news from database...")
    const news = await sql("SELECT * FROM news WHERE published = true ORDER BY published_at DESC LIMIT 50")
    console.log("[v0] News fetched successfully:", news.length)
    return NextResponse.json(news)
  } catch (error) {
    console.error("[v0] News API error details:", {
      message: error instanceof Error ? error.message : String(error),
      type: typeof error,
    })
    return NextResponse.json({ error: "Failed to fetch news. Please run /api/init-db" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, category } = body

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    const result = await sql(
      "INSERT INTO news (title, slug, description, image_url, category, published, published_at) VALUES ($1, $2, $3, $4, $5, true, CURRENT_TIMESTAMP) RETURNING *",
      [title, slug, description, image_url, category],
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] News POST error:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
