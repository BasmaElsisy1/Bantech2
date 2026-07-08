'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import ButtonComp from "../button"
import ContactForm from "../ContactUsComp/ContactForm"
import HeroSection2 from '../ContactUsComp/HeroSection'
import { ContactProps } from "./ContactUsPage"

interface Props {
    data: {
        hero: {
            title: string,
            subtitle: string,
            media:
            {
                type: string,
                src: string,
                alt: string
            }[]
            ,
            button: {
                text: string,
            }
        },
        map: {
            points: {
                direction_link: string,
                name: string,
                x_axis: string,
                y_axis: string,
                contact_methods: {
                    icon: {
                        src: string,
                        alt: string
                    }
                    name: string,
                    details: string
                }[]
            }[]
        }
    },
    ContactusImage: ContactProps
}

export default function OurLocations({ data, ContactusImage }: Props) {
    const [ActivePoint, setActivePoint] = useState(0);

    return (
        <div className=" overflow-hidden">
            <div className="relative max-w-[1585px] mx-auto h-[200%]">
                <img
                    src={data.hero.media[0].src}
                    alt={data.hero.media[0].alt ?? "Image"}
                    width={1585}
                    height={1879}
                    className=" absolute md:block hidden  !w-[1585px] md:!h-[1879px] !h-[1084px] object-fill  top-0"
                />
                <Image
                    src={data.hero.media[1].src}
                    alt={data.hero.media[1].alt ?? "Image"}
                    fill
                    className=" md:hidden block !h-[1084px] object-fill  top-0"
                />
                <div className="max-w-[1437px] mx-auto xl:px-20 px-4 md:pt-[170px] pt-[110px] relative">
                    <h1 className="text-primary md:text-[40px] text-2xl font-semibold text-center">{data.hero.title}</h1>
                    <p className="text-center text-primary md:text-xl text-base pt-6 pb-8">{data.hero.subtitle}</p>
                    <ButtonComp
                        text={data.hero.button.text}
                        link={data.map.points[ActivePoint].direction_link}
                        center
                        white
                    />

                    {data.map.points.map((item, index) => (
                        <div key={index} style={{ right: item.x_axis, top: item.y_axis }} className={` singlePoint${index} absolute flex flex-col md:gap-6 gap-2 items-center`}>
                            <motion.div
                                className={`${index === ActivePoint
                                    ? "md:p-10 p-5 backdrop-blur-xl border border-white group shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]"
                                    : ""
                                    } rounded-full`}

                                animate={
                                    index === ActivePoint
                                        ? { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }
                                        : { opacity: 1, scale: 1 }
                                }
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }}
                            >
                                <motion.div
                                    className={`${index === ActivePoint ? "bg-[#212C66] bg-opacity-5" : ""
                                        } md:p-10 p-5 rounded-full`}

                                    animate={
                                        index === ActivePoint
                                            ? { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }
                                            : { opacity: 1, scale: 1 }
                                    }
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                    }}
                                >
                                    <button
                                        onClick={() => setActivePoint(index)}
                                        className={`${index === ActivePoint ? "bg-[#212C66] bg-opacity-10" : "border"
                                            } md:w-[66px] w-[35px] md:h-[66px] h-[35px] rounded-full border-primary flex items-center justify-center`}
                                    >
                                        <span className="md:w-4 md:h-4 w-2 h-2 bg-primary rounded-full" />
                                    </button>
                                </motion.div>
                            </motion.div>


                            {index === ActivePoint &&
                                <span className="block text-center md:text-3xl text-base text-primary font-semibold">{item.name}</span>
                            }
                        </div>
                    ))}
                    <div className="flex md:gap-10 gap-6 md:mt-[552px] mt-[260px] flex-wrap">
                        {data.map.points[ActivePoint].contact_methods.map((item, index) => (
                            <div key={index} className="md:w-[calc(100%/3-27px)] w-full md:rounded-[63px] rounded-[32px]   backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  md:p-10 p-6 md:space-y-7 space-y-3">
                                <div className="space-y-3">
                                    <div className="md:w-8 md:h-8 w-6 h-6 relative">
                                        <Image
                                            src={item.icon.src}
                                            alt={item.icon.alt ?? "Icon"}
                                            fill
                                        />
                                    </div>
                                    <h2 className="md:text-[32px] text-xl font-semibold text-primary">
                                        {item.name}
                                    </h2>
                                </div>

                                <p className="md:text-lg text-sm text-primary">{item.details}</p>
                            </div>
                        ))}
                    </div>

                    <div className=" py-20 relative overflow-hidden">
                        <HeroSection2 data={ContactusImage.extra_content.get_in_touch} />

                        <div className=" max-w-[1437px] mx-auto overflow-hidden xl:px-20 px-4">
                            <div className="relative z-10">
                                <ContactForm />
                            </div>
                            <Image
                                src={"/Images/fingerprint.png"}
                                alt="Hero Image"
                                width={521}
                                height={523}
                                className="object-contain xl:w-[521px] xl:h-[523px] w-[286px] h-[286px] absolute xl:bottom-[200px] bottom-[955px] left-0 -translate-x-1/4 pointer-events-none overflow-hidden"
                            />
                            <Image
                                src={"/Images/fingerprint2.png"}
                                alt="Hero Image"
                                width={521}
                                height={523}
                                className="object-contain xl:w-[521px] xl:h-[523px] w-[286px] h-[286px] absolute xl:bottom-0 bottom-0 right-0 translate-x-1/4 pointer-events-none overflow-hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
