"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export interface Hero {
  image: {
    src: string;
    alt: string;
  };
  image_mob: {
    src: string;
    alt: string;
  };
}

function HeroSection({ data }: { data: Hero }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="flex justify-center items-center  relative overflow-y-hidden "
    >
      <Image
        src={data.image.src}
        alt={data.image.alt}
        width={1280}
        height={825}
        className="object-contain md:block hidden"
      />
      <Image
        src={data.image_mob.src}
        alt={data.image_mob.alt}
        width={342}
        height={562}
        className="object-contain md:hidden block"
      />
    </motion.div>
  );
}

export default HeroSection;
