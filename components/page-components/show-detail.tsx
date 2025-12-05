"use client";

import { useState, useEffect, use } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Play, Clock, Radio, Share2 } from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/loader";
import ShareButtons from "@/components/socialShare";
import { usePathname } from "next/navigation";

export default function ShowDetail({ show }: { show: any }) {
  const pathname: any = usePathname();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <>
      <div className="pt-24 pb-20 mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-8 h-96">
            <img
              src={show.image_url || "/placeholder.svg"}
              alt={show.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl font-bold text-foreground mb-2 text-balance">
                {show.title}
              </h1>
              <p className="text-lg text-accent mb-6">{show.genre}</p>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {show.description}
                </p>
              </div>

              {/* Show Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Schedule
                      </h3>
                      <p className="text-muted-foreground">{show.schedule}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Radio className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Daily Listeners
                      </h3>
                      <p className="text-muted-foreground">150K+ daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Host Information
                </h2>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Hosted by
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {show.host}
                  </p>
                </div>

                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Air Time</p>
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Clock size={16} />
                    {show.schedule}
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="https://zeno.fm/radio/diaspora-news-radio/"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play size={18} />
                    Listen Now
                  </Link>
                  <div className="w-full flex flex-col gap-4 items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors">
                    <div className="flex items-center justify-center gap-2">
                      {" "}
                      <Share2 size={18} />
                      Share
                    </div>
                    <ShareButtons
                      title={show.title}
                      url={`${baseUrl}${pathname}`}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href="/shows"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    ← Back to Shows
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
