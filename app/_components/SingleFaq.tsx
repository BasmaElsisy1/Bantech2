'use client'
import { motion } from "framer-motion";
import { QuestionProps } from "./FAQs";
import ArrowUp from "./SVGs/ArrowUp";
import ArrowDown from "./SVGs/ArrowDown";



interface SingleFaqProps {
    Singlefaq: QuestionProps;
    index: number;
    openfaq: number | null;
    Lastone: boolean;
    handleClick: (index: number) => void;
    Dark?: boolean
}

export default function SingleFaq({
    Singlefaq,
    index,
    openfaq,
    Lastone,
    handleClick,
    Dark
}: SingleFaqProps) {


    return (

        <div className={`${Lastone ? "" : "md:pb-[37px] pb-5 border-b "} border-[#D0D4DA]`}
            onClick={() => handleClick(index)}

        >
            <h2 className={`${openfaq === index ? "font-semibold text-[#00CDFE]" : " text-[#1F2B47]"} md:text-[24px] text-lg flex justify-between items-center gap-2 cursor-pointer`}>
                <p className="w-[calc(100%-24px-8px)] text-pretty">
                    {Singlefaq.question}
                </p>

                <motion.span
                    className={`w-6 h-6 flex items-center justify-center ${openfaq === index ? "text-babyBlue" : " text-primary"}`}
                    animate={{ rotate: openfaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ArrowDown />
                </motion.span>

            </h2>
            <motion.div
                initial={false}
                animate={openfaq === index ? { height: "auto" } : { height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`text-[#212C66]   md:text-xl  text-base overflow-hidden`}
            >
                <div dangerouslySetInnerHTML={{ __html: Singlefaq.answer }}
                    className="pt-2 faqsStyle space-y-2"
                />
            </motion.div>

        </div>
    );
}
