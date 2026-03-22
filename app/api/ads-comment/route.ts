import sql from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {name, message} = body;


        const date = new Date();

        const result = await sql`
            INSERT INTO ads_comments (name, message,
                                      created_at)
            VALUES (${name}, ${message},
                    ${date})
        `;

        return NextResponse.json({success: true}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error: "Failed to create show"},
            {status: 500}
        );
    }
}
