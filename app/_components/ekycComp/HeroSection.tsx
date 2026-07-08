
import React from "react";
import ButtonComp from "../button";
import { HeroProps } from "../MainPages/EkycPage";

function HeroSection({data}: {data: HeroProps}) {
  return (
    <section className="relative w-full overflow-hidden xl:max-w-[1437px] max-w-[375px] md:w-fit xl:px-20 px-[20px] mx-auto ">
      
      {/* Header */}
      <div className="text-center py-8 xl:py-12">
        <h1 className="text-[#212C66]  xl:text-[40px] text-[24px] font-semibold">
          {data.title}
        </h1>
      </div>

      {/* Video Container */}
      <div className="relative w-full">
        {/* Main Video */}
        <video
          className="w-full object-scale-down mx-auto xl:block hidden"
          autoPlay
          muted
          loop
          playsInline
          poster="/Images/desktop.png"
        >
          <source src={data.media[0].src} type="video/mp4" />
        </video>
        <video
          className="w-full  h-full   xl:hidden"
          autoPlay
          muted
          loop
          playsInline
          poster="/Images/mobile.png"
        >
          <source src={data.media[1].src} type="video/mp4" />
        </video>

        <div className="absolute inset-0 pointer-events-none">
          
          {/* Left Bottom Text - below left video square */}
          <div className="absolute xl:left-[1.5%] left-[36.5%] xl:bottom-[-1%] -bottom-3 xl:w-[405px] w-[221px] xl:space-y-8 space-y-4   text-[#212C66] text-base xl:text-lg ">

            <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: data.description[0] }}>
            </div>
          </div>

          {/* Right Top Text - above right video square */}
          <div className="absolute xl:-right-[1%] right-[35%] top-[2%]  xl:w-[405px] w-[221px] xl:space-y-8 space-y-4  text-[#212C66] text-base xl:text-lg">
            <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: data.description[1] }}>
            </div>
          </div>

          {/* Register Button - bottom of right video square */}
          <div className="absolute xl:block hidden right-[2%] bottom-[4%] pointer-events-auto">
            <ButtonComp link={data.button.link} center  textWhite blue text={data.button.text} icon={true}  />
          </div>

        </div>
      </div>
      <div className="xl:hidden mx-auto w-full pt-[32px]">
        <ButtonComp link={data.button.link} center blue text={data.button.text} icon={true}  />

      </div>
    </section>
  );
}

export default HeroSection;