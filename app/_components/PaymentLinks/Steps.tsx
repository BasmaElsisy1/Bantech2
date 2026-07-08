'use client'
import { motion } from 'motion/react'
import { useState } from 'react'
import MenuArrow from '../SVGs/MenuArrow'
import Image from 'next/image'

export interface PropsSteps {
    header: string,
    items: {
        video?: string,
        header: string,
        number: string,
        title: string,
        description: string,
        image?: {
            src: string,
            alt: string
        }
    }[]
}
export default function Steps({ data }: { data: PropsSteps }) {
    const [Active, setActive] = useState(0)

    const handleNext = () => {
        setActive((prev) => (prev + 1) % data.items.length)
    }

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + data.items.length) % data.items.length)
    }
    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 flex items-center justify-between md:flex-row flex-col overflow-hidden '>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className='lg:w-[300px] w-[120px] space-y-6 md:block hidden'>
                {data.items.map((item, index) => (
                    <button key={index}
                        onClick={() => setActive(index)}
                        className={`
                    ${Active === index ? "text-primary font-semibold pointer-events-none" : "text-grey"}
                    flex gap-2 items-center text-sm lg:text-base  transition-all duration-300 cursor-pointer hover:text-primary text-start text-pretty`}>

                        <span className={` ${Active === index ? "block" : "hidden"} transition-all duration-300 w-5 h-5`}>
                            <MenuArrow />
                        </span>
                        {item.header}
                    </button>
                ))}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
                className='lg:w-[calc(100%-300px)] relative md:w-[calc(100%-150px)] w-full md:flex-row flex-col gap-y-8 flex justify-between items-center'>
                <div className='xl:w-[calc(100%-546px)] md:w-[calc(100%-330px)] w-full text-primary space-y-4 md:text-start text-center'>
                    <h2 className='flex gap-2 justify-center items-center text-sm md:justify-start'>
                        <span className={`block w-4 h-4 transition-all duration-300 md:hidden`}>
                            <MenuArrow />
                        </span>
                        {data.items[Active].number}</h2>
                    <h3 className='mb-8 text-2xl font-semibold lg:text-3xl text-pretty'>{data.items[Active].title}</h3>
                    <div className='text-base' dangerouslySetInnerHTML={{ __html: data.items[Active].description }} />
                </div>
                <div className='xl:w-[500px] lg:w-[400px] md:w-[300px] w-full lg:h-[640px] overflow-hidden relative  md:h-[500px] h-[444px] md:rounded-[64px] rounded-[32px]'>

                    {data.items[Active].video ?
                        <video
                            key={data.items[Active].video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className={`w-full h-full`}
                        >
                            <source src={data.items[Active].video ?? ""} type="video/mp4" />
                        </video>
                        : data.items[Active].image?.src &&
                        <Image
                            src={data?.items[Active]?.image?.src}
                            alt={data.items[Active].image?.alt}
                            fill
                            className=' object-contain'
                        />
                    }


                </div>
            </motion.div>
            <div className='flex gap-6 justify-center items-center mt-6 md:hidden'>
                <button
                    onClick={handlePrev}
                    className={` ${Active === 0 ? " pointer-events-none text-white" : "text-primary"} flex justify-center items-center w-10 h-10 rounded-full border border-white transition-all duration-300 bg-white/20`}
                >
                    <span className='w-4 h-4 rotate-180'>
                        <MenuArrow />
                    </span>
                </button>
                <button
                    onClick={handleNext}
                    className={`
                        ${Active + 1 === data.items.length ? " pointer-events-none text-white" : "text-primary"}
                        flex justify-center items-center w-10 h-10 rounded-full border border-white transition-all duration-300 bg-white/20`}
                >
                    <span className='w-4 h-4'>
                        <MenuArrow />
                    </span>
                </button>
            </div>
        </div>
    )
}