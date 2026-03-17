import sql from "../db";

export async function fetchShows() {
  try {
    const data = await sql`SELECT * FROM SHOWS ORDER BY created_at DESC`;
    const showsData = data.map((item: any, index: number) => ({
      ...item,
      paragraphs: JSON.parse(item.paragraphs),
    }));
    return showsData;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchHealth() {
  try {
    const data = await sql`SELECT * FROM health ORDER BY created_at DESC`;
    const healthData = data.map((item: any, index: number) => ({
      ...item,
      paragraphs: JSON.parse(item.paragraphs),
    }));
    return healthData;
  } catch (error) {
    console.log(error);
  }
}
