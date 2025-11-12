import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/request"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await sql("DELETE FROM news WHERE id = $1", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}
