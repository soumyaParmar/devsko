/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import style from "@/styles/onboardingforms.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Input from "@/components/Forms/Fields/Input";
import Button from "@/components/Forms/Button/Button";
import SelectField from "@/components/Forms/Fields/Select";
import { postData, getData } from "@/lib/api";
import { useForm, SubmitHandler } from "react-hook-form";

interface EducationDetailsValues {
  highestEducationOptions: number;
  degree: number;
  fieldOfStudy: string;
  university: string;
  startYear: string;
  endYear: string;
}

const EducationDetails = ({ formData, nextStep }) => {
  const [educationLevels, setEducationLevels] = useState<
    { label: string; value: string }[]
  >([]);
  const [degreeOptions, setDegreeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<EducationDetailsValues>();

  useEffect(() => {
    const fetchHighestEducationOptions = async () => {
      const response = await getData("education/level");
      if (response && response.data) {
        const educationLevelsData = response.data.data;

        const educationlevelOptions = educationLevelsData.map(
          (educationlevelOption: any) => ({
            label: educationlevelOption.educationlevelname,
            value: educationlevelOption.educationlevelid,
          })
        );
        setEducationLevels(educationlevelOptions);
      }
    };
    fetchHighestEducationOptions();
  }, []);

  useEffect(() => {
    if (formData.educationDetails.highestEducationOptions) {
      const fetchDegreeOptions = async () => {
        const response = await getData(
          `degrees/${formData.educationDetails.highestEducationOptions}`
        );
        if (response && response.data) {
          const degreeOptionsData = response.data.data;
          const degreeOptions = degreeOptionsData.map((degreeOption: any) => ({
            label: degreeOption.degreename,
            value: degreeOption.degreeid,
          }));
          setDegreeOptions(degreeOptions);
        }
      };
      fetchDegreeOptions();
    }
  }, [formData.educationDetails.highestEducationOptions]);

  // const highestEducationOptions = [
  //   { value: "bachelors", label: "Bachelors (or equivalent)" },
  //   { value: "doctorate", label: "Doctorate (or equivalent)" },
  //   { value: "masters", label: "Masters (or equivalent)" },
  //   { value: "MBA", label: "Masters (or equivalent)" },
  //   { value: "highSchool", label: "Secondary / High School (or equivalent)" },
  //   { value: "other", label: "Other degree" },
  // ];

  const onSubmit: SubmitHandler<EducationDetailsValues> = (data) => {
    nextStep(data);
    // console.log(data);
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
            optionsList={educationLevels}
            placeholder="Highest Level of Education"
            label="Highest Level of Education"
            value={
              formData.educationDetails.highestEducationOptions || undefined
            }
            control={control}
            rules={{ required: "Highest level of education is required" }}
            defaultValue={
              formData.educationDetails.highestEducationOptions || undefined
            }
          />
          <div className="flex gap-2 w-full">
            <div className={style.inputContainerOuter}>
              <SelectField
                name="degree"
                width="100%"
                optionsList={degreeOptions}
                placeholder="Enter your degree"
                label="Enter your Degree"
                value={formData.educationDetails.degree || undefined}
                control={control}
                rules={{ required: "Degree is required" }}
                defaultValue={formData.educationDetails.degree || undefined}
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
              defaultValue={formData.educationDetails.fieldOfStudy}
            />
          </div>
          <Input
            name="university"
            placeholder="Enter University"
            type="text"
            label="University"
            width="100%"
            register={register}
            defaultValue={formData.educationDetails.university}
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
                defaultValue={formData.educationDetails.startYear}
                validationRules={{
                  required: "Start year is required",
                  pattern: {
                    value: /^[12][0-9]{3}$/,
                    message: "Please enter a valid 4-digit year",
                  },
                  validate: {
                    isFutureYear: (value) =>
                      value <= new Date().getFullYear() ||
                      "Please enter a valid year",
                  },
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
              defaultValue={formData.educationDetails.endYear}
            />
          </div>
          <Button btnText="Continue" />
        </form>
      </div>
    </>
  );
};

export default EducationDetails;
