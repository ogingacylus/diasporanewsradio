"use client";

import { useState, useEffect } from "react";
import { Lightbulb, MessageCircle, Heart, Music } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function AdvicesPage() {
  const [advices, setAdvices] = useState<any[]>([]);

  useEffect(() => {
    fetchAdvices();
  }, []);

  const fetchAdvices = async () => {
    try {
      const response = await fetch("/api/advices");
      if (response.ok) {
        const data = await response.json();
        setAdvices(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
    }
  };
  console.log(advices);
  if (advices.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center mt-10 ">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3 ">
              <Lightbulb className="w-10 h-10 text-accent" />
              Advices & Tips
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert advice, tutorials, and tips from our team of professionals.
            </p>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            No advice or tips at this time
          </h1>
          <p className="text-muted-foreground mb-8">Please come back later</p>
          <Link
            href={`/`}
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background pt-24">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Lightbulb className="w-10 h-10 text-accent" />
            Advices & Tips
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert advice, tutorials, and tips from our team of professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
          {advices.map((advice) => (
            <div
              key={advice.id}
              className="bg-card p-8 rounded-xl border border-border hover:border-accent/50 transition-colors"
            >
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {advice.title}
              </h3>
              <p className="text-muted-foreground mb-6 break-words">
                {advice.content?.split(" ").slice(0, 12).join(" ")}.....
              </p>
              <Link
                href={`advice/${advice.id}`}
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
