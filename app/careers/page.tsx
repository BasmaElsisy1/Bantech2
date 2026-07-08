
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import CareersPage from "../_components/MainPages/CareersPage";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/careers-page");
}

export default async function Home() {
  const Data = await getServerSideProps ('pages/careers-page');
  const careersData = await getServerSideProps ('careers');
  // const Faqs = await getServerSideProps ('faqs?filter[faq_category_id]=4');
  return (
    <CareersPage 
    data={Data.props.data.data.extra_content} 
    AllCareers={careersData.props.data.data} 
    // Faqs={Faqs.props.data.data} 
    />
  );
}
