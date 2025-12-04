"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Show {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  host: string;
  schedule: string;
  genre: string;
  listeners_count: number;
}

export function Shows({ shows_ }: { shows_: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="shows_" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Featured Shows
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated programming from industry-leading
            hosts
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">
            Loading shows_...
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <p className="text-sm mt-2">
              Initialize the database to see shows_.
            </p>
          </div>
        ) : shows_.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shows_.map((show: any) => (
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
                    <h3 className="font-bold text-foreground mb-1">
                      {show.title}
                    </h3>
                    <p className="text-sm text-accent mb-3">{show.genre}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      with {show.host}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {show.schedule}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No shows available yet
          </div>
        )}
        {shows_.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/shows">
              <button className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent/5 transition-colors cursor-pointer">
                View All Shows
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
