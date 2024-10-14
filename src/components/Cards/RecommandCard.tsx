/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import java_core from "@/assets/dashboard/Core-Java.jpg";
import { RecommandCardProps } from "@/utils/Interfaces/Dashboard/CardProps";

const RecommandCard: React.FC<RecommandCardProps> = (props) => {
  const { course_name, course_tutor, flag, price, base_price } = props;

  const isVisible = flag ? "" : "none";
  return (
    <>
      <div className="w-[20rem] h-[20rem] border rounded-[1rem] p-2">
        <div className="h-[50%] overflow-hidden w-full rounded-[1rem]">
          <Image
            src={java_core}
            alt="course image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[50%] border-black w-full flex flex-col mt-2 gap-1">
          <div className="test-[1.1rem] text-[#101010] font-medium">
            {course_name}
          </div>
          <div className="text-xs text-[#7D7B84] font-normal mt-2">
            {course_tutor}
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-[#101010]">
              ${price}
              <s className="text-[#7D7B84] ml-2">${base_price}</s>
            </div>
            <div></div>
          </div>
          <span
            className="py-2 px-3 bg-[#ECEB98] text-[#5B617A] text-xs w-[5.5rem] rounded-sm"
            style={{ display: isVisible }}
          >
            Best Seller
          </span>
        </div>
      </div>
    </>
  );
};

export default RecommandCard;
