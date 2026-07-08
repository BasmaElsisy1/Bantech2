'use client'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import BGBlue from '../SVGs/BGBlue'
import BGWhite from '../SVGs/BGWhite'
import Close from '../SVGs/Close'
import Logo from '../SVGs/Logo'
import MenuArrow from '../SVGs/MenuArrow'
import MenuBurger from '../SVGs/MenuBurger'
import Star from '../SVGs/Star'

interface Props {
    logo: {
        src: string,
        alt: string
    },
    menu: ListItem[]
}
interface MenuItem {
    title: string
    link: string
    description?: string
}

interface ListItem {
    text: string
    link?: string
    submenu?: MenuItem[]
}
export default function MainHeader({ data }: { data: Props }) {
    const [showHeader, setShowHeader] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY <= 10) {
                setShowHeader(true)
            } else if (currentScrollY < lastScrollY.current) {
                setShowHeader(true)
            } else {
                setShowHeader(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const [isOpen, setOpen] = useState(false);
    const [isOpenLanding, setOpenLanding] = useState(false);

    const pathname = usePathname();
    const handleOpen = () => {
        setOpen((isOpen) => !isOpen);
    };
    const handleOpenLanding = () => {
        setOpenLanding((isOpenLanding) => !isOpenLanding);
    };
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredIndexSmall, setHoveredIndexSmall] = useState<number>(0);


    useEffect(() => {
        if (isOpen) {
            document.body.classList.toggle("overflow-hidden", isOpen);
        }

        if (!isOpen) {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    const AbsoluteHeader = pathname === "/our-locations"
    const Landing = pathname === '/partners' || pathname === "/partners/apply" || pathname === "/partners/terms"
    return (
        <motion.div
            initial={false}
            animate={{ y: showHeader ? 0 : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-x-0 top-0 z-50  ${AbsoluteHeader ? "" : "bg-[#f2f2f2]"
                }`}
        >

            <div className='max-w-[1437px] mx-auto xl:px-20 px-4  relative z-20 xl:py-0 py-5'>
                {Landing ?
                    <div className='w-full py-10 flex justify-between items-center'>
                        <div className='relative w-[201px] h-10'>
                            <Image
                                src={'/Images/logolanding.png'}
                                alt='Logo landing'
                                fill
                            />
                        </div>
                        <div className='md:flex hidden gap-8 items-center'>
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
                        <button className='w-6 h-6 md:hidden block' onClick={handleOpenLanding}>
                            {isOpenLanding ?
                                <Close /> :
                                <MenuBurger />
                            }
                        </button>
                    </div>
                    :
                    <>
                        <div className='hidden relative justify-between items-center lg:flex'>
                            <div className='flex gap-6 items-center xl:gap-8'>


                                <Link href={'/'} className='block w-8 h-8 xl:w-10 xl:h-10'>
                                    <Logo />
                                </Link>

                                {data.menu.slice(0, 5).map((item, index) => {
                                    const hasDescriptions = item.submenu?.some(
                                        (menu) => Boolean(menu.description)
                                    );

                                    return (
                                        item.submenu && item.submenu.length > 0 ? (
                                            <div
                                                key={index}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                                className="group md:py-10  py-10"
                                            >
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: item.text }}
                                                    className={`${pathname === item.submenu[0].link || pathname === item?.submenu[1]?.link ? " font-bold pointer-events-none" : "font-medium"} block text-sm transition-all duration-500 cursor-pointer xl:text-base text-Light-blue group-hover:text-babyBlue`}>
                                                </div>
                                                <AnimatePresence>
                                                    {hoveredIndex === index && item.submenu && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className={`absolute top-20 inset-x-0 mx-auto  
        shadow-lg backdrop-blur-md bg-white/50 rounded-[64px]
        ${hasDescriptions ? "max-w-[1119px] flex gap-8 items-center p-10" : "w-fit p-5"}
      `}
                                                        >

                                                            {/* ================= NO DESCRIPTION → TITLES ONLY ================= */}
                                                            {!hasDescriptions && (
                                                                <div className="flex gap-6">
                                                                    {item.submenu.map((menu, i) => (
                                                                        <Link
                                                                            key={i}
                                                                            href={menu.link || "#"}
                                                                            onClick={() => setHoveredIndex(null)}
                                                                            className="text-xl font-semibold text-lightBlue
              hover:text-babyBlue transition-colors whitespace-nowrap flex items-center gap-4"
                                                                        >
                                                                            {menu.title}
                                                                            <span className='w-6 h-6'>
                                                                                <MenuArrow />
                                                                            </span>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* ================= HAS DESCRIPTION → MEGA MENU ================= */}
                                                            {hasDescriptions && (
                                                                <>
                                                                    {/* LEFT COLUMN */}
                                                                    <div className="w-[170px] space-y-6">
                                                                        {item.submenu.map((menu, i) => (
                                                                            <div
                                                                                key={i}
                                                                                onMouseEnter={() => setHoveredIndexSmall(i)}
                                                                                className="cursor-pointer text-base font-semibold flex text-lightBlue"
                                                                            >
                                                                                <AnimatePresence mode="wait">
                                                                                    {hoveredIndexSmall === i && (
                                                                                        <motion.span
                                                                                            initial={{ opacity: 0, width: 0 }}
                                                                                            animate={{ opacity: 1, width: "auto" }}
                                                                                            exit={{ opacity: 0, width: 0 }}
                                                                                            transition={{ duration: 0.3 }}
                                                                                            className="w-6 h-6"
                                                                                        >
                                                                                            <MenuArrow />
                                                                                        </motion.span>
                                                                                    )}
                                                                                </AnimatePresence>

                                                                                {menu.title}
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    {/* RIGHT COLUMN */}
                                                                    <div className="flex-1">
                                                                        {item.submenu[hoveredIndexSmall] && (
                                                                            <Link
                                                                                href={item.submenu[hoveredIndexSmall].link || "#"}
                                                                                onClick={() => setHoveredIndex(null)}
                                                                                className="block px-6 py-4 space-y-6 transition-all duration-500
                hover:text-babyBlue hover:-translate-y-2 rounded-[40px]
                text-lightBlue hover:bg-white"
                                                                            >
                                                                                <h2 className="text-xl font-bold flex gap-6 items-center whitespace-nowrap">
                                                                                    {item.submenu[hoveredIndexSmall].title}
                                                                                    <span className="w-6 h-6">
                                                                                        <MenuArrow />
                                                                                    </span>
                                                                                </h2>

                                                                                {item.submenu[hoveredIndexSmall].description && (
                                                                                    <div
                                                                                        className="text-sm space-y-3"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: item.submenu[hoveredIndexSmall].description!,
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </div>
                                        ) : (
                                            <Link
                                                key={index}
                                                href={item.link ?? ""}
                                                className={`${pathname === item.link ? " font-bold pointer-events-none" : "font-medium"} block md:py-10  py-10 text-sm transition-all duration-500 xl:text-base text-Light-blue hover:text-babyBlue`}
                                            >
                                                {item.text}
                                            </Link>
                                        )
                                    )
                                })}
                                {data.menu[7] &&
                                    <Link
                                        href={data.menu[7].link ?? ""}
                                        className={`${pathname === data.menu[7].link ? " font-bold pointer-events-none" : "font-medium"} block md:py-10  py-10 text-sm transition-all duration-500 xl:text-base text-Light-blue hover:text-babyBlue`}
                                    >
                                        {data.menu[7].text}
                                    </Link>
                                }

                            </div>
                            <div className='flex gap-8 items-center'>
                                <Link href={data.menu[5].link ?? ""} className='block text-sm font-medium transition-all duration-500 xl:text-base hover:text-Light-blue text-babyBlue'>
                                    {data.menu[5].text}
                                </Link>
                                {data.menu[6]?.text &&
                                    <Link href={data.menu[6].link ?? ""} target='_blank' className='flex  bg-white/20 relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                                        <span className=' relative z-10'>
                                            {data.menu[6].text}
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
                                }

                            </div>

                        </div>
                        <div className='flex justify-between lg:hidden'>
                            <Link href={'/'} className='block w-8 h-8'>
                                <Logo />
                            </Link>
                            <button className='w-6 h-6' onClick={handleOpen}>
                                {isOpen ?
                                    <Close /> :
                                    <MenuBurger />
                                }
                            </button>
                        </div>
                    </>
                }

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-x-0 top-[80px] pt-6 px-5  w-full !bg-[#F0F0F0] z-10 h-[calc(100vh-80px)] overflow-y-scroll overflow-x-hidden"
                        >

                            <div className='space-y-3 pb-[100px] relatve'>
                                <Link
                                    href={"/"}
                                    onClick={handleOpen}
                                    className={` ${pathname === '/' ? "text-babyBlue" : "text-primary "} border border-white rounded-3xl p-4 bg-[#d1cdcd00] text-sm block glass-button `}>
                                    Home
                                </Link>
                                {data.menu.map((item, index) => (
                                    item.submenu && item.submenu.length > 0 ? (
                                        <div
                                            key={index}
                                            onClick={() => setHoveredIndex(index)}
                                            className={'rounded-3xl p-4 bg-[#d1cdcd00] border border-white glass-button relative z-10'}
                                        >
                                            <h2
                                                className='block mb-2 text-sm font-medium transition-all duration-500 cursor-pointer xl:text-base text-graish'>
                                                {item.text}
                                            </h2>
                                            <AnimatePresence>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "auto" }}
                                                    exit={{ height: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className='space-y-4'
                                                >
                                                    {item.submenu?.map((menuItem, ind) => (
                                                        <div key={ind} className={``}>
                                                            <Link
                                                                onClick={handleOpen}
                                                                href={menuItem.link || "#"}
                                                                className={`block text-sm  ${pathname === menuItem.link ? "text-babyBlue" : "text-primary "}`}
                                                            >
                                                                {menuItem.title}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>

                                        </div>
                                    ) : (
                                        <Link key={index}
                                            onClick={handleOpen}
                                            href={item.link ?? ""}
                                            className={`rounded-3xl relative z-10 p-4 bg-[#d1cdcd00] border border-white text-sm ${pathname === item.link ? "text-babyBlue" : "text-primary "} block glass-button `}>
                                            {item.text}
                                        </Link>
                                    )
                                ))}
                                <Image
                                    src={'/Images/Frame.png'}
                                    alt='frame'
                                    width={352}
                                    height={352}
                                    className='absolute bottom-[-133px] -right-10'
                                />
                            </div>


                        </motion.div>
                    )}
                    {isOpenLanding &&
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-x-0 top-8 px-4  w-full !bg-[#F0F0F0]   shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  z-10 
                            h-[calc(100vh-32px)] overflow-y-scroll overflow-x-hidden"
                        >
                            <div className=' relative p-8 border border-white rounded-[32px]'>
                                <div className='relative z-10 space-y-7'>
                                    <div className='flex  justify-between items-center'>
                                        <div className='flex gap-3 items-center'>
                                            <span className='w-8 h-8 relative'>
                                                <Image
                                                    src={'/Images/arrow.png'}
                                                    alt='Icon'
                                                    fill
                                                />
                                            </span>
                                            <h4 className='text-primary text-lg font-semibold capitalize'>
                                                let’s grow together!
                                            </h4>
                                        </div>
                                        <button className='w-6 h-6 block' onClick={handleOpenLanding}>
                                            {isOpenLanding ?
                                                <Close /> :
                                                <MenuBurger />
                                            }
                                        </button>

                                    </div>
                                    <div className='flex flex-col gap-6 items-center'>

                                        <Link
                                            onClick={handleOpenLanding}
                                            href={'/partners/apply'} className='flex  w-full justify-center relative overflow-hidden  transition-all duration-500 backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  items-center gap-2 xl:text-base text-sm font-bold px-6 py-2.5 rounded-full'>
                                            <span className=' relative z-10 text-primary'>
                                                Apply To Partner
                                            </span>

                                            <span
                                                style={{ filter: "blur(3px)" }}
                                                className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                                <BGWhite />
                                            </span>

                                        </Link>
                                        <Link href={'/partners/apply'}
                                            onClick={
                                                () => {
                                                    sessionStorage.setItem("scrollTo", "calendly");
                                                    handleOpenLanding();
                                                }
                                            }
                                            className='text-babyBlue text-base font-bold hover:text-darkblue transition-all duration-500'
                                        >
                                            Book a 20-minute intro call
                                        </Link>

                                    </div>

                                </div>
                                <span
                                    style={{ filter: "blur(3px)" }}
                                    className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
                                    <BGBlue />
                                </span>
                            </div>


                        </motion.div>
                    }
                </AnimatePresence>
            </div >

        </motion.div>

    )
}
