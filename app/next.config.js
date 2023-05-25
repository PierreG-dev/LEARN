/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  env: {},
  trailingSlash: true,
  nextConfig,
  useFileSystemPublicRoutes: false,
};
