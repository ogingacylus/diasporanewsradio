"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function Shows({ shows }: { shows: any }) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium mb-8 "
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Shows
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete lineup of programming featuring diverse genres
            and talented hosts
          </p>
        </div>

        {/* Shows Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map((show: any) => (
            <Link href={`/shows/${show.id}`} key={show.id}>
              <div className="group rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden h-48 bg-card">
                  <img
                    src={show.image_url || "/placeholder.svg"}
                    alt={show.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {show.name}
                  </h3>
                  <p className="text-sm text-accent mb-3 font-medium">
                    {show.genre}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {show.description?.slice(0, 70)}{" "}
                    {show.description?.length > 70 && "..."}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Host:</strong> {show.host}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Time:</strong> {show.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
