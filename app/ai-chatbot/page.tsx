
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import AIChatBot from "../_components/MainPages/AIChatbot";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/ai-chatbot");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/ai-chatbot')
  const Blogs = await getServerSideProps ('blogs?limit=3&filter[type]=1')
  const Faqs = await getServerSideProps ('faqs?filter[faq_category_id]=2');
  const Contactus = await getServerSideProps ('pages/contact-us-page')
  return (
    <AIChatBot
      data={Data.props.data.data.extra_content}
      BlogsData={Blogs.props.data.data}
      Faqs={Faqs.props.data.data}
      ContactusImage={Contactus.props.data.data}
    />
  );
}
