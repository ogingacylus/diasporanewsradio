import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);
    await sql`DELETE FROM events WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
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
      description,
      image_url,
      date,
      location,
      ticket_url,
      published,
      edit,
    } = body;
    await sql`UPDATE events SET title=${title}, description=${description}, image_url=${image_url},
    date=${date}, location=${location}, ticket_url=${ticket_url}, published=${published} WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
