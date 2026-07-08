'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeroSection, { Hero } from '../ContactUsComp/HeroSection';
import FAQsSection from '../FAQsSection';
import PartnerForm from '../Forms/PartnerForm';

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

export interface SectorsListProps {
  id: number,
  name: string
}

function ApplyToPartner({ data, SectorsList }: { data: ContactProps, SectorsList: SectorsListProps[] }) {
  const Data = {
    faqs: {
      title: "Here Are Some Answers To Our Most Frequently Asked Questions",
      button: {
        link: "/partners/apply",
        text: "Ask To Partner"
      },
      list: [
        {
          question: "Do I sell or negotiate on BanTech's behalf?",
          answer: "No. You make a warm, consent-based introduction. All selling, pricing, and delivery is handled by the BanTech team. You stay an introducer, not a reseller.",
          id: 0
        },
        {
          question: "When do I get paid? ",
          answer: "Commission is triggered when your introduced client becomes a paying customer. You receive a commission statement and payment on defined timelines set out in your agreement.",
          id: 1
        },
        {
          question: "Is this a one-off payment or recurring?",
          answer: "Both. You earn a one-time setup commission and a share of recurring revenue for a defined period — so quality introductions keep paying.",
          id: 2
        },
        {
          question: "What does it cost to join?",
          answer: "Nothing. There is no fee to be admitted to the network.",
          id: 3
        },
        {
          question: "Which markets do you cover?",
          answer: "We operate across the GCC and the wider MENA region, with products built for regional compliance.",
          id: 4
        },
        {
          question: "Is the programme open to anyone?",
          answer: "No — it's invite-only. Apply, and if there's a fit, we'll begin onboarding.",
          id: 5
        },
      ]
    }
  }

  const [loading, setLoading] = useState(true); // State to manage loader visibility

  useEffect(() => {
    if (data) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        // Hide loader after 2 seconds of script load
        setTimeout(() => {
          setLoading(false);
        }, 3000); // 2 seconds
      };
      document.body.appendChild(script); // Append the script to the body

      // Cleanup script on unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [data]); // Run when data changes

  useEffect(() => {
  const target = sessionStorage.getItem("scrollTo");

  if (target === "calendly") {
    sessionStorage.removeItem("scrollTo");

    setTimeout(() => {
      document.getElementById("calendly")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  }
}, []);
  return (
    <div className='relative   mx-auto xl:px-20 px-4  overflow-hidden'>
      <Image src={'/Images/fingerprint.png'} alt='Hero Image' width={521} height={523} className='object-contain  md:w-[521px] md:h-[523px] w-[286px] h-[286px]  absolute my-auto inset-y-0 md:-bottom-[200px] -bottom-[-955px] -left-20 overflow-x-hidden' />
      <Image src={'/Images/fingerprint2.png'} alt='Hero Image' width={521} height={523} className='object-contain md:w-[521px] md:h-[523px] w-[286px] h-[286px]   absolute my-auto inset-y-0 md:-bottom-[1200px] -bottom-[1648px] -right-10 overflow-x-hidden' />
      <HeroSection data={data.extra_content.get_in_touch} />
      <PartnerForm SectorsList={SectorsList} />
      <div className='relative mb-10 h-[700px]' id='calendly'>
        {/* Show loader while the script is loading */}
        {loading && (
          <div className='absolute h-full w-full inset-0 flex justify-center items-center z-20 bg-white'>
            <div className="loader"></div>
          </div>
        )}
        <div className="calendly-inline-widget" data-url={'https://calendly.com/omneya-abueldahab/30min'} style={{ minWidth: "320px", height: "700px" }}></div>
      </div>
      <div className='pb-20 max-w-[832px] mx-auto px-4 md:space-y-16 space-y-8 mt-16 relative z-20'>
        <div className=' md:space-y-8 space-y-6'>
          <h2 className='text-primary text-center font-semibold md:text-[32px] text-2xl leading-[150%] lg:w-[92%] w-full mx-auto ' dangerouslySetInnerHTML={{ __html: Data.faqs.title }} />
        </div>
        <div>
          <FAQsSection questions={Data.faqs.list} />
        </div>


      </div>
    </div>
  )
}

export default ApplyToPartner