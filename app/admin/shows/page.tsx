"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CMSSidebar } from "@/components/cms-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"

interface Show {
  id: number
  title: string
  host: string
  genre: string
  published: boolean
  created_at: string
}

export default function AdminShowsPage() {
  const router = useRouter()
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    host: "",
    schedule: "",
    genre: "",
    image_url: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    fetchShows()
  }, [router])

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/admin/shows")
      if (response.ok) {
        const data = await response.json()
        setShows(data)
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/shows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          host: "",
          schedule: "",
          genre: "",
          image_url: "",
        })
        setShowForm(false)
        fetchShows()
      }
    } catch (error) {
      console.error("Failed to create show:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/admin/shows/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchShows()
      }
    } catch (error) {
      console.error("Failed to delete show:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Manage Shows</h1>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={20} />
              New Show
            </Button>
          </div>

          {showForm && (
            <Card className="p-6 mb-8 border-primary/20">
              <h2 className="text-2xl font-bold mb-6">Create New Show</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Show Title</label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Show name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Host</label>
                    <Input
                      type="text"
                      value={formData.host}
                      onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                      placeholder="Host name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Genre</label>
                    <Input
                      type="text"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      placeholder="e.g., Jazz, Rock, Hip-Hop"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Schedule</label>
                    <Input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      placeholder="e.g., Mon-Fri 9AM-12PM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Show description"
                    rows={6}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Create Show
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : shows.length === 0 ? (
              <p className="text-muted-foreground">No shows yet</p>
            ) : (
              shows.map((show) => (
                <Card key={show.id} className="p-4 border-primary/20 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{show.title}</h3>
                    <p className="text-sm text-muted-foreground">Host: {show.host}</p>
                    <p className="text-sm text-muted-foreground">Genre: {show.genre}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1 bg-transparent" onClick={() => {}}>
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => handleDelete(show.id)}
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
  )
}
