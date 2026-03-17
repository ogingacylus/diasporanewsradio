"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSSidebar } from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, ImageIcon, UploadCloud } from "lucide-react";
import { PictureDialog } from "../picture-dialog";
import { FileUpload } from "../file-upload";
import { StoriesForm } from "./form";
import { formatDate } from "@/lib/utils";
import { FilesModal } from "../files-modal";

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
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isFilesDialogOpen, setIsFilesDialogOpen] = useState(false);
  const [filesModalItem, setFilesModalItem] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    excerpt: "",
    title: "",
    author: "",
    category: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    published: false,
  });

  const handleUploadComplete = (result: any) => {
    fetchStories();
    console.log("Upload completed:", result);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchStories();
  }, [router]);

  const fetchStories = async () => {
    try {
      const response = await fetch("/api/admin/stories");
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (
    url: string,
    itemId: any,
    isPara: any,
    index: any,
    paragraphItems: any,
  ) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/delete-image/`, {
        method: "DELETE",
        body: JSON.stringify({
          imageUrl: url,
          itemId: itemId,
          type: "stories",
          isPara: isPara,
          index: String(index),
          paragraphItems: paragraphItems,
        }),
      });
      if (response.ok) {
        fetchStories();
        setInitialData(false);
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleDelete = async (id: number, item: any) => {
    if (item?.image_url) {
      alert("Delete  picture first!");
      return;
    }

    const para = item.paragraphs?.filter(
      (par: any, index: number) => par.url?.length > 2,
    );

    if (para.length > 0) {
      alert("Delete paragraph pictures first!");
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/admin/stories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchStories();
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
            <h1 className="text-md md:text-4xl font-bold">Manage Stories</h1>
            <Button
              onClick={() => setIsFormDialogOpen(true)}
              className="bg-accent hover:bg-accent/90 gap-2">
              <Plus size={20} />
              New Story
            </Button>
            <StoriesForm
              formData={formData}
              setFormData={setFormData}
              setLoading={setIsLoading}
              setStories={setStories}
              setInitialData={setInitialData}
              initialData={initialData}
              isFormDialogOpen={isFormDialogOpen}
              setIsFormDialogOpen={setIsFormDialogOpen}
            />
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : stories.length === 0 ? (
              <p className="text-muted-foreground">No stories yet</p>
            ) : (
              stories.map((show: any) => (
                <Card
                  key={show.id}
                  className="p-4 border-primary/20 flex justify-between items-center">
                  <PictureDialog
                    url={imageUrl}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />

                  <div>
                    <h3 className="font-bold">{show.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Title: {show.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Exerpt: {show.excerpt}
                    </p>
                    date: {formatDate(new Date(String(show.updated_at)))}
                    <p
                      className={`text-md ${
                        show.published ? "text-green-500" : "text-yellow-500"
                      }`}>
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
                      }}>
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-blue-500 hover:bg-blue-500/90 bg-transparent cursor-pointer"
                      onClick={() => {
                        setFilesModalItem(show);
                        setIsFilesDialogOpen(true);
                      }}>
                      <UploadCloud size={16} />
                      Pictures
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => handleDelete(show.id, show)}>
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))
            )}
            <FilesModal
              isFilesDialogOpen={isFilesDialogOpen}
              setIsFilesDialogOpen={setIsFilesDialogOpen}
              item={filesModalItem}
              type="stories"
              userId="IMG"
              onUploadComplete={handleUploadComplete}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              handleDeleteImage={handleDeleteImage}
              handleUploadComplete={handleUploadComplete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
