import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    typedRoutes: true,
    cacheComponents: true,
    experimental: {
        typedEnv: true,
        browserDebugInfoInTerminal: true,
    },
};

export default nextConfig;
