import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);
    await sql`DELETE FROM shows WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete show" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);

    const body = await request.json();
    const { title, description, host, schedule, genre, published } = body;
    await sql`UPDATE shows SET title=${title}, description=${description}, host=${host}, 
      schedule=${schedule}, genre=${genre}, published=${published} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
