"use client";
import { useState } from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    ThreadsShareButton,
    TwitterShareButton
} from "react-share";
import XIcon from "./SVGs/X";
import InIcon from "./SVGs/in";
import Facebook from "./SVGs/Facebook";
import CopyIcon from "./SVGs/CopyIcon";

export default function ShareButtons({ url = "" }) {
    const [copied, setCopied] = useState(false);
    const shareUrl = `${process.env.NEXT_PUBLIC_FrontEnd_URL}${url}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (

        <div className={`flex gap-6 items-center`}>
            <div className="flex gap-2">
                <TwitterShareButton url={shareUrl} className="relative w-10 h-10 rounded-full group flex justify-center items-center border border-white bg-white/20   transition-all duration-500  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                    <span className="relative h-[19px] aspect-[20/19] text-babyBlue group-hover:text-primary transition-all duration-300">
                        <XIcon />
                    </span>
                </TwitterShareButton>

                <LinkedinShareButton url={shareUrl} className="relative w-10 h-10 rounded-full group flex justify-center items-center border border-white bg-white/20   transition-all duration-500  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                    <span className="relative h-[19px] aspect-[20/19] text-babyBlue group-hover:text-primary transition-all duration-300">
                        <InIcon />
                    </span>
                </LinkedinShareButton>

                <FacebookShareButton url={shareUrl} className="relative w-10 h-10 rounded-full group flex justify-center items-center border border-white bg-white/20   transition-all duration-500  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                    <span className="relative h-[19px] aspect-[20/19] text-babyBlue group-hover:text-primary transition-all duration-300">
                        <Facebook />
                    </span>
                </FacebookShareButton>
                <button onClick={handleCopy} className="relative w-10 h-10 rounded-full group flex justify-center items-center bg-white/20   transition-all duration-500  shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                    <span className="relative h-[19px] aspect-[20/19] text-babyBlue group-hover:text-primary transition-all duration-300">
                        <CopyIcon />
                    </span>
                </button>


            </div>
        </div>

    );
}
