"use client"

import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function News() {
  const news = [
    {
      id: 1,
      title: "WAVE Announces New International Partnership",
      excerpt: "Expanding our reach to 50+ countries with premium streaming capabilities.",
      date: "Nov 8, 2025",
      category: "Announcement",
      image: "/radio-station-partnership-announcement.jpg",
    },
    {
      id: 2,
      title: "Exclusive Interview: Grammy-Winning Artist Sits Down",
      excerpt: "Hear behind-the-scenes stories and upcoming projects from this week's featured guest.",
      date: "Nov 5, 2025",
      category: "Interview",
      image: "/music-interview-broadcast.jpg",
    },
    {
      id: 3,
      title: "New Mobile App Launch with Enhanced Features",
      excerpt: "Download our updated app with offline listening and personalized recommendations.",
      date: "Nov 1, 2025",
      category: "Product Update",
      image: "/mobile-app-interface.jpg",
    },
  ]

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Latest Updates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay connected with the latest news and announcements from WAVE Radio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((article) => (
            <Link href={`/news/${article.id}`} key={article.id}>
              <article className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden h-48 bg-background">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      {article.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                  <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
