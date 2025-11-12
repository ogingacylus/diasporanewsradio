"use client"

import Link from "next/link"

export function Shows() {
  const shows = [
    {
      id: 1,
      name: "Morning Hits Mix",
      host: "Alex Rivera",
      time: "8:00 AM - 12:00 PM",
      genre: "Pop & Hits",
      image: "/morning-radio-show.jpg",
    },
    {
      id: 2,
      name: "The Late Night Sessions",
      host: "Jordan Blake",
      time: "10:00 PM - 2:00 AM",
      genre: "Electronic & Jazz",
      image: "/night-time-radio-show.jpg",
    },
    {
      id: 3,
      name: "Indie Spotlight",
      host: "Sam Chen",
      time: "2:00 PM - 6:00 PM",
      genre: "Indie & Alternative",
      image: "/indie-music-radio.jpg",
    },
    {
      id: 4,
      name: "Urban Beats Radio",
      host: "Marcus Davis",
      time: "6:00 PM - 10:00 PM",
      genre: "Hip Hop & R&B",
      image: "/hip-hop-radio-show.jpg",
    },
  ]

  return (
    <section id="shows" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Featured Shows</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated programming from industry-leading hosts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shows.map((show) => (
            <Link href={`/shows/${show.id}`} key={show.id}>
              <div className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
                <div className="relative overflow-hidden h-40 bg-card">
                  <img
                    src={show.image || "/placeholder.svg"}
                    alt={show.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1">{show.name}</h3>
                  <p className="text-sm text-accent mb-3">{show.genre}</p>
                  <p className="text-sm text-muted-foreground mb-1">with {show.host}</p>
                  <p className="text-xs text-muted-foreground">{show.time}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
