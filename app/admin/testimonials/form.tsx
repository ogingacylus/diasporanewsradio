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

export function TestimonialsForm({
  formData,
  setFormData,
  setLoading,
  setTestimonials,
  setInitialData,
  initialData,
  isFormDialogOpen,
  setIsFormDialogOpen,
}: {
  formData: any;
  setFormData: any;
  setLoading: any;
  setTestimonials: any;
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
      author_name: "",
      role: "",
      content: "",
      rating: 5,
      image_url: "",
      published: false,
    });
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchTestimonials();
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
      const response = await fetch(`/api/admin/testimonials/${formData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        resetForm();
        fetchTestimonials();
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold"></DialogTitle>
          <DialogDescription className="font-serif"></DialogDescription>
        </DialogHeader>
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Testimonial" : "Create New Testimonial"}
        </h2>
        <form
          onSubmit={initialData ? handleEdit : handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Author Name
              </label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.author_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author_name: e.target.value,
                  })
                }
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Role/Title
              </label>
              <Input
                className="border-green-500"
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="e.g., Listener, Artist, Collaborator"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Testimonial
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="What do they say?"
              rows={5}
              className="w-full px-3 py-2 border border-green-500 rounded-md bg-background"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: Number.parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
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
              {initialData ? "Edit Testimonial" : "Create Testimonial"}
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
