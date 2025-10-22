/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a standalone output which produces `.next/standalone`
  // so we can copy a minimal runtime into the final Docker image.
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
