import sql from "../db";

export async function fetchShows() {
  try {
    const data = await sql`SELECT * FROM SHOWS ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}
