
import { Metadata } from "next";
import PaymentLinks from "../_components/MainPages/PaymentLinks";
import { getServerSideProps  } from "../apis/general";
import { generatePageMetadata } from "@/lib/seo";
import TicketingPage from "../_components/MainPages/TicketingPage";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/ticketing-service");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/ticketing-service')
  const Blogs = await getServerSideProps ('blogs?limit=3&filter[type]=1')
  const Faqs = await getServerSideProps ('faqs?filter[faq_category_id]=2');
  const Contactus = await getServerSideProps ('pages/contact-us-page')
  return (
    <TicketingPage
      data={Data.props.data.data.extra_content}
      BlogsData={Blogs.props.data.data}
      Faqs={Faqs.props.data.data}
      ContactusImage={Contactus.props.data.data}
    />
  );
}
