"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  author_name: string
  role: string
  content: string
  rating: number
  image_url?: string
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const data = await response.json()
        setTestimonials(Array.isArray(data) ? data : [])
        setError(null)
      } catch (error) {
        console.error("[v0] Failed to fetch testimonials:", error)
        setError("Unable to load testimonials")
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">What Our Listeners Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join millions of satisfied listeners who trust WAVE Radio for quality audio content
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading testimonials...</div>
        ) : error ? (
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <p className="text-sm mt-2">Initialize the database to see testimonials.</p>
          </div>
        ) : testimonials.length > 0 ? (
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
                    src={testimonial.image_url || "/placeholder.svg"}
                    alt={testimonial.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-foreground">{testimonial.author_name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">No testimonials available yet</div>
        )}
      </div>
    </section>
  )
}
