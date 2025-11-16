import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testimonials = await sql`
      SELECT * FROM testimonials ORDER BY created_at DESC
    `;
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
