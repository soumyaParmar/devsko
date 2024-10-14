import React from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import style from "@/styles/dashboard.module.css";
// Cards component
import EnrollCard from "../Cards/EnrollCard";
import RecommandCard from "../Cards/RecommandCard";
import TestCard from "../Cards/TestCard";
// List of courses
import { RecommandCourse } from "@/utils/Dashboard/RecommandCourse";
import { EnrollCourse } from "@/utils/Dashboard/EnrollCourses";
import {
  EnrollCardProps,
  RecommandCardProps,
} from "@/utils/Interfaces/Dashboard/CardProps";

const MainMiddleSection = (props: {
  handleClick: (arg: "recommand" | "enrolled" | "") => void;
}) => {
  const router = useRouter();

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const handleScreeningTest = () => {
    router.push("/userverifications/1");
  };
  return (
    <>
      <div className={style.mid}>
        {/* Mid test */}
        <div className={style.mid_test}>
          <TestCard
            testType="Screening Test"
            testName="Initial Qualification Assessment"
            testDesc="Our platform offers a comprehensive range of courses designed to
              empower you with the skills & knowledge."
            btnText="Start Test"
            testPrice="Free"
            bgColor="#A8D8FF"
            isDisabled={false}
            handleClick={handleScreeningTest}
          />
          <TestCard
            testType="Technical Round"
            testName="In-Depth Technical Interview"
            testDesc="Our platform offers a comprehensive range of courses designed to
              empower you with the skills & knowledge."
            btnText="Start Interview"
            testPrice="Free"
            bgColor="#FFE8A5"
            isDisabled={true}
          />
          <TestCard
            testType="Technical Round"
            testName="In-Depth Technical Interview"
            testDesc="Our platform offers a comprehensive range of courses designed to
              empower you with the skills & knowledge."
            btnText="Start Interview"
            testPrice="Free"
            bgColor="#FFE8A5"
            isDisabled={true}
          />
        </div>
        {/* enrolled courses */}
        <div className={style.enrolled_courses}>
          <div className={style.enrolled_courses_top}>
            <h2 className="text-[1rem] text-[#101010] font-medium">
              Recent Enrolled Courses
            </h2>
            <button
              className={`text-[0.825rem] text-[#176DEE] font-medium`}
              onClick={() => props.handleClick("enrolled")}
            >
              View All
            </button>
          </div>
          <div className={style.enrolled_courses_bottom}>
            <Slider {...settings}>
              {EnrollCourse.map((course: EnrollCardProps, index: number) => (
                <EnrollCard {...course} key={index} />
              ))}
            </Slider>
          </div>
        </div>
        {/* recommanded courses */}
        <div className={style.enrolled_courses}>
          <div className={style.enrolled_courses_top}>
            <h2 className="text-[1rem] text-[#101010] font-medium">
              Recommended Courses
            </h2>
            <button
              className={`text-[0.825rem] text-[#176DEE] font-medium`}
              onClick={() => props.handleClick("recommand")}
            >
              View All
            </button>
          </div>
          <div className={style.enrolled_courses_bottom}>
            <Slider {...settings}>
              {RecommandCourse.map(
                (course: RecommandCardProps, index: number) => (
                  <RecommandCard {...course} key={index} />
                )
              )}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMiddleSection;
