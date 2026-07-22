import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  basePath: '/divagym',
  images: {
    unoptimized: true,
  },
  output: 'export',
  transpilePackages: ['motion'],
};

export default nextConfig;
