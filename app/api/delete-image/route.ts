import { Storage } from "@google-cloud/storage";
import sql from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64!, "base64").toString()
);
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const body = await request.json();
    const imgUrl1 = String(body?.imageUrl).split("omondi_app_storage/");
    const itemId = body?.itemId;
    const type = body?.type;

    const bucketName: any = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

    await storage.bucket(bucketName).file(imgUrl1[1]).delete();

    if (type === "event") {
      await sql`UPDATE events SET image_url=${null} WHERE id=${itemId}`;
    }

    if (type === "news") {
      await sql`UPDATE news SET image_url=${null} WHERE id=${itemId}`;
    }

    if (type === "shows") {
      await sql`UPDATE shows SET image_url=${null} WHERE id=${itemId}`;
    }

    if (type === "testimonials") {
      await sql`UPDATE testimonials SET image_url=${null} WHERE id=${itemId}`;
    }
    NextResponse.json({ message: `deleted.` });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
