import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { News } from "@/components/news";
import { fetchNews } from "@/lib/client-data/data";
import { Suspense } from "react";
import { Loader } from "@/components/loader";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await fetchNews();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24">
        <Suspense fallback={<Loader />}>
          <News news_={news} color="dark" />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
