import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);
    await sql`DELETE FROM stories WHERE id = ${id}`;
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
    const {
      title,
      author,
      excerpt,
      category,
      paragraph1,
      paragraph2,
      paragraph3,
      published,
      created_at,
      updated_at,
    } = body;
    await sql`UPDATE stories SET title=${title}, excerpt=${excerpt}, author=${author}, category=${category}, 
    paragraph1=${paragraph1}, paragraph2=${paragraph2}, paragraph3=${paragraph3}, updated_at=${new Date()}, published=${published} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
