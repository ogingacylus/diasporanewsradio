import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { fetchEvents } from "@/lib/client-data/data";
import Events from "@/components/page-components/events";

export const dynamic = "force-dynamic";

export default async function AllShows() {
  const events = await fetchEvents();

  if (events?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="text-center text-accent font-bold text-2xl py-32 mt-32">
          No shows available. Come back later.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Events events={events} />
      <Footer />
    </div>
  );
}
