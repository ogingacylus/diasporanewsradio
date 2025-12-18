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

export async function createHealthItem(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const description = formData.get("description") as string;
  const published = formData.get("published");

  const isPublished = published ? true : false;

  try {
    await sql`INSERT INTO health (title, author, description, published) VALUES (${title}, ${author}, ${description}, ${isPublished})`;
    revalidatePath("/admin/health-coner");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function updateHealthItem(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const description = formData.get("description") as string;
  const published = formData.get("published");

  const isPublished = published ? true : false;

  try {
    await sql`UPDATE health SET title=${title}, author=${author}, description=${description}, published=${isPublished} WHERE id=${Number(
      id
    )}`;
    revalidatePath("/admin/health-coner");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function deleteHealth(id: number) {
  try {
    await sql`DELETE FROM health WHERE id=${Number(id)}`;
    revalidatePath("/admin/health-coner");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function revalidateAdminPath(path: string) {
  revalidatePath(`/admin/${path}`);
}
