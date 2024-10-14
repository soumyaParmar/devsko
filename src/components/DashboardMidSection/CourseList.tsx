import React from "react";
import style from "@/styles/dashboard.module.css";
import { RecommandCourse } from "@/utils/Dashboard/RecommandCourse";
import {
  EnrollCardProps,
  RecommandCardProps,
} from "@/utils/Interfaces/Dashboard/CardProps";
import RecommandCard from "../Cards/RecommandCard";
import { EnrollCourse } from "@/utils/Dashboard/EnrollCourses";
import EnrollCard from "../Cards/EnrollCard";

const CourseList = (props: {
  courseType: string;
  handleClick: (arg: "recommand" | "enrolled" | "") => void;
}) => {
  return (
    <>
      <div className={style.mid}>
        {props.courseType === "recommand" ? (
          // Recommanded course List
          <div className={style.enrolled_courses}>
            <div className={style.enrolled_courses_top}>
              <h2 className="text-[1rem] text-[#101010] font-medium">
                Recommended Courses
              </h2>
              <button
                className={`text-[0.825rem] text-[#176DEE] font-medium`}
                onClick={() => props.handleClick("recommand")}
              >
                Back
              </button>
            </div>
            <div
              className={`${style.enrolled_courses_bottom} flex flex-wrap gap-3`}
            >
              {RecommandCourse.map(
                (course: RecommandCardProps, index: number) => (
                  <RecommandCard {...course} key={index} />
                )
              )}
            </div>
          </div>
        ) : (
          // Enrolled course List
          <div className={style.enrolled_courses}>
            <div className={style.enrolled_courses_top}>
              <h2 className="text-[1rem] text-[#101010] font-medium">
                Recent Enrolled Courses
              </h2>
              <button
                className={`text-[0.825rem] text-[#176DEE] font-medium`}
                onClick={() => props.handleClick("")}
              >
                Back
              </button>
            </div>
            <div
              className={`${style.enrolled_courses_bottom} flex flex-wrap gap-3`}
            >
              {EnrollCourse.map((course: EnrollCardProps, index: number) => (
                <EnrollCard {...course} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseList;
