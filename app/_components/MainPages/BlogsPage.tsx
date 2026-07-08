'use client'
import React, { useState } from 'react'
import NewsLetterForm from '../Forms/NewsLetterForm'
import Image from 'next/image'
import BlogWidget, { BlogsWidget } from '../BlogWidget'

interface Props {
    data: {
        hero: {
            title: string,
            subtitle: string,
            button: {
                text: string
            }
        }
    },
    AllBlogs: BlogsWidget[]
}

export default function BlogsPage({ data, AllBlogs }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const uniqueCategoryNamesSet = new Set<string>();
    AllBlogs?.forEach((item) => {
        item?.categories?.forEach((cat) => {
            if (cat?.name) uniqueCategoryNamesSet.add(cat.name);
        });
    });
    const categoryCounts: Record<string, number> = {
        almd: AllBlogs.length,
    };

    uniqueCategoryNamesSet.forEach((cat) => {
        categoryCounts[cat] = AllBlogs.filter((item) =>
            item.categories?.some((c) => c.name === cat)
        ).length;
    });


    const categories = ['all', ...Array.from(uniqueCategoryNamesSet)];

    const filteredBlogs =
        activeCategory === 'all'
            ? AllBlogs
            : AllBlogs.filter((item) =>
                item?.categories?.some((cat) => cat?.name === activeCategory)
            );

    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 md:pt-0 pt-10 '>
            <div className=' md:space-y-16 space-y-6'>
                <div className='text-center'>
                    <h1 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>{data.hero.title}</h1>
                    <p className='text-primary md:text-xl text-base font-light md:mt-6 mt-3'>{data.hero.subtitle}</p>
                </div>
                <NewsLetterForm />
            </div>
            <div className=' md:mt-[72px] mt-12 flex items-start justify-between md:flex-row flex-col gap-y-6  md:mx-0 -mx-4'>
                {categories.length > 1 &&
                    <div className='l:w-[296px] md:w-[200px] w-full gap-y-6 gap-x-4 flex md:flex-col flex-row md:overflow-visible overflow-x-scroll noscrollbar px-4  md:px-0 '>
                        {categories.map((cat, index) => (
                            <button
                                onClick={() => setActiveCategory(cat)}
                                key={index} className='flex singleCategory items-center gap-2 justify-between text-primary px-6 relative md:w-full w-fit text-center rounded-full md:text-lg text-sm font-bold md:py-6 py-[14px]  backdrop-blur-xl border border-white group
                        shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  overflow-hidden'>
                                <span className={`${activeCategory === cat ? "opacity-100" : " opacity-0"} transition-all duration-300 w-full h-full absolute inset-0`}>
                                    <Image src={'/Images/buttonBGBlue.png'} alt='bg' fill />
                                </span>
                                <span className='relative z-10'>
                                    {cat === 'all' ? "All" : cat}
                                </span>
                                <span className='relative z-10 md:text-base text-sm font-medium'>({cat === "all" ? AllBlogs.length : categoryCounts[cat]})</span>
                            </button>
                        ))}
                    </div>
                }
                <div className={`${categories.length > 1 ? "l:w-[calc(100%-328px)] md:w-[calc(100%-216px)] w-full" : "w-full"}   px-4  md:px-0 flex l:gap-x-8 gap-x-6 md:gap-y-10 gap-y-6 flex-wrap`}>
                    {filteredBlogs.map((item, index) => (
                        <div key={index} className='l:w-[calc(100%/3-22px)] md:w-[calc(100%/2-12px)] w-full'>
                            <BlogWidget data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
