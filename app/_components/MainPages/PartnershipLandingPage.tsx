'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import StrategySection from '../DigitalComp/StrategySection'
import FAQsSection from '../FAQsSection'
import BGBlue from '../SVGs/BGBlue'

const Data = {
    Hero: {
        tagline: "INVITE-ONLY PARTNER REFERRAL NETWORK",
        title: "Turn trusted client relationships into recurring fintech revenue.",
        description: "Grow your clients' business. Grow your revenue. One partnership. \n Unlock new revenue opportunities through the BanTech Partner Referral Network. Leverage your trusted relationships across the GCC and MENA to introduce clients to enterprise-grade fintech infrastructure designed to accelerate growth, streamline operations, and enhance payment experiences. For every successful referral, you earn recurring rewards while BanTech takes care of the technology, compliance, deployment, and support. You bring the relationship; we deliver the solution.",
        button: {
            link: "/partners/apply",
            text: "Apply To Partner "
        },
        Image: {
            src: "/Images/HeroImage.png",
            alt: "Hero Image"
        }
    },
    SecondSection: [
        {
            title: "You gain",
            description: "a new recurring revenue stream, a compelling reason to reconnect with existing clients, and a high-value solution that strengthens long-term relationships and retention."
        },
        {
            title: "Your clients gain",
            description: "access to proven, compliant fintech solutions that address real business needs introduced through a trusted partner who already understands their challenges."
        },
        {
            title: "BanTech gains",
            description: "access to qualified opportunities through trusted, high-credibility networks, enabling sustainable growth across the GCC and MENA."
        }
    ],
    Products: {
        title: "Four products, One trusted introduction",
        description: "Every BanTech solution is designed for the regulatory, operational, and commercial realities of the GCC and MENA. That means the products you introduce aren't just innovative—they're compliant, market-ready, and built for real-world deployment, giving your clients solutions they can adopt with confidence.",
        items: [
            {
                cycle_title: "Payment Infrastructure",
                cycle_features: [
                    {
                        feature_title: "Powering Modern Payments",
                        feature_description: "Move money compliantly the rails businesses need to collect, settle, and scale."
                    }
                ]
            },
            {
                cycle_title: "KYC & KYB Platform",
                cycle_features: [
                    {
                        feature_title: "Streamlined Identity Verification",
                        feature_description: "Onboard customers and businesses fast, with verification built for regional regulators."
                    }
                ]
            },
            {
                cycle_title: "AI Chatbot",
                cycle_features: [
                    {
                        feature_title: "Intelligent Customer Engagement",
                        feature_description: "Always-on, intelligent customer engagement that cuts support load and lifts conversion."
                    }
                ]
            },
            {
                cycle_title: "Ticketing System",
                cycle_features: [
                    {
                        feature_title: "Smarter Support Operations",
                        feature_description: "A structured support and operations layer that keeps service teams accountable."
                    }
                ]
            }
        ]
    },
    PartnershipDesign: {
        title: "A Partnership Designed To Pay Both Ways",
        description: "Most referral programs stop at the introduction. Ours is designed to create lasting value. Through the BanTech Partner Referral Network, you can reconnect with existing clients, introduce trusted fintech solutions that address real business needs, and earn recurring rewards for successful referrals. We handle the infrastructure, compliance, and execution so you can focus on relationships and growth.",
        button: {
            link: "/partners/apply",
            text: "Ask To Partner"
        },
        list: [
            {
                title: "Re-Engage Your Client Base with a New Value Proposition",
                description: "Your network is already your greatest asset. The challenge isn't finding new contacts it's creating new opportunities within existing relationships. BanTech equips you with a portfolio of in-demand fintech solutions that help you reconnect with clients, uncover new business needs, and strengthen your position as a trusted advisor."
            },
            {
                title: "Create Recurring Revenue from Relationships You Already Own",
                description: "Most referral programs reward introductions once. We reward the long-term value they generate. For every successful referral, you receive an upfront commission alongside a share of recurring revenue, creating a sustainable income stream that grows with every client you bring into the BanTech ecosystem."
            },
            {
                title: "Extend Your Offering Without Expanding Your Workload",
                description: "Deliver more value to your clients without adding operational complexity to your business. From product demonstrations and onboarding to KYC/KYB verification, compliance, implementation, and ongoing support, BanTech manages the entire delivery process—allowing you to focus on relationships while we handle execution."
            }
        ]
    },
    Steps: {
        title: "From Introduction to Income In Four Simple Steps",
        List: [
            {
                title: "Apply & Join the Network",
                description: "Submit your application to become a BanTech Partner. Once approved, we'll complete a streamlined onboarding process, assign your partner tier, and provide access to the tools and resources you need to get started."
            },
            {
                title: "Introduce a Qualified Client",
                description: "Identify businesses within your network that could benefit from BanTech's solutions and submit a warm, consent-based introduction through your partner portal. No pitching, negotiations, or technical discussions required."
            },
            {
                title: "BanTech Handles the Rest",
                description: "Our team takes ownership from the first conversation onward managing discovery, demonstrations, solution design, compliance, KYC/KYB verification, onboarding, implementation, and ongoing support."
            },
            {
                title: "Earn Recurring Rewards",
                description: "When your referral becomes a customer, you receive an upfront commission and ongoing recurring revenue based on their active subscription. Every referral is tracked, reported, and managed with complete transparency."
            }
        ]
    },
    QualificationSection: {
        title: "Built for advisors with a network worth activating",
        description: "The network is selective by design. We're a strong fit if you are a:",
        list: ["Consulting or advisory firm", "Accounting, audit, or professional-services practice", "Technology or implementation partner", "Agency, accelerator, incubator, or VC with portfolio reach", "Established operator with trusted relationships across the GCC or MENA"]
    },
    HowYouEarn: {
        title: "Built to reward the introductions that matter",
        description: "Your rewards scale with your success. Every successful referral generates an upfront commission and a share of recurring revenue, creating long-term earning potential beyond the initial introduction.\n As your contribution to the network grows, you unlock higher partner tiers, enhanced commission rates, performance bonuses, and exclusive partnership benefits.",
        button: {
            link: "/partners/apply",
            text: "Request commission Details "
        },
        list: [
            {
                title: "GOLD",
                description: "Our highest rates, exclusivity options, and priority support."
            },
            {
                title: "SILVER",
                description: "Higher rates, performance bonuses, a dedicated account contact."
            },
            {
                title: "Bronze",
                description: "Entry tier. Full earning structure, partner support."
            }
        ]
    },
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

export default function PartnershipLandingPage() {
    const [hoveredIndex, setHoveredIndex] = useState(0);
    return (
        <div className='pt-10 lg:space-y-[196px] space-y-[72px] overflow-hidden'>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 space-y-6'>
                <div className='md:space-y-10 space-y-6'>
                    <div className='max-w-[849px] mx-auto text-center space-y-3'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className=' text-base text-darkblue2'>{Data.Hero.tagline}</motion.h2>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            className='text-primary md:text-[32px] text-2xl leading-[150%] font-semibold'>{Data.Hero.title}</motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.5 }}
                        className='space-y-6 text-center text-primary md:text-xl text-base max-w-[1119px] mx-auto'>
                        {Data.Hero.description.split('\n').map((line, index) => (
                            line.trim() && <p key={index}>{line.trim()}</p>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.7 }}
                        className=' relative z-30'
                    >
                        <Link href={Data.Hero.button.link ?? ""} target='_blank' className='flex md:w-fit w-full justify-center mx-auto md:!mt-12 !mt-10 bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                            <span className=' relative z-10 text-primary'>
                                {Data.Hero.button.text}
                            </span>

                            <span
                                style={{ filter: "blur(3px)" }}
                                className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                <BGBlue />
                            </span>

                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.9 }}
                        className='w-full md:h-[637px] h-[264px] relative md:!-mt-[120px] !-mt-10'>
                        <Image
                            src={Data.Hero.Image.src}
                            alt={Data.Hero.Image.alt}
                            fill
                            className=' object-contain'
                        />
                    </motion.div>
                </div>
                <div className='flex md:gap-[33px] gap-6 flex-wrap'>
                    {Data.SecondSection.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                            key={index} className='md:w-[calc(100%/3-22px)] w-full space-y-2'>
                            <h3 className='flex w-full mx-auto bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 lg:px-8 lg:py-6 p-5 rounded-full text-primary lg:text-[22px] text-lg leading-[150%] uppercase font-bold'>
                                {item.title}</h3>
                            <div className='bg-white/20 h-[calc(100%-91px)] flex items-center justify-center shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-white lg:p-8 p-6 rounded-[40px]'>
                                <p className='md:text-lg text-base text-primary'>
                                    {item.description}
                                </p>
                            </div>

                        </motion.div>
                    ))}

                </div>

            </div>
            <div>
                <div className='max-w-[1218px] px-4 mx-auto md:space-y-10 space-y-6 md:text-start text-center'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }} className='text-primary md:text-[32px] text-2xl font-semibold leading-[150%]'>{Data.Products.title}</motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='md:text-xl text-base text-primary'>{Data.Products.description}</motion.p>
                </div>
                <StrategySection
                    data={{
                        items: Data.Products.items,
                    }}
                    partner
                />
            </div>
            <div className='relative overflow-hidden'>
                <div className=' absolute w-[801.63px] h-[534.28px] -right-[334px] top-[300px]'>
                    <Image
                        src={'/Images/interlocking-puzzle.png'}
                        alt='interlocking-puzzle'
                        fill className=' object-cover'
                    />
                </div>
                <div className=' absolute w-[801.63px] h-[534.28px] rotate-[-60deg] -left-[334px] bottom-0'>
                    <Image
                        src={'/Images/interlocking-puzzle.png'}
                        alt='interlocking-puzzle'
                        fill className=' object-contain'
                    />
                </div>
                <div className='max-w-[1437px] mx-auto xl:px-20 px-4 md:space-y-[73px] space-y-10'>
                    <div className='max-w-[1197px] mx-auto md:space-y-10 space-y-6'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='font-semibold md:text-[32px] text-2xl leading-[150%] tracking-[-2%] text-center text-primary'>{Data.PartnershipDesign.title}</motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='md:text-lg text-base text-primary text-center'>{Data.PartnershipDesign.description}</motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.5 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Link href={Data.PartnershipDesign.button.link ?? ""} target='_blank' className='flex md:w-fit w-full justify-center mx-auto md:!mt-12 !mt-10 bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                                <span className=' relative z-10 text-primary'>
                                    {Data.PartnershipDesign.button.text}
                                </span>
                                <span
                                    style={{ filter: "blur(3px)" }}
                                    className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                    <BGBlue />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                    <div className='md:space-y-6 space-y-4'>
                        {Data.PartnershipDesign.list.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.3 }}
                                viewport={{ once: true, amount: 0.3 }}
                                key={index} className={`${index === 1 ? "md2:ms-[19%]" : index === 2 ? "ms-auto" : ""} bg-white/20 lg:w-[710px] md2:w-[600px] w-full relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] md:p-8 p-6 rounded-[40px] md:space-y-6 space-y-4`}>
                                <h3 className='text-primary md:text-[26px] text-xl font-semibold leading-[150%]' dangerouslySetInnerHTML={{ __html: item.title }} />
                                <p className='md:text-base text-sm font-medium text-primary'>{item.description}</p>

                            </motion.div>
                        ))}

                    </div>

                </div>
            </div>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 py-10 space-y-12'>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='text-primary md:text-[32px] text-2xl font-semibold text-center'>{Data.Steps.title}</motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='flex flex-wrap gap-6 items-center'>
                    {Data.Steps.List.map((item, index) => (
                        <div
                            onMouseEnter={() => setHoveredIndex(index)}
                            key={index} className={`
                                lg:pointer-events-auto pointer-events-none
                            xl:h-[592px] md:h-[530px] h-[519px] lg:w-[calc(100%/4-18px)] md:w-[calc(50%-12px)] w-full flex items-center`}>
                            <div className={`rounded-[32px] py-8 xl:px-6 px-4 bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] flex flex-col justify-between
                ${hoveredIndex === index ? "h-full" : "lg:h-[370px] h-full"}
                `}>
                                <span className={`${hoveredIndex === index ? " opacity-100" : " lg:opacity-0 opacity-100"} absolute inset-0 w-full h-full`}>
                                    <Image
                                        src={'/Images/background2.png'}
                                        alt='background'
                                        fill
                                        className=' object-cover'
                                    />
                                </span>
                                <span className={`${hoveredIndex === index ? "text-primary text-[40px]" : "lg:text-lightGrey2 lg:text-[32px] text-primary text-[40px]"} block transition-all duration-300 leading-[150%] font-light relative`}>
                                    0{index + 1}
                                </span>
                                <div className='relative'>
                                    <h3 className={`${hoveredIndex === index ? "font-bold xl:text-3xl text-2xl" : " xl:text-2xl lg:text-xl lg:font-normal font-bold text-2xl"} transition-all duration-300 text-primary `}>
                                        {item.title}
                                    </h3>
                                    <p className={`${hoveredIndex === index ? "block pt-4" : "lg:hidden block lg:pt-0 pt-4"} text-primary text-base`}>
                                        {item.description}
                                    </p>
                                </div>


                            </div>

                        </div>
                    ))}
                </motion.div>

            </div>
            <div className='max-w-[792px] mx-auto px-4 md:space-y-16 space-y-8'>
                <div className='md:space-y-10 space-y-6 text-center'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }} className='text-primary md:text-[32px] text-2xl font-semibold'>{Data.QualificationSection.title}</motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='md:text-lg text-base text-primary'>{Data.QualificationSection.description}</motion.p>
                </div>
                <div className='space-y-4'>
                    {Data.QualificationSection.list.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 * index }}
                            viewport={{ once: true, amount: 0.3 }}
                            key={index} className='flex items-center md:gap-4 gap-2'>
                            <div className='flex items-center justify-center rounded-full p-3 w-fit bg-white/20 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]'>
                                <span className='relative md:w-10 md:h-10 w-8 h-8 block'>
                                    <Image
                                        src={'/Images/check.png'}
                                        alt='check'
                                        fill
                                    />
                                </span>
                            </div>
                            <div className='bg-white/20 md:w-fit w-[calc(100%-66px)] px-8 py-4 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] md:rounded-full rounded-[24px] md:text-lg text-base'>
                                <p className='text-primary'>{item}</p>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 flex justify-between items-center lg:flex-row flex-col gap-y-16'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='xl:w-[620px] lg:w-[calc(50%-20px)] w-full space-y-10 md:text-start text-center'>
                    <h2 className='text-primary md:text-[32px] text-2xl font-semibold leading-[150%]'>{Data.HowYouEarn.title}</h2>
                    <div className='space-y-6 text-primary md:text-lg text-base'>
                        {Data.HowYouEarn.description.split('\n').map((line, index) => (
                            line.trim() && <p key={index}>{line.trim()}</p>
                        ))}
                    </div>
                    <Link href={Data.HowYouEarn.button.link ?? ""} target='_blank' className='flex md:w-fit w-full md:!mt-16 !mt-10 bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 text-base justify-center font-bold px-6 py-2.5 rounded-full'>
                        <span className=' relative z-10 text-primary'>
                            {Data.HowYouEarn.button.text}
                        </span>

                        <span
                            style={{ filter: "blur(3px)" }}
                            className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                            <BGBlue />
                        </span>

                    </Link>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='xl:w-[calc(100%-660px)] lg:w-[calc(50%-20px)] w-full space-y-6 relative'>
                    <div className='w-[300px] h-[250px] absolute md:right-[31px] right-[-160px] -top-[69px] rotate-[-103.77deg]'>
                        <Image
                            src={'/Images/crystal-star.png'}
                            alt='crystal-star'
                            fill
                            className=' object-contain'
                        />
                    </div>
                    <div className='space-y-6 relative z-10'>
                        {Data.HowYouEarn.list.map((item, index) => (
                            <div key={index} className={` md:h-[176px] h-fit flex flex-col justify-center
                            ${index === 0 ? "bg-[#FCCE01]/10 md:w-[65%] w-[calc(100%-80px)]" : index === 1 ? "bg-[#C8C8C8]/10 md:w-[82%] w-[calc(100%-40px)]" : "bg-[#FFB566]/10"}
                            md:rounded-[40px] rounded-[32px] md:py-8 md:px-6 p-6 space-y-4 backdrop-blur-sm group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]`}>
                                <h3 className='text-primary font-bold md:text-2xl text-[22px]'>{item.title}</h3>
                                <p className='text-primary md:text-lg text-sm'>{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className='md:w-[200px] md:h-[200px] w-[150px] h-[150px] absolute -right-[60px] bottom-20 '>
                        <Image
                            src={'/Images/crystal-star.png'}
                            alt='crystal-star'
                            fill
                            className=' object-contain'
                        />
                    </div>

                </motion.div>

            </div>
            <div className='pb-20 max-w-[832px] mx-auto px-4 md:space-y-16 space-y-8'>
                <div className=' md:space-y-8 space-y-6'>
                    <h2 className='text-primary text-center font-semibold md:text-[32px] text-2xl leading-[150%] lg:w-[92%] w-full mx-auto ' dangerouslySetInnerHTML={{ __html: Data.faqs.title }} />
                    <Link href={Data.faqs.button.link ?? ""} target='_blank' className='flex md:w-fit w-full justify-center mx-auto !mt-16 bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
                shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                        <span className=' relative z-10 text-primary'>
                            {Data.faqs.button.text}
                        </span>

                        <span
                            style={{ filter: "blur(3px)" }}
                            className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                            <BGBlue />
                        </span>

                    </Link>
                </div>
                <div>
                    <FAQsSection questions={Data.faqs.list} />
                </div>


            </div>


        </div >
    )
}
