/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kcmedia.evermdesign.com',
      },
    ],
  },
}

module.exports = nextConfig
