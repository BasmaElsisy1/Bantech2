'use client'
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/autoplay';
import ButtonComp from '../button';
import Services, { ServicesProps } from '../DigitalComp/Services';
import StatisticsDigital, { StatisticsProps } from '../DigitalComp/Statistics';
import StrategySection, { StrategySectionProps } from '../DigitalComp/StrategySection';
import TechStack, { TechStackProps } from '../DigitalComp/TechStack';
import { QuestionProps } from '../FAQs';
import BantechTeam, { BantechTeamProps, SingleBlogWidget } from '../HomepageComp/BantechTeam';
interface Props {
    data: {
        hero: {
            title: string,
            subtitle: string,
            button: {
                text: string,
                link: string
            },
            media: {
                type: string;
                src: string;
                alt: string;
            }[];
        },
        services: ServicesProps,
        services_cycle: StrategySectionProps,
        tech_stack: TechStackProps,
        statistics: StatisticsProps,
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
    },
    faqsData: QuestionProps[],
    BlogsData: SingleBlogWidget[],
    // Faqs: QuestionProps[]
}
export default function DigitalTransformation({ data, BlogsData }: Props) {
    const words = data.hero.title.split('')
    return (
        <div className='relative'>
            <div className='relative'>
                <video
                    className=" absolute w-full opacity-20 h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                    // poster="/Images/desktop.png"
                >
                    <source src={data.hero.media[0].src} type="video/mp4" />
                </video>
                <div className='max-w-[1437px] mx-auto xl:px-20 px-4 md:space-y-24 space-y-4 pt-20 md:pb-36 relative '>
                    <h1 className='md:w-[736px] w-full md:text-start text-center me-auto text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold'>
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
                    <div className='md:w-[736px] w-full md:text-start text-center ms-auto space-y-12'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, delay: 1.5 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='md:space-y-8 space-y-6'>
                            {data.hero.subtitle.split('\n').map((line, index) => (
                                line.trim() && <p className='text-primary md:text-xl text-base' key={index}>{line.trim()}</p>
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, delay: 1.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <ButtonComp
                                text={data.hero.button.text}
                                link={data.hero.button.link}
                                white
                            />
                        </motion.div>

                    </div>


                </div>
            </div>

            <Services data={data.services} />
            <StrategySection data={data.services_cycle} />
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4'>
                <TechStack data={data.tech_stack} />
            </div>
            <StatisticsDigital data={data.statistics} />
            {/* <div className='md:py-20 py-10 space-y-16 relative overflow-hidden px-4'>
                <div className='text-center max-w-[1197px] mx-auto space-y-8'>
                    <h2 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary' dangerouslySetInnerHTML={{ __html: data.start_faq.title }} />
                    <div className='text-primary text-xl font-light mt-6' dangerouslySetInnerHTML={{ __html: data.start_faq.subtitle }} />
                    <ButtonComp
                        text={data.start_faq.button.text}
                        link={'/contact-us'}
                        center
                        white
                    />
                </div>
                <FAQsSection questions={Faqs} />
            </div> */}
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 relative z-10'>
                <BantechTeam
                    BlogsData={BlogsData}
                    data={data.blogs} />
            </div>
        </div>
    )
}
