"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Show {
  id: number
  title: string
  description: string
  image_url?: string
  host: string
  schedule: string
  genre: string
  listeners_count: number
}

export function Shows() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("/api/shows")
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const data = await response.json()
        setShows(Array.isArray(data) ? data : [])
        setError(null)
      } catch (error) {
        console.error("[v0] Failed to fetch shows:", error)
        setError("Unable to load shows")
        setShows([])
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  return (
    <section id="shows" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Featured Shows</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated programming from industry-leading hosts
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading shows...</div>
        ) : error ? (
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <p className="text-sm mt-2">Initialize the database to see shows.</p>
          </div>
        ) : shows.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shows.map((show) => (
              <Link href={`/shows/${show.id}`} key={show.id}>
                <div className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
                  <div className="relative overflow-hidden h-40 bg-card">
                    <img
                      src={show.image_url || "/placeholder.svg"}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1">{show.title}</h3>
                    <p className="text-sm text-accent mb-3">{show.genre}</p>
                    <p className="text-sm text-muted-foreground mb-1">with {show.host}</p>
                    <p className="text-xs text-muted-foreground">{show.schedule}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">No shows available yet</div>
        )}
      </div>
    </section>
  )
}
