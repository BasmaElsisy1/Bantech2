'use client'
import Image from 'next/image'
import ButtonComp from '../button'
import ContactForm from '../ContactUsComp/ContactForm'
import HeroSection2 from '../ContactUsComp/HeroSection'
import FAQsSection from '../FAQsSection'
import BantechTeam, { BantechTeamProps, SingleBlogWidget } from '../HomepageComp/BantechTeam'
import Services, { ServicesProps } from '../PaymentLinks/Services'
import StartPricing, { PricingProps, StartPricingProps } from '../PaymentLinks/StartPricing'
import { ContactProps } from './ContactUsPage'
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
    start_demo: {
        media: {
            type: string,
            src: string,
            alt: string
        }[],
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        },
    },
    fields: ServicesProps,
    start_features: {
        media: {
            type: string,
            src: string,
            alt: string
        }[],
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        }
    },
    features: {
        title: string,
        description: string
    }[],
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

export function mapApiToServices(data: any): ServicesProps {
    return {
        heading: {
            title: data.fields?.heading?.title ?? "",
            description: data.fields?.heading?.description ?? "",
        },
        fields: (data.fields?.items ?? []).map((item: any) => ({
            text: item.text ?? "",
        })),
    };
}

export default function AIChatBot({ data, BlogsData, Faqs, ContactusImage }: {
    data: Props, BlogsData: SingleBlogWidget[], Faqs: {
        id: number,
        question: string,
        answer: string
    }[],
    ContactusImage: ContactProps
}) {

    const servicesData = mapApiToServices(data);
    const words = data.hero.title.split('')

    return (
        <div className=' overflow-x-hidden'>
            <div className='lg:space-y-[200px] space-y-[100px]'>
                <div className='relative'>
                    <div className='max-w-[1437px] mx-auto xl:px-20 px-4 flex justify-between md2:flex-row flex-col'>
                        <div className='xl:w-[775px] lg:w-[600px] md2:w-[500px] w-full md:space-y-16 space-y-8 pt-20'>
                            <div className='md:space-y-8 space-y-4 md:text-start text-center'>
                                <h1 className='text-primary xl:text-[40px] xl:leading-[60px] md:text-4xl md:leading-[50px] text-2xl font-semibold'>
                                    {
                                        words.map((part, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.1, delay: index * 0.03 }}
                                                viewport={{ once: true, amount: 0.3 }}
                                            >
                                                {part}
                                            </motion.span>
                                        ))
                                    }
                                </h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 2 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="md:space-y-8 space-y-6 "
                                >
                                    {data.hero.subtitle.split('\n').map((line, index) => (
                                        line.trim() && <p className='text-primary xl:text-xl md:text-lg text-base' key={index}>{line.trim()}</p>
                                    ))}
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 2.4 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <ButtonComp
                                    text={data.start_demo.button.text}
                                    link={data.start_demo.button.link}
                                    white

                                />
                            </motion.div>

                        </div>
                        <div className='md2:w-[534px] w-full md2:absolute md2:right-0 md2:h-[820px] md2:top-0 relative h-[575px] -right-4'>
                            <Image
                                src={data.hero.media[0].src}
                                alt={data.hero.media[0].alt}
                                fill
                                className=' object-contain object-right'
                            />
                        </div>
                    </div>
                </div>

                <div className='max-w-[1437px] mx-auto xl:px-20 px-4 space-y-16'>
                    <div className='md:space-y-8 space-y-4'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold text-center'>{data.start_demo.title}</motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                            dangerouslySetInnerHTML={{ __html: data.start_demo.subtitle }}
                            className=" xl:text-xl md:text-lg text-base text-primary text-center"
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ButtonComp
                            text={data.start_demo.button.text}
                            link={data.start_demo.button.link}
                            white
                            center
                        />
                    </motion.div>

                    <div className='flex gap-6 flex-wrap items-end lg:flex-row flex-col'>
                        {data.start_demo.media.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.3 * index }}
                                viewport={{ once: true, amount: 0.3 }}
                                key={index} className={`${index === 1 ? "md:h-[560px] h-[495px]" : "md:h-[359px] h-[320px]"} relative lg:w-[calc(100%/3-16px)] w-full`}>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className=' object-contain'
                                />
                            </motion.div>
                        ))}

                    </div>
                </div>
                <div className='max-w-[1437px] mx-auto xl:px-20 px-4 space-y-16'>
                    <div className='space-y-8'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold text-center'>{data.start_features.title}</motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                            dangerouslySetInnerHTML={{ __html: data.start_features.subtitle }}
                            className="text-xl text-primary text-center"
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ButtonComp
                            text={data.start_features.button.text}
                            link={data.start_features.button.link}
                            white
                            center
                        />
                    </motion.div>
                    <div className='flex lg:gap-10 gap-4 lg:h-[1024px] lg:flex-row flex-col-reverse'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='lg:w-[calc(50%-20px)] w-full lg:space-y-10 space-y-4'>
                            <div className='relative w-full lg:h-[74%] h-[373px] lg:rounded-[80px] rounded-[32px] overflow-hidden'>
                                <Image
                                    src={data.start_features.media[0].src}
                                    alt={data.start_features.media[0].alt}
                                    fill
                                    className=' object-cover'

                                />
                            </div>
                            <div
                                className="lg:rounded-[64px] rounded-[32px] lg:block hidden shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm md:p-8 px-4 py-6 xl:p-12"
                            >
                                <h2 className="text-primary md:text-[32px] text-[18px] font-semibold leading-[140%] tracking-[-0.64px] mb-4 lg:mb-6">
                                    {data.features[2].title}
                                </h2>
                                <p className="text-primary md:text-base text-xs leading-[150%] tracking-[-0.36px]">
                                    {data.features[2].description}
                                </p>
                            </div>

                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='lg:w-[calc(50%-20px)] w-full lg:gap-y-10 gap-y-4 flex lg:flex-col flex-col-reverse'>
                            {data.features.slice(0, 2).map((item, index) => (
                                <div
                                    key={index}
                                    className="lg:rounded-[64px] rounded-[32px] shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm md:p-8 px-4 py-6 xl:p-12"
                                >
                                    <h2 className="text-primary md:text-[32px] text-[18px] font-semibold leading-[140%] tracking-[-0.64px] mb-4 lg:mb-6">
                                        {item.title}
                                    </h2>
                                    <p className="text-primary md:text-base text-xs leading-[150%] tracking-[-0.36px]">
                                        {item.description}
                                    </p>
                                </div>

                            ))}
                            <div className='relative  lg:rounded-[80px] rounded-[32px] overflow-hidden lg:h-1/2 h-[270px]'>
                                <Image
                                    src={data.start_features.media[1].src}
                                    alt={data.start_features.media[1].alt}
                                    fill
                                    className=' object-cover'
                                />
                            </div>
                            <div
                                className="lg:rounded-[64px] rounded-[32px] lg:hidden block shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm md:p-8 px-4 py-6 xl:p-12"
                            >
                                <h2 className="text-primary md:text-[32px] text-[18px] font-semibold leading-[140%] tracking-[-0.64px] mb-4 lg:mb-6">
                                    {data.features[2].title}
                                </h2>
                                <p className="text-primary md:text-base text-xs leading-[150%] tracking-[-0.36px]">
                                    {data.features[2].description}
                                </p>
                            </div>
                        </motion.div>
                    </div>


                </div>
            </div>

            <Services data={servicesData} />
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
