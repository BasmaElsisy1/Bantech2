'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import ButtonComp from '../button'

export interface PaymentProps {
    media: {
        type: string
        src: string,
        alt: boolean
    }[],
    title: string,
    subtitle: string,
    button: {
        text: string,
        link: string
    }
}

export default function PaymentSection({ data }: { data: PaymentProps }) {
    return (
        <div className='relative xl:py-[163px] py-20  xl:px-20 px-4 pt-[210px] md:pt-0 overflow-hidden '>
            <div className='bg-white md:rounded-[64px] rounded-[32px] flex md:flex-row justify-between flex-col relative max-w-[1437px] mx-auto '>
                {data.media[0].src &&
                    <div className='relative md:hidden block w-full aspect-video -mt-[181px] px-10'>
                        {data.media.map((item, index) => (
                            item.type === "video" ?
                                <video
                                    key={index}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full"
                                >
                                    <source src={`${item.src}`} type="video/mp4" />
                                </video>
                                :
                                <Image
                                    key={index}
                                    src={item.src}
                                    alt='Homepage'
                                    fill
                                />
                        ))}
                    </div>
                }

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='xl:p-[60px] md:p-[30px] !pr-0 p-4 lg:w-[529px] md:w-1/2 w-full relative space-y-14'>
                    <div className='space-y-4 md:space-y-8 text-primary'>
                        <h2 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold'>{data.title}</h2>
                        <div className='space-y-4 text-base md:text-lg md:space-y-6'>
                            <p>{data.subtitle}</p>
                        </div>
                    </div>

                    <ButtonComp
                        text={data.button.text}
                        link={'/payment-links'}
                        white
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='xl:w-[calc(100%-600px)] -mt-[180px] md:block hidden   aspect-video lg:w-[calc(100%-640px)] md:w-[calc(50%-40px)]  w-full relative z-10 '>
                    {data.media[0].src &&
                        <div className='relative w-full'>
                            {data.media.map((item, index) => (
                                item.type === "video" ?
                                    <video
                                        key={index}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full scale-95 "
                                    >
                                        <source src={`${item.src}`} type="video/mp4" />
                                    </video>
                                    :
                                    <Image
                                        key={index}
                                        src={item.src}
                                        alt='Homepage'
                                        fill
                                    />
                            ))}
                        </div>
                    }
                </motion.div>
                <span className='absolute md:block hidden inset-0 h-full bg-white start-[80%] end-auto w-full ' />
            </div>
        </div>

    )
}
