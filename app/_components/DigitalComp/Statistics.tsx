import { animate, motion, useInView, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BGWhite from '../SVGs/BGWhite'
import Logo from '../SVGs/Logo'
import { useEffect, useRef } from 'react'

export interface StatisticsProps {
    title: string,
    items: {
        stat_title: string,
        stat_value: string
    }[],
    button: {
        text: string,
        link: string
    }
}

export default function StatisticsDigital({ data }: { data: StatisticsProps }) {
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
                    const formatted =
                        Number.isInteger(number)
                            ? Math.floor(latest).toString()
                            : latest.toFixed(1);

                    ref.current!.textContent = `${prefix}${formatted}${suffix}`;
                },
            });

            return () => controls.stop();
        }, [isInView, number, duration, prefix, suffix]);

        return <span ref={ref}>{value}</span>;
    }
    return (
        <div className=' overflow-hidden'>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4'>

                <div className='flex justify-between items-center md:gap-[28px] gap-8 flex-wrap md:py-20 py-14 '>
                    {data.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='lg:w-[calc(100%/4-21px)] md:w-[calc(100%/2-14px)] w-full  space-y-2' >
                            <h2 className="md:text-[56px] text-5xl font-bold text-primary">
                                <SmartCountUp value={item.stat_title} />
                            </h2>
                            <p className='text-lg text-primary font-light'>{item.stat_value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className='relative pb-[70px] pt-[78px]'>
                <div className=' absolute -left-[120px] bottom-0 w-[350px] h-[339px]'>
                    <Image
                        src={'/Images/Frameleft.webp'}
                        alt='Frameleft.webp'
                        fill
                    />
                </div>
                <div className=' absolute -right-[14px] top-0 w-[479px] aspect-square'>
                    <Image
                        src={'/Images/Frameright.webp'}
                        alt='Frameright.webp'
                        fill
                    />
                </div>
                <div className=' max-w-[1437px] mx-auto xl:px-20 px-4'>
                    <div className='w-full relative rounded-[80px] overflow-hidden md:py-[120px] py-20' >
                        <Image
                            src={'/Images/bgbig.png'}
                            alt='Image'
                            fill
                            className=' opacity-70'
                        />

                        <div className='relative z-10 max-w-[832px] mx-auto md:space-y-[72px] space-y-8 px-7'>
                            <h2 className='md:text-[56px] md:leading-[70px] text-2xl text-center text-primary font-semibold'>{data.title}</h2>
                            <Link href={data.button.link ?? ""} className='flex  bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-10 py-4 rounded-full md:w-fit w-full justify-center mx-auto text-primary'>
                                <span className=' relative z-10'>
                                    {data.button.text}
                                </span>
                                <span className='w-6 h-6 relative z-10'>
                                    <Logo />
                                </span>
                                <span
                                    style={{ filter: "blur(3px)" }}
                                    className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                    <BGWhite />
                                </span>

                            </Link>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    )
}
