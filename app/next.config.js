/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
module.exports = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Cours',
        permanent: true,
      },
    ];
  },
};
