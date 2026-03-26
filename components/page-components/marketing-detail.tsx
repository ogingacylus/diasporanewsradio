"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ShareButtons from "@/components/socialShare";
import { usePathname } from "next/navigation";
import { Calendar, Share2, ArrowLeft, User, Globe } from "lucide-react";

export default function MarketingDetail({ article }: { article: any }) {
  const pathname: any = usePathname();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <Link
            href="/advertisements"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium mb-8 mt-2"
          >
            <ArrowLeft size={18} />
            Back to Ads
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                {article.category}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 ">
              <Globe className="h-5 w-5 text-blue-600" />
              <Link
                href={article.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md text-blue-600 hover:text-accent"
              >
                Visit our website
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-2 h-full">
            <img
              src={article.image_url || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/*Description*/}
          {article.description && (
            <div className="prose prose-invert max-w-none mb-12">
              {article.description
                .split("\n\n")
                .map((paragraph: any, index: any) => {
                  return (
                    <p
                      key={index}
                      className="text-xs text-muted-foreground leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  );
                })}
            </div>
          )}

          {/* Article Paragraphs */}
          {article.paragraphs && (
            <>
              {article.paragraphs?.map((item: any, index: number) => (
                <div key={index}>
                  {index !== 0 && item.url && (
                    <div className="rounded-xl overflow-hidden mb-12 h-full">
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="prose prose-invert max-w-none mb-4">
                    {item.description}
                  </div>
                </div>
              ))}
            </>
          )}

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
    </>
  );
}
