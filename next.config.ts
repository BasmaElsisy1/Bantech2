/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.bantech.ae",
            },
            {
                protocol: "https",
                hostname: "portal.bantech.ae"
            }
        ],
    },
    async redirects() {
        return [
            {
                source: "/career",
                destination: "/careers",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/about",
                destination: "/about-us",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/privacy",
                destination: "/privacy-policy",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/contact",
                destination: "/contact-us",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/career/:slug*",
                destination: "/careers",
                permanent: true,
            },
            {
                source: "/blog",
                destination: "/blogs",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/blog/:slug*",
                destination: "/blogs",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/ticketing-service",
                destination: "/ticketing-system",
                permanent: true,
                statusCode: 301,
            },
            {
                source: "/career",
                has: [
                    {
                        type: "query",
                        key: "category_id",
                        value: "3",
                    },
                ],
                destination: "/careers",
                permanent: true,
                statusCode: 301,
            },
        ];
    },
};

export default nextConfig;
