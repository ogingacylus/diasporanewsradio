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
import { FileUpload } from "../file-upload";
import { AdviceForm } from "./form";
import { formatDate } from "@/lib/utils";

interface Show {
  id: number;
  title: string;
  host: string;
  genre: string;
  image_url: string;
  published: boolean;
  created_at: string;
}

export default function AdminShowsPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState(false);
  const [advices, setAdvices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    content: "",
    published: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchAdvices();
  }, [router]);

  const fetchAdvices = async () => {
    try {
      const response = await fetch("/api/admin/advices");
      if (response.ok) {
        const data = await response.json();
        setAdvices(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, item: any) => {
    if (item?.image_url1) {
      alert("Delete  picture first!");
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/admin/advices/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchAdvices();
        setInitialData(false);
      }
    } catch (error) {
      console.error("Failed to delete show:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-md md:text-4xl font-bold">
              Manage Advice Items
            </h1>
            <Button
              onClick={() => setIsFormDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus size={20} />
              New Advice Item
            </Button>
            <AdviceForm
              formData={formData}
              setFormData={setFormData}
              setLoading={setIsLoading}
              setAdvices={setAdvices}
              setInitialData={setInitialData}
              initialData={initialData}
              isFormDialogOpen={isFormDialogOpen}
              setIsFormDialogOpen={setIsFormDialogOpen}
            />
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : advices.length === 0 ? (
              <p className="text-muted-foreground">No advice items yet</p>
            ) : (
              advices.map((show: any) => (
                <Card
                  key={show.id}
                  className="p-4 border-primary/20 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{show.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Content: {show.content}
                    </p>
                    date: {formatDate(new Date(String(show.updated_at)))}
                    <p
                      className={`text-md ${
                        show.published ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {show.published ? "Published" : "Not Published"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 bg-transparent"
                      onClick={() => {
                        setFormData(show);
                        setIsFormDialogOpen(true);
                        setInitialData(true);
                      }}
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => handleDelete(show.id, show)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
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
