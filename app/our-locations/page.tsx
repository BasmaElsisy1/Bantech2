
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import OurLocations from "../_components/MainPages/OurLocations";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/our-location-page");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/our-location-page')
  const Contactus = await getServerSideProps ('pages/contact-us-page')
  return (
    <OurLocations
      data={Data.props.data.data.extra_content}
      ContactusImage={Contactus.props.data.data}
    />
  );
}
