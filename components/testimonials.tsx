"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  author_name: string;
  role: string;
  content: string;
  rating: number;
  image_url?: string;
}

export function Testimonials({ testimonials_ }: { testimonials_: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Your Feedback
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join satisfied listeners/followers and contributors who trust
            Diaspora News Radio for quality diaspora content.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">
            Loading testimonials...
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <p className="text-sm mt-2">
              Initialize the database to see testimonials.
            </p>
          </div>
        ) : testimonials_.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials_.map((testimonial: any) => (
              <div
                key={testimonial.id}
                className="rounded-xl border border-border bg-background p-8 hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <img
                    src={testimonial.image_url || "/placeholder.svg"}
                    alt={testimonial.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-foreground">
                      {testimonial.author_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No testimonials available yet
          </div>
        )}
      </div>
    </section>
  );
}
