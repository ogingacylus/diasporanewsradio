"use client";

import type React from "react";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CMSSidebar} from "@/components/cms-sidebar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {
    Trash2,
    Edit2,
    Plus,
    CloudUpload,
    FileCheck,
    ImageIcon, UploadCloud,
} from "lucide-react";
import {FileUpload} from "../file-upload";
import {PictureDialog} from "../picture-dialog";
import {EventForm} from "./form";
import {FilesModal} from "@/app/admin/files-modal";

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
    const [filesModalItem, setFilesModalItem] = useState({});
    const [isFilesDialogOpen, setIsFilesDialogOpen] = useState(false);
    const [modalItemIndex, setModalItemIndex] = useState(0);
    const [isDeletingImage, setIsDeletingImage] = useState(false);
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
                setFilesModalItem(data[modalItemIndex])
            }
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (url: string, itemId: any) => {
        if (!confirm("Are you sure?")) return;

        setIsDeletingImage(true);
        try {
            const response = await fetch(`/api/delete-image/`, {
                method: "DELETE",
                body: JSON.stringify({imageUrl: url, itemId: itemId, type: "event"}),
            });
            if (response.ok) {
                fetchEvents();
                setInitialData(false);
                setIsDeletingImage(false);
            }
        } catch (error) {
            console.error("Failed to delete:", error);
            setIsDeletingImage(false);
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
            <CMSSidebar/>

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
                            <Plus size={20}/>
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
                            events.map((event, index: number) => (
                                <Card
                                    key={event.id}
                                    className="p-4 border-primary/20 flex justify-between items-center"
                                >
                                    <PictureDialog
                                        url={imageUrl}
                                        isDialogOpen={isDialogOpen}
                                        setIsDialogOpen={setIsDialogOpen}
                                    />

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
                                            <Edit2 size={16}/>
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-1 text-blue-500 hover:bg-blue-500/90 bg-transparent cursor-pointer"
                                            onClick={() => {
                                                setFilesModalItem(event);
                                                setModalItemIndex(index);
                                                setIsFilesDialogOpen(true);
                                            }}>
                                            <UploadCloud size={16}/>
                                            Pictures
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-1 text-red-500 hover:bg-red-500/10 bg-transparent cursor-pointer"
                                            onClick={() => handleDelete(event.id, event)}
                                        >
                                            <Trash2 size={16}/>
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
                            type="event"
                            userId="IMG"
                            onUploadComplete={handleUploadComplete}
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            imageUrl={imageUrl}
                            setImageUrl={setImageUrl}
                            handleDeleteImage={handleDeleteImage}
                            handleUploadComplete={handleUploadComplete}
                            isDeletingImage={isDeletingImage}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
