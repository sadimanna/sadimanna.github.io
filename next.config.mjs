/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // If your repository name is 'sadimanna.github.io', you don't need basePath
  // If it's a different repo name, uncomment and update the following:
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
