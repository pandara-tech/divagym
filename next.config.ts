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
  assetPrefix: '/divagym',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
    loader: 'custom',
    path: '/divagym/_next/image',
  },
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['motion'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './app'),
      '@/app': require('path').resolve(__dirname, './app'),
      '@/components': require('path').resolve(__dirname, './app'),
    };
    return config;
  },
};

export default nextConfig;
