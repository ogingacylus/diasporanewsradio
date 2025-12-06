import Shows from "@/components/page-components/shows";
import { fetchShows } from "@/lib/client-data/data";
import { Loader } from "@/components/loader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function AllShows() {
  const shows = await fetchShows();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Shows shows={shows} />
      </Suspense>
      <Footer />
    </div>
  );
}
