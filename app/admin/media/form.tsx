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

export function MediaForm({
  formData,
  setFormData,
  setLoading,
  setMedia,
  setInitialData,
  initialData,
  isFormDialogOpen,
  setIsFormDialogOpen,
}: {
  formData: any;
  setFormData: any;
  setLoading: any;
  setMedia: any;
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
      title: "",
      published: false,
    });
  };

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/admin/media");
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
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
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchMedia();
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
      const response = await fetch(`/api/admin/media/${formData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchMedia();
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
          {initialData ? "Edit" : "Add Media"}
        </h2>
        <form
          onSubmit={initialData ? handleEdit : handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Media tittle"
                required
              />
            </div>
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
              className="bg-accent hover:bg-accent/90 cursor-pointer"
            >
              {initialData ? "Edit media" : "Add"}
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
