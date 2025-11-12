import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const shows = await sql("SELECT * FROM shows ORDER BY created_at DESC")
    return NextResponse.json(shows)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shows" }, { status: 500 })
  }
}
