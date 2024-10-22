/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import style from "@/styles/onboardingforms.module.css";
import ExperienceDetails from "@/components/Forms/Steps/ExperienceDetails";
import PersonalDetails from "@/components/Forms/Steps/PersonalDetails";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ExperienceDetailsValues } from "@/utils/Interfaces/Forms/Steps/ExperienceDetails";
import { PersonalDetailsValues } from "@/utils/Interfaces/Forms/Steps/PersonalDetails";

interface SocialDetailsValues {
  resume: string;
}

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: {
      firstname: null,
      lastname: null,
      phonenumber: null,
      dob: null,
      country: null,
      gender: null,
      countryCode: null,
    },
    experienceDetails: {
      yearsofexperience: 1,
      jobroleid: 0,
      isfresher: false,
      isexperienced: false,
      skills: [
        {
          technologyid: 0,
          difficultylevel: 0,
          yearsexperience: 0,
          isprimary: false,
        },
      ],
      resume: "",
    },
    // socialDetails: {
    //   resume: "",
    // },
  });

  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/1");
  };

  const nextStep: SubmitHandler<
    PersonalDetailsValues | ExperienceDetailsValues
  > = (data) => {
    console.log(data);
    switch (currentStep) {
      case 1:
        setFormData((prev) => ({
          ...prev,
          personalDetails: { ...(data as PersonalDetailsValues) },
        }));
        break;
      case 2:
        setFormData((prev) => ({
          ...prev,
          experienceDetails: { ...(data as ExperienceDetailsValues) },
        }));
        break;
      default:
        break;
    }

    if (currentStep < formsList.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClick();
    }
  };
  const handlenextStep = () => {
    if (currentStep < formsList.length) {
      setCurrentStep((prev) => prev + 1);
    } 
    if(formsList.length === currentStep){
      setDisable(true);
    }
  };
  const prevStep = () => {
    setDisable(false)
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
      prevStep={prevStep}
      currentStep={currentStep}
      handlenextStep={handlenextStep}
      disable={disable}
    />,
    <ExperienceDetails
      key="experience-details"
      formData={formData}
      nextStep={nextStep}
      errorMsg={errorMsg}
      prevStep={prevStep}
      currentStep={currentStep}
      handlenextStep={handlenextStep}
      disable={disable}
    />,
    // <SocialDetails
    //   key="social-details"
    //   formData={formData}
    //   nextStep={nextStep}
    //   errorMsg={errorMsg}
    // />,
  ];

  return (
    <>
      <div className={`${style.form_main} h-full w-full shadow-lg overflow-y-hidden`}>
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
              <div className="w-[620px] fixed bottom-[-22rem]">{formsList[currentStep]}</div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Onboarding;
