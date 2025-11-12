"use client"

import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Listener, New York",
      content:
        "WAVE Radio is my daily companion. The diversity of shows and exceptional hosts make it my go-to station for music and news.",
      rating: 5,
      image: "/professional-woman-portrait.png",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Podcast Producer",
      content:
        "The production quality is outstanding. WAVE has set the industry standard for what professional broadcasting should sound like.",
      rating: 5,
      image: "/professional-portrait-man.jpg",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Music Enthusiast, Paris",
      content:
        "From indie to jazz, WAVE Radio covers everything. The curated playlists are always on point. Absolutely love it!",
      rating: 5,
      image: "/professional-portrait-woman-smiling.jpg",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">What Our Listeners Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join millions of satisfied listeners who trust WAVE Radio for quality audio content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-border bg-background p-8 hover:border-accent transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
