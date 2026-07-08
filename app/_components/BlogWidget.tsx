import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export interface BlogsWidget {
    id: number,
    slug: string,
    title: string,
    front_image: {
        image: string,
        alt: string
    },
    short_content: string,
    categories: {
        id: number,
        name: string
    }[],
    reading_time: number,
    created_at: string
}

export default function BlogWidget({ data, talks }: { data: BlogsWidget, talks?: boolean }) {
    return (
        <Link className={`w-full block group relative border-white border  bg-white/30 overflow-hidden ${talks ? "md:rounded-[48px] rounded-3xl" : "md:rounded-[40px] rounded-3xl"} `} href={`${talks ? "/talks" : "/blogs"}/${data.slug}`}>
            <span className='w-full h-full inset-0 absolute md:group-hover:opacity-100 md:opacity-0 opacity-100 transition-all duration-500' style={{ backgroundImage: "url(/Images/bg-careerWidget.png)", backgroundSize: "100% 100%" }} />
            <div className='md:p-6 p-3  md:space-y-5 space-y-4 relative'>
                <div className={`${talks ? "h-[360px]" : "h-[230px]"} w-full  relative md:rounded-3xl rounded-[18px] overflow-hidden`}>
                    <Image src={data.front_image.image} alt={data.front_image.alt} fill className=' object-cover' />
                </div>
                <div className=' md:space-y-3 space-y-2'>
                    {data.categories.length>0 && 
                       <div className=''>
                        {data.categories.map((item, index) => (
                            <h3 key={index} className={` ${talks ? "font-medium" : "font-light"} text-babyBlue md:text-base text-sm `}>{item.name}</h3>
                        ))}
                    </div>
                    }
                 

                    <h4 className='md:text-lg text-sm font-semibold text-primary'>{data.title}</h4>
                    <p className={`${talks ? "" : "xl:line-clamp-3 line-clamp-2"} text-lightGray md:text-base text-xs `}>{data.short_content}</p>
                </div>
                <div className={`${talks ? "text-primary text-base font-semibold" : "text-lightGray md:text-sm text-[10px]"} flex justify-between items-center  `}>
                    <span>
                        {data.created_at}
                    </span>
                    {data.reading_time && !talks &&
                        <span>
                            {data.reading_time} {data.reading_time > 1 ? "mins" : "min"}
                        </span>
                    }

                </div>
            </div>

        </Link>
    )
}
