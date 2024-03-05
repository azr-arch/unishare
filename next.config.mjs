/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "third-fennec-982.convex.cloud",
                protocol: "https",
            },
            {
                hostname: "localhost",
                protocol: "http",
            },
        ],
    },
};

export default nextConfig;
