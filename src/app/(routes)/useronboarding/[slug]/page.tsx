/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import style from "@/styles/onboardingforms.module.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import EducationDetails from "@/components/Forms/Steps/EducationDetails";
import ExperienceDetails from "@/components/Forms/Steps/ExperienceDetails";
import SkillsDetails from "@/components/Forms/Steps/SkillsDetails";
import PersonalDetails from "@/components/Forms/Steps/PersonalDetails";
import SocialDetails from "@/components/Forms/Steps/SocialDetails";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface PersonalDetailsValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  DOB: string;
  country: string;
  gender: string;
}
interface EducationDetailsValues {
  highestEducationOptions: string;
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: string;
  endYear: string;
}

interface ExperienceDetailsValues {
  organizationName: string;
  projectName: string;
  startDate: string;
  endDate: string;
  role: string;
  technologiesUsed: string[];
  projectDescription: string;
}

interface SocialDetailsValues {
  github: string;
  linkedin: string;
  resume: string;
  hackerrank: string;
}

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      DOB: "",
      country: "",
      gender: "",
    },
    educationDetails: {
      highestEducationOptions: "",
      degree: "",
      fieldOfStudy: "",
      university: "",
      startYear: "",
      endYear: "",
    },
    experienceDetails: {
      organizationName: "",
      projectName: "",
      startDate: "",
      endDate: "",
      role: "",
      technologiesUsed: [],
      projectDescription: "",
    },
    socialDetails: {
      github: "",
      linkedin: "",
      hackerrank: "",
      resume: "",
    },
  });

  // const { handleSubmit, control, register, formState: { errors }, trigger } = useForm<PersonalDetailsValues>({
  //   defaultValues: formData.personalDetails,
  // });

  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard/1");
  };

  const nextStep: SubmitHandler<
    | PersonalDetailsValues
    | EducationDetailsValues
    | ExperienceDetailsValues
    | SocialDetailsValues
  > = (data) => {
    switch (currentStep) {
      case 1:
        setFormData((prev) => ({
          ...prev,
          personalDetails: { ...data as PersonalDetailsValues },
        }));
        console.log(formData);
        break;
      case 2:
        setFormData((prev) => ({
          ...prev,
          educationDetails: { ...data as EducationDetailsValues },

        }));
        break;
      case 3:
        setFormData((prev) => ({
          ...prev,
          experienceDetails: { ...data as ExperienceDetailsValues },

        }));
        break;
      case 4:
        setFormData((prev) => ({
          ...prev,
          socialDetails: { ...data as SocialDetailsValues },

        }));
        break;
      default:
        break;
    }

    if (currentStep < formsList.length) {
      setCurrentStep((prev) => prev + 1);
    } 
    else {
      handleClick();
    }

  };
  const handlenextStep = () =>{
    if (currentStep < formsList.length) {
      setCurrentStep((prev) => prev + 1);
    } 
    // else {
    //   handleClick();
    // }
  }
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const errorMsg = (error) => {
    return <span className={style.errorMsg}>{error.message}</span>;
  };

  const formsList = [
    <PersonalDetails
      key="personal-details"
      formData={formData}
      nextStep={nextStep}
      errorMsg={errorMsg}
    />,
    <EducationDetails
      key="education-details"
      formData={formData}
      nextStep={nextStep}
    />,
    <ExperienceDetails
      key="experience-details"
      formData={formData}
      nextStep={nextStep}
      errorMsg={errorMsg}
    />,
    // <SkillsDetails
    //   key="skills-details"
    //   formData={formData}
    //   nextStep={nextStep}
    // />,
    <SocialDetails
      key="social-details"
      formData={formData}
      nextStep={nextStep}
      errorMsg={errorMsg}
    />,
  ];

  return (
    <>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.formTop}>
            <div className={style.userName}>Hii, Alex!</div>
            <div className={style.description}>
              <p>
                We’re excited to have you.
                <br />
                We’d like to ask you a few questions to setup your account.
              </p>
            </div>
          </div>

          {formsList[currentStep - 1]}

          <div className={style.formBottom}>{formsList[currentStep]}</div>
        </div>
        <div className={style.btnContainer}>
          <button
            onClick={prevStep}
            style={{
              color: currentStep > 1 ? "#000000" : "#888888",
            }}
            disabled={currentStep === 1 ? true : false}
          >
            <KeyboardArrowUpOutlinedIcon />
          </button>
          <button
            onClick={handlenextStep}
            style={{
              color: formsList.length === currentStep ? "#888888" : "#000000",
            }}
            disabled={formsList.length === currentStep ? true : false}
          >
            <KeyboardArrowDownOutlinedIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
