'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
interface Section {
    heading: string | null;
    content: string;
}
export interface TermsProps {
    title: string,
    content: string
}

export default function Terms({ data }: { data: TermsProps }) {
    const [sections, setSections] = useState<Section[]>([]);
    const [activeSection, setActiveSection] = useState<string>("section-0");

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content, "text/html");
        const elements = Array.from(doc.body.childNodes);

        let tempSections: Section[] = [];
        let current: Section = { heading: null, content: "" };

        elements.forEach((el) => {
            if (el.nodeType === Node.ELEMENT_NODE) {
                const element = el as HTMLElement;
                if (element.tagName === "H2") {
                    // push previous section if it exists
                    if (current.heading || current.content.trim() !== "") {
                        tempSections.push(current);
                    }
                    current = { heading: element.outerHTML, content: "" };
                } else {
                    current.content += element.outerHTML;
                }
            } else if (el.nodeType === Node.TEXT_NODE) {
                const text = el.textContent?.trim();
                if (text) current.content += text;
            }
        });

        if (current.heading || current.content.trim() !== "") {
            tempSections.push(current);
        }

        setSections(tempSections);
    }, [data.content]);

    function extractHeadingText(html: string | null): string {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "").trim(); // remove all tags
    }
    const normalSections = sections.filter(sec => {
        const headingText = extractHeadingText(sec.heading);
        return headingText.toLowerCase() !== "conclusion";
    });

    const conclusionSection = sections.find(sec => {
        const headingText = extractHeadingText(sec.heading);
        return headingText.toLowerCase() === "conclusion";
    });
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
        );

        const ids = [
            "section-0",
            ...normalSections.map((_, i) => `section-${i + 1}`),
            ...(conclusionSection ? ["section-conclusion"] : [])
        ];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [normalSections, conclusionSection]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 20; // 20px offset
        window.scrollTo({ top: y, behavior: "smooth" });
    };

    return (
        <div className=' overflow-hidden'>
            <div className='max-w-[1437px] lg:mx-auto xl:px-20 px-4 flex justify-between items-start lg:flex-row flex-col   -mx-4 '>
                <div className='xl:w-[373px] lg:w-[300px] lg:flex hidden lg:flex-col flex-row gap-y-6 lg:sticky lg:top-10 lg:divide-y divide-grey'>
                    {normalSections.map((item, index) => (item.heading &&
                        <button
                            key={index}
                            onClick={() => scrollToSection(`section-${index + 1}`)}
                            className={`block text-left text-lg pt-6 w-full  transition ${activeSection === `section-${index + 1}` ? "text-babyBlue font-semibold" : "text-lightGray"
                                }`}
                            dangerouslySetInnerHTML={{ __html: extractHeadingText(item.heading!) }}
                        />
                    ))}
                </div>
                <div className='lg:hidden flex w-full lg:overflow-visible overflow-x-scroll noscrollbar px-4  md:px-0 '>
                    {normalSections.map((item, index) => (item.heading &&
                        <button className='relative flex singleCategory items-center gap-2 justify-between text-primary px-6  md:w-full w-fit text-center rounded-full md:text-lg text-sm font-bold md:py-6 py-[14px]  backdrop-blur-xl border border-white group
                        shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  overflow-hidden' key={index} onClick={() => scrollToSection(`section-${index + 1}`)}>
                            <span className={`${activeSection === `section-${index + 1}` ? "opacity-100" : " opacity-0"} transition-all duration-300 w-full h-full absolute inset-0`}>
                                <Image src={'/Images/buttonBGBlue.png'} alt='bg' fill />

                            </span>
                            <div
                                className='relative'
                                dangerouslySetInnerHTML={{ __html: extractHeadingText(item.heading!) }}
                            />
                        </button>

                    ))}
                </div>

                <div className='xl:w-[calc(100%-413px)] lg:w-[calc(100%-340px)] w-full space-y-12 lg:px-0 px-4 lg:mt-0 mt-8'>
                    <h1 className='text-primary font-semibold md:text-[40px] text-[28px]'>{data.title}</h1>
                    <div className='blogsContent md:space-y-12 space-y-6'>

                        {/* --- Normal Sections --- */}
                        {normalSections.map((sec, i) => (
                            <div
                                id={`section-${i + 1}`}
                                key={i} className=" space-y-6">
                                {sec.heading && (
                                    <div className="text-primary md:text-3xl text-xl font-semibold" dangerouslySetInnerHTML={{ __html: sec.heading }} />
                                )}
                                <div
                                    className="md:text-xl text-base space-y-6"
                                    dangerouslySetInnerHTML={{ __html: sec.content }}
                                />
                            </div>
                        ))}

                    </div>


                </div>
            </div>
        </div>

    )
}
