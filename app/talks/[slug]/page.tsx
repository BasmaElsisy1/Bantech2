
import { getServerSideProps  } from "@/app/apis/general";
import { notFound } from "next/navigation";

import SingleBlog from "@/app/_components/MainPages/SingleBlog";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return generatePageMetadata(`blogs/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const SingleBlogData = await getServerSideProps (`blogs/${slug}`);
    if (!SingleBlogData.props.data.data) {
        notFound();
    }

    return (
        <SingleBlog
            data={SingleBlogData.props.data.data}
        />
    );
}
