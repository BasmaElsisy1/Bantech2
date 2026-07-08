
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import PartnershipLandingPage from "../_components/MainPages/PartnershipLandingPage";
export const runtime = "edge";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pages/partnership-landingpage");
}

export default async function Home() {
  return (
    <PartnershipLandingPage
    />
  );
}
