import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { LiveStream } from "@/components/live-stream"
import { EventsCarousel } from "@/components/events-carousel"
import { News } from "@/components/news"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { Shows } from "@/components/shows"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <LiveStream />
      <EventsCarousel />
      <Shows />
      <News />
      <About />
      <Testimonials />
      <Footer />
    </div>
  )
}
