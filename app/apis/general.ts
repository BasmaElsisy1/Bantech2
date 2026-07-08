import { Metadata } from "next";


export async function getServerSideProps(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endpoint}`, {
    method: 'GET',
    headers: {
      'accept': 'application-json',
    },
    cache: "no-store",
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}


export async function getSEOMetadata(endPoint: string): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endPoint}/seo`, {
      method: 'GET',
      headers: {
        accept: 'application-json',
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`getSEOMetadata: Failed with status ${res.status}`);
      throw new Error("Failed to fetch SEO metadata");
    }

    const json = await res.json();
    const realData = json?.data;
    if (
      !realData ||
      (!realData.seo_title && !realData.seo_description && !realData.seo_keywords && !realData.og_image)
    ) {
      return {
        title: "Bantech",
        description: "Bantech — Secure and Fast Payment Solutions",
      };
    }

    const safe = (value: string | null | undefined, fallback: string) =>
      value && value.trim() !== "" ? value : fallback;

  return {
  title: safe(realData.seo_title, "Bantech"),
  description: safe(realData.seo_description, "Bantech — Secure and Fast Payment Solutions"),
  keywords: Array.isArray(realData.seo_keywords) && realData.seo_keywords.length
    ? realData.seo_keywords
    : ["Bantech", "Payments", "Finance"],

  openGraph: {
    title: safe(realData.seo_title, "Bantech"),
    description: safe(realData.seo_description, "Bantech — Secure and Fast Payment Solutions"),
    images: [
      {
        url: realData.og_image ? safe(realData.og_image, "") : "/favicon/favicon.svg",
      },
    ],
  },
};

  } catch (error) {
    console.error("getSEOMetadata error:", error);
    return {
      title: "AjilPay",
      description: "The page not found",
    };
  }
}


export async function fetchFromAPI (endpoint: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endpoint}`,
    {
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

