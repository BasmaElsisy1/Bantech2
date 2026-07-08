import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import AboutUsPage from '../_components/MainPages/AboutUsPage';
import { getServerSideProps  } from '../apis/general';


export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/about-us-page");
}

export default async function page() {
  const Data = await getServerSideProps ('pages/about-us-page')
  // const FAQsDataRes = await getServerSideProps ('faqs?filter[faq_category_id]=7')
  const Blogs = await getServerSideProps ('blogs?limit=3&filter[type]=1')
  return (
    <AboutUsPage data={Data.props.data.data.extra_content} BlogsData={Blogs.props.data.data} />
  )
}