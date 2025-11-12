"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Summer Music Festival 2025",
    date: "June 15-17, 2025",
    location: "Central Park Amphitheater",
    description: "Join us for an unforgettable weekend of live music featuring top artists from around the world.",
    image: "/summer-music-festival-outdoor-concert.jpg",
  },
  {
    id: 2,
    title: "Radio Station Anniversary Party",
    date: "July 4, 2025",
    location: "Downtown Convention Center",
    description: "Celebrate 25 years of broadcasting excellence with exclusive performances and listener giveaways.",
    image: "/radio-station-anniversary-celebration-party.jpg",
  },
  {
    id: 3,
    title: "Jazz Night Live Broadcast",
    date: "July 12, 2025",
    location: "Blue Note Jazz Club",
    description: "Experience smooth jazz in an intimate setting with live broadcast on our airwaves.",
    image: "/jazz-night-live-performance-club.jpg",
  },
  {
    id: 4,
    title: "Indie Rock Showcase",
    date: "August 2, 2025",
    location: "The Venue Downtown",
    description: "Discover emerging local talent in an electrifying showcase event exclusively for our listeners.",
    image: "/indie-rock-concert-showcase.jpg",
  },
  {
    id: 5,
    title: "Hip-Hop Sessions Podcast Live",
    date: "August 20, 2025",
    location: "Studio Theater",
    description: "Live recording of our most popular podcast with special guests and interactive Q&A.",
    image: "/hip-hop-music-podcast-live-recording.jpg",
  },
]

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
    setAutoplay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
    setAutoplay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoplay(false)
  }

  return (
    <section className="w-full bg-card py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Upcoming Events</h2>
          <p className="mt-2 text-muted-foreground">Don't miss our exciting radio events and live performances</p>
        </div>

        <div className="relative mb-8 overflow-hidden rounded-lg bg-background">
          <div className="aspect-video overflow-hidden">
            <img
              src={events[currentIndex].image || "/placeholder.svg"}
              alt={events[currentIndex].title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Event info overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{events[currentIndex].title}</h3>
            <p className="mt-2 text-sm text-gray-200 sm:text-base">{events[currentIndex].date}</p>
            <p className="text-sm text-gray-300 sm:text-base">{events[currentIndex].location}</p>
            <p className="mt-3 max-w-md text-sm text-gray-200 sm:text-base">{events[currentIndex].description}</p>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-accent/90 p-2 text-accent-foreground transition-colors hover:bg-accent"
            aria-label="Previous event"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-accent/90 p-2 text-accent-foreground transition-colors hover:bg-accent"
            aria-label="Next event"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-accent" : "bg-muted hover:bg-muted-foreground"
              }`}
              aria-label={`Go to event ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>

        {/* Event counter */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {currentIndex + 1} of {events.length}
        </p>
      </div>
    </section>
  )
}
