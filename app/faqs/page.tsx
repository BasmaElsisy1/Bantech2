
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import FaqsPage from "../_components/MainPages/Faqs";
import { getServerSideProps  } from "../apis/general";

export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/faqs-page");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/faqs-page')
  const Faqs = await getServerSideProps ('faqs');
  const FAQSCategories = await getServerSideProps ('faq-categories')
  return (
    <FaqsPage
      data={Data.props.data.data.extra_content}
      AllFaqs={Faqs.props.data.data}
      AllFAQsCategories={FAQSCategories.props.data.data}
    />
  );
}
