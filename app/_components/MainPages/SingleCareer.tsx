'use client'
import React from 'react'
import CareersForm from '../Forms/CareersForm'
interface Props {
    data: {
        id: number,
        slug: string,
        title: string,
        description: {
            title: string,
            content: string
        }[],
        small_description: string,
        location: string,
        experience: string,
        type: string,
        start_date: string,
        end_date: string,
        views: number,
        category: {
            id: number,
            name: string
        }
    },
    About: string,
    application_form: {
        title: string,
        button: {
            text: string
        }
    }

}

export default function SingleCareer({ data, About, application_form }: Props) {
    return (
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 md:space-y-20 space-y-16'>
            <div className="space-y-8">
                <div className='w-full md:px-20 px-10 md:py-[120px] py-[60px] rounded-[80px] overflow-hidden' style={{ backgroundImage: "url(/Images/singleCareerbg.png)", backgroundSize: "100% 100%" }}>
                    <h1 className='text-primary text-center lg:text-5xl md:text-3xl text-2xl font-bold'>{data.title}</h1>
                </div>
                <div className='flex lg:gap-8 lg:flex-row flex-col gap-3 '>
                    <div className='border border-white bg-white/30 rounded-full lg:w-[calc(100%/4-24px)] w-full flex lg:flex-col flex-row justify-between  backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  md:py-6 md:px-10 py-4 px-6 lg:items-start items-center gap-2 '>
                        <h2 className='text-primary text-sm font-light'>Time</h2>
                        <p className='text-primary md:text-xl text-base font-semibold'>{data.type}</p>
                    </div>
                    <div className='border border-white bg-white/30 rounded-full lg:w-[calc(100%/4-24px)] w-full flex lg:flex-col flex-row justify-between  backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  md:py-6 md:px-10 py-4 px-6 lg:items-start items-center gap-2 '>
                        <h2 className='text-primary text-sm font-light'>Location</h2>
                        <p className='text-primary md:text-xl text-base font-semibold'>{data.location}</p>
                    </div>
                    <div className='border border-white bg-white/30 rounded-full lg:w-[calc(100%/4-24px)] w-full flex lg:flex-col flex-row justify-between  backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  md:py-6 md:px-10 py-4 px-6 lg:items-start items-center gap-2 '>
                        <h2 className='text-primary text-sm font-light'>Industry</h2>
                        <p className='text-primary md:text-xl text-base font-semibold'>{data.category.name}</p>
                    </div>
                    <div className='border border-white bg-white/30 rounded-full lg:w-[calc(100%/4-24px)] w-full flex lg:flex-col flex-row justify-between  backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  md:py-6 md:px-10 py-4 px-6 lg:items-start items-center gap-2'>
                        <h2 className='text-primary text-sm font-light'>Experience</h2>
                        <p className='text-primary md:text-xl text-base font-semibold'>{data.experience} Years</p>
                    </div>
                </div>
            </div>
            <div className=' space-y-10'>
                <p className='text-primary md:text-xl text-base font-medium'>{data.small_description}</p>
                {data.description.map((item, index) => (
                    <div key={index} className='space-y-6'>
                        <h2 className='text-primary md:text-[30px] text-xl font-semibold'>{item.title}</h2>
                        <div className=' text-primary careers item-content' dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                ))}
            </div>
            {About && (
                <div className='space-y-6'>
                    <h3 className='text-primary  md:text-[30px] text-xl font-semibold'>About Us</h3>
                    <div className='md:text-lg text-sm text-primary font-light space-y-6'>
                        {About.split('<br>').map((line, index) => (
                            line.trim() && <div key={index} dangerouslySetInnerHTML={{ __html: line.trim() }} />
                        ))}
                    </div>
                </div>

            )}
            <CareersForm data={application_form} careerID={data.id} slug={data.slug} />
        </div>
    )
}
