import React from 'react'
import EkycPage from '../_components/MainPages/EkycPage'
import { getServerSideProps  } from '../apis/general'
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";


export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/ekyc-product-page");
}

 async function  page() {
    const Data = await getServerSideProps ('pages/ekyc-product-page')
   const Blogs = await getServerSideProps ('blogs?limit=3&filter[type]=1')
    // const FAQsData = await getServerSideProps ('faqs?filter[faq_category_id]=1')
    const ContactUs = await getServerSideProps ('pages/contact-us-page')
    
  return (
    <EkycPage data={Data.props.data.data}  BlogsData={Blogs.props.data.data} ContactUsImage={ContactUs.props.data.data} />
  )
}

export default page