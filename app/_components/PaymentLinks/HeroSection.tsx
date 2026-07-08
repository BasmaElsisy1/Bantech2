'use client'
import React from 'react'
import ButtonComp from '../button'
import Image from 'next/image'
import RotationImages from './RotationImages'
import { motion } from 'motion/react'

interface Props {
    hero: {
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        },
        media: {
            type: string,
            src: string,
            alt: string
        }[]
    },
    start_hero: {
        title: string,
        subtitle: string,
        button: {
            text: string,
            link: string
        }
    },
    hero_images: {
        image: {
            src: string,
            alt: string
        }
    }[],
}

export default function HeroSection({ hero, start_hero, hero_images }: Props) {
    const words = hero.title.split('')
    return (
        <div className='overflow-hidden relative'>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 relative flex items-center z-10 lg:py-[100px] pt-0 pb-10 lg:flex-row flex-col-reverse gap-y-10'>
                <div className='xl:w-[775px] md:w-[60%] w-full space-y-6'>
                    <h1 className='text-primary md:text-[40px] md:leading-[60px] text-2xl lg:text-start text-center font-semibold'>
                        {words.map((part, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.1, delay: index * 0.03 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                {part}
                            </motion.span>
                        ))}

                    </h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 1.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='space-y-6 text-base text-center md:text-xl text-primary lg:text-start'>
                        {hero.subtitle.split('\n').map((line, index) => (
                            line.trim() && <p key={index}>{line.trim()}</p>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ButtonComp
                            text={hero.button.text}
                            link={hero.button.link}
                            white
                        />
                    </motion.div>

                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 2.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='xl:w-[781px] md:w-[50%] w-full lg:-me-[200px] aspect-video relative '>
                    <Image
                        src={hero.media[0].src}
                        alt={hero.media[0].alt ?? "Image"}
                        fill
                        className='object-cover'
                    />
                </motion.div>
            </div>
            <div className=' absolute w-full md:h-[661px] h-[440px] inset-0 my-auto'>
                <Image
                    src={'/Images/backgroundBlue.webp'}
                    alt='backgroundBlue'
                    fill
                    className='hidden object-cover md:block'
                />
                <Image
                    src={'/Images/backgroundBlue-mobile.webp'}
                    alt='backgroundBlue-mobile'
                    fill
                    className='block object-contain md:hidden'
                />

            </div>
            <div className='relative md:py-20 pt-10 pb-0'>
                <div className='max-w-[1197px] mx-auto xl:px-20 px-4'>
                    <div className='space-y-6 text-center'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary'>{start_hero.title}</motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='text-base md:text-xl text-primary'>{start_hero.subtitle}</motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <ButtonComp
                                text={start_hero.button.text}
                                link={start_hero.button.link}
                                center
                                white
                            />
                        </motion.div>
                    </div>

                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <RotationImages data={hero_images} />
                </motion.div>
            </div>

        </div>
    )
}
