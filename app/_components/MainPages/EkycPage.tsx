import Image from "next/image";
import ContactForm from "../ContactUsComp/ContactForm";
import HeroSection2 from "../ContactUsComp/HeroSection";
import Features from "../ekycComp/Features";
import HeroSection from "../ekycComp/HeroSection";
import PlatForms from "../ekycComp/PlatFroms";
import StartSteps from "../ekycComp/StartSteps";
import BantechTeam, {
  BantechTeamProps,
  SingleBlogWidget,
} from "../HomepageComp/BantechTeam";
import Business, { BusinessProps } from "../PaymentLinks/Business";
import StartPricing, {
  PricingProps,
  StartPricingProps,
} from "../PaymentLinks/StartPricing";
import Statistics, { StatisticsProps } from "../PaymentLinks/Statistics";
import Steps, { PropsSteps } from "../PaymentLinks/Steps";
import { ContactProps } from "./ContactUsPage";

interface ButtonProps {
  text: string;
  link: string | null;
}

interface ImageProps {
  src: string | null;
  alt: string | null;
}

export interface HeroProps {
  title: string;
  subtitle: string[];
  media: {
    type: string;
    src: string;
    alt: string;
  }[];
  button: ButtonProps;
  description: string[];
}

export interface StartStepsProps {
  media: string[];
  title: string;
  subtitle: string;
  button: ButtonProps;
}

export interface FeatureProps {
  title: string;
  content?: string;
  description?: string
  video?: string | null;
  image?: {
    src: string,
    alt: string
  }
}

export interface PlatFormProps {
  text: string;
  color: string;
  image: ImageProps;
}

export interface FaqProps {
  title: string;
  subtitle: string;
  button: ButtonProps;
}

interface ExtraContentProps {
  extra_content: {
    hero: HeroProps;
    business: BusinessProps;
    steps: PropsSteps;
    start_steps: StartStepsProps;
    start_features: StartStepsProps;
    features: FeatureProps[];
    statistics: StatisticsProps;
    platforms: PlatFormProps[];
    start_pricing: StartPricingProps;
    pricing: PricingProps;
    start_faq: FaqProps;
    blogs: BantechTeamProps;
  };
}

function EkycPage({
  data,
  // faqsData,
  BlogsData,
  ContactUsImage,
}: {
  data: ExtraContentProps;
  // faqsData: QuestionProps[];      
  BlogsData: SingleBlogWidget[];
  ContactUsImage: ContactProps;
}) {
  return (
    <>
      <HeroSection data={data.extra_content.hero} />
      <Business
        data={data.extra_content.business}
        image1="/Images/fingerprint.png"
        image2="/Images/fingerprint2.png"
      />
      {/* <div className="p-20"></div> */}
      <Steps data={data.extra_content.steps} />
      {/* <StartSteps data={data.extra_content.start_steps} /> */}
      <Features
        data={data.extra_content.features}
        start_features={data.extra_content.start_features}
      />
      <Statistics data={data.extra_content.statistics} />
      <PlatForms data={data.extra_content.platforms} />
      <StartPricing
        data={data.extra_content.start_pricing}
        Pricing={data.extra_content.pricing}
      />
      <div className=" py-20 relative overflow-hidden">
        <HeroSection2 data={ContactUsImage.extra_content.get_in_touch} />

        <div className=" mx-auto overflow-hidden xl:px-20 px-4">
          <div className="relative z-10">
            <ContactForm />
          </div>
          <Image
            src={"/Images/fingerprint.png"}
            alt="Hero Image"
            width={521}
            height={523}
            className="object-contain xl:w-[521px] xl:h-[523px] w-[286px] h-[286px] absolute xl:bottom-[200px] bottom-[955px] left-0 -translate-x-1/4 pointer-events-none overflow-hidden"
          />
          <Image
            src={"/Images/fingerprint2.png"}
            alt="Hero Image"
            width={521}
            height={523}
            className="object-contain xl:w-[521px] xl:h-[523px] w-[286px] h-[286px] absolute xl:bottom-0 bottom-0 right-0 translate-x-1/4 pointer-events-none overflow-hidden"
          />
        </div>
      </div>


      {/* <div className="mt-[72px]">
        <FAQs
          data={{
            title: data.extra_content.start_faq.title,
            subtitle: data.extra_content.start_faq.subtitle,
          }}
          button={{
            text: data.extra_content.start_faq.button.text,
            link: data.extra_content.start_faq.button.link,
          }}
          FAQsData={faqsData}
        />
      </div> */}
      <div className="max-w-[1437px] mt-[72px] mx-auto xl:px-20 px-4 relative z-10">
        <BantechTeam BlogsData={BlogsData} data={data.extra_content.blogs} />
      </div>
    </>
  );
}

export default EkycPage;
