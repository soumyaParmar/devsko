"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "../../../../styles/dashboard.module.css";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "@/common/Navbar/Navbar";
import MainMiddleSection from "@/components/DashboardMidSection/MainMiddleSection";
import CourseList from "@/components/DashboardMidSection/CourseList";
import ProgressBar from "@/components/Progress_Bar/ProgressBar";

import { InterviewHistory } from "@/utils/Dashboard/InterviewHistory";
import { InterviewHistoryProps } from "@/utils/Interfaces/Dashboard/InterviewHistory";
import { ProfileUpdate } from "@/utils/Dashboard/ProfileUpdate";
import { ProfileUpdateProps } from "@/utils/Interfaces/Dashboard/ProfileUpdate";
import profilePic from "@/assets/dashboard/profile-pic.png";
import dollar_img from "@/assets/dashboard/dollar.png";
import CreditCard from "@/components/Cards/CreditCard";
import { logout } from "@/lib/logout";

const Dashboard = () => {
  const router = useRouter();
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [visibleList, setVisibleList] = useState<number>(2);
  const [courseType, setCourseType] = useState("");
  const [openCreditsCard, setOpenCreditsCard] = useState<boolean>(false);

  const handleShowCompleteCourse = (type: "recommand" | "enrolled" | "") => {
    setViewAll((prev) => !prev);
    setCourseType(type);
  };

  const handleViewReports = (interview_name: string) => {
    interview_name = interview_name.toLowerCase().split(" ").join("");
    router.push(`/reports/${interview_name}`);
  };

  const handleSeeAllList = () => {
    setVisibleList((prev) => prev + 2);
  };

  const handleUpdateProfile = () => {
    router.push("#");
  };

  const handleOpenCreditsCard = () => {
    setOpenCreditsCard((prev) => !prev);
  };

  return (
    <section className={style.dash}>
      <Navbar />
      <div className={style.container}>
        <div className={style.inner_container}>
          {/* left section */}
          <div className={style.left}>
            <div className={style.left_profile}>
              <div className={style.profile_bg}></div>

              <div className="flex flex-col justify-center items-center">
                <div className={style.profile_img}>
                  <Image src={profilePic} alt="profile Pic" />
                </div>
                <br />
                <div className={style.profile_name}>Tanara Elakshi</div>
                <div className={style.profile_desig}>Frontend Developer</div>
              </div>

              <div className={style.profile_about}>
                <h6 className="text-sm text-[#101010]">About</h6>
                <p className="text-sm text-gray-400 text-left">
                  Passionate UI designer with 5+ years of experience crafting
                  intuitive and visually appealing interfaces. Expert in
                  user-centered...
                </p>
                <button className="text-[0.7rem] text-[#176DEE]">
                  See All....
                </button>
              </div>

              <div className={style.profile_bar}>
                <h6 className="text-sm my-3 text-[#101010] font-medium">
                  Complete Your Profile{" "}
                </h6>
                <div className="flex items-center gap-2">
                  <ProgressBar outerWidth="90%" innerWidth="50%" />
                  <div className="text-[0.75rem] text-[#101010]">50%</div>
                </div>
              </div>

              <button
                className="w-full h-[3rem] text-white rounded-[1rem]  bg-[#176DEE] mt-[1rem]"
                onClick={handleUpdateProfile}
              >
                Update your profile
              </button>
              <button
                className="w-full h-[3rem] text-white rounded-[1rem]  bg-[#176DEE] mt-[1rem]"
                onClick={logout}
              >
                Log out
              </button>
            </div>

            <div className=" flex flex-col gap-7 sticky top-12">
              <div className={style.left_job}>
                <h4 className="text-[0.875rem] my-2 text-[#101010]">
                  Profile Assessment/ Job Readiness
                </h4>
                <div className="flex h-[80%]">
                  <div className="w-[50%]">
                    <div className="w-[8rem] h-[8rem] border-[10px] rounded-full my-4 mx-2"></div>
                  </div>
                  <div className="flex flex-col gap-1 w-[50%]">
                    <p className="text-xs text-[#101010] font-[400]">
                      Job Application Activity
                    </p>
                    <div className="text-[#7C7C7C] text-[1rem]">
                      <span className="text-[#101010] text-[2rem]">40</span> /
                      100
                    </div>
                    <div className={style.left_job_skills}>
                      <div className="bg-[#59BFF9]"></div> Skill Added
                    </div>
                    <div className={style.left_job_skills}>
                      <div className="bg-[#FF4DA2]"></div> Work Experience
                    </div>
                    <div className={style.left_job_skills}>
                      <div className="bg-[#5215FF]"></div> Education
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* middle section */}
          {!viewAll ? (
            <MainMiddleSection handleClick={handleShowCompleteCourse} />
          ) : (
            <CourseList
              courseType={courseType}
              handleClick={handleShowCompleteCourse}
            />
          )}

          {/* right section */}
          <div className={style.right}>
            {/* credits section */}
            <div className={style.right_credits}>
              <h6 className="font-normal">Your account balance</h6>
              <div className="flex gap-1 justify-center items-center font-medium text-[1rem]">
                <Image
                  src={dollar_img}
                  alt="Dollar img"
                  className="w-[1.3rem] h-[1.3rem]"
                />
                400 credits
              </div>
              <p className="text-[#878787] text-center font-normal text-[0.85rem]">
                Credits you create decks using AI, and use AI editing features.
                They’re tied to your account email.
              </p>
              <button
                className="text-[#176DEE] font-medium"
                onClick={handleOpenCreditsCard}
              >
                Earn more credits
              </button>
            </div>
            <div className="sticky top-12 flex flex-col gap-7 ">
              <div></div>

              {/* profile completion */}
              <div className={style.right_profile_complete}>
                <h6 className="text-[1.1rem] h-[10%]">Profile Completion</h6>
                <div className={style.profile_completion}>
                  <div className="flex flex-col gap-3 w-full overflow-hidden h-[80%]">
                    {ProfileUpdate.map(
                      (fields: ProfileUpdateProps, index: number) => (
                        <div className="flex flex-col gap-3" key={index}>
                          <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                              <div className="font-normal">
                                {fields.fields_name}
                              </div>
                              <div className="text-[#16A34A] text-xs bg-[#16A34A0D] rounded-[1rem] p-1">
                                +{fields.field_per}
                              </div>
                            </div>
                            <p className="text-xs text-[#7D7B84]">
                              {fields.field_desc}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <button className="font-medium text-[#176DEE]  text-decoration-line">
                    See Completed
                  </button>
                </div>
              </div>
              {/* interview history */}
              <div className={style.right_interview_history}>
                <h6 className="text-[1.1rem] h-[10%]">Interview history</h6>
                <div className={style.interview}>
                  <div className="flex flex-col gap-6 w-full overflow-hidden h-full">
                    {InterviewHistory.slice(0, visibleList).map(
                      (history: InterviewHistoryProps, index: number) => (
                        <div className="w-full h-auto flex gap-1" key={index}>
                          <div className="w-[40px] h-[40px] bg-slate-300 rounded-[0.5rem] border"></div>
                          <div className="flex flex-col w-[90%]">
                            <div className="flex justify-between w-full h-[1.5rem]">
                              <div className="font-medium">
                                {history.interview_name}
                              </div>

                              <div
                                className="text-white font-normal text-center rounded-[0.5rem] text-[10px] py-1 w-[4.5rem] h-auto"
                                style={{
                                  backgroundColor:
                                    history.status === "Completed"
                                      ? "#4CAF50"
                                      : history.status === "Pending"
                                        ? "#FFC107"
                                        : "#FF6B6B",
                                }}
                              >
                                {history.status}
                              </div>
                            </div>
                            <div className="text-[#7D7B84] text-xs">
                              {history.company}
                            </div>
                            <div className="flex justify-between w-full text-xs mt-2">
                              <button
                                className="font-medium text-[#176DEE]"
                                onClick={() =>
                                  handleViewReports(history.interview_name)
                                }
                              >
                                View Reports
                              </button>
                              <div className="font-normal text-[#7D7B84]">
                                {history.completed_rounds}/
                                {history.total_rounds} Rounds Completed
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <button
                    className="font-medium text-[#176DEE] text-decoration-line"
                    onClick={handleSeeAllList}
                  >
                    {visibleList < InterviewHistory.length && "See All"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openCreditsCard && <CreditCard handleClick={handleOpenCreditsCard} />}
    </section>
  );
};

export default Dashboard;
