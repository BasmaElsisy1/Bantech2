"use client";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Building from "../SVGs/Building";
import Money from "../SVGs/Money";
import { motion } from "motion/react";
import Image from "next/image";
export interface BusinessProps {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
  fields: string[];
}

export default function Business({
  data,
  image1,
  image2,
}: {
  data: BusinessProps;
  image1?: string;
  image2?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
      className="md:py-20 py-0 md:space-y-[100px] space-y-10 relative overflow-hidden"
    >
      <div className={`${image2 ? 'top-[169px] -z-10 md:w-[433px] md:h-[433px] w-[241px] h-[241px]': 'top-0 w-[360px] h-[324px] '} -right-20 absolute   bottom-0 my-auto`}>
        {image2 ? (
          <Image src={image2} alt="" width={433} height={433}  />
        ) : (
            <Building />
        )
        }
        
      </div>
      <div className={`${image1 ? '': 'w-[300px] h-[300px]'}   md:block hidden absolute -left-10 top-0 bottom-0 my-auto`}>
        {image1 ? (
          <Image src={image1} alt="" width={433} height={433} />
        ) : (
            <Money />
        )
        }

      </div>
      <div className="space-y-6 text-center max-w-[1197px] px-4 mx-auto relative">
        <h2 className="text-primary md:text-[40px] md:leading-[60px] text-2xl font-semibold">
          {data.title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
          className="text-xl text-primary"
        />
      </div>
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
          <SwiperSlide
            key={index}
            className="!w-[186px] shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  rounded-3xl py-8 text-center bg-white/20 text-primary text-xl font-semibold backdrop-blur-md border border-white overflow-hidden "
          >
            {item}
          </SwiperSlide>
        ))}
        {data.fields.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[186px]  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  rounded-3xl py-8 text-center bg-white/20 text-primary text-xl font-semibold backdrop-blur-md border border-white overflow-hidden "
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
