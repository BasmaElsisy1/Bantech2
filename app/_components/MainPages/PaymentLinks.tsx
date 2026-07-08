import Image from 'next/image'
import ContactForm from '../ContactUsComp/ContactForm'
import HeroSection2 from '../ContactUsComp/HeroSection'
import FAQsSection from '../FAQsSection'
import BantechTeam, { BantechTeamProps, SingleBlogWidget } from '../HomepageComp/BantechTeam'
import Business, { BusinessProps } from '../PaymentLinks/Business'
import HeroSection from '../PaymentLinks/HeroSection'
import StartBusiness, { StartBusinessProps } from '../PaymentLinks/StartBusiness'
import StartPricing, { PricingProps, StartPricingProps } from '../PaymentLinks/StartPricing'
import StartQR, { StartQRProps } from '../PaymentLinks/StartQR'
import StartSecure, { StartSecureProps } from '../PaymentLinks/StartSecure'
import StartStatistics, { AfterProps } from '../PaymentLinks/StartStatistics'
import Statistics, { StatisticsProps } from '../PaymentLinks/Statistics'
import Steps, { PropsSteps } from '../PaymentLinks/Steps'
import ButtonComp from '../button'
import { ContactProps } from './ContactUsPage'

interface Props {
    hero: {
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        },
        media: {
            type: string,
            src: string,
            alt: string
        }[]
    },
    start_hero: {
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        }
    },
    hero_images: {
        image: {
            src: string,
            alt: string
        }
    }[],
    steps: PropsSteps,
    statistics: StatisticsProps,
    start_statistics: AfterProps,
    start_business: StartBusinessProps,
    business: BusinessProps,
    start_qr: StartQRProps,
    start_secure: StartSecureProps,
    start_pricing: StartPricingProps,
    pricing: PricingProps,
    get_in_touch: {
        button: {
            text: string,
            link: string
        },
        image: {
            src: string,
            alt: string
        }
    },
    start_faq: {
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        },
        media: {
            type: string,
            src: string,
            alt: string
        }[]
    },
    blogs: BantechTeamProps
}
export default function PaymentLinks({ data, BlogsData, Faqs, ContactusImage }: {
    data: Props, BlogsData: SingleBlogWidget[], Faqs: {
        id: number,
        question: string,
        answer: string
    }[],
    ContactusImage: ContactProps
}) {
    return (
        <div>
            <HeroSection
                hero={data.hero}
                start_hero={data.start_hero}
                hero_images={data.hero_images}
            />
            <Steps data={data.steps} />
            <Statistics data={data.statistics} />
            <StartStatistics data={data.start_statistics} />
            <StartBusiness data={data.start_business} />
            <Business data={data.business} />
            <StartQR data={data.start_qr} />
            <StartSecure data={data.start_secure} />
            {data.pricing.plans.length > 0 &&
                <StartPricing
                    data={data.start_pricing}
                    Pricing={data.pricing}
                />
            }
            <div className=" py-20 relative overflow-hidden">
                <HeroSection2 data={ContactusImage.extra_content.get_in_touch} />

                <div className=" max-w-[1437px] mx-auto overflow-hidden xl:px-20 px-4">
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
            <div className='md:py-20 py-10 space-y-16 relative overflow-hidden px-4'>
                <div className='text-center max-w-[1197px] mx-auto space-y-8'>
                    <h2 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>{data.start_faq.title}</h2>
                    <div className='text-primary text-xl font-light mt-6' dangerouslySetInnerHTML={{ __html: data.start_faq.subtitle }} />
                    <ButtonComp
                        text={data.start_faq.button.text}
                        link={'/contact-us'}
                        center
                        white
                    />
                </div>
                <FAQsSection questions={Faqs} />
            </div>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 relative z-10'>
                <BantechTeam
                    BlogsData={BlogsData}
                    data={data.blogs} />
            </div>
        </div>
    )
}
