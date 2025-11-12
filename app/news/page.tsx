"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { News } from "@/components/news"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24">
        <News />
      </div>
      <Footer />
    </div>
  )
}
