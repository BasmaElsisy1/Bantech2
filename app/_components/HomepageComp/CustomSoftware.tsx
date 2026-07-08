'use client'
import { motion } from 'motion/react'
import ButtonComp from '../button'

export interface CustomSoftwareProps {
    video:string,
    title: string,
    content: string,
    button: {
        text: string,
        link: string
    },
    list: {
        header: string,
        description: string
    }[]
}
export default function CustomSoftware({ data }: { data: CustomSoftwareProps }) {
    return (
        <div className='md:py-20 max-w-[1123px] mx-auto'>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className='space-y-4 text-center text-primary'>
                <h2 className='  md:text-[40px] md:leading-[60px] text-2xl font-semibold'>From Consultation to Custom Software</h2>
                <p className='text-base font-medium md:text-xl'>Verify users in seconds with AI-powered face recognition, 360° liveness checks, and global document support — all with simple integration and full compliance.</p>
                <ButtonComp
                    center
                    text={data.button.text}
                    link={data.button.link}
                    white
                />
            </motion.div>


            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.4 }}
                className='relative mt-16 h-[743px] lg:block hidden'>
                <div className='xl:w-[640px] xl:h-[640px] w-[500px] h-[500px] mx-auto absolute inset-0'>
                    <span className='absolute inset-0 w-full h-full rounded-full border border-lightBabyBlue ' />
                    <span className='absolute w-[calc(100%-80px)] h-[calc(100%-80px)] inset-0 m-auto rounded-full border border-lightBabyBlue2' />
                    <span className='absolute w-[calc(100%-160px)] h-[calc(100%-160px)] inset-0 m-auto rounded-full border border-[#CCF5FF]' />
                    <div className=' w-[240px] h-[240px] aspect-[1/1] absolute inset-0 m-auto text-white'>
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full"
                        >
                            <source src={data.video} type="video/mp4" />
                        </video>
                    </div>
                </div>
                {data.list.map((item, index: number) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 * index }}
                        viewport={{ once: true, amount: 0.2 }}
                        key={index}
                        className={`space-y-2 w-[260px] absolute
                    ${index === 0 ? "-top-5 -left-[313px] right-0 mx-auto" : ""}
                     ${index === 1 ? "xl:top-[170px] top-[90px] left-auto xl:right-[35px] right-[75px] mx-auto" : ""}
                     ${index === 2 ? "xl:bottom-[148px] bottom-[358px] left-auto xl:right-1 right-[34px] mx-auto" : ""}
                     ${index === 3 ? "xl:bottom-7 bottom-[173px] left-auto right-[240px] mx-auto" : ""}
                     ${index === 4 ? "bottom-[120px] left-[130px] right-auto mx-auto" : ""}
                     ${index === 5 ? "top-[240px] left-2.5 right-auto mx-auto" : ""}
                    `}>
                        <h3 className=' backdrop-blur-[3px]  text-Light-blue text-lg font-semibold bg-[#212C6626] px-7 py-2 rounded-full relative text-center'>
                            {item.header}
                            <span className={`${index % 2 === 0 ? "bg-[#C4CCD9]" : "bg-white"}
                            ${index ? "" : ""}
                            border-[4px]
                              ${(index === 1 || index === 2 || index === 3) ? "-left-8" : "-right-8"}
                            border-[#C4CCD9] w-6 h-6 rounded-full absolute `} />
                        </h3>
                        <div className='px-4 py-3 text-sm bg-white rounded-3xl text-primary' dangerouslySetInnerHTML={{ __html: item.description }} />

                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className='lg:hidden block pt-20 space-y-20'>
                <div className=' w-[120px] h-[120px] aspect-[1/1] mx-auto text-white'>
                    <video

                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full"
                    >
                        <source src={data.video} type="video/mp4" />
                    </video>
                </div>
                <div className='flex overflow-x-scroll gap-6 px-4'>
                    {data.list.map((item, index: number) => (
                        <div
                            key={index}
                            style={{ flex: "0 0 260px" }}
                            className={`space-y-2 w-[260px]

                    `}>
                            <h3 className=' backdrop-blur-[3px]  text-Light-blue text-lg font-semibold bg-[#212C6626] px-7 py-2 rounded-full relative text-center'>
                                {item.header}
                            </h3>
                            <div className='px-4 py-3 text-sm bg-white rounded-3xl text-primary' dangerouslySetInnerHTML={{ __html: item.description }} />

                        </div>
                    ))}
                </div>

            </motion.div>

        </div>
    )
}
