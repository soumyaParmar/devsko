/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import style from "@/styles/onboardingforms.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Input from "@/components/Forms/Fields/Input";
import Button from "@/components/Forms/Button/Button";
import SelectField from "@/components/Forms/Fields/Select";
import { useForm, SubmitHandler } from "react-hook-form";

interface EducationDetailsValues {
  highestEducationOptions: string;
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: string;
  endYear: string;
}

const EducationDetails = ({ formData, nextStep }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<EducationDetailsValues>();

  const highestEducationOptions = [
    { value: "bachelors", label: "Bachelors (or equivalent)" },
    { value: "doctorate", label: "Doctorate (or equivalent)" },
    { value: "masters", label: "Masters (or equivalent)" },
    { value: "MBA", label: "Masters (or equivalent)" },
    { value: "highSchool", label: "Secondary / High School (or equivalent)" },
    { value: "other", label: "Other degree" },
  ];

  const onSubmit: SubmitHandler<EducationDetailsValues> = (data) => {
    nextStep(data);
    console.log(data);
  };
  const errorMsg = (error) => {
    return <span className={style.errorMsg}>{error.message}</span>;
  };

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.formTitle}>
          <SchoolOutlinedIcon />
          <h1 className="pt-3">Education</h1>
        </div>
        <form className={style.formFields} onSubmit={handleSubmit(onSubmit)}>
          <SelectField
            name="highestEducationOptions"
            width="100%"
            optionsList={highestEducationOptions}
            placeholder="Highest Level of Education"
            label="Highest Level of Education"
            value={
              formData.educationDetails.highestEducationOptions || undefined
            }
            control={control}
            rules={{ required: "Highest level of education is required" }}
          />
          <div className="flex gap-2 w-full">
            <div className={style.inputContainerOuter}>
              <Input
                name="degree"
                placeholder="Enter Degree"
                type="text"
                label="Degree"
                width="100%"
                className={errors.degree ? style.errorBorder : ""}
                register={register}
                validationRules={{ required: "Degree is required" }}
                required
              />
              {errors.degree && errorMsg(errors.degree)}
            </div>

            <Input
              name="fieldOfStudy"
              placeholder="Enter Field of Study"
              type="text"
              label="Field of Study"
              width="100%"
              register={register}
            />
          </div>
          <Input
            name="university"
            placeholder="Enter University"
            type="text"
            label="University"
            width="100%"
            register={register}
          />
          <div className="flex gap-2 w-full">
            <div className={style.inputContainerOuter}>
              <Input
                name="startYear"
                placeholder="Start Year"
                type="date"
                label="Start Year"
                className={errors.startYear ? style.errorBorder : ""}
                width="100%"
                register={register}
                validationRules={{
                  required: "Start year is required",
                }}
                required
              />
              {errors.startYear && errorMsg(errors.startYear)}
            </div>
            <Input
              name="endYear"
              placeholder="MM/YY"
              type="date"
              label="End Year"
              width="100%"
              register={register}
              required
            />
          </div>
          <Button btnText="Continue" />
        </form>
      </div>
    </>
  );
};

export default EducationDetails;
