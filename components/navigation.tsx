"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Radio, ChevronDown, Volume2 } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [shows, setShows] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  const filtredshows = shows?.map((show) => ({
    name: show.title,
    href: `/shows/${show.id}`,
  }));

  const filteredNews = news?.map((item) => ({
    name: item.title,
    href: `/news/${item.id}`,
  }));

  useEffect(() => {
    fetchShows();
    fetchNews();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/admin/shows");
      if (response.ok) {
        const data = await response.json();
        setShows(data);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
    }
  };

  const dropdownItems = {
    shows: filtredshows,
    // shows: [
    //   { name: "Morning Hits Mix", href: "/shows/1" },
    //   { name: "The Late Night Sessions", href: "/shows/2" },
    //   { name: "Indie Spotlight", href: "/shows/3" },
    //   { name: "Urban Beats Radio", href: "/shows/4" },
    // ],
    news: filteredNews,
    gallery: [
      { name: "Photos", href: "#1" },
      { name: "Videos", href: "#2" },
    ],
    community: [
      { name: "Stories", href: "/stories" },
      { name: "Advice and Inspiration", href: "/advice" },
    ],
    resources: [
      { name: "Stories", href: "/stories" },
      { name: "Advice and Inspiration", href: "/advice" },
      { name: "Media Hub", href: "/media" },
      { name: "Advertise", href: "/marketing" },
      { name: "Marketing Board", href: "/advertisements" },
    ],
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image src="/diaspora-logo.png" alt="logo" height={70} width={70} />
            <span className="text-xl font-bold text-foreground  sm:inline">
              Diaspora News Radio
            </span>
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
                <Link
                  href="/shows"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shows
                </Link>
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform"
                />
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
                <Link
                  href="/news"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  News
                </Link>
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform"
                />
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
            {/* Community Dropdown */}
            {/* <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Community
                </Link>
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform"
                />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                {dropdownItems.community.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div> */}
            <Link
              href="/events"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Upcomming Events
            </Link>
            {/* Resouces Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                Resources
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform"
                />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                {dropdownItems.resources.map((item) => (
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

            <Link
              href="https://zeno.fm/radio/diaspora-news-radio/"
              className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Listen Live
              <div className="w-8 h-8 rounded-full border-4 border-accent/50 flex items-center justify-center animate-pulse">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
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
                onClick={() =>
                  setOpenDropdown(openDropdown === "shows" ? null : "shows")
                }
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
              >
                Shows
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openDropdown === "shows" ? "rotate-180" : ""
                  }`}
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
                onClick={() =>
                  setOpenDropdown(openDropdown === "news" ? null : "news")
                }
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
              >
                News
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openDropdown === "news" ? "rotate-180" : ""
                  }`}
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

            {/* Mobile Community Dropdown */}
            {/* <div>
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "community" ? null : "community"
                  )
                }
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
              >
                Community
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openDropdown === "news" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "community" && (
                <div className="pl-4 space-y-1 mt-1">
                  {dropdownItems.community.map((item) => (
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
            </div> */}
            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "resources" ? null : "resources"
                  )
                }
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded"
              >
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openDropdown === "news" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "resources" && (
                <div className="pl-4 space-y-1 mt-1">
                  {dropdownItems.resources.map((item) => (
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
            <Link
              href="https://zeno.fm/radio/diaspora-news-radio/"
              className="w-full mt-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-4 "
            >
              Listen Live
              <div className="w-8 h-8 rounded-full border-4 border-accent/50 flex items-center justify-center animate-pulse">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
