import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await sql("DELETE FROM shows WHERE id = $1", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete show" }, { status: 500 })
  }
}
