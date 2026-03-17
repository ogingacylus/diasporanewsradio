import sql from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await sql`SELECT * FROM advices ORDER BY created_at DESC`;

    const data = events.map((item: any, index: number) => ({
      ...item,
      paragraphs: JSON.parse(item.paragraphs),
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
