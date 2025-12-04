import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { fetchEventsById } from "@/lib/client-data/data";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import EventDetail from "@/components/page-components/event-details";

export default async function ShowDetail(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const id = params.id;
  const event = await fetchEventsById(id);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <EventDetail event={event} />
      </Suspense>
      <Footer />
    </div>
  );
}
