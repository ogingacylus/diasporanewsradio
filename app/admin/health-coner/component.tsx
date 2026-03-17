"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSSidebar } from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, ImageIcon, UploadCloud } from "lucide-react";
import { PictureDialog } from "../picture-dialog";
import { FileUpload } from "../file-upload";
import { NewsForm } from "./form";
import { deleteHealth, revalidateAdminPath } from "@/lib/actions";
import { FilesModal } from "../files-modal";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  published: boolean;
  created_at: string;
}

export default function AdminHealthPage({ news }: { news: any }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isFilesDialogOpen, setIsFilesDialogOpen] = useState(false);
  const [filesModalItem, setFilesModalItem] = useState({});
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
    await revalidateAdminPath("health-coner");
    setLoading(false);
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
          type: "health",
          isPara: isPara,
          index: String(index),
          paragraphItems: paragraphItems,
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
    const para = item.paragraphs?.filter(
      (par: any, index: number) => par.url?.length > 2,
    );

    if (para.length > 0) {
      alert("Delete paragraph pictures first!");
      return;
    }

    if (!confirm("Are you sure?")) return;

    await deleteHealth(id);
    setInitialData(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-md md:text-4xl font-bold">Health Coner</h1>
            <Button
              onClick={() => setIsFormDialogOpen(true)}
              className="bg-accent hover:bg-accent/90 gap-2 cursor-pointer">
              <Plus size={20} />
              New Item
            </Button>
            <NewsForm
              formData={formData}
              setFormData={setFormData}
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
                  className="p-4 border-primary/20 flex justify-between items-center">
                  <PictureDialog
                    url={imageUrl}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    {item.published ? (
                      <p className="text-md text-green-500">Published</p>
                    ) : (
                      <p className="text-md text-red-500">No published</p>
                    )}
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
                      }}>
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-blue-500 hover:bg-blue-500/90 bg-transparent cursor-pointer"
                      onClick={() => {
                        setFilesModalItem(item);
                        setIsFilesDialogOpen(true);
                      }}>
                      <UploadCloud size={16} />
                      Pictures
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => handleDelete(item.id, item)}>
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
              type="health"
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
