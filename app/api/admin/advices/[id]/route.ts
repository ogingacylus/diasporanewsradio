import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);
    await sql`DELETE FROM advices WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);

    const body = await request.json();
    const { title, content, published, paragraphs } = body;
    const content_ = "";
    const para = JSON.stringify(paragraphs);

    await sql`UPDATE advices SET title=${title}, content=${content_}, published=${published}, paragraphs=${para} WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
