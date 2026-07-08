'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import ButtonComp from '../button'

export interface VideoProps {
    title: string,
    subtitle: string,
    button: {
        text: string,
        link: string
    },
    media: {
        type: string,
        src: string,
        alt?: string
    }[]
}
export default function Video({ data }: { data: VideoProps }) {
    return (
        <div className='md:my-20 my-[50px]'>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.4 }}
            >
                {data.media.map((item, index) => (
                    item.type === "video" ?
                        <video
                            key={index}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="md:w-[668px] w-[280px] mx-auto"
                        >
                            <source src={`${item.src}`} type="video/mp4" />
                        </video>
                        :
                        <Image
                            key={index}
                            src={item.src}
                            alt={item.alt ?? "Image"}
                            className="md:w-[668px] w-[280px] mx-auto"
                        />
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full bg-white/30 backdrop-blur-lg border border-white md:p-10 p-4 md:rounded-[64px] rounded-[32px] md:-mt-[180px] -mt-20 relative backdrop-blur-xs">
                <h2 className='text-primary font-semibold md:text-[40px] md:leading-[60px] text-2xl text-center'>{data.title}</h2>
                <p className='mt-4 mb-6 text-base text-center text-primary md:text-xl'>{data.subtitle}</p>
                <ButtonComp
                    center
                    text={data.button.text}
                    link={data.button.link}
                    white
                />
            </motion.div>
        </div>
    )
}
