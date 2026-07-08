import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

export interface TechStackProps {
    title: string,
    subtitle: string,
    media: {
        type: string,
        src: string,
        alt: string
    }[]
}
export default function TechStack({ data }: { data: TechStackProps }) {
    return (
        <div className='md:space-y-[100px] space-y-8 md:mb-[78px]'>
            <div className='text-center'>
                <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary text-center' dangerouslySetInnerHTML={{ __html: data.title }} />
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='text-primary md:text-xl text-base font-light md:mt-6 mt-3'>{data.subtitle}</motion.p>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className='relative w-full sm:h-[640px] h-[500px]'>
                <Image
                    src={data.media[0].src}
                    alt={data.media[0].alt}
                    fill
                    className='object-contain md2:block hidden'
                />
                <Image
                    src={data.media[1].src}
                    alt={data.media[1].alt}
                    fill
                    className='object-contain md2:hidden block object-right'
                />
            </motion.div>
        </div>
    )
}
