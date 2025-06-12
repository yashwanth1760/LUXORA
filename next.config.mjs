/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,  // add this line
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
    }
  },

  turbopack: {}, // optional: remove if not using Turbopack
};

export default nextConfig;
