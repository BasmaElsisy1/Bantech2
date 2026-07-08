'use client'
import Link from 'next/link';
import BlueArrow from '../SVGs/BlueArrow';
import ButtonComp from '../button';
import Image from 'next/image';
import { motion } from 'motion/react';
export interface HeroHomePorps {
    title: string,
    subtitle: string;
    button: {
        text: string,
        link: string
    }
    media: {
        type: string,
        src: string,
        alt: string
    }[];
}
export default function HeroSection({ data }: { data: HeroHomePorps }) {
    const words = data.title.split('')
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            className='heroImage relative flex justify-between md:items-end items-start bg-contain  bg-no-repeat 1xl:pe-[72px] 2xl:ps-[113px] 1xl:ps-20 md:px-10 px-4 xl:pt-[72px] sm:pt-10 pt-[55px] sm:pb-[139px] pb-5 sm:flex-row flex-col gap-y-14 overflow-hidden'
        >
            <div className='1xl:w-[535px] sm:w-[50%] w-full lg:space-y-16 md:space-y-10 space-y-8'>
                <div className='space-y-4 md:space-y-6 lg:space-y-8'>
                    <h1
                        className="shadow-custom text-primary xl:text-[53px] xl:leading-normal l:text-5xl l:leading-[63px] lg:text-4xl md:text-3xl text-[28px] font-semibold">
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 1.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='text-base text-primary md:text-lg'>{data.subtitle}</motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 1.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <ButtonComp
                        text={data.button.text}
                        link={data.button.link}
                        blue
                    />
                </motion.div>


            </div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 1.6 }}
                viewport={{ once: true, amount: 0.3 }}
                className=' shadow-custom 1xl:w-[calc(100%-535px-66px)] sm:w-[calc(50%-40px)] w-[90%] sm:m-0 ms-auto relative sm:aspect-square aspect-271/271 rounded-[40px] overflow-hidden'>

                {data.media.map((item, index) => (
                    item.type === "video" ?
                        <video
                            key={index}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full scale-110"
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


            </motion.div>
            <Link href={`#CoreValues`} className='flex absolute bottom-10 gap-2 items-center text-xs -rotate-90 -start-10 text-babyBlue sm:hidden'>
                <span className='w-5 h-5 rotate-90'>
                    <BlueArrow />
                </span>
                Scroll Down
            </Link>
        </motion.div>
    )
}
