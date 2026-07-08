import Image from 'next/image'
import ButtonComp from '../button'
import Link from 'next/link'

export interface BantechTeamProps {
    title: string,
    subtitle: string,
    button: {
        text: string,
        link: string
    },
    media: {
        type: string
        src: string,
        alt: boolean
    }[],
}

export interface SingleBlogWidget {
    id: number,
    slug: string,
    front_image: {
        image: string,
        alt: string
    },
    categories: {
        id: number,
        name: string
    }[],
    title: string,
    short_content: string,
    created_at: string,
    reading_time: number
}

export default function BantechTeam({ data, BlogsData }: { data: BantechTeamProps, BlogsData: SingleBlogWidget[] }) {

    return (
        <div className='md:py-20'>
            <div className='space-y-4 text-center text-primary'>
                <h2 className='  md:text-[40px] md:leading-[60px] text-2xl font-semibold'>{data.title}</h2>
                <p className='text-base font-medium md:text-xl'>{data.subtitle}</p>
                <ButtonComp
                    text={data.button.text}
                    link={data.button.link ?? '/blogs'}
                    white
                    center
                />
            </div>
            <div className='flex gap-10 justify-between md:mt-[50px] mt-8 lg:flex-row flex-col'>
                {data.media[0].src &&
                    <div className='xl:w-[620px] md:w-[45%] w-full relative h-auto md:rounded-[80px] rounded-4xl overflow-hidden'>
                        <Image
                            src={data.media[0].src}
                            alt='Bantech Team'
                            fill
                            className=' object-cover'
                        />
                    </div>
                }
                <div className='xl:w-[calc(100%-660px)] lg:w-[calc(55%-40px)] w-full md:space-y-10 space-y-4'>
                    {BlogsData.map((item: SingleBlogWidget, index: number) => (
                        <Link
                        href={`/blogs/${item.slug}`}
                        key={index} className='flex group justify-between md:p-6 p-3 bg-white/20 border border-white md:rounded-[48px] rounded-3xl'>
                            <div className='relative aspect-[640/359] md:w-[240px] w-[36%] md:rounded-4xl rounded-[18px] overflow-hidden'>
                                <Image
                                    src={item.front_image.image}
                                    alt={item.front_image.alt ?? item.title}
                                    fill
                                    className='object-cover group-hover:scale-105 transition-all duration-500'
                                />
                            </div>
                            <div className='md:w-[calc(100%-260px)] w-[calc(100%-38%)] md:space-y-6 space-y-3'>
                                <div className='space-y-1 md:space-y-3'>
                                    {item.categories.map((category, ind) => (
                                        <span key={ind} className='block md:text-sm text-[10px] text-babyBlue'>{category.name}</span>
                                    ))}
                                    <h3 className='text-xs text-lightBlue font-semibold md:text-lg line-clamp-2'>{item.title}</h3>
                                    <p className='text-xs text-lightGray md:text-base line-clamp-2 text-newGray'>{item.short_content}</p>
                                </div>

                                <div className='flex justify-between items-center text-sm'>
                                    <span className='text-lightGray'>
                                        {item.created_at}
                                    </span>
                                    {item.reading_time > 0 &&
                                        <span className='text-lightGray'>
                                            {item.reading_time} Min
                                        </span>
                                    }
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>

            </div>


        </div>
    )
}
