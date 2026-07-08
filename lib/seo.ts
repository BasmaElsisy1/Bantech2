import { getSEOMetadata } from "@/app/apis/general";
import { Metadata } from "next";

export async function generatePageMetadata(
  endPoint: string,
): Promise<Metadata> {
  return await getSEOMetadata(endPoint);
}
