"use client"

import { useState } from "react"
import { Menu, X, Radio, ChevronDown } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const dropdownItems = {
    shows: [
      { name: "Morning Hits Mix", href: "/shows/1" },
      { name: "The Late Night Sessions", href: "/shows/2" },
      { name: "Indie Spotlight", href: "/shows/3" },
      { name: "Urban Beats Radio", href: "/shows/4" },
    ],
    news: [
      { name: "Latest Updates", href: "/news" },
      { name: "Announcements", href: "/news?category=announcement" },
      { name: "Interviews", href: "/news?category=interview" },
      { name: "Product Updates", href: "/news?category=product" },
    ],
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Radio className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">WAVE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>

            {/* Shows Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                Shows
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                {dropdownItems.shows.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* News Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                News
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                {dropdownItems.news.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>

            <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Listen Live
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
            >
              Home
            </Link>

            {/* Mobile Shows Dropdown */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "shows" ? null : "shows")}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
              >
                Shows
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === "shows" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "shows" && (
                <div className="pl-4 space-y-1 mt-1">
                  {dropdownItems.shows.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile News Dropdown */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "news" ? null : "news")}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
              >
                News
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === "news" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "news" && (
                <div className="pl-4 space-y-1 mt-1">
                  {dropdownItems.news.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#about"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
            >
              Contact
            </Link>
            <button className="w-full mt-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Listen Live
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
