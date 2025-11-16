// In app/api/read-file/[fileName]/route.js (example)
import { Storage } from "@google-cloud/storage";
import { NextResponse, NextRequest } from "next/server";

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64!, "base64").toString()
);
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials,
});

export async function GET(request: NextRequest) {
  const fileName =
    "user_IMG/2025-11-14/53f1d900-0bc9-4063-a39e-bd47a0476349.jpeg";
  const bucketName: any = process.env.GOOGLE_CLOUD_STORAGE_BUCKET; // Replace with your bucket name
  const gcsUri =
    "gs://omondi_app_storage/user_IMG/2025-11-14/53f1d900-0bc9-4063-a39e-bd47a0476349.jpeg";

  try {
    const file = storage.bucket(bucketName).file(fileName);
    const [fileContents] = await file.download();
    const [metadata] = await file.getMetadata(); // Get metadata for content type, size etc.

    const readStream: any = file.createReadStream();
    console.log(fileContents);

    return new NextResponse(readStream as any, {
      status: 200,
      headers: new Headers({
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Content-Length": metadata.size?.toString() || "0",
        "Cache-Control": "public, max-age=31536000, immutable", // Example caching headers
      }),
    });
  } catch (error) {
    console.error("Error reading file from GCS:", error);
    return new NextResponse("File not found or error reading file.", {
      status: 404,
    });
  }
}
