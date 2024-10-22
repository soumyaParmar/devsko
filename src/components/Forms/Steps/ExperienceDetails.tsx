/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import style from "@/styles/onboardingforms.module.css";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import Button from "@/components/Forms/Button/Button";
import Input from "@/components/Forms/Fields/Input";
import { profiles } from "@/utils/forms/profileSkills";
import Chip from "@mui/material/Chip";
import { useForm, SubmitHandler } from "react-hook-form";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Rating from "@/components/Forms/Rating";
import { ExperienceDetailsValues } from "@/utils/Interfaces/Forms/Steps/ExperienceDetails";
import NavigateButton from "../NavigateButton/NavigateButton";
import { getData, postData } from "@/lib/api";
import { useAppSelector } from "@/utils/store/hooks";

type preferredRoleOptionsType = {
  jobroleid: number;
  jobrole: string;
}

const ExperienceDetails = ({
  formData,
  nextStep,
  errorMsg,
  handlenextStep,
  currentStep,
  prevStep,
  disable,
}) => {

  const userId = useAppSelector(state => state.userInfo.userId)
  const [experience, setExperience] = useState<string>(null);
  const [preferredRoleData, setPreferredRoleData] = useState<any>(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  // const [preferredRoleOptions, setPreferredRoleOptions] = useState([]);
  const [selectedRole,setSelectedRoll] =  useState(0)



  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<ExperienceDetailsValues>({
    mode: "all",
  });

  // useEffect(() => {
  //   const getPrederredRoles = async () => {
  //     const response = await getData('jobrole');
  //     if (response && response.data.success) {
  //       // setPreferredRoleData(response.data.data);
  //       console.log(response.data.data)
  //       const roles = response.data.data.map((item: preferredRoleOptionsType) => ({
  //         value: item.jobroleid,
  //         label: item.jobrole
  //       }))
  //       setPreferredRoleOptions(roles);
  //     }

  //   }
  //   getPrederredRoles();
  // }, [])

  const preferredRoleOptions = [
    { value: 1, label: "Backend Development" },
    { value: 2, label: "Frontend Development" },
    { value: 3, label: "Full Stack Development" },
    { value: 4, label: "DevOps" },
    { value: 5, label: "Data Science" },
  ];

  const handlePreferredRole = async (data: number) => {
    setSelectedRoll(data)
    // const response = await getData(`jobrole/${data}/skills`);
    // console.log(response.data);
    // if (response && response.data.success) {
    //   // const profileData = response.data.data.find((profile) => profile.id == data);
      setSelectedSkills([]);
      setPreferredRoleData(profiles);
      setValue("jobroleid", data);
    // }
  };

  const handleSkillAdded = (selectedSkills) => {
    setSelectedSkills(selectedSkills);
  };

  const handleDelete = (skillId) => {
    // setSelectedSkills((prev) =>
    //   prev.filter((skill) => skill.skillid !== skillId)
    // );
    const updatedSkills = selectedSkills.filter((skill) => skill.skillid !== skillId);
    setSelectedSkills(updatedSkills)
  };
  const handleSelectExperience = (experienceLevel) => {
    setExperience(experienceLevel);
    if (experienceLevel === "fresher") {
      setValue("isfresher", true);
      setValue("isexperienced", false);
    } else {
      setValue("isfresher", false);
      setValue("isexperienced", true);
    }
  };

  const onSubmit: SubmitHandler<ExperienceDetailsValues> = async (data) => {
    // const payload = {
    //   userid: userId,
    //   isfresher: data.isfresher,
    //   yearsofexperience: data.yearsofexperience,
    //   jobroleid: data.jobroleid,
    //   skills: selectedSkills,
    // }
    // const response = await postData('users/skills', payload)
    // if (response && response.data.success) {
      nextStep(data);
    // }
    // console.log(data);
  };
  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div className="w-[620px] flex justify-center items-center gap-5">
      <div className={style.formContainer}>
        <div className={style.formTitle}>
          <FitScreenOutlinedIcon />
          <h1 className="pt-3">Expercience Details</h1>
        </div>

        <form
          className={style.formFields}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={style.experienceSelector}>
            <h3>
              Work Status <span style={{ color: "red" }}>*</span>
            </h3>
            <div className={style.options}>
              {/* Fresher Option */}
              <div
                className={`${style.optionCard} ${experience === "fresher" ? style.selected : ""
                  }`}
                onClick={() => handleSelectExperience("fresher")}
              >
                <div className={style.optionContent}>
                  <h4>I&apos;m a fresher</h4>
                </div>
              </div>
              {/* Experienced Option */}
              <div
                className={`${style.optionCard} ${experience === "experienced" ? style.selected : ""
                  }`}
                onClick={() => handleSelectExperience("experienced")}
              >
                <div className={style.optionContent}>
                  <h4>I&apos;m experienced</h4>
                </div>
              </div>
            </div>

            <input type="hidden" {...register("isfresher")} />
            <input type="hidden" {...register("isexperienced")} />
            {errors.isfresher && errors.isexperienced && (
              <span className={style.errorMsg}>
                Please select your experience status
              </span>
            )}
          </div>

          {experience === "experienced" && (
            <div className={style.inputContainerOuter}>
              <Input
                name="yearsofexperience"
                placeholder="Years of Experience"
                type="number"
                label="Years of Experience"
                width="100%"
                className={errors.yearsofexperience ? "errorBorder" : ""}
                register={register}
                validationRules={{
                  min: {
                    value: 1,
                    message: "Years of experience must be at least 1 year",
                  },
                  required:
                    experience === "experienced"
                      ? "Years of experience is required"
                      : false,
                }}
                required={experience === "experienced" ? true : false}
                // defaultValue={formData.experienceDetails.yearsofexperience}
                min={1}
                disabled={experience === "experienced" ? false : true}
              />
              {errors.yearsofexperience && errorMsg(errors.yearsofexperience)}
            </div>
          )}

          <div className={style.inputContainerOuter}>
            <div className={style.inputContainer}>
              <label>
                Select your Preferred Role{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 2 }}
                useFlexGap
                sx={{ flexWrap: "wrap" }}
              >
                {preferredRoleOptions.map((role) => (
                  <Chip
                    key={role.value}
                    label={role.label}
                    clickable
                    onClick={() => handlePreferredRole(role.value)}
                    variant={
                      role.value == selectedRole
                        ? "filled"
                        : "outlined"
                    }
                  />
                ))}
              </Stack>
            </div>
            <input
              type="hidden"
              {...register("jobroleid", {
                required: "Please select a role",
              })}
            />
            {errors.jobroleid && (
              <span className={style.errorMsg}>{errors.jobroleid.message}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <Skills
              preferredRoleData={preferredRoleData}
              handleDelete={handleDelete}
              experience={experience}
              handleSkillAdded={handleSkillAdded}
              setValue={setValue}
            />
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
                    !value.length ||
                    value[0]?.type === "application/pdf" ||
                    "Only PDF files are allowed",
                },
              }}
            />
            {errors.resume && errorMsg(errors.resume)}
          </div>

          <div className="flex w-full justify-end">
            <Button btnText="Submit" />
          </div>
        </form>
      </div>
      <NavigateButton
        className={style.btnContainer}
        currentStep={currentStep}
        disable={disable}
        handlenextStep={handlenextStep}
        prevStep={prevStep}
      />
    </div>
  );
};

export default ExperienceDetails;

export function Skills(props) {
  const {
    preferredRoleData,
    handleDelete,
    experience,
    handleSkillAdded,
    setValue,
  } = props;
  const [openPopovers, setOpenPopovers] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [isPrimarySkill, setIsPrimarySkill] = useState(false);

  useEffect(() => {
    if (experience !== "experienced") {
      setValue("yearsofexperience", 0);
      setYearsExperience(0);
      setSelectedSkills([]);
    }
  }, [experience, setValue]);

  useEffect(() => {
    handleSkillAdded(selectedSkills);
  }, [selectedSkills]);

  const togglePopover = (skillId: number) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [skillId]: !prevState[skillId],
    }));
  };

  const changeSkilltypeName = (skillType: string): string => {
    if (skillType.includes('_')) {
      return skillType.split('_').reduce((acc, word) => acc + " " + word.charAt(0).toUpperCase() + word.substring(1,), '')
    }
    return skillType.charAt(0).toUpperCase() + skillType.substring(1,);
  }

  const handleSkillClicked = (skillId: number) => {
    const duplicate = selectedSkills.find((item) => item.skillid == skillId);
    if (!duplicate) {
      setSelectedSkills((prev) => [
        ...prev,
        {
          skillid: skillId,
          difficultylevel: selectedRating,
          yearsexperience: yearsExperience,
          isprimary: isPrimarySkill,
        },
      ]);
    }
    // handleSkillAdded(selectedSkills);
  };
  return (
    <>
      {preferredRoleData && (
        <>
          <label>
            Select your skills on the basis of job interest{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <div className={style.technologiesContainer}>
            {Object.keys(preferredRoleData.requiredSkills).map((skillType) => (
              <span
                className="flex flex-col gap-2 w-full h-auto leading-[1.15rem] flex-wrap overflow-x-hidden text-[#000000] "
                key={skillType}
              >
                <label>{changeSkilltypeName(skillType)}</label>
                <Stack
                  direction="row"
                  spacing={{ xs: 1, sm: 2 }}
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  {preferredRoleData.requiredSkills[skillType].options.map(
                    (tech) => {
                      const isSelected = selectedSkills.find(
                        (skill) => skill.skillid === tech.skillid
                      );

                      return (
                        <Popover key={tech.skillid}>
                          <PopoverTrigger asChild>
                            <Chip
                              label={tech.skill}
                              onClick={() => togglePopover(tech.skillid)}
                              onDelete={
                                isSelected
                                  ? () => handleDelete(tech.skillid)
                                  : undefined
                              }
                              variant={isSelected ? "filled" : "outlined"}
                              deleteIcon={isSelected ? <CloseIcon /> : null}
                              sx={{
                                borderRadius: "0.25rem",
                                fontSize: "0.8rem",
                                fontWeight: "500",
                                lineHeight: "1.15rem",
                                color: "#222222",
                                width: "6rem",
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent
                            className={style.popover}
                            side="bottom"
                            align="start"
                          >
                            <div className="flex flex-col gap-2 h-auto w-full">
                              <div className="flex items-center gap-2 w-full">
                                <span className=" w-1/2">Rate yourself:</span>
                                <Rating
                                  onRatingChange={(rating) => {
                                    setSelectedRating(rating);
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="w-1/2">YOE: </span>
                                <input
                                  type="number"
                                  className="border px-2 py-1 w-1/2"
                                  onChange={(e) =>
                                    setYearsExperience(Number(e.target.value))
                                  }
                                  disabled={experience === "fresher"}
                                  min={1}
                                  max={10}
                                />
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <span className="w-1/2">Primary Skill</span>
                                <input
                                  type="checkbox"
                                  // className="border px-2 py-1 w-[10rem]"
                                  onChange={(e) =>
                                    setIsPrimarySkill(e.target.checked)
                                  }
                                  checked={isPrimarySkill}
                                />
                              </div>
                            </div>
                            <button
                              className={style.technologiesButton}
                              type="button"
                              onClick={() => handleSkillClicked(tech.skillid)}
                            >
                              Add
                            </button>
                          </PopoverContent>
                        </Popover>
                      );
                    }
                  )}
                </Stack>
              </span>
            ))}
          </div>
        </>
      )}
    </>
  );
}
