"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";

const allShows = [
  {
    id: 1,
    name: "Morning Hits Mix",
    host: "Alex Rivera",
    time: "8:00 AM - 12:00 PM",
    genre: "Pop & Hits",
    image: "/morning-radio-show.jpg",
    description: "Start your day with the best pop hits and feel-good music.",
  },
  {
    id: 2,
    name: "The Late Night Sessions",
    host: "Jordan Blake",
    time: "10:00 PM - 2:00 AM",
    genre: "Electronic & Jazz",
    image: "/night-time-radio-show.jpg",
    description: "Unwind with smooth electronic and jazz selections.",
  },
  {
    id: 3,
    name: "Indie Spotlight",
    host: "Sam Chen",
    time: "2:00 PM - 6:00 PM",
    genre: "Indie & Alternative",
    image: "/indie-music-radio.jpg",
    description: "Discover emerging independent artists and alternative music.",
  },
  {
    id: 4,
    name: "Urban Beats Radio",
    host: "Marcus Davis",
    time: "6:00 PM - 10:00 PM",
    genre: "Hip Hop & R&B",
    image: "/hip-hop-radio-show.jpg",
    description: "Experience the latest hip-hop and R&B with Marcus Davis.",
  },
];

export default function AllShows() {
  const [shows, setShows] = useState<any[]>([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/shows");
      if (response.ok) {
        const data = await response.json();
        setShows(data?.slice(0, 4));
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
              Shows
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our complete lineup of programming featuring diverse
              genres and talented hosts
            </p>
          </div>

          {/* Shows Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show: any) => (
              <Link href={`/shows/${show.id}`} key={show.id}>
                <div className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden h-48 bg-card">
                    <img
                      src={show.image_url || "/placeholder.svg"}
                      alt={show.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {show.name}
                    </h3>
                    <p className="text-sm text-accent mb-3 font-medium">
                      {show.genre}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {show.description}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Host:</strong> {show.host}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Time:</strong> {show.schedule}
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
