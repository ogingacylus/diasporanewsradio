import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
