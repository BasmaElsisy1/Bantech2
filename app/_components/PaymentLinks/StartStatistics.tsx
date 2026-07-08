'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import ButtonComp from '../button'
export interface AfterProps {
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
export default function StartStatistics({ data }: { data: AfterProps }) {
    return (
        <div className='max-w-[1437px]  mx-auto xl:px-20 px-4 flex justify-between items-center lg:py-[143px] py-10 relative overflow-hidden md:flex-row flex-col gap-y-6'>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className='lg:w-[535px] md:w-[450px] w-full space-y-8'>
                <h2 className='text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold md:text-start text-center'>{data.title}</h2>
                <div className='space-y-6 text-lg text-center text-primary md:text-start'>
                    {data.subtitle.split('\n').map((line, index) => (
                        line.trim() && <p key={index}>{line.trim()}</p>
                    ))}
                </div>
                <ButtonComp
                    text={data.button.text}
                    link={data.button.link}
                    white
                />
            </motion.div>
            <div className='lg:w-[calc(100%-610px)] md:w-[calc(100%-525px)] w-full space-y-[30px] relative md:overflow-auto overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className=' absolute w-[195px] h-auto inset-0 lg:right-[94px] right-0 left-auto'>
                    <Image
                        src={'/Images/zigzag.webp'}
                        alt='zigzag'
                        fill
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='lg:w-[498px] lg:h-[274px] md:w-[400px] w-full md:h-[200px] h-[184px] relative rounded-[64px] overflow-hidden'>
                    <Image
                        src={data.media[0].src}
                        alt={data.media[0].alt}
                        fill
                        className='object-cover'
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='lg:w-[498px] lg:h-[274px] md:w-[400px] w-full md:h-[200px] h-[184px] relative rounded-[64px] overflow-hidden lg:ms-[340px] md:ms-[150px] ms-20'>
                    <Image
                        src={data.media[1].src}
                        alt={data.media[1].alt}
                        fill
                        className='object-cover'
                    />
                </motion.div>
            </div>
        </div>
    )
}
