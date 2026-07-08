'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Star from '../SVGs/Star'
import BGBlue from '../SVGs/BGBlue'

interface Props {
    site_info: {
        logo: string,
        social: {
            icon: string,
            link: string
        }[],
    },
    footer_menu: {
        title: string,
        items: {
            title: string,
            link: string
        }[]
    }[]
}

export default function MainFooter({ data }: { data: Props }) {
    const pathname = usePathname();
    const Landing = pathname === '/partners' || pathname === "/partners/apply" || pathname === "/partners/terms"

    return (
        <>
            <div className={`max-w-[1280px] mx-auto border border-lightwhite2  md:p-12 p-6 md:rounded-[80px] rounded-4xl relative z-10 ${Landing ? " md:space-y-16 space-y-10" : ""}`}>
                <div className='flex flex-col gap-8 justify-between md:flex-row'>
                    <Link href={'/'} className={`relative md:w-[202px] w-[152px] aspect-[305/51] block ${Landing ? "md:mx-0 mx-auto" : ""}`}>
                        <Image
                            src={data.site_info.logo}
                            alt='Logo'
                            fill
                            className='object-contain'
                        />

                    </Link>
                    {Landing ?
                        <div className='lg:flex hidden gap-8 items-center'>
                            <Link href={'/partners/apply'}
                                onClick={() => {
                                    sessionStorage.setItem("scrollTo", "calendly");
                                }}
                                className='text-babyBlue text-base font-bold hover:text-darkblue transition-all duration-500'
                            >
                                Book a 20-minute intro call
                            </Link>
                            <Link href={'/partners/apply'} className='flex  bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                                <span className=' relative z-10 text-primary'>
                                    Apply To Partner
                                </span>
                                <span className='w-[14px] h-[14px] relative z-10'>
                                    <Star />
                                </span>
                                <span
                                    style={{ filter: "blur(3px)" }}
                                    className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                    <BGBlue />
                                </span>

                            </Link>

                        </div>
                        :
                        <div className='flex gap-4'>

                            {data.site_info.social.map((item, index) => (
                                item.link &&
                                <Link key={index} target='_blank' className='relative w-10 h-10 rounded-full group flex justify-center items-center border border-white bg-white/20   transition-all duration-500  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl' href={item.link}>
                                    <span className='relative h-[19px] aspect-[20/19] bg-babyBlue group-hover:bg-primary transition-all duration-300 '
                                        style={{
                                            maskImage: `url(${item.icon})`,
                                            WebkitMaskImage: `url(${item.icon})`,
                                            maskSize: "contain",
                                            WebkitMaskSize: "contain",
                                            maskRepeat: "no-repeat",
                                            WebkitMaskRepeat: "no-repeat",
                                            maskPosition: "center",
                                            WebkitMaskPosition: "center",
                                        }}
                                    />

                                </Link>
                            ))}

                        </div>
                    }
                </div>
                {Landing ?
                    <div className='max-w-[800px] space-y-4 md:text-start text-center'>
                        <h3 className='text-primary md:text-[32px] text-[22px] font-semibold leading-[150%]'>Let's grow together.</h3>
                        <p className='md:text-xl text-sm text-primary'>Bring your clients fintech they can trust. Earn on every conversion. Apply to the BanTech Partner Referral Network today.</p>
                    </div>
                    :
                    <div className='flex flex-col gap-y-8 mt-8 md:mt-12 lg:flex-row'>
                        <div className='lg:w-[500px] w-full flex flex-wrap md:gap-y-10 md:gap-x-0 gap-8 justify-between'>
                            {data.footer_menu.slice(0, 2).map((item, index: number) => (
                                <div key={index} className='lg:w-[calc(100%/2)] w-[calc(100%/2-16px)] space-y-3'>
                                    <h3 className='text-graish text-sm'>{item.title}</h3>
                                    <div className='space-y-4'>
                                        {item.items.map((link, index: number) => (
                                            <Link href={link.link} key={index}
                                                className='block text-sm transition-all duration-500 text-lightBlue hover:text-babyBlue w-fit'
                                            >
                                                {link.title}
                                            </Link>
                                        ))}

                                    </div>

                                </div>
                            ))}
                            <div className='lg:w-[calc(100%/2)] w-[calc(100%/2-16px)]'>
                                {data.footer_menu.slice(2, 4).map((item, index: number) => (
                                    <div key={index} className='space-y-3'>
                                        <h3 className='text-graish'>{item.title}</h3>
                                        <div className='space-y-4'>
                                            {item.items.map((link, index: number) => (
                                                <Link href={link.link} key={index}
                                                    className='block text-sm transition-all duration-500 text-lightBlue hover:text-babyBlue w-fit'
                                                >
                                                    {link.title}
                                                </Link>
                                            ))}

                                        </div>

                                    </div>
                                ))}
                            </div>
                            <div className='lg:w-[calc(100%/2)] w-[calc(100%/2-16px)]'>
                                <div className='space-y-3'>
                                    <h3 className='text-graish'>{data.footer_menu[4].title}</h3>
                                    <div className='space-y-4'>
                                        {data.footer_menu[4].items.map((link, index: number) => (
                                            <Link href={link.link} key={index}
                                                className='block text-sm transition-all duration-500 text-Light-blue hover:text-babyBlue'
                                            >
                                                {link.title}
                                            </Link>
                                        ))}

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[calc(100%-500px)] w-full lg:flex-nowrap flex-wrap flex md:gap-x-10 gap-8'>
                            {data.footer_menu.slice(5, 8).map((item, index: number) => (
                                <div key={index} className='lg:w-[calc(100%/3)] w-[calc(100%/2-20px)] space-y-3'>
                                    <h3 className='text-graish text-sm'>{item.title}</h3>
                                    <div className='space-y-4'>
                                        {item.items.map((link, index: number) => (
                                            <Link href={link.link} key={index}
                                                className='block text-sm transition-all duration-500 text-lightBlue hover:text-babyBlue w-fit'
                                            >
                                                {link.title}
                                            </Link>
                                        ))}

                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                }
                {Landing &&
                    <div className='lg:hidden flex flex-col gap-8 items-center'>

                        <Link href={'/partners/apply'} className='flex  md:w-fit w-full justify-center bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                            <span className=' relative z-10 text-primary'>
                                Apply To Partner
                            </span>
                            <span className='w-[14px] h-[14px] relative z-10 md:block hidden'>
                                <Star />
                            </span>
                            <span
                                style={{ filter: "blur(3px)" }}
                                className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                <BGBlue />
                            </span>

                        </Link>
                        <Link href={'/partners/apply'}
                            onClick={() => {
                                sessionStorage.setItem("scrollTo", "calendly");
                            }}
                            className='text-babyBlue text-base font-bold hover:text-darkblue transition-all duration-500'
                        >
                            Book a 20-minute intro call
                        </Link>

                    </div>
                }
                {Landing ?
                    <div className='flex justify-between items-center lg:flex-row flex-col md:gap-1 gap-16'>
                        <div className='flex lg:gap-2 md:gap-1 gap-2 items-center md:flex-nowrap flex-wrap md:justify-normal justify-center'>
                            <span className='lg:text-base md:text-sm text-xs text-darkblue2 uppercase'>Invite-only</span>
                            <span className='w-1.5 h-1.5 md:block hidden bg-darkblue2 rounded-full' />
                            <span className='lg:text-base md:text-sm text-xs text-darkblue2 uppercase'>No cost to join</span>
                            <span className='w-1.5 h-1.5 md:block hidden bg-darkblue2 rounded-full' />
                            <span className='lg:text-base md:text-sm text-xs text-darkblue2 uppercase'>GCC & MENA coverage</span>
                        </div>
                        <div className='flex items-center lg:gap-4 gap-2'>
                            <Link className='text-sm hover:text-babyBlue transition-all duration-300 text-primary font-medium capitalize'
                                href={'/partners/terms'}>
                                terms of use & privacy
                            </Link>
                            <p className=" text-sm text-graish">
                                © {new Date().getFullYear()} Bantech
                            </p>
                        </div>

                    </div>

                    :
                    <p className=" text-sm text-graish mt-8 md:text-end">
                        © {new Date().getFullYear()} Bantech
                    </p>
                }




            </div>
            <div className=' absolute aspect-[2048/818] w-full bottom-0 md:block hidden inset-0'
                style={{ background: "linear-gradient(0deg, #F0F0F0 6.04%, rgba(245, 245, 245, 0.00) 37.6%, #F0F0F0 68.57%), url('/Images/background.png') lightgray 50% / cover no-repeat" }}
            >
            </div>
        </>
    )
}
