import crypto from "crypto"
import { sql } from "./db"

export async function hashPassword(password: string): Promise<string> {
  return crypto.pbkdf2Sync(password, "salt", 1000, 64, "sha512").toString("hex")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = crypto.pbkdf2Sync(password, "salt", 1000, 64, "sha512").toString("hex")
  return passwordHash === hash
}

export async function createAdmin(email: string, password: string, name: string) {
  try {
    const passwordHash = await hashPassword(password)
    const result = await sql(
      "INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name",
      [email, passwordHash, name, "admin"],
    )
    return result[0]
  } catch (error) {
    throw new Error("Failed to create admin user")
  }
}

export async function authenticateAdmin(email: string, password: string) {
  try {
    const result = await sql("SELECT * FROM users WHERE email = $1 AND role = $2", [email, "admin"])

    if (result.length === 0) {
      return null
    }

    const user = result[0]
    const passwordValid = await verifyPassword(password, user.password_hash)

    if (!passwordValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  } catch (error) {
    throw new Error("Authentication failed")
  }
}
