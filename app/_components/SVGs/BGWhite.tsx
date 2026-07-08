import Image from 'next/image'
import React from 'react'

export default function BGWhite() {
    return (
        <Image
            src={'/Images/buttonBG.png'}
            alt='Image'
            fill
        />
    )
}
