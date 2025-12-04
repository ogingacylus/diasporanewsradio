"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { formatDate } from "@/lib/utils";

export default function Stories({ stories }: { stories: any }) {
  if (stories?.length === 0) {
    return (
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            No stories at this time
          </h1>
          <p className="text-muted-foreground mb-8">Please come back later</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-accent" />
            Stories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In-depth articles, behind-the-scenes features, and stories from our
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories?.map((story: any) => (
            <article
              key={story.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-colors flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={story.image_url || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {story.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(new Date(String(story.updated_at)))}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {story.author}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 hover:text-accent transition-colors">
                  <Link href={`/stories/${story.id}`}>{story.title}</Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {story.excerpt}
                </p>
                <Link
                  href={`/stories/${story.id}`}
                  className="text-accent font-medium hover:underline inline-flex items-center"
                >
                  Read Full Story &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
