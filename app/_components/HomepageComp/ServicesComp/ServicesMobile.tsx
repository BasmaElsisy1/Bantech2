'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Props, SingleService } from '../Services';
import CodeFrame from '../../SVGs/CodeFrame';
import Link from 'next/link';
import ButtonComp from '../../button';


export default function ServicesDesktop({ services }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

    // const getWidth = (index: number) => {
    //     if (index === activeIndex) return "w-full";
    //     if (index === activeIndex - 1 || index === activeIndex + 1) return "w-[90%]";
    //     return "w-[80%]";
    // };

    const getWidth = (index: number) => {
        const distance = Math.abs(index - activeIndex);
        const heightMap = {
            0: "w-full",
            1: "w-[90%]",
            2: "w-[80%]",
            3: "w-[70%]",
        };
        return heightMap[distance as keyof typeof heightMap] || "w-[60%]";
    };
    useEffect(() => {
        setHasRenderedOnce(true);
    }, []);
    return (
        <div className='relative'>
            <div className='flex flex-col gap-2 justify-center items-center'>
                {services.map((service: SingleService, index: number) => (
                    <motion.div key={index}
                        layout
                        transition={{ duration: 0.5, type: 'spring' }}
                        onClick={() => setActiveIndex(index)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={activeIndex === index}
                        className={`flex flex-col items-center transition-all duration-500 rounded-[27px] ${getWidth(index)}`} style={{ background: `${index === 0 ? "#CCF5FF" : index === 1 ? "#DBF5FF" : index === 2 ? "#E5F8FF" : index === 3 ? "#F0FBFF" : index === 4 ? "#F5FCFF" : ""}` }}>
                        <h2
                            className={`
                                transition-all duration-500 text-center w-full text-base font-semibold text-primary whitespace-nowrap overflow-hidden p-4
                                ${activeIndex === index ? " absolute opacity-0" : " opacity-100"}
                            `}
                        >
                            {service.tagline}
                        </h2>

                        <motion.div
                            className={`overflow-hidden`}
                            initial={false}
                            animate={activeIndex === index ? { height: "auto" } : { height: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                        >
                            <div className='p-6 space-y-8 w-full'>
                                <div className='space-y-6'>
                                    <p className='flex gap-2.5 items-center md:text-lg text-xs  text-primary'>
                                        <span className='w-6 h-6'>
                                            <CodeFrame />
                                        </span>{service.tagline}</p>
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.2, delay: hasRenderedOnce ? 0.2 : 0.1 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.01 } }}
                                        className="text-2xl font-bold text-primary"
                                    >
                                        {service.title}
                                    </motion.h3>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.2, delay: hasRenderedOnce ? 0.2 : 0.2 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.01 } }}
                                        className="text-base text-primary"
                                        dangerouslySetInnerHTML={{ __html: service.content }}
                                    />
                                </div>
                                <ButtonComp
                                    text={service.button.text}
                                    link={service.button.link ?? "/contact-us"}
                                    white
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>

    )
}
