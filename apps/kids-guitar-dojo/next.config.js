//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires

const { composePlugins, withNx } = require('@nx/next');
const headers = require('./config/headers');
const pluginsExtends = require('./config/plugins');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  transpilePackages: ['three'],
  experimental: {
    taint: true,
  },
  ...(process.env.NEXT_PUBLIC_PRODUCTION && headers),
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns : [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
    }],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'img.clerk.com',
    //     port: '',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'kids-guitar-dojo.b-cdn.net',
    //     port: '',
    //   },
    // ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  ...pluginsExtends,
];

module.exports = composePlugins(...plugins)(nextConfig);
