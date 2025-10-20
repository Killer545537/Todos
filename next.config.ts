import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        typedEnv: true,
        browserDebugInfoInTerminal: true,
    },
};

export default nextConfig;
