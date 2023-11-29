/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.incrivelsorteios.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
