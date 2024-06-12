import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          dns: false,
          net: false,
          tls: false,
        },
      };
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      swcMinify: true,
      dest: "public",
      fallbacks: {
        //image: "/static/images/fallback.png",
        document: "/offline", // if you want to fallback to a custom page rather than /_offline
        // font: '/static/font/fallback.woff2',
        // audio: ...,
        // video: ...,
      },
      workboxOptions: {
        disableDevLogs: true,
      },
      // ... other options you like
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
