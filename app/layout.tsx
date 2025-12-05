import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { TopNav } from "@/components/top-nav";
import { Navigation } from "@/components/navigation";
import { DataContextProvider } from "@/components/provider";
import { fetchNews, fetchShows } from "@/lib/client-data/data";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diasporsa News Radio",
  description: "Listen to the world",
  generator: "",
  icons: {
    icon: [
      {
        url: "/diaspora-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/diaspora-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/diaspora-logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shows = await fetchShows();
  const news = await fetchNews();
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <DataContextProvider showsData={shows} newsData={news}>
          <Navigation />
          <div className="mt-12"> {children}</div>
          <Analytics />
        </DataContextProvider>
      </body>
    </html>
  );
}
