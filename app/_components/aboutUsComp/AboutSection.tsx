'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { Mission } from '../MainPages/AboutUsPage'

const fadeUp = {
  hidden: { 
    opacity: 0, 
    y: 70 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      duration: 0.9
    }
  }
}

const imageReveal = {
  hidden: { 
    opacity: 0.3,
    scale: 1.08,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1
    }
  }
}

function AboutSection({ data }: { data: Mission }) {
  return (
    <div className=" mt-0 md:-mt-[400px] -mb-12 max-w-[1440px] mx-auto md:py-8 px-4  sm:px-6  lg:px-20 ">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row lg:gap-10 gap-6">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 lg:gap-10 lg:w-1/2">

            {/* 1. Top Image – mobile order 2 */}
            <motion.div 
              className="relative overflow-hidden rounded-[40px] lg:rounded-[80px] border border-white aspect-620/450 order-2 lg:order-1"
              variants={imageReveal as any}
            >
              <img
                src={data.mission_image}
                alt={data.mission_image_alt ?? "Image"}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 2. Mission – mobile order 1 */}
            <motion.div 
              className="rounded-[64px] shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm p-8 lg:p-12 order-1 lg:order-0"
              variants={fadeUp as any}
            >
              <h2 className="text-primary md:text-[32px] text-[18px] font-semibold leading-[140%] tracking-[-0.64px] mb-4 lg:mb-6">
                {data.fields[0].field_title}
              </h2>
              <p className="text-primary md:text-[18px] text-xs leading-[150%] tracking-[-0.36px]">
                {data.fields[0].field_description}
              </p>
            </motion.div>

            {/* 3. Vision – mobile order 3 */}
            <motion.div 
              className="rounded-[64px] shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm p-8 lg:p-12 order-3 lg:order-0"
              variants={fadeUp as any}
            >
              <h2 className="text-primary md:text-[32px] text-[18px] font-semibold leading-[140%] tracking-[-0.64px] mb-4 lg:mb-6">
                {data.fields[1].field_title}
              </h2>
              <p className="text-primary md:text-[18px] text-xs leading-[150%] tracking-[-0.36px]">
                {data.fields[1].field_description}
              </p>
            </motion.div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 lg:gap-10 lg:w-1/2">

            {/* 4. Innovation – mobile order 4 */}
            <motion.div 
              className="rounded-[64px] shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm p-8 lg:p-12 order-4 lg:order-0"
              variants={fadeUp as any}
            >
              <h2 className="text-primary md:text-[32px] text-[18px] font-semibold leading-[140%] tracking-[-0.64px] mb-4 lg:mb-6">
                {data.fields[2].field_title}
              </h2>
              <p className="text-primary md:text-[18px] text-xs leading-[150%] tracking-[-0.36px]">
                {data.fields[2].field_description}
              </p>
            </motion.div>

            {/* 5. Bottom Image – mobile order 5 */}
            <motion.div 
              className="relative overflow-hidden rounded-[40px] lg:rounded-[80px] border border-white aspect-621/640 flex-1 order-5 lg:order-0"
              variants={imageReveal as any}
            >
              <img
                src={data.innovation_image}
                alt={data.innovation_image_alt ?? "Image"}
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default AboutSection