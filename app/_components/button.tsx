import Link from 'next/link'
import React from 'react'
import BGWhite from './SVGs/BGWhite'
import BGBlue from './SVGs/BGBlue'
import Star from './SVGs/Star'
interface Props {
  link?: string | null,
  text: string,
  white?: boolean,
  blue?: boolean,
  center?: boolean,
  icon?: boolean,
  textWhite?: boolean,
  type?: "button" | "submit" | "reset",
  [key: string]: any
}
export default function ButtonComp({ link, text, white, blue, center, icon, textWhite, type = "button", ...rest }: Props) {

  return link ? (
    <Link
      className={` ${center ? "mx-auto" : ""}
            relative md:text-lg text-base
                backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] 
            font-bold bg-white/20   transition-all duration-500 md:px-[47px] px-8 md:py-[14px] py-3 rounded-full block md:w-fit w-full text-center group overflow-hidden`}
      href={link} {...rest}>
      {icon ? (
        <span className={`relative ${textWhite ? "text-white group-hover:!text-primary" : "text-primary"}  z-10 flex items-center justify-center gap-4`}>
          {text}
          <div className="h-[20px] w-[20px]">
            <Star />
          </div>
        </span>
      ) : (
        <span className={`relative block ${textWhite ? "text-white group-hover:!text-primary" : "text-primary"} z-10 `}>
          {text}
        </span>
      )}

      <span
        style={{ filter: "blur(3px)" }}
        className='w-full h-full absolute inset-y-0 md:end-full end-0 transition-all duration-500 md:group-hover:end-0   '>
        {white && <BGWhite />}
        {blue && <BGBlue />}
      </span>
    </Link>
  ) : (
    <button
      type={type}
      className={`
    ${center ? "mx-auto" : ""}
    relative md:text-lg text-base
    backdrop-blur-xl border border-white group
    shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] 
    font-bold bg-white/20 transition-all duration-500 
    px-6 py-3 md:px-[47px] md:py-[15px] 
    rounded-full block w-full text-center group overflow-hidden
  `}
    >
      <span className='relative  text-primary z-10 flex items-center justify-center gap-4'>
        {text}
        <div className="h-[20px] w-[20px]">
          <Star />
        </div>
      </span>
      <span
        style={{ filter: "blur(3px)" }}
        className='w-full h-full absolute inset-y-0 end-0 transition-all duration-500 md:group-hover:end-0 md:end-full'
      >
        {white && <BGWhite />}
        {blue && <BGBlue />}
      </span>
    </button>
  );
}
