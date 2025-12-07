"use server";

import { revalidatePath } from "next/cache";
import sql from "./db";

export async function deleteItem(id: number, table: string, path: string) {
  try {
    await sql`DELETE FROM shows WHERE id=${Number(id)}`;
    revalidatePath("/admin/shows");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
