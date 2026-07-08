'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import ButtonComp from '../button'

export interface StartBusinessProps {
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
}
export default function StartBusiness({ data }: { data: StartBusinessProps }) {
    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 md:py-20 py-10 md:space-y-20 space-y-10'>
            <div className='space-y-6 text-center'>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }} className='text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold'>{data.title}</motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }} className='text-xl text-primary'>{data.subtitle}</motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <ButtonComp
                        text={data.button.text}
                        link={data.button.link}
                        center
                        white
                    />
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className='max-w-[940px] mx-auto relative md:h-[388px] h-[294px]'>
                <Image
                    src={data.media[0].src}
                    alt={data.media[0].alt}
                    fill
                    className=' md:block hidden'
                />
                <Image
                    src={data.media[1].src}
                    alt={data.media[1].alt}
                    fill
                    className=' md:hidden block'
                />
            </motion.div>

        </div>
    )
}
