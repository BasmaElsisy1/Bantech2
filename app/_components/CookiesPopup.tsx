"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import Star from "./SVGs/Star";
import Link from "next/link";

export default function CookiePopup() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            const consent = Cookies.get("cookie_consent");
            if (consent) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/components/cookies-drop-menu`, {
                    headers: { Accept: "application/json" },
                });

                const json = await res.json();
                setData(json);
                setShow(true);
            } catch (error) {
                console.log("Error fetching cookie popup:", error);
            }
        };

        run();
    }, []);

    const acceptCookies = () => {
        Cookies.set("cookie_consent", "yes", { expires: 365 });
        setShow(false);
    };
    const rejectCookies = () => {
        Cookies.set("cookie_consent", "no", { expires: 365, path: "/" });
        setShow(false);
    };


    if (!show || !data) return null;
    const PageData = data.data.extra_content;
    return (
        <div className="fixed bottom-0 top-auto left-0 right-0 flex justify-center z-50">
            <div className="md:rounded-full  max-w-[1200px] relative h-fit  mx-auto py-8 lg:px-[106px] px-5 bg-white/80   backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] overflow-hidden ">
                <div className=" absolute top-0 right-0 w-[200px] aspect-square">
                    <Image
                        src={'/Images/Framecoockies.png'}
                        alt="Framecoockies.png"
                        fill
                    />
                </div>
                <div className=" absolute -bottom-[30px] -left-2.5 w-[200px] aspect-square rotate-180">
                    <Image
                        src={'/Images/Framecoockies.png'}
                        alt="Framecoockies.png"
                        fill
                    />
                </div>
                <div className="space-y-5 relative">
                    <h3 className="text-2xl font-semibold text-center text-primary">{PageData.content.title}</h3>
                    <p className="text-base text-primary text-center ">{PageData?.content?.text} view <Link
                        onClick={() => setShow(false)}
                        className="underline font-bold" href={PageData.buttons[0].link}>{PageData.buttons[0].text}</Link></p>
                </div>

                <div className="mt-5 flex justify-center   mx-auto gap-3">
                    <button
                        onClick={acceptCookies}
                        className="bg-white/20 px-4 flex justify-center items-center gap-2  backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] rounded-full hover:text-babyBlue transition-all duration-300 text-primary text-sm font-semibold py-3"
                    >
                        {PageData.buttons[1].text}
                        <span className="w-3 h-3">
                            <Star />
                        </span>
                    </button>
                    <button
                        onClick={rejectCookies}
                        className="bg-white/20 px-4   backdrop-blur-xl border border-white group
             shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] rounded-full hover:text-babyBlue transition-all duration-300 text-primary text-sm font-semibold py-3"
                    >
                        {PageData.buttons[2].text}
                    </button>
                </div>

            </div>
        </div>
    );
}
