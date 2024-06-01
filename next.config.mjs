/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }
  //   return config
  // },
};

export default nextConfig;



