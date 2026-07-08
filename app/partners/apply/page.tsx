import ApplyToPartner from "@/app/_components/MainPages/ApplyToPartner";
import { getServerSideProps } from "@/app/apis/general";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/apply-to-partner");
}

export default async function Page() {
   const Data = await getServerSideProps ('pages/contact-us-page');
   const Sectors = await getServerSideProps ('v1/partnership/sectors');
  return (
    <ApplyToPartner
     data={Data.props.data.data}
     SectorsList={Sectors.props.data.data}
     />
  );
}
