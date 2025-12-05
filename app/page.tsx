import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { LiveStream } from "@/components/live-stream";
import { EventsCarousel } from "@/components/events-carousel";
import { News } from "@/components/news";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { Shows } from "@/components/shows";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { TopNav } from "@/components/top-nav";
import {
  fetchHomeNews,
  fetchHomeEvents,
  fetchHomeShows,
  fetchHomeTestimonials,
} from "@/lib/client-data/data";
import Wrapper from "@/components/wrapper";
import { Suspense } from "react";

export default async function Home() {
  const news = await fetchHomeNews();
  const events = await fetchHomeEvents();
  const shows = await fetchHomeShows();
  const testimonials = await fetchHomeTestimonials();

  return (
    <div className="min-h-screen bg-indigo-700">
      <Suspense
        fallback={
          <Wrapper
            title="Upcoming Events"
            description="Don't miss our exciting radio events_ and live performances"
            loadMessage="events"
          />
        }
      >
        <EventsCarousel events_={events} />
      </Suspense>
      {/* <Hero /> */}
      <Suspense
        fallback={
          <Wrapper
            title="Featured Shows"
            description="Discover our carefully curated programming from industry-leading
            hosts"
            loadMessage="Shows"
          />
        }
      >
        <Shows shows_={shows} />
      </Suspense>
      <Suspense
        fallback={
          <Wrapper
            title="Latest Updates"
            description="Stay connected with the latest news and announcements from Diaspora
            News Radio"
            loadMessage="News"
          />
        }
      >
        <News news_={news} color={"light"} />
      </Suspense>
      <About />
      <Suspense
        fallback={
          <Wrapper
            title="Your Feedback"
            description="            Join satisfied listeners/followers and contributors who trust
            Diaspora News Radio for quality diaspora content."
            loadMessage="Tetimonials"
          />
        }
      >
        <Testimonials testimonials_={testimonials} />
      </Suspense>

      <Contact />
      <Footer />
    </div>
  );
}
