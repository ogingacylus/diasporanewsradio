"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  date: string;
  location: string;
  ticket_url?: string;
}

export function EventsCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error("[v0] Failed to fetch events:", error);
        setError("Unable to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!autoplay || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, events.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  if (loading) {
    return (
      <section className="w-full bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Don't miss our exciting radio events and live performances
            </p>
          </div>
          <div className="text-center text-muted-foreground py-12">
            Loading events...
          </div>
        </div>
      </section>
    );
  }

  if (error || events.length === 0) {
    return (
      <section className="w-full bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Don't miss our exciting radio events and live performances
            </p>
          </div>
          <div className="text-center text-muted-foreground py-12">
            {error
              ? `${error} - Initialize the database to see events.`
              : "No events scheduled"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-card py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground">
            Don't miss our exciting radio events and live performances
          </p>
        </div>

        <div className="relative mb-8 overflow-hidden rounded-lg bg-background">
          <div className="aspect-video overflow-hidden">
            <img
              src={events[currentIndex].image_url || "/placeholder.svg"}
              alt={events[currentIndex].title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Event info overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {events[currentIndex].title}
            </h3>
            <p className="mt-2 text-sm text-gray-200 sm:text-base">
              {new Date(events[currentIndex].date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-sm text-gray-300 sm:text-base">
              {events[currentIndex].location}
            </p>
            <p className="mt-3 max-w-md text-sm text-gray-200 sm:text-base">
              {events[currentIndex].description}
            </p>
            <div className="mt-4">
              <Link href={`/events/${events[currentIndex].id}`}>
                <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-accent/90 p-2 text-accent-foreground transition-colors hover:bg-accent cursor-pointer"
            aria-label="Previous event"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-accent/90 p-2 text-accent-foreground transition-colors hover:bg-accent cursor-pointer"
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
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "bg-muted hover:bg-muted-foreground"
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
  );
}
