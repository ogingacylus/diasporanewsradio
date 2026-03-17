"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import ReactEditor from "@/components/admin-components/quill-editor";

export function NewsForm({
  formData,
  setFormData,
  setLoading,
  setNews,
  setInitialData,
  initialData,
  isFormDialogOpen,
  setIsFormDialogOpen,
}: {
  formData: any;
  setFormData: any;
  setLoading: any;
  setNews: any;
  setInitialData: any;
  initialData: boolean;
  isFormDialogOpen: any;
  setIsFormDialogOpen: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [paragraphs, setParagraphs] = useState([{ description: "", url: "" }]);

  useEffect(() => {
    if (initialData) {
      setParagraphs(formData.paragraphs);
    } else {
      setParagraphs([{ description: "", url: "" }]);
    }
  }, [initialData]);

  const handleModalClose = (modlaState: any) => {
    setIsFormDialogOpen(modlaState);
    resetForm();
    setInitialData(false);
  };
  const resetForm = () => {
    setFormData({
      id: 0,
      title: "",
      author: "",
      description: "",
      category: "",
      image_url: "",
      published: false,
    });
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    formData.paragraphs = paragraphs;

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchNews();
        setIsLoading(false);
        setIsFormDialogOpen(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to create event:", error);
      setIsLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    formData.paragraphs = paragraphs;
    try {
      const response = await fetch(`/api/admin/news/${formData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchNews();
        setIsLoading(false);
        setIsFormDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create event:", error);
      setIsLoading(false);
    }
  };

  function addParagraphs() {
    const currentItems = paragraphs;
    setParagraphs([...currentItems, { description: "", url: "" }]);
  }

  function removeParagraph(index: number, item: any) {
    if (initialData) {
      if (item.url) {
        alert("Delete paragraph image first!");
        return;
      }
    }
    let currentItems = paragraphs;
    if (currentItems.length > 1) {
      setParagraphs(currentItems?.filter((_: any, i: any) => i !== index));
    }
  }

  const handleParagraphChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value } = e.target;
    const updatedItems = paragraphs?.map((item: any, idx: any) =>
      index === idx ? { ...item, description: value } : item,
    );

    setParagraphs(updatedItems);
  };
  return (
    <Dialog open={isFormDialogOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold"></DialogTitle>
          <DialogDescription className="font-serif"></DialogDescription>
        </DialogHeader>
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Event" : "Create New Article"}
        </h2>
        <form
          onSubmit={initialData ? handleEdit : handleSubmit}
          className="space-y-4">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                className="border border-green-500"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Article title"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Author</label>
              <Input
                className="border border-green-500"
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="Article author"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Input
              className="border border-green-500"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g., News, Update, Announcement"
            />
          </div>
          <hr />
          <div className="flex justify-between">
            <h1 className="text-md font-bold">Paragraphs</h1>{" "}
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-500 cursor-pointer"
              onClick={addParagraphs}>
              Add paragraphs
            </Button>
          </div>
          {paragraphs?.map((item: any, index: number) => (
            <div className="border border-1 rounded-md p-2" key={index}>
              <div className="flex justify-between pb-2">
                {" "}
                <label className="block text-sm font-medium mb-2">
                  Paragraph {index + 1}
                </label>{" "}
                <Trash
                  className={`h-5 text-red-600 hover:text-red-500 cursor-pointer ${index < 1 && "hidden"}`}
                  onClick={() => removeParagraph(index, item)}
                />
              </div>
              <textarea
                value={paragraphs[index].description}
                onChange={(e) => handleParagraphChange(e, index)}
                placeholder="Content"
                rows={5}
                className="w-full px-3 py-2 border border-green-500 rounded-md bg-background"
                required
              />
            </div>
          ))}
          <div className="py-4 flex gap-4  items-center">
            <input
              className="h-5 w-5 cursor-pointer"
              type="checkbox"
              id="option1"
              name="published"
              checked={formData.published ? formData.published : false}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
            />
            <label className="text-md">Published</label>
            <br></br>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 cursor-pointer">
              {initialData ? "Edit Event" : "Create Event"}
              {isLoading && (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-100 border-t-transparent"></div>
              )}
            </Button>
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setInitialData(false);
                setIsFormDialogOpen(false);
              }}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
