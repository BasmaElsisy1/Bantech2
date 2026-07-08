
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Terms from "../_components/MainPages/Terms";
import { getServerSideProps  } from "../apis/general";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/terms-and-condtions-page");
}

export default async function Page() {
  const Data = await getServerSideProps ('pages/terms-and-condtions-page')
  return (
    <Terms
      data={Data.props.data.data.extra_content}
    />
  );
}
