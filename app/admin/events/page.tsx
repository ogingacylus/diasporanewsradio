"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSSidebar } from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Trash2,
  Edit2,
  Plus,
  CloudUpload,
  FileCheck,
  ImageIcon,
} from "lucide-react";
import { FileUpload } from "../file-upload";
import { PictureDialog } from "../picture-dialog";
import { EventForm } from "./form";

interface Event {
  id: number;
  description: string;
  title: string;
  location: string;
  date: string;
  ticket_url: string;
  image_url: string;
  published: boolean;
  edit: boolean;
}

export default function AdminEventsPage() {
  const [initialData, setInitialData] = useState(false);
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    location: "",
    date: "",
    ticket_url: "",
    image_url: "",
    published: false,
    edit: false,
  });

  const handleUploadComplete = (result: any) => {
    fetchEvents();
    console.log("Upload completed:", result);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchEvents();
  }, [router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (url: string, itemId: any) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/delete-image/`, {
        method: "DELETE",
        body: JSON.stringify({ imageUrl: url, itemId: itemId, type: "event" }),
      });
      if (response.ok) {
        fetchEvents();
        setInitialData(false);
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const handleDelete = async (id: number, item: any) => {
    if (item?.image_url) {
      alert("Delete event picture first!");
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-md md:text-4xl font-bold">Manage Events</h1>
            <Button
              onClick={() => {
                setIsFormDialogOpen(true);
              }}
              className="bg-accent hover:bg-accent/90 gap-2 cursor-pointer"
            >
              <Plus size={20} />
              New Event
            </Button>
            <EventForm
              formData={formData}
              setFormData={setFormData}
              setLoading={setIsLoading}
              setEvents={setEvents}
              setInitialData={setInitialData}
              initialData={initialData}
              isFormDialogOpen={isFormDialogOpen}
              setIsFormDialogOpen={setIsFormDialogOpen}
            />
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : events.length === 0 ? (
              <p className="text-muted-foreground">No events yet</p>
            ) : (
              events.map((event) => (
                <Card
                  key={event.id}
                  className="p-4 border-primary/20 flex justify-between items-center"
                >
                  <PictureDialog
                    url={imageUrl}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                  {event.image_url ? (
                    <div className="space-y-2 w-full md:w-96">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">
                            Picture uploaded
                          </p>
                          <button
                            onClick={() => {
                              setImageUrl(event.image_url);
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
                            handleDeleteImage(event.image_url, event.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <FileUpload
                      itemId={String(event.id)}
                      type="event"
                      userId="IMG"
                      onUploadComplete={handleUploadComplete}
                    />
                  )}

                  <div>
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 bg-transparent cursor-pointer"
                      onClick={() => {
                        setInitialData(true);
                        setFormData(event);
                        setIsFormDialogOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-500 hover:bg-red-500/10 bg-transparent cursor-pointer"
                      onClick={() => handleDelete(event.id, event)}
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
