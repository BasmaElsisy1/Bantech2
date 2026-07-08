'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import ButtonComp from '../button'

export interface StartQRProps {
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

export default function StartQR({ data }: { data: StartQRProps }) {
    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 flex justify-between items-center md:py-20 py-10 overflow-hidden md:flex-row flex-col-reverse'>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className='lg:w-[682px] md:w-[50%] w-full space-y-8 relative z-10'>
                <h2 className='text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold'>{data.title}</h2>
                <div className='space-y-6 text-lg font-light text-primary'>
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
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className='lg:w-[calc(100%-682px)] md:w-1/2 w-full relative md:h-[569px] sm:h-[440px] h-[300px] aspect-video '>
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
