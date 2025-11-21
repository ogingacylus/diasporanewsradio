//@ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { performServerUpload } from "@/lib/server_upload";
import sql from "@/lib/db";

// Configuration constants
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Simple rate limiting (in production, use Redis or a proper solution)
const uploadAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_UPLOADS_PER_HOUR = 50;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

/**
 * Basic rate limiting implementation
 * @param clientId - Client identifier (usually IP address)
 * @returns true if request is allowed, false if rate limited
 */
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const attempts = uploadAttempts.get(clientId);

  if (!attempts || now > attempts.resetTime) {
    uploadAttempts.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (attempts.count >= MAX_UPLOADS_PER_HOUR) {
    return false;
  }

  attempts.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    console.log("[Upload API] Processing upload request");

    // Extract client IP for rate limiting
    const clientIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Apply rate limiting
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const type = formData.get("type") as string;
    const itemId = formData.get("itemId") as string;
    const fileName = formData.get("fileName") as string;

    // Validate required fields
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size ${(file.size / 1024 / 1024).toFixed(
            1
          )}MB exceeds 20MB limit`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    // Validate file type
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `File type ${
            file.type
          } not supported. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    console.log("[Upload API] File validation passed:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      userId,
    });

    // Generate unique filename if not provided
    const fileId = uuidv4();
    const fileExtension = fileName
      ? fileName.split(".").pop() || "bin"
      : file.name
      ? file.name.split(".").pop() || "bin"
      : "bin";
    const uniqueFileName = `${fileId}.${fileExtension}`;

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    console.log("[Upload API] Starting server upload");

    // Perform upload
    const uploadResult = await performServerUpload(
      fileBuffer,
      userId,
      uniqueFileName,
      file.type || "application/octet-stream"
    );

    if (!uploadResult.success) {
      return NextResponse.json(
        {
          error: "Upload failed",
          details: uploadResult.error,
        },
        { status: 500 }
      );
    }
    // Update db
    if (type === "event") {
      await sql`UPDATE events SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }

    if (type === "news") {
      await sql`UPDATE news SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }

    if (type === "shows") {
      await sql`UPDATE shows SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }
    if (type === "testimonials") {
      await sql`UPDATE testimonials SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }

    if (type === "stories") {
      await sql`UPDATE stories SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }

    if (type === "media") {
      await sql`UPDATE media SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }

    if (type === "marketing") {
      await sql`UPDATE marketing SET image_url=${String(
        uploadResult.gcsUri
      )} WHERE id=${Number(itemId)}`;
    }
    // Return success response
    return NextResponse.json({
      success: true,
      fileId: uploadResult.fileId,
      fileName: uniqueFileName,
      gcsUri: uploadResult.gcsUri,
      message: "File uploaded successfully",
    });
  } catch (error: any) {
    const errorId = uuidv4().slice(0, 8);
    console.error("[Upload API] Upload failed:", {
      error: error.message,
      errorId,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "Upload failed",
        details: error.message,
        errorId,
      },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
