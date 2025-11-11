import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    typedRoutes: true,
    cacheComponents: true,
    experimental: {
        typedEnv: true,
        browserDebugInfoInTerminal: true,
    },
    webpack: (config, { isServer }) => {
        // Ignore extension folder during builds
        config.watchOptions = {
            ...config.watchOptions,
            ignored: ['**/extension/**', '**/node_modules/**'],
        };
        return config;
    },
};

export default nextConfig;
