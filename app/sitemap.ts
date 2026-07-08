import { MetadataRoute } from "next";
import { fetchFromAPI } from "./apis/general";
export const runtime = 'edge';
const WEBSITE_HOST_URL = process.env.NEXT_PUBLIC_API_FrontEnd || "https://bantech.ae";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const Blogs = await fetchFromAPI("blogs?filter[type]=1");
    const Talks = await fetchFromAPI("blogs?filter[type]=2");
    const STATIC_LAST_MODIFIED = new Date("2026-05-15");


    const AllBlogsEN = Blogs.data.map(
        (blog: {
            slug: string;
            updatedAt: string;
            created_at: string;
        }) => ({
            url: `${WEBSITE_HOST_URL}/blogs/${blog.slug}`,
            lastModified: new Date(blog.created_at),
            changeFrequency: "weekly" as const,
        })
    );
    const AllTalksEN = Talks.data.map(
        (talk: {
            slug: string;
            updatedAt?: string;
            created_at: string;
        }) => ({
            url: `${WEBSITE_HOST_URL}/talks/${talk.slug}`,
            lastModified: new Date(talk.created_at),
            changeFrequency: "weekly" as const,
        })
    );
    const routes = [
        { url: WEBSITE_HOST_URL, priority: 1.0, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/about-us`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/ai-chatbot`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/blogs`, priority: 0.8, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/careers`, priority: 0.8, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/contact-us`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/cookies-policy`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/digital-transformation`, priority: 0.8, changeFrequency: "monthly" },
        { url: `${WEBSITE_HOST_URL}/ekyc`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/faqs`, priority: 0.8, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/kyc-terms-and-conditions`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/our-locations`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/payment-links`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/pricing`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/privacy-policy`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/talks`, priority: 0.8, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/terms-of-services`, priority: 0.8, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/ticketing-service`, priority: 0.8, changeFrequency: "daily" },
        { url: `${WEBSITE_HOST_URL}/partners/terms`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/partners`, priority: 0.8, changeFrequency: "weekly" },
        { url: `${WEBSITE_HOST_URL}/partners/apply`, priority: 0.8, changeFrequency: "weekly" },

    ].map((route) => ({
        url: route.url,
        // lastModified: new Date().toISOString(),
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: route.changeFrequency,
        priority: route.priority || 0.5,
    }));

    return [
        ...routes,
        ...AllBlogsEN,
        ...AllTalksEN
    ];
}