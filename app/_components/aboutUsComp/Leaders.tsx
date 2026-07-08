"use client";
import React, { useState } from "react";
import Image from "next/image";
import BGBlue from "../SVGs/BGBlue";
import StarIcon from "../SVGs/StarIcon";

interface Statistic {
  stat_title: string;
  stat_description: string;
}

interface Leader {
  tab_name: string;
  tab_icon: string | null;
  leader_name: string | null;
  leader_position: string | null;
  leader_image: string | null;
  leader_image_alt: string | null;
  leader_word: string | null;
  leader_rating: string | null;
  leader_statistics: Statistic[];
}

export interface IndustryLeadersData {
  header_title: string;
  header_description: string;
  leaders: Leader[];
}

export interface LeadersProps {
  data: IndustryLeadersData;
}

function Leaders({ data }: LeadersProps) {
  const [activeTab, setActiveTab] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(index);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const currentLeader = data.leaders[activeTab];
  const hasContent = currentLeader.leader_word && currentLeader.leader_name;

  return (
    <div className="max-w-[1440px] mx-auto py-20 px-4 mb-10">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-[1200px] mx-auto">
          <h1 className="text-[24px] xl:text-[40px] font-semibold text-primary mb-6">
            {data.header_title}
          </h1>
          <p className="text-primary mx-auto text-base xl:text-[20px] leading-relaxed">
            {data.header_description}
          </p>
        </div>

        {/* Company Tabs */}
        <div className="w-full overflow-x-auto noscrollbar pb-[48px] -mx-4 px-4">
          {" "}
          {/* Key fix */}
          <div className="flex justify-start xl:justify-center items-center gap-4 min-w-max">
            {" "}
            {/* min-w-max prevents shrinking */}
            {data.leaders.map((leader, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`relative text-[18px] leading-[160%] whitespace-nowrap
          backdrop-blur-xl border border-white group
          shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] 
          font-bold bg-white/20 transition-all duration-500 
          py-[16px] rounded-full flex-shrink-0 overflow-hidden
          ${activeTab === index ? "px-10" : "px-8 group-hover:px-10"}`}
              >
                <span
                  className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 ${
                    activeTab === index
                      ? "text-primary"
                      : "text-gray-400 group-hover:text-primary"
                  }`}
                >
                  {leader.tab_icon && (
                    <Image
                      src={leader.tab_icon}
                      alt={leader.tab_name}
                      width={leader.tab_name.includes("AjilPay") ? 85 : 41}
                      height={leader.tab_name.includes("AjilPay") ? 40 : 41}
                      className={`flex-shrink-0 transition-all duration-500 ${
                        activeTab === index
                          ? ""
                          : "opacity-50 group-hover:opacity-100"
                      }`}
                    />
                  )}
                  {leader.tab_name}
                </span>
                <span
                  style={{ filter: "blur(3px)" }}
                  className={`w-full h-full absolute inset-y-0 transition-all duration-500 ${
                    activeTab === index
                      ? "end-0"
                      : "end-full  group-hover:end-0"
                  }`}
                >
                  <BGBlue />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {hasContent ? (
          <div className="flex flex-col xl:flex-row gap-6 max-w-[1280px] mx-auto relative overflow-hidden">
            <Image src={'/Images/leaders.png'} alt="img" width={307} height={307} className="absolute  xl:bottom-0 xl:right-[50%] xl:left-[50%] xl:translate-x-[-50%] xl:translate-y-[50%] overflow-hidden  -right-16  top-[35%]" />
            {/* Testimonial Card - Left Column */}
            <div
              className={`rounded-[56px] p-8 shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm max-w-[752px] transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Stars */}
              {currentLeader.leader_rating && (
                <div className="flex gap-2 mb-12">
                  {" "}
                  {[...Array(parseInt(currentLeader.leader_rating))].map(
                    (_, i) => (
                      <div
                        key={i}
                        className="transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <StarIcon />
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Testimonial Text */}
              <p className="text-[#5A628C] xl:text-[20px] text-sm leading-relaxed mb-12">
                {currentLeader.leader_word}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
                  {currentLeader.leader_image ? (
                    <img
                      src={currentLeader.leader_image}
                      alt={
                        currentLeader.leader_image_alt ||
                        currentLeader.leader_name ||
                        ""
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <div className="font-semibold text-primary xl:text-[20px] text-base">
                    {currentLeader.leader_name}
                  </div>
                  <div className="text-[#5A628C] xl:text-[16px] text-sm">
                    {currentLeader.leader_position}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards - Right Column */}
            <div className="flex flex-col gap-6">
              {currentLeader.leader_statistics.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-[56px] p-8  shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm xl:max-w-[488px] transition-all duration-500 ${
                    isAnimating
                      ? "opacity-0 translate-y-4"
                      : "opacity-100 translate-y-0"
                  }`}
                  style={{
                    transitionDelay: isAnimating ? "0ms" : `${index * 100}ms`,
                  }}
                >
                  <div className="xl:text-[64px] text-[48px] font-semibold text-primary mb-4">
                    {stat.stat_title}
                  </div>
                  <p className="text-[#5A628C] xl:text-[20px] text-sm leading-relaxed">
                    {stat.stat_description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No content available for this tab
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaders;
