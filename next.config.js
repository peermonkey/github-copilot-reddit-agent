/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for Turbopack
  experimental: {
    turbo: {
      // Turbopack configuration options
      rules: {
        // Custom file processing rules can be added here
      },
    },
    // Enable server components by default
    serverComponentsExternalPackages: ['prisma', '@prisma/client'],
  },
  
  // Turbopack is automatically enabled in development when using --turbo flag
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Image optimization
  images: {
    domains: [
      'github.com',
      'reddit.com',
      'redd.it',
      'i.redd.it',
      'external-preview.redd.it',
    ],
  },
  
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/reddit/:path*',
        destination: '/api/reddit/:path*',
      },
      {
        source: '/api/github/:path*',
        destination: '/api/github/:path*',
      },
    ];
  },
  
  // Headers configuration for security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  
  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
  
  // TODO: Add additional configurations as needed:
  // - Custom webpack configurations
  // - Bundle analyzer setup
  // - PWA configuration
  // - Performance monitoring
  // - Error tracking integration
};

module.exports = nextConfig;