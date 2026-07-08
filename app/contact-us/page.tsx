import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import ContactUsPage from "../_components/MainPages/ContactUsPage";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/contact-us-page");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/contact-us-page');
  // const FAQsDataRes = await getServerSideProps ('faqs?filter[faq_category_id]=3')
  return (
    <ContactUsPage data={Data.props.data.data}/>
  );
}
