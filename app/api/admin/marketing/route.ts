import sql from "@/lib/db";
import { NextResponse } from "next/server";

// GET all news (including unpublished for admin)
export async function GET() {
  try {
    const news = await sql`SELECT * FROM marketing ORDER BY created_at DESC`;
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
