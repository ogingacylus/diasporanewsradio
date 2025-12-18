"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  FileText,
  Radio,
  Calendar,
  MessageSquare,
  Menu,
  X,
  Newspaper,
  Lightbulb,
  Camera,
  Megaphone,
  MessageSquareDot,
  MessageCircleMore,
  HeartHandshakeIcon,
} from "lucide-react";

export function CMSSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "News & Updates", href: "/admin/news", icon: FileText },
    { label: "Shows", href: "/admin/shows", icon: Radio },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Stories", href: "/admin/stories", icon: Newspaper },
    { label: "Advice", href: "/admin/advice", icon: Lightbulb },
    { label: "Media Hub", href: "/admin/media", icon: Camera },
    { label: "Marketing", href: "/admin/marketing", icon: Megaphone },
    {
      label: "Visitors Messages",
      href: "/admin/visitors",
      icon: MessageSquareDot,
    },
    {
      label: "Advertisers Messages",
      href: "/admin/advertisement",
      icon: MessageCircleMore,
    },
    {
      label: "Health Coner",
      href: "/admin/health-coner",
      icon: HeartHandshakeIcon,
    },
  ];

  return (
    <>
      <aside className="w-64 bg-secondary border-r border-primary/20 h-screen flex flex-col p-6 hidden md:flex">
        <h2 className="text-2xl font-bold mb-8 text-white">CMS Admin</h2>

        <nav className="space-y-2 flex-1">
          {/* Large screens */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Icon size={20} />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-2 border-white/30 text-white hover:bg-white/10 bg-transparent cursor-pointer mt-4"
        >
          <LogOut size={20} />
          Logout
        </Button>
      </aside>

      {/* Mobile screens */}
      <div>
        {isOpen && (
          <aside className="w-64 bg-secondary border-r border-primary/20 h-screen flex flex-col p-6 flex md:hidden absolute z-50 transform transition-all duration-700 ease-in-out">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">CMS Admin</h2>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              {/* Large screens */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <Icon size={20} />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2 border-white/30 text-white hover:bg-white/10 bg-transparent cursor-pointer mt-4"
            >
              <LogOut size={20} />
              Logout
            </Button>
          </aside>
        )}
        {/* Mobile Menu Button */}
        <div className="py-4 pl-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
