"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, FileText, Radio, Calendar, MessageSquare } from "lucide-react"

export function CMSSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "News & Updates", href: "/admin/news", icon: FileText },
    { label: "Shows", href: "/admin/shows", icon: Radio },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  ]

  return (
    <aside className="w-64 bg-secondary border-r border-primary/20 h-screen flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8 text-primary">CMS Admin</h2>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-2">
                <Icon size={20} />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full justify-start gap-2 border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
      >
        <LogOut size={20} />
        Logout
      </Button>
    </aside>
  )
}
