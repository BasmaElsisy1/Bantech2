import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import DigitalTransformation from '../_components/MainPages/DigitalTransformation';
import { getServerSideProps  } from '../apis/general';
export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/digital-transformation-page");
}
export default async function Page() {
  const Data = await getServerSideProps ('pages/digital-transformation-page')
  const FAQsDataRes = await getServerSideProps ('faqs?filter[faq_category_id]=5')
    const Blogs = await getServerSideProps ('blogs?limit=3&filter[type]=1')

  return (
    <DigitalTransformation data={Data.props.data.data.extra_content} faqsData={FAQsDataRes.props.data.data} BlogsData={Blogs.props.data.data}
      />
  )
}

