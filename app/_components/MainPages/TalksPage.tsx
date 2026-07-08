'use client'
import { useState } from 'react'
import BlogWidget, { BlogsWidget } from '../BlogWidget'
import PaginationFilter from '../PaginationFilter'

interface Props {
    data: {
        hero: {
            title: string,
            subtitle: string,
        }
    },
    AllBlogs: BlogsWidget[]
}

export default function TalksPage({ data, AllBlogs }: Props) {
    const [page, setPage] = useState(1);
    const pageSize = 2;
    const paginatedArticles = AllBlogs.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    const totalItem = AllBlogs.length;
    const totalPages = Math.ceil(totalItem / pageSize);
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

    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 md:space-y-20 space-y-10 '>
            <div className=' md:space-y-16 space-y-6'>
                <div className='text-center'>
                    <h1 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>{data.hero.title}</h1>
                    <p className='text-primary md:text-xl text-base font-light md:mt-6 mt-3'>{data.hero.subtitle}</p>
                </div>
            </div>
            <div className='space-y-8'>
                <div className='flex gap-10 flex-wrap'>
                    {paginatedArticles.map((item, index) => (
                        <div key={index} className='md:w-[calc(100%/2-20px)] w-full'>
                            <BlogWidget data={item} talks />
                        </div>
                    ))}
                </div>
                {totalPages != 1 &&
                    <PaginationFilter
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                }
            </div>

        </div>
    )
}
