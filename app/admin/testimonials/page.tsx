"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CMSSidebar } from "@/components/cms-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"

interface Testimonial {
  id: number
  author_name: string
  role: string
  rating: number
  published: boolean
}

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    author_name: "",
    role: "",
    content: "",
    rating: 5,
    image_url: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    fetchTestimonials()
  }, [router])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          author_name: "",
          role: "",
          content: "",
          rating: 5,
          image_url: "",
        })
        setShowForm(false)
        fetchTestimonials()
      }
    } catch (error) {
      console.error("Failed to create testimonial:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <CMSSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Manage Testimonials</h1>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={20} />
              New Testimonial
            </Button>
          </div>

          {showForm && (
            <Card className="p-6 mb-8 border-primary/20">
              <h2 className="text-2xl font-bold mb-6">Add New Testimonial</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Author Name</label>
                    <Input
                      type="text"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role/Title</label>
                    <Input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Listener, Artist, Collaborator"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Testimonial</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="What do they say?"
                    rows={5}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
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
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Add Testimonial
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
            ) : testimonials.length === 0 ? (
              <p className="text-muted-foreground">No testimonials yet</p>
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-4 border-primary/20 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{testimonial.author_name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-yellow-500">{"⭐".repeat(testimonial.rating)}</p>
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
                      onClick={() => handleDelete(testimonial.id)}
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
