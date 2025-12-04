import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);
    await sql`DELETE FROM news WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
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
    const { title, author, description, published, category } = body;
    await sql`UPDATE news SET title=${title}, author=${author} , description=${description},
     category=${category}, published=${published} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
