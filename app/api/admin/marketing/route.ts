import sql from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET all news (including unpublished for admin)
export async function GET() {
  try {
    const news = await sql`SELECT *
                               FROM marketing
                               ORDER BY created_at DESC`;
    const newsData = news.map((item: any, index: number) => ({
      ...item,
      paragraphs: JSON.parse(item.paragraphs),
    }));
    return NextResponse.json(newsData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
