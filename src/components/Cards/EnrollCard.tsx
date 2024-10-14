/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import style from "@/styles/enrolledcards.module.css";
import Image from "next/image";
import course_img from "@/assets/dashboard/js_course.jpg";
import ProgressBar from "../Progress_Bar/ProgressBar";
import { EnrollCardProps } from "@/utils/Interfaces/Dashboard/CardProps";

const EnrollCard: React.FC<EnrollCardProps> = (props) => {
  const { course_name, course_tutor, completed_lessons, total_lessons } = props;
  const percentage: number = (completed_lessons * 100) / total_lessons;

  return (
    <>
      <div className={style.card_container}>
        <div className={style.top}>
          <Image src={course_img} alt="course image" />
        </div>
        <div className={style.bottom}>
          <div className="text-[0.85rem] text-[#7D7B84] font-normal mb-2">
            {course_tutor}
          </div>
          <div className="test-[1.1rem] text-[#101010] font-medium">
            {course_name}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between text-xs ">
              <div className="text-[#101010]">{percentage}%</div>
              <div className="text-[#5B617A] font-normal">
                <span className="text-[#101010]">{completed_lessons}</span>/{total_lessons} lessons
              </div>
            </div>
            <ProgressBar outerWidth="100%" innerWidth={`${percentage}%`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollCard;
