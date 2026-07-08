'use client'
import Image from 'next/image'
import ContactForm from '../ContactUsComp/ContactForm'
import HeroSection, { Hero } from '../ContactUsComp/HeroSection'
import FAQs, { QuestionProps } from '../FAQs'

export interface ContactProps {
  extra_content: {
    get_in_touch: Hero;
    start_faq: {
      title: string;
      subtitle: string;
      button: {
        text: string;
        link: string;
      }
    };
  };
}



function ContactUsPage({ data }: { data: ContactProps }) {
  return (
    <div className='relative   mx-auto xl:px-20 px-4  overflow-hidden'>
      <Image src={'/Images/fingerprint.png'} alt='Hero Image' width={521} height={523} className='object-contain  md:w-[521px] md:h-[523px] w-[286px] h-[286px]  absolute my-auto inset-y-0 md:-bottom-[200px] -bottom-[-955px] -left-20 overflow-x-hidden' />
      <Image src={'/Images/fingerprint2.png'} alt='Hero Image' width={521} height={523} className='object-contain md:w-[521px] md:h-[523px] w-[286px] h-[286px]   absolute my-auto inset-y-0 md:-bottom-[1200px] -bottom-[1648px] -right-10 overflow-x-hidden' />
      <HeroSection data={data.extra_content.get_in_touch} />
      <ContactForm />
{/* 
      <FAQs data={{ title: data.extra_content.start_faq.title, subtitle: data.extra_content.start_faq.subtitle }}
        FAQsData={faqsData}
        button={{
          text: data.extra_content.start_faq.button.text,
          link: data.extra_content.start_faq.button.link,
        }} /> */}
    </div>
  )
}

export default ContactUsPage