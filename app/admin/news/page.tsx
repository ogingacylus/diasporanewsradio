"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CMSSidebar } from "@/components/cms-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  category: string
  published: boolean
  created_at: string
}

export default function AdminNewsPage() {
  const router = useRouter()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    fetchNews()
  }, [router])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/admin/news")
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      }
    } catch (error) {
      console.error("Failed to fetch news:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ title: "", description: "", category: "", image_url: "" })
        setShowForm(false)
        fetchNews()
      }
    } catch (error) {
      console.error("Failed to create news:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/admin/news/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchNews()
      }
    } catch (error) {
      console.error("Failed to delete news:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">News & Updates</h1>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={20} />
              New Article
            </Button>
          </div>

          {showForm && (
            <Card className="p-6 mb-8 border-primary/20">
              <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Article title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., News, Update, Announcement"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Article content"
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
                    Create Article
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
            ) : news.length === 0 ? (
              <p className="text-muted-foreground">No articles yet</p>
            ) : (
              news.map((item) => (
                <Card key={item.id} className="p-4 border-primary/20 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</p>
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
                      onClick={() => handleDelete(item.id)}
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
