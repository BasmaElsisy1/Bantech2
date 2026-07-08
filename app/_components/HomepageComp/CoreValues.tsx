'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import React, { useState } from 'react'

interface SingleList {
    Title: string,
    Description: string
}
interface Props {
    List: SingleList[],
    ImageSrc: {
        alt: string,
        src: string
    }
}
export default function CoreValues({ data }: { data: Props }) {
    const [fullText, setFullText] = useState<number | null>(null);
    return (
        <div className='flex flex-col-reverse gap-4 items-end mt-14 sm:gap-10 lg:-mt-10 xl:-mt-5 sm:flex-row overflow-hidden' id='CoreValues'>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className='overflow-hidden relative w-full aspect-[1/1] rounded-[80px] lg:w-1/2 '>
                {data.ImageSrc.src ?
                    <Image
                        src={data.ImageSrc.src}
                        alt={data.ImageSrc.alt}
                        fill
                        className=' object-cover'
                    /> :
                    <Image
                        src={"/Images/placeholder.jpg"}
                        alt='image'
                        fill
                    />
                }
            </motion.div>
            <div className='space-y-4 w-full sm:space-y-6 lg:w-1/2'>
                {data.List.map((item: SingleList, index: number) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 * index }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='bg-white/20 border border-white px-6 py-[25px] sm:p-12 rounded-[64px] space-y-3 sm:space-y-6' key={index}>
                        <h2 className='text-xl sm:text-[32px] font-semibold text-primary'>{item.Title}</h2>
                        <div className={`transition-all duration-500 ${fullText != null && fullText != index ? "hidden" : ""} relative`}>
                            <div className={`
                                ${fullText === index ? "" : "line-clamp-2"} transition-all duration-500
                                text-xs sm:text-lg text-primary `} dangerouslySetInnerHTML={{ __html: item.Description }} />
                            {fullText === null &&
                                <button
                                    onClick={() => setFullText(index)}
                                    className='text-primary font-bold  text-xs sm:text-lg absolute md:bottom-[2px] bottom-0 right-0 bg-[#f3f3f3]'>
                                    ..more
                                </button>
                            }

                            {fullText != null && fullText == index ?
                                <button
                                    onClick={() => setFullText(null)}
                                    className='text-primary font-bold text-xs sm:text-lg bg-[#f3f3f3]'>
                                    less
                                </button> : null}
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    )
}
