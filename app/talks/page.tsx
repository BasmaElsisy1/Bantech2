
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import TalksPage from "../_components/MainPages/TalksPage";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("pages/talks-page");
}

export default async function Home() {
    const Data = await getServerSideProps ('pages/talks-page');
    const BlogsData = await getServerSideProps ('blogs?filter[type]=2');

    return (
        <TalksPage
            data={Data.props.data.data.extra_content}
            AllBlogs={BlogsData.props.data.data}
        />
    );
}
