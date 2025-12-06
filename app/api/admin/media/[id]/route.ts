import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;

    const id: any = Number.parseInt(param.id);

    await sql`DELETE FROM media WHERE id = ${id}`;
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
    const { title, published } = body;
    await sql`UPDATE media SET title=${title}, published=${published} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
