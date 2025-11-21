"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/media");
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {loading ? (
        <Loader />
      ) : photos.length === 0 ? (
        <p className="text-muted-foreground text-2xl font-bold py-24 flex justify-center mt-24">
          No items
        </p>
      ) : (
        <>
          {" "}
          <div className="pt-24 mt-10 pb-24">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Camera className="w-10 h-10 text-accent" />
                Photo Gallery
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Capture the moments that make our station special. From live
                events to behind-the-scenes action.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-card border border-border"
                >
                  <Image
                    src={photo.image_url || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-medium text-lg">
                      {photo.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
