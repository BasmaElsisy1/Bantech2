import React from 'react'
import {StartStepsProps} from '../MainPages/EkycPage'
import ButtonComp from '../button'

function StartSteps({data}: {data: StartStepsProps}) {
  return (
    <div className='py-20 md:px-[122px] px-3 flex flex-col justify-center items-center gap-8'>
        <div className='flex flex-col justify-center items-center gap-6'>
            <h1 className='text-[#212C66] font-semibold md:text-[40px] text-[24px] text-center '>{data.title}</h1>
            <p className='text-[#212C66] text-base mt-4 w-10/12 text-center'>{data.subtitle}</p>
        </div>
        <ButtonComp link={data.button.link ?? '/contact-us'} text={data.button.text} white={true}  center={true}  />

    </div>
  )
}

export default StartSteps