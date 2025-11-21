import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    console.log("dsad", param);
    const id: any = Number.parseInt(param.id);

    await sql`DELETE FROM marketing WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete news" },
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
    const {
      title,
      category,
      description,
      location,
      phone,
      website,
      premium,
      published,
    } = body;
    await sql`UPDATE marketing SET title=${title}, category=${category}, description=${description},
    location=${location}, phone=${phone}, website=${website}, premium=${premium}, published=${published} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
