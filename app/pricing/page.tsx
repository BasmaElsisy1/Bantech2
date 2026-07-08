
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import PricingPage from "../_components/MainPages/PricingPage";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/pricing-page");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/pricing-page')
  // const Faqs = await getServerSideProps ('faqs?filter[faq_category_id]=6');
  return (
    <PricingPage
      data={Data.props.data.data.extra_content}
      // Faqs={Faqs.props.data.data}
    />
  );
}
