/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_PATH: process.env.BASE_PATH,
  },
  basepath: `${process.env.BASE_PATH}`,
  assetPrefix: `${process.env.BASE_PATH}`,
};

module.exports = nextConfig;
