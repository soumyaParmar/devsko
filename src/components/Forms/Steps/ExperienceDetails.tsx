/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import style from "@/styles/onboardingforms.module.css";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import SelectField from "@/components/Forms/Fields/Select";
import Button from "@/components/Forms/Button/Button";
import Input from "@/components/Forms/Fields/Input";
import Textarea from "@/components/Forms/Fields/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";

interface ExperienceDetailsValues {
  organizationName: string;
  projectName: string;
  startDate: string;
  endDate: string;
  role: string;
  technologiesUsed: string[];
  projectDescription: string;
}

const ExperienceDetails = ({ formData, nextStep, errorMsg }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ExperienceDetailsValues>();
  const technologiesUsedOptions = [
    { value: "web development", label: "Web Development" },
    { value: "Ml", label: "ML/AI" },
    { value: "Mobile Development", label: "Mobile Development" },
  ];
  const onSubmit: SubmitHandler<ExperienceDetailsValues> = (data) => {
    console.log(data);
    nextStep(data);
  };

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.formTitle}>
          <FitScreenOutlinedIcon />
          <h1 className="pt-3">Expercience Details</h1>
        </div>

        <form className={style.formFields} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 w-full">
            <Input
              name="organizationName"
              placeholder="Organization Name"
              type="text"
              label="Organization Name"
              width="100%"
              register={register}
            />
            <div className={style.inputContainerOuter}>
              <Input
                name="projectName"
                placeholder="Project Name"
                type="text"
                label="Project Name"
                width="100%"
                register={register}
                className={errors.projectName ? style.errorBorder : ""}
                validationRules={{
                  required: "Project Name is required",
                }}
              />

              {errors.projectName && errorMsg(errors.projectName)}
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className={style.inputContainerOuter}>
              <Input
                name="startDate"
                placeholder="Start Date"
                type="date"
                label="Start Date"
                width="100%"
                register={register}
                className={errors.startDate ? style.errorBorder : ""}
                validationRules={{
                  required: "Start date is required",
                }}
              />
              {errors.startDate && errorMsg(errors.startDate)}
            </div>
            <div className={style.inputContainerOuter}>
              <Input
                name="endDate"
                placeholder="End Date"
                type="date"
                label="End Date"
                width="100%"
                register={register}
                className={errors.endDate ? style.errorBorder : ""}
                validationRules={{
                  required: "End date is required",
                }}
              />
              {errors.endDate && errorMsg(errors.endDate)}
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className={style.inputContainerOuter}>
              <Input
                name="role"
                placeholder="Role"
                type="text"
                label="Role"
                width="100%"
                register={register}
                className={errors.role ? style.errorBorder : ""}
                validationRules={{
                  required: "Role is required",
                }}
              />
              {errors.role && errorMsg(errors.role)}
            </div>

            <SelectField
              name="technologiesUsed"
              control={control}
              width="100%"
              optionsList={technologiesUsedOptions}
              placeholder="Select technologies used"
              label="Technologies Used"
              mode="tags"
              value={formData.experienceDetails.technologiesUsed || undefined}
              showSearch={true}
              rules={undefined}
              allowClear
            />
          </div>

          <Textarea
            name="projectDescription"
            label="Project Description"
            width="100%"
            register={register}
          />

          <Button btnText="Continue" />
        </form>
      </div>
    </>
  );
};

export default ExperienceDetails;
