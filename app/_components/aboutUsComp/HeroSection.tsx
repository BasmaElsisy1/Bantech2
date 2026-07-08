'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ButtonComp from '../button'
import type { Hero } from '../MainPages/AboutUsPage'

function HeroSection({ data }: { data: Hero }) {
  // Split title into characters for animation
  const titleLetters = Array.from(data.title)

  return (
    <div className='relative  inset-0 md:h-[1200px] h-auto md:mt-[-9.5rem] overflow-hidden'>
      {/* Background Image - Absolute positioning */}
      <Image
        src={data.media[0].src}
        alt={data.media[0].alt ?? ''}
        fill
        className='object-fill md:block hidden'
        priority
      />
      <Image
        src={data.media[1].src}
        alt={data.media[1].alt ?? ''}
        fill
        className='object-fill  md:hidden'
        priority
      />

      {/* Content - centered with alternating alignment */}
      <div className='relative  max-w-[1437px] mx-auto xl:px-20 px-4  flex flex-col justify-center items-center md:gap-20 md:px-20 pt-6   md:pt-[216px]'>

        {/* First div - align right */}
        <div className='mb-8 self-start'>
          <motion.h1
            className='md:text-[40px] text-[24px] font-semibold mb-4 max-w-[736px] text-primary md:text-left text-center'
            initial="hidden"
            animate="visible"
          >
            <div className='md:block hidden'>
              {titleLetters.map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: i * 0.03 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}

            </div>
            <div className='md:hidden block'>
              {data.title}
            </div>
          </motion.h1>
        </div>

        {/* Second div - align left */}
        <div className='mb-8 self-end'>
          <motion.p
            className='md:text-[20px] text-base max-w-[736px] text-primary mb-4 md:text-left text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <ButtonComp
              white
              link={data.button.link ?? 'contact-us'}
              text={data.button.text ?? 'start now'}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection