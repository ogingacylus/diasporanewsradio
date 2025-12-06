import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import Stories from "@/components/page-components/stories";
import { fetchStories } from "@/lib/client-data/data";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const stories = await fetchStories();

  return (
    <div className="min-h-screen bg-background pt-24 ">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Stories stories={stories} />
      </Suspense>
      <Footer />
    </div>
  );
}
