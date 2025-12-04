import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { fetchAdiceById } from "@/lib/client-data/data";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import AdvicesDetail from "@/components/page-components/advice-details";

export default async function AdvicesDetailPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const id = params.id;
  const advice = await fetchAdiceById(id);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <AdvicesDetail article={advice} />
      </Suspense>
      <Footer />
    </div>
  );
}
