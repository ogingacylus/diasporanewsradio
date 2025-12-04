"use client";

import { useState, useEffect, use } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Play, Clock, Radio, Share2, Tickets } from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/loader";
import ShareButtons from "@/components/socialShare";
import { usePathname } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function EventDetail({ event }: { event: any }) {
  const pathname: any = usePathname();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <>
      {!event ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-accent mb-4">
            Event Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The event you're looking for doesn't exist.
          </p>
          <Link
            href="/events"
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return to events
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
                    <div className="w-full flex flex-col gap-4 items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors">
                      <div className="flex items-center justify-center gap-2">
                        {" "}
                        <Share2 size={18} />
                        Share
                      </div>
                      <ShareButtons
                        title={event.title}
                        url={`${baseUrl}${pathname}`}
                      />
                    </div>
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
    </>
  );
}
