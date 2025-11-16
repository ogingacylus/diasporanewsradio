"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const newsData = [
  {
    id: 1,
    title: "WAVE Announces New International Partnership",
    excerpt:
      "Expanding our reach to 50+ countries with premium streaming capabilities.",
    date: "Nov 8, 2025",
    category: "Announcement",
    image: "/radio-station-partnership-announcement.jpg",
    content: `We are thrilled to announce a groundbreaking international partnership that will expand WAVE Radio's reach to over 50 countries across Europe, Asia, and the Americas. This strategic alliance marks a significant milestone in our mission to bring quality radio broadcasting to a global audience.

The partnership includes state-of-the-art streaming infrastructure, enhanced mobile applications, and localized content programming tailored to each region. Our listeners will now have access to exclusive international programming while maintaining the high quality and professionalism that WAVE Radio is known for.

Starting next month, new content channels will be available across all platforms, featuring local artists, international collaborations, and region-specific news updates. This expansion represents a $50 million investment in global broadcasting infrastructure and talent acquisition.

"This partnership is more than just expansion; it's a commitment to connecting people through music and meaningful content," said our founder and CEO. "We're building a global community of listeners and creators."

Key benefits of this partnership:
- 24/7 streaming across 50+ countries
- Localized programming and news updates
- Enhanced mobile app with offline listening
- Exclusive artist partnerships and early releases
- Regional advertising opportunities for businesses

The rollout will begin in December 2025, with phased implementation across all regions.`,
    author: "WAVE Radio Team",
  },
  {
    id: 2,
    title: "Exclusive Interview: Grammy-Winning Artist Sits Down",
    excerpt:
      "Hear behind-the-scenes stories and upcoming projects from this week's featured guest.",
    date: "Nov 5, 2025",
    category: "Interview",
    image: "/music-interview-broadcast.jpg",
    content: `In an exclusive interview this week, WAVE Radio had the privilege of hosting a Grammy-winning artist who shared intimate stories about their creative process and upcoming projects. The conversation, recorded during a special live session, covered everything from early influences to navigating the modern music industry.

Our guest discussed their journey to stardom, the challenges faced along the way, and the inspiration behind their latest album. "Music has always been my outlet for expressing emotions that words alone cannot capture," they shared during the interview.

The artist opened up about their collaboration process, revealing exciting news about upcoming duets with several international artists. Fans can expect fresh music to be released quarterly throughout 2026, with the first single dropping in December.

Behind-the-scenes during the recording session, our team captured exclusive moments of the artist working with our production team in the WAVE Radio studio. The full interview will air three times this week:
- Tuesday: 2:00 PM EST
- Thursday: 6:00 PM EST
- Saturday: 10:00 AM EST

Listeners can also access the full interview via our mobile app and podcast platform. Don't miss this rare opportunity to hear directly from one of music's biggest talents.`,
    author: "Alex Rivera",
  },
  {
    id: 3,
    title: "New Mobile App Launch with Enhanced Features",
    excerpt:
      "Download our updated app with offline listening and personalized recommendations.",
    date: "Nov 1, 2025",
    category: "Product Update",
    image: "/mobile-app-interface.jpg",
    content: `We are excited to announce the launch of WAVE Radio's completely redesigned mobile application, available now on iOS and Android platforms. The new app features cutting-edge technology and user-friendly interface designed based on extensive listener feedback.

Key features of the new app include:

**Offline Listening**: Download your favorite shows and listen anytime, anywhere without an internet connection. Perfect for commutes, travel, and areas with limited connectivity.

**Personalized Recommendations**: Our advanced algorithm learns your preferences and suggests shows you'll love, creating a customized experience for each listener.

**Seamless Playback**: Resume your show exactly where you left off across all your devices. No more starting from the beginning!

**Enhanced Search**: Find your favorite shows, artists, and episodes with our powerful search functionality.

**Night Mode**: Easy on the eyes with our comprehensive dark mode implementation, perfect for late-night listening.

**Notifications**: Stay updated with show schedules, new episodes, and exclusive content announcements.

The app has been optimized for performance, using 40% less battery than our previous version. We've also improved streaming quality and reduced buffering time significantly.

Users can upgrade for free by visiting their app store. Premium subscribers get access to ad-free listening, exclusive shows, and priority customer support.

"This new app represents our commitment to innovation and listener satisfaction," said our Chief Technology Officer. "We've rebuilt the entire platform from the ground up to deliver an exceptional experience."

Download WAVE Radio now and discover why thousands of listeners trust us for their daily dose of quality audio entertainment.`,
    author: "Tech Team",
  },
];

export default function NewsDetail({ params }: { params: { id: string } }) {
  const [news, setNews] = useState<any[]>([]);
  const [id, setId] = useState<any>();
  const article = news.find((n) => n.id === Number.parseInt(id));

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
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
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
                {formatDate(article.date)}
              </div>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
              {article.title}
            </h1>
            {/* <p className="text-xl text-muted-foreground mb-6">
              {article.description}
            </p> */}
            <p className="text-sm text-muted-foreground">By Jane Doe</p>
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
              <p className="text-foreground font-semibold">
                Share this article
              </p>
              <button className="flex items-center gap-2 px-6 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
