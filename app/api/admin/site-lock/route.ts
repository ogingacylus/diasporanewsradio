import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getSiteLocked, setSiteLocked } from "@/lib/site-settings";

function isAdminRequest(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) {
    return false;
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    return typeof payload === "object" && payload !== null && "id" in payload;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ locked: await getSiteLocked() });
  } catch (error) {
    console.error("Failed to load site lock status:", error);
    return NextResponse.json(
      { error: "Failed to load site lock status" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("locked" in body) ||
    typeof body.locked !== "boolean"
  ) {
    return NextResponse.json(
      { error: "A boolean locked value is required" },
      { status: 400 }
    );
  }

  try {
    const locked = await setSiteLocked(body.locked);
    return NextResponse.json({ locked });
  } catch (error) {
    console.error("Failed to update site lock status:", error);
    return NextResponse.json(
      { error: "Failed to update site lock status" },
      { status: 500 }
    );
  }
}
