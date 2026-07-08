'use client'
import React, { useEffect, useState } from 'react'
import Location from '../SVGs/Location'
import Clock from '../SVGs/Clock'
import Calender from '../SVGs/Calender'
import ShareButtons from '../ShareButtons'

interface Props {
    data: {
        id: number,
        slug: string,
        title: string,
        content: string,
        short_content: string,
        categories: {
            id: number,
            name: string
        }[],
        reading_time: number,
        created_at: string
    }
}

interface Section {
    heading: string | null;
    content: string;
}

export default function SingleBlog({ data }: Props) {
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
        <div className='max-w-[1437px] mx-auto xl:px-20 px-4 flex justify-between items-start'>
            <div className='xl:w-[373px] lg:w-[300px] lg:block hidden space-y-6 sticky top-10 divide-y divide-grey'>
                <button
                    onClick={() => scrollToSection("section-0")}
                    className={`block text-left text-lg w-full  transition ${activeSection === "section-0" ? "text-babyBlue font-semibold" : "text-lightGray"
                        }`}
                >
                    Introduction
                </button>

                {normalSections.map((item, index) => (item.heading &&
                    <button
                        key={index}
                        onClick={() => scrollToSection(`section-${index + 1}`)}
                        className={`block text-left text-lg pt-6 w-full  transition ${activeSection === `section-${index + 1}` ? "text-babyBlue font-semibold" : "text-lightGray"
                        }`}
                        dangerouslySetInnerHTML={{ __html: extractHeadingText(item.heading!) }}
                    />
                ))}

                {/* Conclusion Button */}
                {conclusionSection && (
                    <button
                        onClick={() => scrollToSection(`section-conclusion`)}
                        className={`block text-left text-lg pt-6 w-full  transition ${activeSection === `section-conclusion` ? "text-babyBlue font-semibold" : "text-lightGray"
                        }`}
                    >
                        Conclusion
                    </button>
                )}
            </div>

            <div className='xl:w-[calc(100%-413px)] lg:w-[calc(100%-340px)] w-full space-y-12'>
                <div className='space-y-8' id={`section-0`}>
                    <div className='space-y-4'>
                        {data.categories.map((item, index) => (
                            <h3 key={index} className='text-babyBlue text-xl font-medium'>{item.name}</h3>
                        ))}
                        <h1 className='text-primary md:text-4xl text-2xl font-semibold'>{data.title}</h1>
                    </div>
                    <div className='flex justify-between md:items-center items-start gap-y-6 text-lightGray text-base md:flex-row flex-col'>
                        <div className='flex xl:gap-[75px] gap-5 items-center'>
                            <div className='flex gap-2'>
                                <span className='w-5 h-5'>
                                    <Calender />
                                </span>
                                {data.created_at}
                            </div>
                            <div className='flex gap-2'>
                                <span className='w-5 h-5'>
                                    <Clock />
                                </span>
                                {data.reading_time} min read
                            </div>
                        </div>
                        <div className='flex items-center gap-6'>
                            <span className='text-lightGray text-sm'>
                                Share To
                            </span>
                            <ShareButtons />
                        </div>

                    </div>
                </div>
                <div>
                    <p className='text-primary text-lg'>{data.short_content}</p>
                </div>
                <div className='blogsContent space-y-12'>

                    {/* --- Normal Sections --- */}
                    {normalSections.map((sec, i) => (
                        <div
                            id={`section-${i + 1}`}
                            key={i} className="blog-section space-y-6">
                            {sec.heading && (
                                <div  className="text-primary md:text-3xl text-xl" dangerouslySetInnerHTML={{ __html: sec.heading }} />
                            )}
                            <div
                                className="section-body space-y-6"
                                dangerouslySetInnerHTML={{ __html: sec.content }}
                            />
                        </div>
                    ))}

                    {/* --- Conclusion at Bottom --- */}
                    {conclusionSection && (
                        <div
                            id="section-conclusion"
                            className="conclusion-section space-y-6 mt-20 md:p-10 p-6 md:rounded-[40px] rounded-[32px] border border-white shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-white/20"
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: conclusionSection.heading! }}
                                className="text-primary md:text-3xl text-xl font-semibold"
                            />
                            <div
                                className="section-body space-y-6 text-gray-700"
                                dangerouslySetInnerHTML={{ __html: conclusionSection.content }}
                            />
                        </div>
                    )}

                </div>


            </div>
        </div>
    )
}
