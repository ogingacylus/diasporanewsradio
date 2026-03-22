//@ts-nocheck

import sql from "@/lib/db";
import {NextResponse} from "next/server";

export async function seedDatabase() {
    try {
        console.log("[v0] Starting database initialization...");

        // Create tables if they don't exist
        await sql`
            CREATE TABLE IF NOT EXISTS shows
            (
                id
                SERIAL
                PRIMARY
                KEY,
                title
                VARCHAR
            (
                255
            ) NOT NULL,
                slug VARCHAR
            (
                255
            ) UNIQUE,
                description TEXT,
                image_url VARCHAR
            (
                500
            ),
                host VARCHAR
            (
                255
            ),
                schedule VARCHAR
            (
                255
            ),
                genre VARCHAR
            (
                100
            ),
                published BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS news
            (
                id
                SERIAL
                PRIMARY
                KEY,
                title
                VARCHAR
            (
                255
            ) NOT NULL,
                author VARCHAR
            (
                255
            ),
                slug VARCHAR
            (
                255
            ) UNIQUE,
                description TEXT,
                image_url VARCHAR
            (
                500
            ),
                category VARCHAR
            (
                100
            ),
                published BOOLEAN DEFAULT false,
                published_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS events
            (
                id
                SERIAL
                PRIMARY
                KEY,
                title
                VARCHAR
            (
                255
            ) NOT NULL,
                slug VARCHAR
            (
                255
            ) UNIQUE,
                description TEXT,
                image_url VARCHAR
            (
                500
            ),
                date TIMESTAMPTZ,
                location VARCHAR
            (
                255
            ),
                ticket_url VARCHAR
            (
                500
            ),
                published BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS testimonials
            (
                id
                SERIAL
                PRIMARY
                KEY,
                author_name
                VARCHAR
            (
                255
            ) NOT NULL,
                role VARCHAR
            (
                255
            ),
                content TEXT,
                rating INTEGER DEFAULT 5,
                image_url VARCHAR
            (
                500
            ),
                published BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS stories
            (
                id
                SERIAL
                PRIMARY
                KEY,
                title
                VARCHAR
            (
                255
            ) NOT NULL,
                excerpt VARCHAR
            (
                255
            ) NOT NULL,
                author VARCHAR
            (
                255
            ) NOT NULL,
                category VARCHAR
            (
                255
            ) NOT NULL,
                image_url VARCHAR
            (
                500
            ),
                image_url_2 VARCHAR
            (
                500
            ),
                image_url_3 VARCHAR
            (
                500
            ),
                paragraph1 TEXT,
                paragraph2 TEXT,
                paragraph3 TEXT,
                published BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;

        await sql`CREATE TABLE IF NOT EXISTS advices
        (
            id
            SERIAL
            PRIMARY
            KEY,
            title
            VARCHAR
                  (
            255
                  ) NOT NULL,
            content TEXT NOT NULL,
            published BOOLEAN DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`;

        await sql`CREATE TABLE IF NOT EXISTS media
        (
            id
            SERIAL
            PRIMARY
            KEY,
            title
            VARCHAR
                  (
            255
                  ) NOT NULL,
            published BOOLEAN DEFAULT true,
            image_url VARCHAR
                  (
                      500
                  ),
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`;

        await sql`CREATE TABLE IF NOT EXISTS marketing
        (
            id
            SERIAL
            PRIMARY
            KEY,
            title
            VARCHAR
                  (
            255
                  ) NOT NULL,
            category VARCHAR
                  (
                      255
                  ) NOT NULL,
            description VARCHAR
                  (
                      255
                  ) NOT NULL,
            location VARCHAR
                  (
                      255
                  ) NOT NULL,
            phone VARCHAR
                  (
                      255
                  ) NOT NULL,
            website VARCHAR
                  (
                      1000
                  ) NOT NULL,
            premium BOOLEAN DEFAULT true,
            published BOOLEAN DEFAULT true,
            image_url VARCHAR
                  (
                      500
                  ),
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`;

        await sql`CREATE TABLE IF NOT EXISTS visitors
        (
            id
            SERIAL
            PRIMARY
            KEY,
            name
            VARCHAR
                  (
            255
                  ) NOT NULL,
            email VARCHAR
                  (
                      255
                  ) NOT NULL,
            subject TEXT NOT NULL,
            message VARCHAR
                  (
                      255
                  ) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`;

        await sql`CREATE TABLE IF NOT EXISTS adverts
        (
            id
            SERIAL
            PRIMARY
            KEY,
            name
            VARCHAR
                  (
            255
                  ) NOT NULL,
            email VARCHAR
                  (
                      255
                  ) NOT NULL,
            subject TEXT NOT NULL,
            message VARCHAR
                  (
                      255
                  ) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`;

        await sql`
            CREATE TABLE IF NOT EXISTS health
            (
                id
                SERIAL
                PRIMARY
                KEY,
                title
                VARCHAR
            (
                255
            ) NOT NULL,
                author VARCHAR
            (
                255
            ),
                slug VARCHAR
            (
                255
            ) UNIQUE,
                description TEXT,
                image_url VARCHAR
            (
                500
            ),
                category VARCHAR
            (
                100
            ),
                published BOOLEAN DEFAULT false,
                published_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;
        await sql`
            CREATE TABLE IF NOT EXISTS ads_comments
            (
                id
                SERIAL
                PRIMARY
                KEY,
                name
                VARCHAR
            (
                255
            ) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
        `;


        console.log("[v0] Database initialization completed successfully");
        return NextResponse.json({
            success: true,
            message: "Database initialized",
        });
    } catch (error) {
        console.error("[v0] Database initialization error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Initialization failed",
            },
            {status: 500},
        );
    }
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [seedDatabase()]);

        return Response.json({message: "Database seeded successfully"});
    } catch (error) {
        console.log(error);
        return Response.json({error}, {status: 500});
    }
}
