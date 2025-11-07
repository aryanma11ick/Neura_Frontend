/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Skip linting during Vercel builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Optional: skip type checking too
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
