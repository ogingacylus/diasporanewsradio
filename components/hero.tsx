"use client";

import { Volume2 } from "lucide-react";
import { LiveStream } from "@/components/live-stream";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <span className="text-sm font-medium text-accent">
                Broadcasting Since 2015
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Your Premier Audio Experience
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Connect with millions of listeners across the globe. Experience
              premium content, exclusive interviews, and music that moves you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
                <Volume2 size={20} />
                Listen Live Now
              </button>
              <Link href="/#about">
                <button className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent/5 transition-colors cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <LiveStream />
          {/* <div className="relative h-96 hidden md:flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-transparent rounded-2xl blur-3xl"></div>
            <div className="relative w-64 h-64 rounded-2xl border-2 border-accent/30 bg-card flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-accent/50 flex items-center justify-center animate-pulse">
                <Volume2 className="w-16 h-16 text-accent" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
