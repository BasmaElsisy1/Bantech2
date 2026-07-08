'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import Arrow from "../SVGs/Arrow";
import MenuArrow from "../SVGs/MenuArrow";
import Image from "next/image";

interface ItemLIst {
    feature_title: string,
    feature_description: string
}
export interface StrategySectionProps {
    items: {
        cycle_title: string,
        cycle_features: ItemLIst[]
    }[]
}

export interface ProductsProps {
    product_image: string,
    items: {
        product_title: string,
        product_features: ItemLIst[]
    }[]
}
export default function StrategySection({ data, partner }: { data: StrategySectionProps | ProductsProps, partner?: boolean }) {
    const [activeTab, setActiveTab] = useState(0);

    const isStrategy = (item: any): item is StrategySectionProps['items'][0] => 'cycle_title' in item;
    const getTitle = (item: any) => isStrategy(item) ? item.cycle_title : item.product_title;
    const getFeatures = (item: any) => isStrategy(item) ? item.cycle_features : item.product_features;

    // autoplay (shared for desktop & mobile)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab(prev =>
                prev === data.items.length - 1 ? 0 : prev + 1
            );
        }, 3500);

        return () => clearInterval(interval);
    }, [data.items.length]);

    const goNext = () => {
        setActiveTab(prev =>
            prev === data.items.length - 1 ? 0 : prev + 1
        );
    };

    const goPrev = () => {
        setActiveTab(prev =>
            prev === 0 ? data.items.length - 1 : prev - 1
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`${partner ? "max-w-[1218px] mx-auto px-4" : "max-w-[1437px] mx-auto xl:px-20 px-4"}  md:py-[143px] py-[70px]`}>

            {/* DESKTOP VIEW */}
            <div className='hidden lg:flex justify-between items-center relative'>

                {/* LEFT TABS */}
                <div className='w-[426px] flex flex-col gap-12'>
                    {data.items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`${activeTab === index
                                ? " text-babyBlue text-4xl font-bold !py-[45px]"
                                : " text-2xl text-grey"
                                } relative text-start transition-all duration-500`}>

                            <span className={`${activeTab === index ? " opacity-100" : " opacity-0"}
                                w-[240px] h-[240px] rounded-full bg-white absolute -left-[192px] inset-y-0 my-auto transition-opacity duration-500`} />

                            <span className='relative z-10'>{getTitle(item)}</span>
                        </button>
                    ))}
                </div>

                <div className='w-[calc(100%-482px)] space-y-20 '>
                    {'product_image' in data && data.product_image && <Image src={data.product_image} alt="Product" width={1099} height={976} className=' top-[-189px] right-[-200px] left-auto bottom-0 !w-[1099px] h-[976px] absolute z-[-1]' />}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-20"
                        >
                            {getFeatures(data.items[activeTab]).map((item: ItemLIst, index: number) => (
                                <div
                                    key={index}
                                    className={`${index % 2 === 0 ? "w-[456px]" : "w-[390px] ms-auto"} space-y-3`}
                                >
                                    <h3 className='text-primary text-xl font-semibold'>
                                        {item.feature_title}
                                    </h3>
                                    <p className='text-lg text-[#5A628C]'>
                                        {item.feature_description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className='block lg:hidden relative mt-10 space-y-12 '>
                {'product_image' in data && data.product_image && <Image src={data.product_image} alt="Product" width={642} height={591} className=' top-[-189px] -right-12 bottom-0  absolute z-[-1]' />}

                <div className="flex gap-6 justify-between items-center">
                    <h2 className="text-babyBlue text-4xl font-bold relative">
                        <span className={`
                                w-[178px] h-[178px] rounded-full bg-white absolute -left-[120px] inset-y-0 my-auto transition-opacity duration-500`} />

                        <span className="relative z-10">
                            {getTitle(data.items[activeTab])}
                        </span>
                    </h2>
                    <div className="flex justify-between items-center w-[128px] gap-4">
                        <button onClick={goPrev}
                            className={` ${activeTab === 0 ? " pointer-events-none text-white" : "text-primary"} flex justify-center items-center w-10 h-10 rounded-full border border-white transition-all duration-300 bg-white/20`}
                        >
                            <span className='w-4 h-4 rotate-180'>
                                <MenuArrow />
                            </span>
                        </button>

                        <button onClick={goNext}
                            className={`
                        ${activeTab + 1 === data.items.length ? " pointer-events-none text-white" : "text-primary"}
                        flex justify-center items-center w-10 h-10 rounded-full border border-white transition-all duration-300 bg-white/20`}>
                            <span className="w-4 h-4">
                                <MenuArrow />
                            </span>
                        </button>
                    </div>
                </div>

                <motion.div
                    key={activeTab}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                        if (info.offset.x < -40) goNext();
                        if (info.offset.x > 40) goPrev();
                    }}
                    className="space-y-10 pt-12"
                >
                    {getFeatures(data.items[activeTab]).map((item: ItemLIst, index: number) => (
                        <div key={index} className="space-y-3">
                            <h3 className="text-primary font-semibold">{item.feature_title}</h3>
                            <p className="text-[#5A628C]">{item.feature_description}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

        </motion.div>
    )
}
