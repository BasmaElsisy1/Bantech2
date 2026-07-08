import React from 'react'

export default function Logo() {
    return (
        <svg className='w-full h-fit' viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_294_864)">
                <path d="M41.4906 0.952801V39.0477L33.0742 9.36919L41.4906 0.952801Z" fill="#21ADCE" />
                <path d="M30.8594 11.5837V39.0477L24.6578 17.6513L30.8594 11.5837Z" fill="#21ADCE" />
                <path d="M41.4906 0.952393L2.5094 0.952393L33.0742 9.36878L41.4906 0.952393Z" fill="#00CDFD" />
                <path d="M30.8593 11.5837L2.5094 11.5837L24.7383 17.7853L30.8593 11.5837Z" fill="#00CDFD" />
            </g>
            <defs>
                <filter id="filter0_d_294_864" x="0.950152" y="0.952393" width="42.0997" height="41.2138" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1.55925" />
                    <feGaussianBlur stdDeviation="0.779624" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_294_864" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_294_864" result="shape" />
                </filter>
            </defs>
        </svg>

    )
}
