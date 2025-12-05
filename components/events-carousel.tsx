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

export function EventsCarousel({ events_ }: { events_: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoplay || events_.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events_.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, events_.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events_.length) % events_.length);
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events_.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  // if (!loading) {
  //   return (
  //     <section className="w-full bg-card py-16 pt-32">
  //       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  //         <div className="mb-8">
  //           <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
  //             Upcoming Events
  //           </h2>
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
  //           <p className="mt-2 text-muted-foreground">
  //             Don't miss our exciting radio events_ and live performances
  //           </p>
  //         </div>
  //         <div className="text-center py-12 flex gap-2 items-center justify-center font-bold">
  //           <p className="animate-pulse text-3xl text-accent">Loading .....</p>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  if (events_.length === 0) {
    return (
      <section className="w-full bg-card py-16 pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Don't miss exciting diaspora events close to you
            </p>
          </div>
          <div className="text-center text-muted-foreground py-12">
            {error
              ? `${error} - Initialize the database to see events_.`
              : "No events_ scheduled"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-card py-16 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-12 items-center justify-center">
          {/* Left Content */}
          <div className="space-y-4 mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-accent leading-tight text-balance flex justify-center ">
              LISTEN TO THE WORLD
            </h1>

            {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
                <Volume2 size={20} />
                Listen Live Now
              </button>
              <Link href="/#about">
                <button className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent/5 transition-colors cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground">
            Don't miss exciting diaspora events close to you.
          </p>
        </div>

        <div className="relative mb-8 overflow-hidden rounded-lg bg-background">
          <div className="aspect-video overflow-hidden">
            <img
              src={events_[currentIndex].image_url || "/placeholder.svg"}
              alt={events_[currentIndex].title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Event info overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {events_[currentIndex].title}
            </h3>
            <p className="mt-2 text-sm text-gray-200 sm:text-base">
              {new Date(events_[currentIndex].date).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
            <p className="text-sm text-gray-300 sm:text-base">
              {events_[currentIndex].location}
            </p>
            <p className="mt-3 max-w-md text-sm text-gray-200 sm:text-base">
              {events_[currentIndex].description}
            </p>
            <div className="mt-4">
              <Link href={`/events/${events_[currentIndex].id}`}>
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
          {events_.map((_: any, index: number) => (
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
          {currentIndex + 1} of {events_.length}
        </p>
      </div>
    </section>
  );
}
