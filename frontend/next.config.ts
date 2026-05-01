import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Allow local images
    localPatterns: [
      {
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
