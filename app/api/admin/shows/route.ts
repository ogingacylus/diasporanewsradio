import sql from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const shows = await sql`SELECT * FROM shows ORDER BY created_at DESC`;
    const showsData = shows.map((item: any, index: number) => ({
      ...item,
      paragraphs: JSON.parse(item.paragraphs),
    }));

    return NextResponse.json(showsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 },
    );
  }
}
