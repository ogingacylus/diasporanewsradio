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
import { createHealthItem, updateHealthItem } from "@/lib/actions";

export function NewsForm({
  formData,
  setFormData,
  setInitialData,
  initialData,
  isFormDialogOpen,
  setIsFormDialogOpen,
}: {
  formData: any;
  setFormData: any;
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
      author: "",
      description: "",
      category: "",
      image_url: "",
      published: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await createHealthItem(form);

    if (res.success) {
      resetForm();
      setIsLoading(false);
      setIsFormDialogOpen(false);
    }
    setIsLoading(false);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await updateHealthItem(form);

    if (res.success) {
      resetForm();
      setIsLoading(false);
      setIsFormDialogOpen(false);
      return;
    }
    setIsLoading(false);
    return;
  };

  return (
    <Dialog open={isFormDialogOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold"></DialogTitle>
          <DialogDescription className="font-serif"></DialogDescription>
        </DialogHeader>
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Item" : "Create New Item"}
        </h2>
        <form
          onSubmit={initialData ? handleEdit : handleSubmit}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                className="hidden"
                name="id"
                value={formData.id}
                readOnly
              />
              <Input
                name="title"
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
                name="author"
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
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Article content"
              rows={6}
              className="w-full px-3 py-2 border border-green-500 rounded-md bg-background"
              required
            />
          </div>

          <div className="py-4 flex gap-4  items-center">
            <input
              className="h-5 w-5 cursor-pointer"
              type="checkbox"
              id="option1"
              name="published"
              value={formData.published}
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
              {initialData ? "Edit" : "Create Item"}
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
