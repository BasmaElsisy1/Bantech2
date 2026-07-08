'use client'
import Link from 'next/link'
import { useState } from 'react'
import ButtonComp from '../button'
import Clock from '../SVGs/Clock'
import Location from '../SVGs/Location'
import MenuArrow from '../SVGs/MenuArrow'
interface Props {
    data: {
        hero: {
            title: string,
            subtitle: string,
            button: {
                text: string,
                link: string
            }
        },
        our_values: {
            title: string,
            description: string
        }[],
        job_openings: {
            title: string,
            description: string
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
    },
    AllCareers: singleCareerWidget[],
    // Faqs: {
    //     id: number,
    //     question: string,
    //     answer: string
    // }[]
}
interface singleCareerWidget {
    slug: string,
    id: number,
    title: string,
    small_description: string,
    location: string,
    type: string,
    category: {
        id: number,
        name: string
    }
}
export default function CareersPage({ data, AllCareers}: Props) {
    const [activeCategory, setActiveCategory] = useState(0);
    const uniqueCategoryNamesSet = new Set<string>();
    AllCareers?.forEach((item: singleCareerWidget) => {
        if (item?.category?.name) {
            uniqueCategoryNamesSet.add(item.category.name);
        }
    });

    const uniqueCategoryNamesArray = [
        { title: "All Openings" },
        ...Array.from(uniqueCategoryNamesSet).map((CategoryName) => ({ title: CategoryName })),
    ];


    const filteredCareers = activeCategory === 0
        ? AllCareers
        : AllCareers.filter(
            (career) => career.category.name === uniqueCategoryNamesArray[activeCategory].title
        );
    return (
        <div className=' overflow-hidden'>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4  pb-20  md:pt-0 pt-10'>
                <div className=' md:space-y-16 space-y-8'>
                    <div className='text-center'>
                        <h1 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>{data.hero.title}</h1>
                        <p className='text-primary text-xl font-light mt-6 mb-8'>{data.hero.subtitle}</p>
                        <ButtonComp
                            text={data.hero.button.text}
                            link={`#careers`}
                            center
                            white
                        />
                    </div>
                    <div className='flex flex-wrap md:gap-8 gap-4'>
                        {data.our_values.map((item, index) => (
                            <div key={index} className='lg:w-[calc(100%/3-22px)] md:w-[calc(100%/2-16px)] w-full  md:p-5 p-4 md:rounded-[40px] rounded-[33px] md:space-y-6 space-y-5' style={{ backgroundImage: "url(/Images/backgroundlist.png)", backgroundSize: "100% 100%" }}>
                                <h3 className='text-primary text-pretty text-2xl text-center font-bold'>{item.title}</h3>
                                <p className='md:text-base text-sm text-primary text-center text-pretty'>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:pt-[200px] pt-10 space-y-14' id='careers'>
                    <div className='text-center'>
                        <h2 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>{data.job_openings.title}</h2>
                        <div className='text-primary text-xl font-light mt-6' dangerouslySetInnerHTML={{ __html: data.job_openings.description }} />
                    </div>
                    <div className='flex md:justify-center justify-start md:gap-6 gap-4 overflow-x-scroll noscrollbar'>
                        {uniqueCategoryNamesArray.map((item, index) => (
                            <button className='relative border-white bg-white/30 md:px-10 px-6 md:py-6 py-3 rounded-full overflow-hidden flex-mobile' key={index} onClick={() => setActiveCategory(index)}>
                                {activeCategory === index &&
                                    <span className=' absolute w-full h-full inset-0' style={{ backgroundImage: "url(/Images/buttonBGBlue.png)", backgroundSize: "100% 100%" }} />
                                }
                                <span className='text-primary md:text-lg text-sm font-bold relative'>
                                    {item.title}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className='flex flex-wrap xl:gap-8 gap-6'>
                        {filteredCareers.map((item, index) => (
                            <Link className='xl:w-[calc(100%/2-22px)]  w-full  group relative border-white border rounded-[40px] bg-white/30 ' key={index} href={`/careers/${item.slug}`}>
                                <span className='w-full h-full inset-0 absolute md:group-hover:opacity-100 md:opacity-0 opacity-100 transition-all duration-500' style={{ backgroundImage: "url(/Images/bg-careerWidget.png)", backgroundSize: "100% 100%" }} />
                                <div className=' p-6 xl:space-y-8 space-y-6 relative'>
                                    <div className='space-y-3'>
                                        <div className='flex justify-between items-center'>
                                            <h3 className='text-lightGray text-base font-light'>{item.category.name}</h3>
                                            <span className='text-babyBlue flex items-center gap-2 text-sm'>
                                                View Job Details
                                                <span className='w-5 h-5'>
                                                    <MenuArrow />
                                                </span>
                                            </span>
                                        </div>
                                        <h4 className='text-primary xl:text-[28px] text-2xl font-semibold'>{item.title}</h4>
                                    </div>
                                    <p className='text-primary text-sm xl:line-clamp-3 line-clamp-2'>{item.small_description}</p>
                                    <div className='flex xl:gap-[75px] gap-5 items-center text-lightGray text-base'>
                                        <div className='flex gap-2'>
                                            <span className='w-5 h-5'>
                                                <Location />
                                            </span>
                                            {item.location}
                                        </div>
                                        <div className='flex gap-2'>
                                            <span className='w-5 h-5'>
                                                <Clock />
                                            </span>
                                            {item.type}
                                        </div>
                                    </div>

                                </div>

                            </Link>
                        ))}
                    </div>

                </div>

            </div>
            {/* <div className='md:py-20 py-10 space-y-16 relative overflow-hidden px-4'>
                <div className=' md:block hidden absolute -left-[270px] -bottom-[90px] w-[451px] aspect-square'>
                    <Image
                        src={'/Images/blue-briefcase-with-handle-white-background-vector-art-illustration1.png'}
                        alt='blue-briefcase-with-handle-white-background-vector-art-illustration1.png'
                        fill
                    />
                </div>
                <div className=' md:block hidden absolute -right-[150px] top-[290px] w-[300px] aspect-square'>
                    <Image
                        src={'/Images/blue-briefcase-with-handle-white-background-vector-art-illustration2.png'}
                        alt='blue-briefcase-with-handle-white-background-vector-art-illustration2.png'
                        fill
                    />
                </div>
                <div className='text-center max-w-[1197px] mx-auto space-y-8'>
                    <h2 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary' dangerouslySetInnerHTML={{ __html: data.start_faq.title }} />
                    <div className='text-primary text-xl font-light mt-6' dangerouslySetInnerHTML={{ __html: data.start_faq.subtitle }} />
                    <ButtonComp
                        text={data.start_faq.button.text}
                        link={'/contact-us'}
                        center
                        white
                    />
                </div>
                <FAQsSection questions={Faqs} />
            </div> */}

        </div>
    )
}
