import Image from 'next/image'
import React from 'react'

export default function BGBlue() {
    return (
        <Image
            src={'/Images/bluebg.png'}
            alt='bgbuttonblue.png'
            fill
        />
    )
}
