"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Share2, ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Loader } from "@/components/loader";
import ShareButtons from "@/components/socialShare";
import { usePathname } from "next/navigation";

export default function AdvicesDetail({ params }: { params: { id: string } }) {
  const [advices, setAdvices] = useState<any[]>([]);
  const [id, setId] = useState<any>();
  const article = advices.find((n) => n.id === Number.parseInt(id));
  const [loading, setLoading] = useState(true);

  const pathname: any = usePathname();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    fetchAdvices();
  }, [id]);

  const fetchAdvices = async () => {
    const { id } = await params;
    setId(id);
    try {
      const response = await fetch("/api/advices");
      if (response.ok) {
        const data = await response.json();
        setAdvices(data);
      }
    } catch (error) {
      console.error("Failed to fetch advices:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <Link
            href="/advice"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium mb-8"
          >
            <ArrowLeft size={18} />
            Back to Advices
          </Link>

          {loading ? (
            <>
              <Loader />
            </>
          ) : !article ? (
            <>
              <p className="text-muted-foreground">No advice items yet</p>
            </>
          ) : (
            <>
              {" "}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                    <Lightbulb />
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {formatDate(article.date)}
                  </div>
                </div>
                <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
                  {article.title}
                </h1>
              </div>
              {/* Featured Image */}
              {/* Article Content */}
              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {article.content}
                </p>
              </div>
              {/* Share Section */}
              <div className="border-t border-border pt-8">
                <div className="w-full flex flex-col gap-4 items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors">
                  <div className="flex items-center justify-center gap-2">
                    {" "}
                    <Share2 size={18} />
                    Share
                  </div>
                  <ShareButtons
                    title={article.title}
                    url={`${baseUrl}${pathname}`}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
