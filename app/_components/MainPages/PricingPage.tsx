'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ButtonComp from '../button'
import FAQsSection from '../FAQsSection'
import CheckIcon from '../SVGs/CheckIcon'
import MenuArrow from '../SVGs/MenuArrow'
import Star from '../SVGs/Star'
interface FeatureItem {
    title: string;
    type: "boolean" | "string";
    value: boolean | string;
}

interface FeatureGroup {
    header: string | null;
    items: FeatureItem[];
}

interface PlanButton {
    text: string;
    link: string;
}

interface Plan {
    title: string;
    price: string;
    subtitle: string;
    features: string;
    is_recommended: boolean;
    button: PlanButton;
    feature_groups: FeatureGroup[];
}

interface Props {
    data: {
        hero: {
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
        },
        pricing: {
            products: {
                name: string,
                plans: Plan[]
            }[]
        },
        start_faq: {
            media:
            {
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
    }
}
interface FeatureRow {
    featureTitle: string;
    plans: (string | null)[];
}

interface GroupRow {
    groupName: string;
    type: "group";
    rows: FeatureRow[];
}



export default function PricingPage({ data }: Props) {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openFeatures, setOpenFeatures] = useState(null);
    const [openGroups, setOpenGroups] = useState<string | null>("Identity Verification");
    const handleClick = (index: any) => {
        setOpenFeatures(index === openFeatures ? null : index);
    };

    const plans = data.pricing.products[activeCategory].plans;
    const featureMap: Record<string, Set<string>> = {};

    const toggleGroup = (groupName: string | null) => {
        setOpenGroups(groupName === openGroups ? null : groupName)
    };

    plans.forEach(plan => {
        plan.feature_groups.forEach(group => {
            const header = group.header || "Misc";

            if (!featureMap[header]) featureMap[header] = new Set();

            group.items.forEach(item => {
                featureMap[header].add(item.title);
            });
        });
    });
    function getFeatureValue(
        plan: Plan,
        groupName: string,
        featureTitle: string
    ): string | null {
        const group = plan.feature_groups.find(
            g => (g.header || "Misc") === groupName
        );
        if (!group) return null;

        const item = group.items.find(i => i.title === featureTitle);
        if (!item) return null;

        if (item.type === "boolean") {
            return item.value ? "check" : "empty";
        }

        if (item.type === "string") {
            return item.value as string;
        }

        return null;
    }

    type ComparisonRow = GroupRow;
    const comparison: ComparisonRow[] = [];



    Object.entries(featureMap).forEach(([groupName, features]) => {
        const rows: FeatureRow[] = [];

        features.forEach(featureTitle => {
            rows.push({
                featureTitle,
                plans: plans.map(plan =>
                    getFeatureValue(plan, groupName, featureTitle)
                )
            });
        });

        comparison.push({
            groupName,
            type: "group",
            rows
        });
    });
    const words = data.hero.title.split('')

    return (
        <div className='relative overflow-hidden'>
            <div className=' overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className=' absolute md:w-[852px] overflow-hidden w-[561px] aspect-square md:-start-[384px] start-[-244px] top-[270px]'>
                    <Image
                        src={data.hero.media[0].src}
                        alt={data.hero.media[0].alt ?? "Image"}
                        fill
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className=' absolute md:w-[575.2px] w-full aspect-square -rotate-135 -end-[200px] md:-top-10 top-auto md:bottom-auto bottom-[430px]'>
                    <Image
                        src={data.hero.media[0].src}
                        alt={data.hero.media[0].alt ?? "Image"}
                        fill
                    />
                </motion.div>
                <div className='max-w-[1437px] mx-auto xl:px-20 px-4  md:py-20 py-10 space-y-20 relative'>
                    <div className=' md:space-y-16 space-y-8'>
                        <div className='text-center'>
                            <motion.h1
                                className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>
                                {words.map((part, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.1, delay: index * 0.03 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                    >
                                        {part}
                                    </motion.span>
                                ))}

                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className='text-primary text-xl font-light mt-6 mb-8'>{data.hero.subtitle}</motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 1.2 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <ButtonComp
                                    text={data.hero.button.text}
                                    link={data.hero.button.link}
                                    center
                                    white
                                />
                            </motion.div>

                        </div>

                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 1.4 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='flex justify-between items-start l:flex-row flex-col gap-y-6'>
                        <div className='l:w-[220px] flex l:flex-col flex-row w-full gap-6'>
                            {data.pricing.products.map((item, index) => (
                                <button
                                    onClick={() => setActiveCategory(index)}
                                    className='block text-primary px-6 relative l:w-full w-fit text-center rounded-full text-xl font-bold l:py-6 py-[14px]  backdrop-blur-xl border border-white group
    shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  overflow-hidden' key={index}>
                                    <span className={`${activeCategory === index ? "opacity-100" : " opacity-0"} transition-all duration-300 w-full h-full absolute inset-0`}>
                                        <Image src={'/Images/buttonBGBlue.png'} alt='bg' fill />
                                    </span>
                                    <span className=' relative z-10'>
                                        {item.name}
                                    </span>
                                </button>
                            ))}

                        </div>
                        <div className='l:w-[calc(100%-260px)] w-full flex lg:flex-row flex-col l:gap-6 gap-4 justify-end'>
                            {data.pricing.products[activeCategory].plans.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.1, delay: index * 0.3 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    key={index}

                                    className={`
                        ${index % 2 != 0 ? "bg-cover" : "bg-white/20 border border-white backdrop-blur-md"}
                        l:w-[309px] lg:w-[calc(100%/3-16px)] w-full l:p-6 px-4 py-6  lg:rounded-[40px] rounded-[32px] relative  overflow-hidden `}>
                                    {index % 2 !== 0 &&
                                        <>
                                            <span
                                                className=' absolute inset-0 l:block hidden'
                                                style={{
                                                    backgroundImage: "url(/Images/popular.webp)",
                                                    backgroundSize: "100% 100%"
                                                }} />
                                            <span
                                                className=' absolute inset-0 l:hidden block'
                                                style={{
                                                    backgroundImage: "url(/Images/Frame22.webp)",
                                                    backgroundSize: "cover"
                                                }} />
                                        </>

                                    }
                                    <div className=' relative  space-y-6'>
                                        <div className='space-y-4'>
                                            <h3 className='lg:text-lg text-3xl font-bold text-primary'>{item.title}</h3>
                                            <div className='text-primary price2 text-base lg:block hidden' dangerouslySetInnerHTML={{ __html: item.price }} />
                                            <p className='text-base font-medium text-primary lg:hidden block'>{item.subtitle}</p>
                                        </div>
                                        <p className='text-base font-medium text-primary lg:block hidden'>{item.subtitle}</p>
                                        <Link href={item.button.link ?? ""} className=' 
                                           backdrop-blur-xl border border-white group
                                        shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] text-primary
                                       lg:hidden flex gap-3 justify-center items-center py-3 w-full text-lg font-bold rounded-full bg-white/20 text-darkBlue'>
                                            {item.button.text}
                                            {index % 2 != 0 &&
                                                <span className='w-5 h-5'>
                                                    <Star />
                                                </span>
                                            }
                                        </Link>
                                        <div className='space-y-4 text-primary item-content' dangerouslySetInnerHTML={{ __html: item.features }} />
                                        <Link href={item.button.link ?? ""} className=' 
                                          backdrop-blur-xl border border-white group
                                         shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] text-primary
                                             lg:flex hidden gap-3 justify-center items-center py-3 w-full text-lg font-bold rounded-full bg-white/20 text-darkBlue'>
                                            {item.button.text}
                                            {index % 2 != 0 &&
                                                <span className='w-5 h-5'>
                                                    <Star />
                                                </span>
                                            }
                                        </Link>
                                        <div className='text-primary price2 text-base lg:hidden block' dangerouslySetInnerHTML={{ __html: item.price }} />

                                        <div className='l:hidden block border border-white rounded-[28px] overflow-hidden '>
                                            <h3
                                                onClick={() => handleClick(index)}
                                                className='flex justify-between items-center p-6 text-primary text-base font-semibold'>
                                                All Features
                                                <span className={`w-4 h-4 transform transition-transform duration-300 ${openFeatures ? "-rotate-90" : "rotate-90"} `}>
                                                    <MenuArrow />
                                                </span>
                                            </h3>
                                            {openFeatures === index && (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-6"
                                                >

                                                    {item.feature_groups.map((item2, ind) => {
                                                        const isOpen = openGroups === item2.header;
                                                        return (
                                                            <div key={ind}>
                                                                <div
                                                                    onClick={() => toggleGroup(item2.header)}
                                                                    className="cursor-pointer bg-white/80 backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] hover:bg-gray-200 transition p-6"
                                                                >
                                                                    <h4 className=' text-primary text-sm font-semibold flex justify-between items-center'>
                                                                        {item2.header}
                                                                        <span className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-90"}`}>
                                                                            <MenuArrow />
                                                                        </span>

                                                                    </h4>

                                                                </div>

                                                                {/* SLIDING FEATURE ROWS */}
                                                                <motion.div
                                                                    layout
                                                                    initial={false}
                                                                    animate={{ opacity: isOpen ? 1 : 0 }}
                                                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                                                    className={`${!isOpen ? "pointer-events-none" : ""}`}
                                                                >

                                                                    {item2.items.map((row, i) => (
                                                                        <div key={i} className='bg-white/20 border border-white py-4 overflow-hidden  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] '>

                                                                            <div className='flex max-w-[1437px] gap-6 mx-auto xl:px-20 px-4  justify-between items-center'>
                                                                                <h5 className='text-primary text-sm font-light'>
                                                                                    {row.title}
                                                                                </h5>
                                                                                <div className={` text-base text-primary font-light `}>
                                                                                    {row.type === "boolean" && row.value === true && <span className='w-4 h-4 inline-block'><CheckIcon /></span>}
                                                                                    {row.value === "empty" && ""}
                                                                                    {row.value &&
                                                                                        row.value !== "check" &&
                                                                                        row.value !== "empty" &&
                                                                                        row.value}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    ))}
                                                                </motion.div>
                                                            </div>
                                                        )
                                                    })}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                </motion.div>
                            ))}

                        </div>
                    </motion.div>
                </div>
            </div>

            <div className=' mb-20 l:block hidden'>
                <div className='flex max-w-[1437px] gap-6 mx-auto xl:px-20 px-4 justify-between'>
                    <div className='w-[309px]'>

                    </div>
                    <div className='flex gap-6 w-[calc(100%-310px)]'>
                        {data.pricing.products[activeCategory].plans.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.1, delay: index * 0.3 }}
                                viewport={{ once: true, amount: 0.3 }}
                                key={index}
                                style={{
                                    backgroundImage: index % 2 !== 0 ? "url(/Images/Frame-2572.webp)" : "none",
                                    backgroundSize: index % 2 !== 0 ? "" : "100% 100%"
                                }}
                                className={`
                        ${index % 2 != 0 ? "bg-cover" : "bg-white/20 border border-white backdrop-blur-md"}
                         p-6 pb-20 space-y-6  rounded-t-[40px] w-[309px]  `}>
                                <div className='space-y-4'>
                                    <h3 className='text-lg font-bold text-primary'>{item.title}</h3>
                                    <div className='text-primary price2 text-base' dangerouslySetInnerHTML={{ __html: item.price }} />
                                </div>
                                <Link href={item.button.link ?? ""} className='
                                  backdrop-blur-xl border border-white group
         shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] text-primary
                            flex gap-3 justify-center items-center py-3 w-full text-lg font-bold rounded-full bg-white/20 text-darkBlue'>
                                    {item.button.text}
                                    {index % 2 != 0 &&
                                        <span className='w-5 h-5'>
                                            <Star />
                                        </span>
                                    }
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
                {comparison.map((group, index) => {
                    const isOpen = openGroups === group.groupName;

                    return (
                        <div key={index} className={`${index === 0 ? "-mt-10" : ""}`}>
                            <div
                                onClick={() => toggleGroup(group.groupName)}
                                className="cursor-pointer bg-white/80 backdrop-blur-xl     shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] 
 hover:bg-gray-200 transition py-9"
                            >
                                <h4 className='max-w-[1437px] mx-auto xl:px-20 px-4 text-primary text-xl font-semibold flex justify-between items-center'>
                                    {group.groupName}
                                    <span className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-90"}`}>
                                        <MenuArrow />
                                    </span>

                                </h4>

                            </div>

                            {isOpen && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                >

                                    {group.rows.map((row, i) => (
                                        <div key={i} className='bg-white/20 border border-white overflow-hidden  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] '>

                                            <div className='flex max-w-[1437px] gap-6 mx-auto xl:px-20 px-4  justify-between items-center'>
                                                <div className='w-[309px]'>
                                                    <h5 className='text-primary text-lg font-light'>
                                                        {row.featureTitle}
                                                    </h5>
                                                </div>
                                                <div className='flex gap-6 w-[calc(100%-310px)]'>
                                                    {row.plans.map((value, j) => (
                                                        <div key={j} className={`${j % 2 === 0 ? "" : "bg-white/40"} py-[30px] text-center w-[309px] block text-base text-primary font-light `}>
                                                            {value === "check" && <span className='w-6 h-6 inline-block'><CheckIcon /></span>}
                                                            {value === "empty" && ""}
                                                            {value &&
                                                                value !== "check" &&
                                                                value !== "empty" &&
                                                                value}
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
