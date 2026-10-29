"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, UnlockKeyhole } from "lucide-react";
import { CMSSidebar } from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SiteLockPage() {
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.assign("/admin/login");
      return;
    }

    fetch("/api/admin/site-lock", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to load site lock status");
        }
        setLocked(data.locked);
      })
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load site lock status"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleLock = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.assign("/admin/login");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/site-lock", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locked: !locked }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update site lock status");
      }
      setLocked(data.locked);
    } catch (saveError: unknown) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to update site lock status"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-4xl font-bold">Site lock</h1>
        <Card className="max-w-2xl space-y-5 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {loading
                ? "Loading site status..."
                : locked
                  ? "The site is locked"
                  : "The site is live"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              When locked, visitors see a notice that the site is unavailable
              due to unpaid bills. Admin pages remain accessible.
            </p>
          </div>
          <Button
            onClick={toggleLock}
            disabled={loading || saving || Boolean(error)}
            variant={locked ? "default" : "destructive"}
            className="gap-2"
          >
            {locked ? (
              <UnlockKeyhole size={18} aria-hidden="true" />
            ) : (
              <LockKeyhole size={18} aria-hidden="true" />
            )}
            {saving ? "Saving..." : locked ? "Unlock site" : "Lock site"}
          </Button>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </Card>
      </main>
    </div>
  );
}
