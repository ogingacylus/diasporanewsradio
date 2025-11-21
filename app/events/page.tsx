"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function AllShows() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium mb-8"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our exciting lineup of events featuring engaging
              experiences and talented hosts.
            </p>
          </div>

          {/* Shows Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden h-48 bg-card">
                    <img
                      src={event.image_url || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {event.description}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Date:</strong>{" "}
                        {formatDate(new Date(String(event.date)))}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
