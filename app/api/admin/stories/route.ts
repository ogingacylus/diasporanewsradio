import sql from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stories = await sql`SELECT * FROM stories ORDER BY created_at DESC`;
    const data = stories.map((item: any, index: number) => ({
      ...item,
      paragraphs: JSON.parse(item.paragraphs),
    }));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 },
    );
  }
}
