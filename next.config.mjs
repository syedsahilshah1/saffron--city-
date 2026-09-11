/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap', 'three', '@gsap/react'],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache to avoid webpack PackFileCacheStrategy disk allocation heap crashes
      config.cache = {
        type: 'memory',
      };
    }
    return config;
  },
};

export default nextConfig;
