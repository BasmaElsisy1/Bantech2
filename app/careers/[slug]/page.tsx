
import SingleCareer from "@/app/_components/MainPages/SingleCareer";
import { getServerSideProps  } from "@/app/apis/general";
import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return generatePageMetadata(`careers/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const SingleCareerData = await getServerSideProps (`careers/${slug}`);
    const CareersPage = await getServerSideProps ('pages/careers-page');
    if (!SingleCareerData.props.data.data) {
        notFound();
    }

    return (
        <SingleCareer
            data={SingleCareerData.props.data.data}
            About={CareersPage.props.data.data.extra_content.about_us}
            application_form={CareersPage.props.data.data.extra_content.application_form}
        />
    );
}
