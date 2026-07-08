'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface ServicesProps {
    heading: {
        title: string,
        description: string
    },
    fields: {
        service_text: string
    }[]

}
export default function Services({ data }: { data: ServicesProps }) {

    return (
        <div className='md:pt-36 py-[50px] md:pb-52 md:space-y-24 space-y-3 relative overflow-hidden'>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className=' absolute lg:w-[930px] lg:h-[743px] w-[463px] h-[371px] m-auto inset-0 '>
                <Image
                    src={'/digitalServices.webp'}
                    alt='digitalServices.webp'
                    fill
                />
            </motion.div>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 relative'>
                <div className='text-center'>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary text-center' dangerouslySetInnerHTML={{ __html: data.heading.title }} />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='text-primary md:text-xl text-base font-light md:mt-6 mt-3'>{data.heading.description}</motion.p>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
            >

                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    slidesPerView="auto"
                    autoplay={{
                        delay: 0, // seamless
                        disableOnInteraction: false,
                    }}
                    spaceBetween={24}
                    speed={4000}
                    allowTouchMove={false}
                    cssMode={false}
                    className="!flex relative"
                >

                    {data.fields.map((item, index) => (
                        <SwiperSlide key={index} className='md:!w-[312px] !w-[250px] backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  rounded-3xl md:py-8 text-center bg-white/20 text-primary md:text-xl text-base py-4 px-3 font-semibold border border-white overflow-hidden '>
                            {item.service_text}
                        </SwiperSlide>
                    ))}
                    {data.fields.map((item, index) => (
                        <SwiperSlide key={index} className='md:!w-[312px] !w-[250px] backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  rounded-3xl py-8 text-center bg-white/20 text-primary md:text-xl text-base p-4 font-semibold border border-white overflow-hidden '>
                            {item.service_text}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

        </div>
    )
}
