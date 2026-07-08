
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import BlogsPage from "../_components/MainPages/BlogsPage";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("pages/blogs-page");
}

export default async function Home() {
    const Data = await getServerSideProps ('pages/blogs-page');
    const BlogsData = await getServerSideProps ('blogs?filter[type]=1');

    return (
        <BlogsPage
            data={Data.props.data.data.extra_content}
            AllBlogs={BlogsData.props.data.data}
        />
    );
}
