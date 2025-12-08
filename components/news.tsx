"use client";

import { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  published_at: string;
  created_at: string;
}

export function News({ news_, color }: { news_: any; color: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section
      id="news"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        color === "light" ? "bg-card" : "bg-background"
      } border-y border-border`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Latest Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay connected with the latest news and announcements from Diaspora
            News Radio
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">
            Loading news...
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <p className="text-sm mt-2">
              Please initialize the database to see content.
            </p>
          </div>
        ) : news_?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {news_.map((article: any) => (
              <Link href={`/news/${article.id}`} key={article.id}>
                <article className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden h-64 bg-background">
                    <img
                      src={article.image_url || "/placeholder.svg"}
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
                        {new Date(article.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                      {article.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No news available yet
          </div>
        )}
        {news_.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/news">
              <button className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent/5 transition-colors cursor-pointer">
                View All Lastest Updates
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
