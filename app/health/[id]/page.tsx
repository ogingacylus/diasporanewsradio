import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { fetchHealthById } from "@/lib/client-data/data";
import NeswsDetail from "@/components/page-components/news-details";
import { Loader } from "@/components/loader";
import { Suspense } from "react";
import HealthDetail from "@/components/page-components/health-details";

export const dynamic = "force-dynamic";

export default async function HealthDetailPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const id = params.id;

  const news = await fetchHealthById(id);
  if (!news) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/news"
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            View All
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
        <HealthDetail article={news} />
      </Suspense>
      <Footer />
    </div>
  );
}
