"use client"

import { Play, Pause } from "lucide-react"
import { useState } from "react"

export function LiveStream() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground mb-3">Now Playing</h2>
              <p className="text-muted-foreground mb-2">Morning Hits Mix</p>
              <p className="text-sm text-muted-foreground">Hosted by Alex Rivera • 8:00 AM - 12:00 PM</p>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-accent rounded-full"></div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>2:15</span>
              <span>7:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
