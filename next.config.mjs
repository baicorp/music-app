/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "p2.music.126.net",
      },
    ],
  },
};

export default nextConfig;
