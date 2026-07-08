'use client'
import Image from 'next/image'
import ButtonComp from '../button'
import ContactForm from '../ContactUsComp/ContactForm'
import HeroSection2 from '../ContactUsComp/HeroSection'
import Features from '../ekycComp/Features'
import FAQsSection from '../FAQsSection'
import BantechTeam, { BantechTeamProps, SingleBlogWidget } from '../HomepageComp/BantechTeam'
import Services, { ServicesProps } from '../PaymentLinks/Services'
import StartBusiness, { StartBusinessProps } from '../PaymentLinks/StartBusiness'
import StartPricing, { PricingProps, StartPricingProps } from '../PaymentLinks/StartPricing'
import Statistics, { Statistics2Props } from '../PaymentLinks/Statistics'
import Steps, { PropsSteps } from '../PaymentLinks/Steps'
import { ContactProps } from './ContactUsPage'
import { FeatureProps, StartStepsProps } from './EkycPage'
import { motion } from 'framer-motion'
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
    properties: {
        title: string,
        description: string,
        image: {
            src: string,
            alt: string
        }
    }[],
    statistics: Statistics2Props[],
    steps: PropsSteps,
    services: ServicesProps,
    start_features: StartStepsProps,
    features: FeatureProps[],
    start_performance: StartBusinessProps,
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

export default function TicketingPage({ data, BlogsData, Faqs, ContactusImage }: {
    data: Props, BlogsData: SingleBlogWidget[], Faqs: {
        id: number,
        question: string,
        answer: string
    }[],
    ContactusImage: ContactProps
}) {
    const words = data.hero.title.split('')

    return (
        <div className='pt-10'>
            <div className='max-w-[1440px] mx-auto xl:px-20 px-4 space-y-16'>
                <div className='space-y-8'>
                    <h1 className='md:text-[40px] text-[24px] font-semibold text-primary text-center'>
                        {words.map((part, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.1, delay: index * 0.03 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                {part}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, delay: 1.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='text-primary text-lg font-light text-center'>
                        {data.hero.subtitle}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 1.4 }}
                >
                    <ButtonComp
                        text={data.hero.button.text}
                        link={data.hero.button.link}
                        white
                        center
                    />
                </motion.div>
                <div className='flex md2:gap-[33px] gap-5 flex-wrap'>
                    {data.properties.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: 0.3 * index }}
                            viewport={{ once: true, amount: 0.5 }}
                            key={index} className={`${index === 0 ? " pb-8" : ""} md2:w-[calc(100%/3-22px)] w-full flex flex-col justify-between gap-y-5 xl:pt-11 pt-8 rounded-[64px] overflow-hidden shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-md border border-white bg-white/20`}>
                            <h3 className='xl:text-2xl text-xl text-primary font-semibold text-center text-pretty  xl:px-8 px-5'>{item.title}</h3>
                            <p className='xl:text-base text-sm text-primary text-center text-pretty  xl:px-8 px-5'>{item.description}</p>
                            <div className='relative w-full xl:h-[180px] lg:h-[156px] md:h-[135px] h-[160px]'>
                                <Image
                                    src={item.image.src}
                                    alt={item.image.alt}
                                    fill
                                    className=' md:object-contain object-cover object-bottom'
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
            <Statistics data2={data.statistics} />
            <Steps data={data.steps} />
            <Services data={data.services} />
            <Features
                data={data.features}
                start_features={data.start_features}
            />
            <StartBusiness data={data.start_performance} />
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
