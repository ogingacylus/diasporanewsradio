import sql from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const stories = await sql`SELECT * FROM adverts ORDER BY created_at DESC`;
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 }
    );
  }
}
