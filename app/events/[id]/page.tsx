"use client";

import { useState, useEffect, use } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Play, Clock, Radio, Share2, Tickets } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Loader } from "@/components/loader";

const showsData = [
  {
    id: 1,
    name: "Morning Hits Mix",
    host: "Alex Rivera",
    time: "8:00 AM - 12:00 PM",
    genre: "Pop & Hits",
    image: "/morning-radio-show.jpg",
    description:
      "Start your day with the best pop hits and feel-good music. Alex Rivera brings you all your favorite tracks and exclusive interviews with top artists. Join thousands of listeners every morning for an energetic show that sets the tone for your entire day.",
    schedule: "Monday - Friday, 8:00 AM - 12:00 PM",
    listeners: "250K+ daily",
    featured: true,
  },
  {
    id: 2,
    name: "The Late Night Sessions",
    host: "Jordan Blake",
    time: "10:00 PM - 2:00 AM",
    genre: "Electronic & Jazz",
    image: "/night-time-radio-show.jpg",
    description:
      "Unwind with Jordan Blake's smooth electronic and jazz selections. Perfect for late-night studying, relaxation, or night owl sessions. Experience curated tracks that blend contemporary electronic sounds with timeless jazz classics.",
    schedule: "Thursday - Sunday, 10:00 PM - 2:00 AM",
    listeners: "180K+ nightly",
    featured: false,
  },
  {
    id: 3,
    name: "Indie Spotlight",
    host: "Sam Chen",
    time: "2:00 PM - 6:00 PM",
    genre: "Indie & Alternative",
    image: "/indie-music-radio.jpg",
    description:
      "Discover emerging independent artists and alternative music. Sam Chen showcases the best of underground and indie scenes, bringing you fresh sounds and exclusive previews from up-and-coming musicians.",
    schedule: "Tuesday - Saturday, 2:00 PM - 6:00 PM",
    listeners: "150K+ daily",
    featured: true,
  },
  {
    id: 4,
    name: "Urban Beats Radio",
    host: "Marcus Davis",
    time: "6:00 PM - 10:00 PM",
    genre: "Hip Hop & R&B",
    image: "/hip-hop-radio-show.jpg",
    description:
      "Experience the latest hip-hop and R&B with Marcus Davis. Get exclusive tracks, artist interviews, and the hottest beats. Marcus brings authentic voices and groundbreaking music directly to your ears.",
    schedule: "Monday - Sunday, 6:00 PM - 10:00 PM",
    listeners: "320K+ daily",
    featured: true,
  },
];

interface Show {
  id: number;
  title: string;
  host: string;
  description: string;
  genre: string;
  image_url: string;
  schedule: string;
  listeners: "320K+ daily";
  time: "8:00 AM - 12:00 PM";
  published: boolean;
  created_at: string;
}
export default function ShowDetail({ params }: { params: any }) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [id, setId] = useState<any>();
  const event = events?.find((s) => s.id === Number.parseInt(id));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { id } = await params;
    setId(id);
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {loading ? (
        <Loader />
      ) : !event ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Show Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The show you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      ) : (
        <div className="pt-24 pb-20 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden mb-8 h-96">
              <img
                src={event.image_url || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-5xl font-bold text-foreground mb-2 text-balance">
                  {event.title}
                </h1>

                <div className="prose prose-invert max-w-none mb-12">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Show Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Date
                        </h3>
                        <p className="text-muted-foreground">
                          {formatDate(new Date(String(event.date)))}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Tickets className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Tickets Available
                        </h3>
                        <p className="text-muted-foreground">300</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Event Information
                  </h2>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      Location
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {event.location}
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="text-sm text-muted-foreground mb-2">Date</p>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <Clock size={16} />
                      {formatDate(new Date(String(event.date)))}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Book Now
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      ← Back to Events
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
