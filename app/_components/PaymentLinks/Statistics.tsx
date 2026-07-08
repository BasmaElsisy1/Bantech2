'use client'
import { animate, motion, useInView, useMotionValue } from 'motion/react'
import React, { useEffect, useRef } from 'react'

export interface StatisticsProps {

    items: {
        title: string,
        value: string
    }[]
}
export interface Statistics2Props {

    title: string,
    value: string
}
export default function Statistics({ data, data2 }: { data?: StatisticsProps, data2?: Statistics2Props[] }) {
    function SmartCountUp({
        value,
        duration = 2.5,
    }: {
        value: string;
        duration?: number;
    }) {
        const ref = useRef<HTMLSpanElement>(null);
        const isInView = useInView(ref, { once: true, amount: 0.3 });

        // match first number only (integer or decimal)
        const match = value.match(/\d+(\.\d+)?/);
        const number = match ? Number(match[0]) : 0;

        // everything before & after the number
        const prefix = match ? value.slice(0, match.index) : "";
        const suffix = match
            ? value.slice((match.index ?? 0) + match[0].length)
            : value;

        const count = useMotionValue(0);

        useEffect(() => {
            if (!isInView || !ref.current) return;

            const controls = animate(count, number, {
                duration,
                ease: "easeOut",
                onUpdate(latest) {
                    if (!ref.current) return;

                    const formatted =
                        Number.isInteger(number)
                            ? Math.floor(latest).toString()
                            : latest.toFixed(1);

                    ref.current.textContent = `${prefix}${formatted}${suffix}`;
                }

            });

            return () => controls.stop();
        }, [isInView, number, duration, prefix, suffix]);

        return <span ref={ref}>{value}</span>;
    }


    return (
        <div className='max-w-[1440px] mx-auto xl:px-20 px-4 flex justify-between items-center md:gap-[28px] gap-8 flex-wrap md:py-20 py-14 '>
            {data && data.items.length > 0 ? data?.items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='lg:w-[calc(100%/5-23px)] md:w-[calc(100%/2-14px)] w-full  space-y-2' >
                    <h2 className="md:text-[56px] text-5xl font-bold text-primary">
                        <SmartCountUp value={item.title} />
                    </h2>

                    <p className='text-lg text-primary'>{item.value}</p>
                </motion.div>
            )) :
                data2?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='lg:w-[calc(100%/5-23px)] md:w-[calc(100%/2-14px)] w-full  space-y-2' >
                        <h2 className="md:text-[56px] text-5xl font-bold text-primary">
                            <SmartCountUp value={item.title} />
                        </h2>

                        <p className='text-lg text-primary'>{item.value}</p>
                    </motion.div>
                ))}


        </div>
    )
}
