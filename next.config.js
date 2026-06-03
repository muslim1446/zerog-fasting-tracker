/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Cloudflare Pages requires static export for best compatibility
  // Using standalone for flexibility
};

module.exports = nextConfig;
