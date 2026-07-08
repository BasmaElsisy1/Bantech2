import React from "react";
import HeroSection from "../aboutUsComp/HeroSection";
import AboutSection from "../aboutUsComp/AboutSection";
import Leaders, { IndustryLeadersData } from "../aboutUsComp/Leaders";
import StrategySection, { ProductsProps } from "../DigitalComp/StrategySection";
import ServingBusiness from "../aboutUsComp/ServingBusiness";
import FAQs, { QuestionProps } from "../FAQs";
import BantechTeam, {
  BantechTeamProps,
  SingleBlogWidget,
} from "../HomepageComp/BantechTeam";
export interface MediaItem {
  type: string;
  src: string;
  alt?: string | null;
}

export interface Button {
  text: string ;
  link: string;
}

export interface Hero {
  media: MediaItem[];
  title: string;
  subtitle?: string | null;
  button: Button;
}

export interface FieldItem {
  field_title: string;
  field_description: string;
}

export interface Mission {
  mission_image: string;
  mission_image_alt?: string | null;
  innovation_image: string;
  innovation_image_alt?: string | null;
  fields: FieldItem[];
}

export interface Feature {
  feature_title?: string | null;
  feature_description?: string | null;
}

export interface ServingBusinessProps {
  media: MediaItem[];
  title: string;
  subtitle?: string | null;
  button: Button;
}

export interface StartFaq {
  media: MediaItem[];
  title: string;
  subtitle: string;
  button: Button;
}

export interface Props {
  hero: Hero;
  mission: Mission;
  products: ProductsProps;
  serving_business: ServingBusinessProps;
  industry_leaders: IndustryLeadersData;
  start_faq: StartFaq;
  blogs: BantechTeamProps;
}
function AboutUsPage({
  data,
  // faqsData,
  BlogsData,
}: {
  data: Props;
  // faqsData: QuestionProps[];
  BlogsData: SingleBlogWidget[];
}) {
  return (
    <>
    <HeroSection data={data.hero} />
    <AboutSection data={data.mission} />
    <div className="overflow-hidden">
      

      <StrategySection data={data.products} />
      <ServingBusiness data={data.serving_business} />
      {/* <Leaders data={data.industry_leaders} /> */}
      {/* <div className="py-32">
        <FAQs
          data={{
            title: data.start_faq.title,
            subtitle: data.start_faq.subtitle,
          }}
          FAQsData={faqsData}
          button={{
            text: data.start_faq.button.text,
            link: data.start_faq.button.link,
          }}
        />
      </div> */}
      <div className="max-w-[1437px] mx-auto xl:px-20 px-4 relative z-10">
        <BantechTeam BlogsData={BlogsData} data={data.blogs} />
      </div>
    </div>
    </>
  );
}

export default AboutUsPage;
