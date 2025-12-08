import sql from "../db";

export async function fetchHomeNews() {
  try {
    const data =
      await sql`SELECT * FROM news WHERE published=true ORDER BY updated_at DESC LIMIT 3 `;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchHomeEvents() {
  try {
    const data =
      await sql`SELECT * FROM events WHERE published=true ORDER BY created_at DESC LIMIT 4 `;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchHomeShows() {
  try {
    const data =
      await sql`SELECT * FROM shows WHERE published=true ORDER BY created_at DESC LIMIT 4 `;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchHomeTestimonials() {
  try {
    const data =
      await sql`SELECT * FROM testimonials WHERE published=true ORDER BY created_at DESC LIMIT 3 `;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchShows() {
  try {
    const data =
      await sql`SELECT * FROM shows WHERE published=true ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchShowById(id: number) {
  try {
    const data =
      await sql`SELECT * FROM shows WHERE published=true AND id=${id}`;

    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDetailsShow(id: number) {
  try {
    const shows =
      await sql`SELECT * FROM shows WHERE published=true AND id !=${id} ORDER BY created_at DESC LIMIT 3`;
    return shows;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchNews() {
  try {
    const data =
      await sql`SELECT * FROM news WHERE published=true ORDER BY updated_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchNewsById(id: number) {
  try {
    const data =
      await sql`SELECT * FROM news WHERE published=true AND id=${id}`;
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchEvents() {
  try {
    const data =
      await sql`SELECT * FROM events WHERE published=true ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchEventsById(id: number) {
  try {
    const data =
      await sql`SELECT * FROM events WHERE published=true AND id=${id}`;
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPremiumAds() {
  try {
    const data =
      await sql`SELECT * FROM marketing WHERE published=true AND premium=true ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLocalAds() {
  try {
    const data =
      await sql`SELECT * FROM marketing WHERE published=true AND premium=false ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchStories() {
  try {
    const data =
      await sql`SELECT * FROM stories WHERE published=true ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchStoryById(id: number) {
  try {
    const data =
      await sql`SELECT * FROM stories WHERE published=true AND id=${id}`;
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAdices() {
  try {
    const data =
      await sql`SELECT * FROM advices WHERE published=true ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAdiceById(id: number) {
  try {
    const data =
      await sql`SELECT * FROM advices WHERE published=true AND id=${id}`;
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMedia() {
  try {
    const data =
      await sql`SELECT * FROM media WHERE published=true ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTemplate() {
  try {
    const data =
      await sql`SELECT * FROM news WHERE published=true ORDER BY created_at DESC LIMIT 2 `;
    return data;
  } catch (error) {
    console.log(error);
  }
}
