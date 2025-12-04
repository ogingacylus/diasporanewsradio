import { Loader } from "@/components/loader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { fetchAdices } from "@/lib/client-data/data";
import Advices from "@/components/page-components/advice";

export default async function AdvicesPage() {
  const advices = await fetchAdices();
  return (
    <div className="min-h-screen bg-background pt-24">
      <Navigation />
      <Suspense fallback={<Loader />}></Suspense>
      <Advices advices={advices} />
      <Footer />
    </div>
  );
}
