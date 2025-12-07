/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://www.diasporanewsradio.com/",
      },
      {
        protocol: "https",
        hostname: "https://https://storage.googleapis.com/",
      },
      {
        protocol: "https",
        hostname: "*.storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
