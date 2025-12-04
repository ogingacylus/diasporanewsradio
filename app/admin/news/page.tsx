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
import { NewsForm } from "./form";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  published: boolean;
  created_at: string;
}

export default function AdminNewsPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    author: "",
    description: "",
    category: "",
    image_url: "",
    published: false,
  });

  const handleUploadComplete = (result: any) => {
    fetchNews();
    console.log("Upload completed:", result);
  };
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchNews();
  }, [router]);

  const fetchNews = async () => {
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

  const handleDeleteImage = async (url: string, itemId: any) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/delete-image/`, {
        method: "DELETE",
        body: JSON.stringify({
          imageUrl: url,
          itemId: itemId,
          type: "news",
        }),
      });
      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleDelete = async (id: number, item: any) => {
    if (item?.image_url) {
      alert("Delete news picture first!");
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchNews();
        setInitialData(false);
      }
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-md md:text-4xl font-bold">News & Updates</h1>
            <Button
              onClick={() => setIsFormDialogOpen(true)}
              className="bg-accent hover:bg-accent/90 gap-2 cursor-pointer"
            >
              <Plus size={20} />
              New Article
            </Button>
            <NewsForm
              formData={formData}
              setFormData={setFormData}
              setLoading={setIsLoading}
              setNews={setNews}
              setInitialData={setInitialData}
              initialData={initialData}
              isFormDialogOpen={isFormDialogOpen}
              setIsFormDialogOpen={setIsFormDialogOpen}
            />
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : news.length === 0 ? (
              <p className="text-muted-foreground">No articles yet</p>
            ) : (
              news.map((item: any) => (
                <Card
                  key={item.id}
                  className="p-4 border-primary/20 flex justify-between items-center"
                >
                  <PictureDialog
                    url={imageUrl}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                  {item?.image_url ? (
                    <div className="space-y-2 w-full md:w-96">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">
                            Picture uploaded
                          </p>
                          <button
                            onClick={() => {
                              setImageUrl(item.image_url);
                              setIsDialogOpen(true);
                            }}
                            className="text-xs text-green-600 hover:underline cursor-pointer"
                          >
                            View picture
                          </button>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-red-200"
                          onClick={() => {
                            handleDeleteImage(item.image_url, item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <FileUpload
                      itemId={String(item.id)}
                      type="news"
                      userId="IMG"
                      onUploadComplete={handleUploadComplete}
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 bg-transparent"
                      onClick={() => {
                        setFormData(item);
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
                      onClick={() => handleDelete(item.id, item)}
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
