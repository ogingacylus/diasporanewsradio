"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Share2, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Loader } from "@/components/loader";
import ShareButtons from "@/components/socialShare";
import { usePathname } from "next/navigation";

export default function NewsDetail({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);
  const [id, setId] = useState<any>();
  const article = news.find((n) => n.id === Number.parseInt(id));
  console.log(article);
  const pathname: any = usePathname();

  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    const { id } = await params;
    setId(id);
    try {
      const response = await fetch("/api/admin/news");
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {loading ? (
        <Loader />
      ) : !news ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/news"
            className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            View All News
          </Link>
        </div>
      ) : (
        <div className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Article Header */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium mb-8"
            >
              <ArrowLeft size={18} />
              Back to News
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  {formatDate(new Date(String(article.created_at)))}
                </div>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
                {article.title}
              </h1>
              {/* <p className="text-xl text-muted-foreground mb-6">
              {article.description}
            </p> */}
              {article.author && (
                <p className="text-sm text-muted-foreground flex items-center gap-2 ">
                  <User className="h-5 text-accent" /> By {article.author}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-12 h-96">
              <img
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none mb-12">
              {article.description
                .split("\n\n")
                .map((paragraph: any, index: any) => {
                  if (paragraph.startsWith("**")) {
                    const lines = paragraph?.split("\n");
                    return (
                      <div key={index} className="mb-6">
                        {lines.map((line: any, lineIndex: any) => {
                          if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                              <h3
                                key={lineIndex}
                                className="text-lg font-bold text-foreground mt-4 mb-2"
                              >
                                {line.replace(/\*\*/g, "")}
                              </h3>
                            );
                          }
                          if (line.startsWith("-")) {
                            return (
                              <li
                                key={lineIndex}
                                className="text-muted-foreground leading-relaxed ml-6"
                              >
                                {line.replace("-", "").trim()}
                              </li>
                            );
                          }
                          return (
                            <p
                              key={lineIndex}
                              className="text-muted-foreground leading-relaxed"
                            >
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-lg text-muted-foreground leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  );
                })}
            </div>

            {/* Share Section */}
            <div className="border-t border-border pt-8">
              <div className="flex items-center justify-between">
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
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
