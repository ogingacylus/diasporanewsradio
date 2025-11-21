"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSSidebar } from "@/components/cms-sidebar";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardStats {
  totalNews: number;
  totalShows: number;
  totalEvents: number;
  totalTestimonials: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Fetch stats
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const [
        newsRes,
        showsRes,
        eventsRes,
        testimonialsRes,
        advices,
        advertisements,
        marketing,
        media,
        stories,
        visitors,
      ] = await Promise.all([
        fetch("/api/news"),
        fetch("/api/shows"),
        fetch("/api/events"),
        fetch("/api/testimonials"),
        fetch("/api/advices"),
        fetch("/api/advertisements"),
        fetch("/api/marketing"),
        fetch("/api/media"),
        fetch("/api/stories"),
        fetch("/api/visitors"),
      ]);

      const newsData = await newsRes.json();
      const showsData = await showsRes.json();
      const eventsData = await eventsRes.json();
      const testimonialsData = await testimonialsRes.json();
      // const advicesData = await advices.json();
      // const advertismentsData = await advertisements.json();
      // const marketingData = await marketing.json();
      // const mediaData = await media.json();
      // const storiesData = await stories.json();
      // const visitorsData = await visitors.json();

      setStats({
        totalNews: Array.isArray(newsData) ? newsData.length : 0,
        totalShows: Array.isArray(showsData) ? showsData.length : 0,
        totalEvents: Array.isArray(eventsData) ? eventsData.length : 0,
        totalTestimonials: Array.isArray(testimonialsData)
          ? testimonialsData.length
          : 0,
        // totalAdvices: Array.isArray(advicesData) ? advicesData.length : 0,
        // totalAdvertisments: Array.isArray(advertismentsData)
        //   ? advicesData.length
        //   : 0,
        // totalMarketing: Array.isArray(marketingData) ? marketingData.length : 0,
        // totalMedia: Array.isArray(mediaData) ? mediaData.length : 0,
        // totalStories: Array.isArray(storiesData) ? storiesData.length : 0,
        // totalVisistors: Array.isArray(visitorsData) ? visitorsData.length : 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Loading statistics...</p>
            </div>
          ) : stats ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total News
                  </p>
                  <p className="text-3xl font-bold text-blue-500">
                    {stats.totalNews}
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Shows
                  </p>
                  <p className="text-3xl font-bold text-purple-500">
                    {stats.totalShows}
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Events
                  </p>
                  <p className="text-3xl font-bold text-orange-500">
                    {stats.totalEvents}
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Testimonials
                  </p>
                  <p className="text-3xl font-bold text-green-500">
                    {stats.totalTestimonials}
                  </p>
                </Card>
                {/* <Card className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Advices
                  </p>
                  <p className="text-3xl font-bold text-green-500">
                    {stats.totalAdvices}
                  </p>
                </Card> */}
              </div>

              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">Content Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[stats]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalNews" fill="#3b82f6" name="News" />
                    <Bar dataKey="totalShows" fill="#a855f7" name="Shows" />
                    <Bar dataKey="totalEvents" fill="#f97316" name="Events" />
                    <Bar
                      dataKey="totalTestimonials"
                      fill="#22c55e"
                      name="Testimonials"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
