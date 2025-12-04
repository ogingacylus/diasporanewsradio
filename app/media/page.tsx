import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import Photos from "@/components/page-components/media";
import { Suspense } from "react";
import { fetchMedia } from "@/lib/client-data/data";

export default async function PhotosPage() {
  const media = await fetchMedia();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Photos photos={media} />
      </Suspense>
      <Footer />
    </div>
  );
}
