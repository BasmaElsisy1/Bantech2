'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ButtonComp from '../../button';
import CodeFrame from '../../SVGs/CodeFrame';
import { Props, SingleService } from '../Services';

export default function ServicesDesktop({ services }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

    const getHeightClass = (index: number) => {
        const distance = Math.abs(index - activeIndex);
        const heightMap = {
            0: "h-[595px]",
            1: "h-[560px]",
            2: "h-[480px]",
            3: "h-[400px]",
        };
        return heightMap[distance as keyof typeof heightMap] || "h-[320px]";
    };

    useEffect(() => {
        setHasRenderedOnce(true);
    }, []);
    return (
        <div className='relative'>
            <div className='flex flex-row gap-4 items-center justify-start h-[595px]'>
                {services.map((service: SingleService, index: number) => (
                    <div key={index}
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveIndex(index)}
                        className={`${activeIndex == index ? "lg:w-[893px] w-[700px]" : "w-[64px] justify-center"} transition-all duration-500 flex items-center rounded-[64px] ${getHeightClass(index)}`} style={{ background: `${index === 0 ? "#CCF5FF" : index === 1 ? "#DBF5FF" : index === 2 ? "#E5F8FF" : index === 3 ? "#F0FBFF" : index === 4 ? "#F5FCFF" : ""}` }} >
                        <h2 className={`${activeIndex == index ? " hidden" : "block"} transition-all duration-500 text-xl font-semibold text-primary -rotate-90 whitespace-nowrap p-4`}>{service.tagline}</h2>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    className="lg:p-[56px] p-10 flex flex-col justify-between h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.6, delay: hasRenderedOnce ? 0.5 : 0 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                >
                                    <div className='space-y-10'>
                                        <p className='flex gap-2.5 items-center text-lg text-primary'>
                                            <span className='w-6 h-6'>
                                                <CodeFrame />
                                            </span>{service.tagline}</p>
                                        <motion.h3
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.5, delay: hasRenderedOnce ? 0.6 : 0.1 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                            className=" md:text-[33px] md:leading-[60px] text-2xl text-pretty text-primary font-bold max-w-[620px]">
                                            {service.title}
                                        </motion.h3>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.4, delay: hasRenderedOnce ? 0.7 : 0.2 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                            className="max-w-[464px] text-primary text-base"
                                            dangerouslySetInnerHTML={{ __html: service.content }}
                                        />

                                    </div>

                                    <ButtonComp
                                        text={service.button.text}
                                        link={service.button.link ?? "/contact-us"}
                                        white
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>

    )
}
