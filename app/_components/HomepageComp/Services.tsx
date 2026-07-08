'use client'
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import ServicesDesktop from './ServicesComp/ServicesDesktop';
import ServicesMobile from './ServicesComp/ServicesMobile';

export interface SingleService {
    tagline: string,
    title: string,
    content: string,
    header: string,
    button: {
        text: string,
        link: string
    }
}

export interface Props {
    services: SingleService[]
}

export default function Services({ data }: { data: SingleService[] }) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className='content-center pt-20'>
            {isDesktop ?
                <ServicesDesktop services={data} /> :
                <ServicesMobile services={data} />
            }
        </motion.div>
    )
}
