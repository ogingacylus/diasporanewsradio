import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { fetchNews } from "@/lib/client-data/data";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import { Health } from "@/components/page-components/health";
import { fetchHealth } from "@/lib/admin-data/data";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const health = await fetchHealth();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24">
        <Suspense fallback={<Loader />}>
          <Health news_={health} color="dark" />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
