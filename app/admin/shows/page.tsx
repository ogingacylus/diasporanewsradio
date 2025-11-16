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
import { ShowsForm } from "./form";

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
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    host: "",
    schedule: "",
    genre: "",
    image_url: "",
    published: false,
  });

  const handleUploadComplete = (result: any) => {
    fetchShows();
    console.log("Upload completed:", result);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchShows();
  }, [router]);

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/admin/shows");
      if (response.ok) {
        const data = await response.json();
        setShows(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
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
          type: "shows",
        }),
      });
      if (response.ok) {
        fetchShows();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleDelete = async (id: number, item: any) => {
    if (item?.image_url) {
      alert("Delete show picture first!");
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/admin/shows/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchShows();
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
            <h1 className="text-md md:text-4xl font-bold">Manage Shows</h1>
            <Button
              onClick={() => setIsFormDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus size={20} />
              New Show
            </Button>
            <ShowsForm
              formData={formData}
              setFormData={setFormData}
              setLoading={setIsLoading}
              setShows={setShows}
              setInitialData={setInitialData}
              initialData={initialData}
              isFormDialogOpen={isFormDialogOpen}
              setIsFormDialogOpen={setIsFormDialogOpen}
            />
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : shows.length === 0 ? (
              <p className="text-muted-foreground">No shows yet</p>
            ) : (
              shows.map((show: any) => (
                <Card
                  key={show.id}
                  className="p-4 border-primary/20 flex justify-between items-center"
                >
                  <PictureDialog
                    url={imageUrl}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                  {show?.image_url ? (
                    <div className="space-y-2 w-full md:w-96">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">
                            Picture uploaded
                          </p>
                          <button
                            onClick={() => {
                              setImageUrl(show.image_url);
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
                            handleDeleteImage(show.image_url, show.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <FileUpload
                      itemId={String(show.id)}
                      type="shows"
                      userId="IMG"
                      onUploadComplete={handleUploadComplete}
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{show.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Host: {show.host}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Genre: {show.genre}
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
