import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const id = Number.parseInt(param.id);
    await sql`DELETE FROM testimonials WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
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
    console.log(param);
    const body = await request.json();
    const { author_name, role, content, rating, published } = body;
    await sql`UPDATE testimonials SET author_name=${author_name}, role=${role},
     content=${content}, rating=${rating}, published=${published} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
