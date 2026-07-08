'use client'

import gsap from 'gsap'
import Image from 'next/image'
import { useEffect } from 'react'
import Arrow from '../SVGs/Arrow'
import { ScrollTrigger } from 'gsap-trial/dist/ScrollTrigger'

export default function HeroFlags({ data }: { data: any }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const flags = gsap.utils.toArray('.flag-item')

            const mm = gsap.matchMedia()

            mm.add(
                {
                    // Desktop
                    isDesktop: '(min-width: 768px)',
                    // Mobile
                    isMobile: '(max-width: 767px)',
                },
                (context) => {
                    const { isDesktop, isMobile } = context.conditions as any

                    // Clear previous ScrollTriggers when switching between breakpoints
                    ScrollTrigger.getAll().forEach((t) => t.kill())

                    if (isDesktop) {
                        // ➤ Horizontal animations
                        gsap.fromTo(
                            '.arrow-container',
                            { x: -500 },
                            {
                                x: () => window.innerWidth * 0.05,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: '.rotationImages',
                                    start: '-100px center',
                                    end: '+=800',
                                    scrub: 1.5,
                                },
                            }
                        )

                        gsap.fromTo(
                            '.flags-container',
                            { x: -400 },
                            {
                                x: 150,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: '.rotationImages',
                                    start: '-100px center',
                                    end: '+=800',
                                    scrub: 1.5,
                                },
                            }
                        )
                    }

                    if (isMobile) {
                        // ➤ Vertical animations
                        // gsap.fromTo(
                        //     '.arrow-container',
                        //     { y: -200 },
                        //     {
                        //         y: 50,
                        //         ease: 'power2.out',
                        //         scrollTrigger: {
                        //             trigger: '.rotationImages',
                        //             start: 'top bottom',
                        //             end: '+=600',
                        //             scrub: 1.2,
                        //         },
                        //     }
                        // )

                        // gsap.fromTo(
                        //     '.flags-container',
                        //     { y: -100 },
                        //     {
                        //         y: 100,
                        //         ease: 'power2.out',
                        //         scrollTrigger: {
                        //             trigger: '.rotationImages',
                        //             start: 'top bottom',
                        //             end: '+=600',
                        //             scrub: 1.2,
                        //         },
                        //     }
                        // )
                    }

                    // Shared flag rotation
                    gsap.to(flags, {
                        rotation: 360,
                        ease: 'none',
                        transformOrigin: 'center center',
                        scrollTrigger: {
                            trigger: '.rotationImages',
                            start: '-100px center',
                            end: '+=800',
                            scrub: 1.5,
                        },
                    })
                }
            )
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="rotationImages flex flex-col md:flex-row gap-8 md:mt-[100px] mt-14 items-center md:overflow-hidden md:mb-0 mb-20">
            {/* Left arrow part */}
            <div className="arrow-container w-[120px] md:w-[2000px] h-[410px] md:h-[160px] bg-white/20 border rounded-full md:rounded-e-full border-white flex md:items-center items-end justify-end p-5">
                <div className="flex items-center justify-center w-20 h-20 md:w-[120px] md:h-[120px] glass-button border border-white rounded-full">
                    <span className="block w-16 h-16 rotate-90 md:w-20 md:h-20 md:rotate-0">
                        <Arrow />
                    </span>
                </div>
            </div>

            {/* Flags / Hero images section */}
            <div className="flags-container w-full md:w-[40%] flex justify-center md:justify-start">
                <div
                    className="flex flex-col flex-wrap gap-8 justify-center items-center md:flex-nowrap md:flex-row"
                    style={{ width: 'max-content' }}
                >
                    {data.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="flag-item relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden"
                            style={{ flex: '0 0 auto' }}
                        >
                            <Image src={item.image.src} alt={item.image.alt} fill />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
