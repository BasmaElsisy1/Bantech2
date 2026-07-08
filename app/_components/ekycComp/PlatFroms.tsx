'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlatFormProps } from '../MainPages/EkycPage';

export default function PlatForms({data}: {data: PlatFormProps []}) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
        setIsAnimating(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen  flex  items-center justify-center overflow-hidden  mx-auto md:p-0 p-6">
      <div className="flex md:flex-row flex-col items-center gap-20">

        {/* LEFT: Circle  */}
        <div className="relative lg:left-[-12%] md:left-1 w-[85vw] h-[85vw]           
                md:w-[640px] md:h-[640px]   
                max-w-[640px] max-h-[640px]">
                    <div className="absolute inset-0 pointer-events-none 
                          scale-[1.06]               
                          z-10 md:hidden">
            <div className="w-full h-full rounded-full border-[33px] border-[#F0F0F0]" />
          </div>
          <div
            className="relative w-full h-full rounded-full overflow-hidden "
            style={{ clipPath: 'circle(49.5%)', padding: '28px' }}
          >
            {/* Current + Next */}
            {[currentIndex, (currentIndex + 1) % data.length].map((idx, i) => {
              const isCurrent = i === 0;

              return (
                <motion.div
                  key={`${idx}-${isCurrent ? 'current' : 'next'}`}
                  className="absolute inset-0  rounded-full flex items-center justify-center"
                   style={{
                    margin: '16px',
                    transformOrigin: '-20% 50%',
                    zIndex: isCurrent ? 1 : 2
                  }}
                  initial={isCurrent ? { rotate: 0 } : { rotate: 90 }}
                  animate={
                    isAnimating && !isCurrent
                      ? { rotate: 0 }
                      : isCurrent && isAnimating
                      ? { rotate: -90 }
                      : {}
                  }
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src={data[idx].image.src ?? ""}
                    alt={data[idx].image.alt ?? ""}
                    fill
                    className="object-contain md:w-[640px] md:h-[640px] h-[335px] w-[335px]"
                    priority
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Text */}
        <div className="md:space-y-[32px] overflow-hidden w-full  md:w-[801px]          
          max-w-[801px]     
          mx-auto           ">
          {data.map((platform, index) => {
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={platform.text}
                className="md:max-h-[576px]  flex items-center"
                animate={{ opacity: isActive ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              >
                {isActive ? (
                  <motion.span
                    key={currentIndex}
                    style={{ color : platform.color }}
                    className={`
                      lg:text-[80px] text-[40px] lg:leading-[150px] md:pb-0 pb-[12px]  lg:tracking-[-1.6px]  font-semibold 

                    `}
                    // initial={{ x: -100, opacity: 0 }}
                    animate={{
                    //   x: isAnimating ? 100 : 0,
                      opacity: isAnimating ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {platform.text}
                  </motion.span>
                ) : (
                  <span className="lg:text-[80px] text-[40px] lg:leading-[150px] md:pb-0 pb-[12px]  lg:tracking-[-1.6px] text-[#D0D4DA]">
                    {platform.text}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}