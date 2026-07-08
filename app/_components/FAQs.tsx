'use client';
import ButtonComp from './button';
import FAQsSection from './FAQsSection';
export interface DataFAQSProps {
  title: string,
  subtitle: string,
}
export interface QuestionProps {
  question: string,
  answer: string,
  id: number
}

export default function FAQs({ data, FAQsData, button }: { data: DataFAQSProps, FAQsData: QuestionProps[], button: { text: string | null, link: string | null } }) {

  return (
    <div className='max-w-[1197px] mx-auto px-5 relative flex flex-col justify-center items-center'>
      <h2 className='md:text-[40px] md:leading-[60px] text-2xl font-semibold text-primary text-center' dangerouslySetInnerHTML={{ __html: data.title }} />
      <p className='text-center md:text-xl text-base text-[#212C66] pt-6'>{data.subtitle}</p>
      <div className='pt-6'>
        <ButtonComp
                                text={button.text ?? 'Contact Us'}
                                link={button.link ?? '/contact-us'}
                                center
                                white
                                icon={false}
                            />
      </div>
      <div className='md:space-y-6 space-y-5 md:mt-20 mt-8'>
        <FAQsSection questions={FAQsData} />
      </div>
    </div>
  )
}