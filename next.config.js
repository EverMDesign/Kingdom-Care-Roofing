/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-e208ced336924f319590ff630e2d3a92.r2.dev',
      },
    ],
  },
}

module.exports = nextConfig
