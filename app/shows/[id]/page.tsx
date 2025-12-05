import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { fetchShowById } from "@/lib/client-data/data";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import ShowDetail from "@/components/page-components/show-detail";

export default async function ShowDetailPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const id = params.id;
  const show = await fetchShowById(id);

  if (!show) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center m">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Show Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The show you're looking for doesn't exist.
          </p>
          <Link
            href="/shows"
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return to shows
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <ShowDetail show={show} />
      </Suspense>
      <Footer />
    </div>
  );
}
