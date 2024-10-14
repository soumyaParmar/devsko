/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import style from "@/styles/onboardingforms.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@/components/Forms/Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/Forms/Fields/Input";
import { useRouter } from "next/navigation";

interface SocialDetailsValues {
  github: string;
  linkedin: string;
  resume: any;
  hackerrank: string;
}

const SocialDetails = ({ formData, nextStep, errorMsg }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialDetailsValues>();
  const router = useRouter();


  const onSubmit: SubmitHandler<SocialDetailsValues> = (data) => {
    nextStep(data);
  };

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.formTitle}>
          <LanguageIcon />
          <h1 className="pt-3"> Social Media Details</h1>
        </div>

        <form className={`${style.formFields} mt-3`} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputContainerOuter}>
            <Input
              name="github"
              placeholder="Enter your Github URL"
              type="text"
              label="Github Link"
              width="100%"
              register={register}
              className={errors.github ? style.errorBorder : ""}
              validationRules={{
                pattern: {
                  value: /^https:\/\/github\.com\/[A-Za-z0-9_-]+$/,
                  message: "Please enter a valid GitHub URL",
                },
              }}
            />
            {errors.github && errorMsg(errors.github)}
          </div>

          <div className={style.inputContainerOuter}>
            <Input
              name="linkedin"
              placeholder="Enter your LinkedIn URL"
              type="text"
              label="LinkedIn Link"
              width="100%"
              register={register}
              className={errors.linkedin ? style.errorBorder : ""}
              validationRules={{
                pattern: {
                  value: /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
                  message: "Please enter a valid LinkedIn URL",
                },
              }}
            />
            {errors.linkedin && errorMsg(errors.linkedin)}
          </div>

          <div className={style.inputContainerOuter}>
            <Input
              name="resume"
              placeholder="Upload your Resume"
              type="file"
              label="Resume"
              width="100%"
              register={register}
              className="border-none"
              validationRules={{
                validate: {
                  fileType: (value) =>
                    value[0]?.type === "application/pdf" ||
                    "Only PDF files are allowed",
                },
              }}
            />
            {errors.resume && errorMsg(errors.resume)}
          </div>

          <div className={style.inputContainerOuter}>
            <Input
              name="hackerrank"
              placeholder="Enter your HackerRank URL"
              type="text"
              label="HackerRank Link"
              width="100%"
              register={register}
              className={errors.hackerrank ? style.errorBorder : ""}
              validationRules={{
                pattern: {
                  value: /^https:\/\/www\.hackerrank\.com\/[A-Za-z0-9_-]+$/,
                  message: "Please enter a valid HackerRank URL",
                },
              }}
            />
            {errors.hackerrank && errorMsg(errors.hackerrank)}
          </div>

          <Button btnText="Submit" />
        </form>
      </div>
    </>
  );
};

export default SocialDetails;
