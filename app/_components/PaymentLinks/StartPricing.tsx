'use client'
import Image from 'next/image'
import Link from 'next/link'
import Star from '../SVGs/Star'
import ButtonComp from '../button'
import { motion } from 'motion/react'
export interface StartPricingProps {
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
}

export interface PricingProps {
    image: {
        src: string,
        alt: string
    },
    plans: {
        title: string,
        subtitle: string,
        features: string,
        price: string,
        is_recommended: boolean,
        button: {
            text: string,
            link: string
        }
    }[]
}
export default function StartPricing({ data, Pricing }: { data: StartPricingProps, Pricing: PricingProps }) {
    return (
        <div className='overflow-hidden relative md:py-20 py-10'>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className=' absolute w-[852px] aspect-square -start-[384px]'>
                <Image
                    src={data.media[0].src}
                    alt={data.media[0].alt ?? "Image"}
                    fill
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className=' absolute w-[575.2px] aspect-square -rotate-135 -end-[150px] bottom-0'>
                <Image
                    src={data.media[0].src}
                    alt={data.media[0].alt ?? "Image"}
                    fill
                />
            </motion.div>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 space-y-16'>
                <div className='relative space-y-6 text-center'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold'>{data.title}</motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        dangerouslySetInnerHTML={{ __html: data.subtitle }} className='text-xl text-primary' />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0.4 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ButtonComp
                            text={data.button.text}
                            link={data.button.link ?? '/contact-us'}
                            center
                            white
                        />
                    </motion.div>

                </div>
                <div className='flex gap-8 lg:flex-row flex-col '>
                    {Pricing.plans.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: index * 0.3 }}
                            viewport={{ once: true, amount: 0.3 }}
                            key={index}
                            style={{
                                backgroundImage: index % 2 !== 0 ? "url(/Images/popular.webp)" : "none",
                            }}
                            className={`
                        ${index % 2 != 0 ? "bg-cover" : "bg-white/20 border border-white backdrop-blur-md"}
                        lg:w-[calc(100%/3)] w-full p-8 space-y-12  rounded-[40px]  `}>
                            <div className='space-y-4'>
                                <h3 className='text-3xl font-bold text-primary'>{item.title}</h3>
                                <p className='text-base font-medium text-primary'>{item.subtitle}</p>
                            </div>
                            <div className='space-y-4 text-primary item-content' dangerouslySetInnerHTML={{ __html: item.features }} />
                            <div className='text-primary price' dangerouslySetInnerHTML={{ __html: item.price }} />
                            <div className='w-full' >
                            <ButtonComp center blue={index % 2 != 0} white={index % 2 == 0} text={item.button.text} link={item.button.link ?? '/contact-us'} icon= {index % 2 != 0} style={{ width: '100% !important' }} />
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>

        </div>
    )
}
