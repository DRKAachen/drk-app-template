/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@drk/design-system'],
  sassOptions: {
    includePaths: ['./node_modules/@drk/design-system/styles', './styles'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
