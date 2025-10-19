import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        typedEnv: true,
        browserDebugInfoInTerminal: true,
    },
};

export default nextConfig;
