'use client';
import React, { useState } from 'react'
import { QuestionProps } from './FAQs'
import { motion } from 'framer-motion'
import SingleFaq from './SingleFaq'

export default function FAQsSection({ questions, Dark }: { questions: QuestionProps[], Dark?: boolean }) {
    const [openfaq, setOpenfaq] = useState(null);

    const handleClick = (index: any) => {
        setOpenfaq(index === openfaq ? null : index);
    };

    return (
        <div className='md:space-y-6 space-y-5 max-w-[800px] mx-auto'>
            {
                questions.map((question: QuestionProps, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <SingleFaq
                            Singlefaq={question} index={index} openfaq={openfaq} Lastone={questions.length - 1 == index}
                            handleClick={handleClick} Dark={Dark} />
                    </motion.div>
                ))
            }
        </div>
    )
}
