import sql from "@/lib/db";
import { createAdmin } from "@/lib/auth";

async function seedUsers() {
  const email = "henryomosh7@gmail.com";
  const password = "Invalid@68";
  const name = "Henry Omondi";
  const user = await createAdmin(email, password, name);
  console.log(user);

  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await sql`
  // CREATE TABLE IF NOT EXISTS users (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     role VARCHAR(50) NOT NULL,
  //     email VARCHAR(255) NOT NULL,
  //     password_hash VARCHAR(255) NOT NULL,
  //     name VARCHAR(255) NOT NULL,
  //     created TIMESTAMPTZ NOT NULL
  //   );
  // `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [seedUsers()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
