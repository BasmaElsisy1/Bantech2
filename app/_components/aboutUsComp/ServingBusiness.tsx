'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ServingBusinessProps } from '../MainPages/AboutUsPage'
import Image from 'next/image'

// Variants for this section
const titleVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const backgroundImageVariants = {
  hidden: {
    scale: 1.12,
    opacity: 0.45,
    filter: 'blur(8px)',
  },
  visible: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

function ServingBusiness({ data }: { data: ServingBusinessProps }) {
  return (
    <div className="max-w-[1440px] mx-auto relative overflow-hidden">
      {/* Background Image with cinematic reveal */}
      <motion.div
        className="absolute inset-0 z-[-1]"
        variants={backgroundImageVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
      >
        <Image
          src={data.media[0].src}
          alt={data.media[0].alt || 'Serving Business'}
          fill
          className="object-cover"
          priority // good for hero/background images
        />
      </motion.div>

      {/* Content */}
      <div className="flex justify-center items-center md:px-[120px] md:py-[279px] px-[20px] py-[90px]">
        <motion.h2
          className="text-primary md:text-[80px] text-[40px] font-semibold text-center md:max-w-[1200px] max-w-[335px] mx-auto"
          variants={titleVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {data.title}
        </motion.h2>
      </div>
    </div>
  )
}

export default ServingBusiness