import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { fetchStoryById } from "@/lib/client-data/data";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import StoriesDetail from "@/components/page-components/story-details";

export const dynamic = "force-dynamic";

export default async function StoriesDetailPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const id = params.id;
  const story = await fetchStoryById(id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <StoriesDetail story={story} />
      </Suspense>
      <Footer />
    </div>
  );
}
