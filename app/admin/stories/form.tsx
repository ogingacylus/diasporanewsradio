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

export function StoriesForm({
  formData,
  setFormData,
  setLoading,
  setStories,
  setInitialData,
  initialData,
  isFormDialogOpen,
  setIsFormDialogOpen,
}: {
  formData: any;
  setFormData: any;
  setLoading: any;
  setStories: any;
  setInitialData: any;
  initialData: boolean;
  isFormDialogOpen: any;
  setIsFormDialogOpen: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = (modlaState: any) => {
    setIsFormDialogOpen(modlaState);
    resetForm();
    setInitialData(false);
  };
  const resetForm = () => {
    setFormData({
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
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchStories();
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
    try {
      const response = await fetch(`/api/admin/stories/${formData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchStories();
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

  return (
    <Dialog open={isFormDialogOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-700">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold"></DialogTitle>
          <DialogDescription className="font-serif"></DialogDescription>
        </DialogHeader>
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Story" : "Create New Story"}
        </h2>
        <form
          onSubmit={initialData ? handleEdit : handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Show Title <span className="text-red-500">*</span>
              </label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Show name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Exerpt/Headline <span className="text-red-500">*</span>
              </label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Host name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., Industry, Lifestyle, Community"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="Author's name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Paragraph 1 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.paragraph1}
              onChange={(e) =>
                setFormData({ ...formData, paragraph1: e.target.value })
              }
              placeholder="Paragraph 1"
              rows={6}
              className="w-full px-3 py-2 border border-green-500 rounded-md bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Paragraph 2
            </label>
            <textarea
              value={formData.paragraph2}
              onChange={(e) =>
                setFormData({ ...formData, paragraph2: e.target.value })
              }
              placeholder="Paragraph 2"
              rows={6}
              className="w-full px-3 py-2 border border-green-500 rounded-md bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Paragraph 3
            </label>
            <textarea
              value={formData.paragraph3}
              onChange={(e) =>
                setFormData({ ...formData, paragraph3: e.target.value })
              }
              placeholder="Paragraph 3"
              rows={6}
              className="w-full px-3 py-2 border border-green-500 rounded-md bg-background"
            />
          </div>
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
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              {initialData ? "Edit Story" : "Create Story"}
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
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
