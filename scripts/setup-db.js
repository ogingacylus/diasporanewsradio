import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error("DATABASE_URL environment variable is not set")
  process.exit(1)
}

const sql = neon(databaseUrl)

async function initializeDatabase() {
  try {
    console.log("Initializing database schema...")

    // Create tables
    await sql(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        category VARCHAR(100),
        author_id INTEGER REFERENCES users(id),
        published BOOLEAN DEFAULT FALSE,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS shows (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        host VARCHAR(255),
        schedule VARCHAR(255),
        genre VARCHAR(100),
        listeners_count INTEGER DEFAULT 0,
        published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        date TIMESTAMP NOT NULL,
        location VARCHAR(255),
        ticket_url VARCHAR(255),
        published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        content TEXT NOT NULL,
        rating INTEGER,
        image_url VARCHAR(255),
        published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log("Tables created successfully!")

    // Create indexes
    await sql(`
      CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
      CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
      CREATE INDEX IF NOT EXISTS idx_shows_slug ON shows(slug);
      CREATE INDEX IF NOT EXISTS idx_shows_published ON shows(published);
      CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
      CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
      CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);
    `)

    console.log("Indexes created successfully!")
    console.log("Database initialized!")
  } catch (error) {
    console.error("Error initializing database:", error)
    process.exit(1)
  }
}

initializeDatabase()
