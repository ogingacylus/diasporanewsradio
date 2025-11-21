"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSSidebar } from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, ImageIcon } from "lucide-react";
import { PictureDialog } from "../picture-dialog";

import { formatDate } from "@/lib/utils";

export default function AdminShowsPage() {
  const router = useRouter();
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchAdvertisements();
  }, [router]);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch("/api/admin/advertisements");
      if (response.ok) {
        const data = await response.json();
        setAdvertisements(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-md md:text-4xl font-bold">
              Advertisers Messages
            </h1>
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : advertisements.length === 0 ? (
              <p className="text-muted-foreground">
                No advertisements items yet
              </p>
            ) : (
              advertisements.map((show: any) => (
                <Card
                  key={show.id}
                  className="p-4 border-primary/20 flex justify-between items-center bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Name: {show.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: {show.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Subject: {show.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Message: {show.message}
                    </p>
                    <h3 className="font-bold">{show.title}</h3>
                    date: {formatDate(new Date(String(show.created_at)))}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
