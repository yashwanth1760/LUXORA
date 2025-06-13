/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,  
   eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    turbo: {}, // ✅ disable Turbopack
  },

  // optional: remove if not using Turbopack
};

export default nextConfig;
