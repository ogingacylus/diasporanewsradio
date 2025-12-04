// app/sitemap.ts

import { MetadataRoute } from "next";

const BASE_URL = "https://www.diasporanewsradio.com"; // Replace with your domain

// In a real application, you would fetch these dynamically from a database or CMS.
interface Post {
  id: number;
  title: string;
}

async function fetchDynamicPosts(): Promise<Post[]> {
  // Example: Fetching posts from an API
  // const response = await fetch(`${process.env.API_URL}/posts`);
  // const posts = await response.json();
  // return posts;

  // Mock data for demonstration
  return [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define static routes
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  // 2. Fetch and define dynamic routes
  const posts = await fetchDynamicPosts();
  const dynamicPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  // 3. Combine and return all routes
  return [...staticPages, ...dynamicPosts];
}
