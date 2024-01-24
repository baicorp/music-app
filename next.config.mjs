/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "p2.music.126.net",
      },
      {
        protocol: "http",
        hostname: "p1.music.126.net",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pipedproxy.kavin.rocks",
      },
    ],
  },
};

export default nextConfig;
