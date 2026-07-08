import React from "react";
import { FeatureProps, StartStepsProps } from "../MainPages/EkycPage";
import ButtonComp from "../button";
import Image from "next/image";

function Features({
  data,
  start_features,
}: {
  data: FeatureProps[];
  start_features: StartStepsProps;
}) {
  return (
    <div className="xl:p-20 p-4 space-y-8">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-[#212C66] font-semibold lg:text-[40px] text-[24px]">
          {start_features.title}
        </h1>
        <p className="text-[#212C66] text-base mt-4 w-10/12 text-center">
          {start_features.subtitle}
        </p>
      </div>
      <ButtonComp
        link={start_features.button.link ?? "/contact-us"}
        text={start_features.button.text}
        white={true}
        center={true}
      />
      <div className="flex lg:flex-row flex-col pt-8 gap-8 ">
        {data.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={` ${isEven ? " lg:flex-col-reverse" : " lg:flex-col"} flex flex-row justify-center items-center lg:gap-8 gap-3 lg:w-[calc(100%/4-30px)] w-full`}
            >
              <div className="flex flex-col justify-center items-start gap-6 lg:order-1 order-2  lg:w-full w-[calc(50%-6px)]">
                <h3 className="text-[#212C66] font-semibold xl:text-[30px] text-[20px]">
                  {item.title}
                </h3>
                <p className="text-[#212C66] xl:text-[18px] md:leading-[160%] text-sm">{item.content || item.description}</p>
              </div>
              <div className="lg:w-full w-[calc(50%-6px)] h-[240px] lg:h-[300px] xl:h-[490px] rounded-[48px] relative lg:order-2 order-1 overflow-hidden aspect-video">
                {item.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className=" object-cover h-full"
                  >
                    <source src={item.video ?? ""} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.image?.src ?? ""}
                    alt={item.image?.alt ?? ""}
                    className="object-cover h-full"
                    fill
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;