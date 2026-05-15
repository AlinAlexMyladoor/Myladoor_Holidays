/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  // Proxy all /api/* requests to the Render backend
  // This means users only need ONE URL: myladoor-holidays.vercel.app
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://myladoor-holidays.onrender.com/:path*',
      },
    ];
  },
};

export default nextConfig;
