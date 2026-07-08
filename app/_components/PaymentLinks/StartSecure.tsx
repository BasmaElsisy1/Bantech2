'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import ButtonComp from '../button'
export interface StartSecureProps {
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

export default function StartSecure({ data }: { data: StartSecureProps }) {
    return (
        <div className='md:py-20 py-0 space-y-10'>
            <div className='space-y-6 text-center max-w-[1197px] px-4 mx-auto relative'>
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
                    viewport={{ once: true, amount: 0.3 }} dangerouslySetInnerHTML={{ __html: data.subtitle }} className='text-xl text-primary' />
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
                className='max-w-[1122px] mx-auto'>
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

        </div>
    )
}
