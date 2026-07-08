import { generatePageMetadata } from "@/lib/seo";
import Homepage from "./_components/MainPages/Homepage";
import { getServerSideProps  } from "./apis/general";
import { Metadata } from "next";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/home-page");
}

export default async function Home() {
  const Data = await getServerSideProps ('pages/home-page');
  const Blogs = await getServerSideProps ('blogs?limit=3&filter[type]=1')

  return (
    <Homepage
     data={Data.props.data.data.extra_content}
     BlogsData={Blogs.props.data.data}
     />
  );
}
