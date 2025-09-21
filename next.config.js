/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    serverExternalPackages: [
        'handlebars',
        'dotprompt',
        '@genkit-ai/core',
        'genkit'
    ],
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            'fluent-ffmpeg': false,
            'fs': false,
            'path': false,
            'os': false,
            'handlebars': false,
            'dotprompt': false
        };

        // Ignore handlebars require.extensions warnings
        config.ignoreWarnings = [
            {
                module: /handlebars/,
                message: /require\.extensions/,
            },
            {
                module: /dotprompt/,
            }
        ];

        return config;
    },
    // Firebase hosting compatibility
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    // Disable CSS optimization for deployment
    experimental: {
        cssChunking: false
    },
}

module.exports = nextConfig