/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Static export mode for Cloudflare Pages deployment
  // Generates static HTML files in .next/out directory
  distDir: '.next/out',
};

module.exports = nextConfig;
