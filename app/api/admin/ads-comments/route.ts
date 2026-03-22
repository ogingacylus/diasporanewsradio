import sql from "@/lib/db";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await sql`SELECT *
                               FROM ads_comments
                               ORDER BY created_at DESC`;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch shows"},
            {status: 500}
        );
    }
}
