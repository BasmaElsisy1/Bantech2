'use client'
import React, { useEffect, useState } from 'react'
import { QuestionProps } from '../FAQs'
import ButtonComp from '../button'
import Image from 'next/image'
import SingleFaq from '../SingleFaq'
import { motion } from 'motion/react'

interface Props {
    data: {
        hero: {
            title: string,
            subtitle: string,
            button: {
                text: string,
                link: string
            }
        }
    },
    AllFaqs: QuestionProps[],
    AllFAQsCategories: {
        id: number,
        name: string
    }[]
}

export default function FaqsPage({ data, AllFaqs, AllFAQsCategories }: Props) {
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openfaq, setOpenfaq] = useState(null);

    const handleClick = (index: any) => {
        setOpenfaq(index === openfaq ? null : index);
    };

    useEffect(() => {
        async function fetchFaqs() {
            setLoading(true);
            try {
                const url =
                    activeCategory === 0
                        ? `https://portal.bantech.ae/api/faqs`
                        : `https://portal.bantech.ae/api/faqs?filter[faq_category_id]=${activeCategory}`;

                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch FAQs");

                const data = await res.json();
                setFaqs(data.data);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFaqs();
    }, [activeCategory]); //  ← FIX HERE
    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 '>
            <div className=' md:space-y-8 space-y-6'>
                <div className='text-center'>
                    <h1 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary text-center' dangerouslySetInnerHTML={{ __html: data.hero.title }} />
                    <p className='text-primary md:text-xl text-base font-light md:mt-6 mt-3'>{data.hero.subtitle}</p>
                </div>
                <ButtonComp
                    text={data.hero.button.text}
                    link={data.hero.button.link}
                    center
                    blue
                />
            </div>
            <div className=' md:mt-[72px] mt-12 flex items-start justify-between md:flex-row flex-col gap-y-6  md:mx-0 -mx-4'>
                <div className='l:w-[280px] md:w-[200px] w-full gap-y-6 gap-x-4 flex md:flex-col flex-row md:overflow-visible overflow-x-scroll noscrollbar px-4  md:px-0 '>
                    <button
                        onClick={() => setActiveCategory(0)}
                        className='block singleCategory  text-center text-primary px-6 relative md:w-full w-fit rounded-full md:text-lg text-sm font-bold md:py-6 py-[14px]  backdrop-blur-xl border border-white group
                               shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  overflow-hidden'>
                        <span className={`${activeCategory === 0 ? "opacity-100" : " opacity-0"} transition-all duration-300 w-full h-full absolute inset-0`}>
                            <Image src={'/Images/buttonBGBlue.png'} alt='bg' fill />
                        </span>
                        <span className='relative z-10'>
                            All
                        </span>
                    </button>
                    {AllFAQsCategories.map((cat, index) => (
                        <button
                            onClick={() => setActiveCategory(index + 1)}
                            key={index} className='block singleCategory  text-center text-primary px-6 relative md:w-full w-fit rounded-full md:text-lg text-sm font-bold md:py-6 py-[14px]  backdrop-blur-xl border border-white group
                               shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  overflow-hidden'>
                            <span className={`${activeCategory === index + 1 ? "opacity-100" : " opacity-0"} transition-all duration-300 w-full h-full absolute inset-0`}>
                                <Image src={'/Images/buttonBGBlue.png'} alt='bg' fill />
                            </span>
                            <span className='relative z-10'>
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
                <div className='l:w-[calc(100%-328px)] md:w-[calc(100%-216px)] w-full  px-4  md:px-0 flex l:gap-x-8 gap-x-6 md:gap-y-10 gap-y-6 flex-wrap'>
                    {loading ?
                        <div className="flex items-center justify-center h-[70vh] w-full">

                            <div className="w-12 h-12 border-4 border-babyBlue border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        :
                        faqs.length > 0 ? faqs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.1 }} className='w-full'
                            >
                                <SingleFaq
                                    Singlefaq={item} index={index} openfaq={openfaq}
                                    Lastone={faqs.length - 1 == index}
                                    handleClick={handleClick} />
                            </motion.div>
                        )) :
                            <div className="flex items-center justify-center h-[40vh] w-full">

                                <p>No Questions here</p>
                            </div>

                    }
                </div>
            </div>
        </div>
    )
}
