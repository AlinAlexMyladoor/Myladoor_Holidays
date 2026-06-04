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
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn0.weddingwire.in',
      },
      {
        protocol: 'https',
        hostname: 'c.ndtvimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pelago.com',
      },
      {
        protocol: 'https',
        hostname: 'www.oysterworldwide.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fabhotels.com',
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
