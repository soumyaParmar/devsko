/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import style from "@/styles/onboardingforms.module.css";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import SelectField from "../Fields/Select";
import Button from "@/components/Forms/Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Rating from "@/components/Forms/Rating";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SkillsDetailsValues {
  preferredRole: string;
  technologiesUsed: {
    technology: string;
    rating: string;
    yearOfExperience: number;
  }[];
}

const SkillsDetails = ({ formData, nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SkillsDetailsValues>({
    defaultValues: formData.skillsDetails,
  });

  // Track selected technologies
  const [selectedTech, setSelectedTech] = useState<
    { technology: string; rating: string; yearOfExperience: number }[]
  >(formData.skillsDetails?.technologiesUsed || []);

  // Track currently selected rating and experience for each technology in the popover
  const [currentRating, setCurrentRating] = useState("");
  const [currentExperience, setCurrentExperience] = useState(0);

  const preferredRoleOptions = [
    { value: "web development", label: "Web Development" },
    { value: "Ml", label: "ML/AI" },
    { value: "Mobile Development", label: "Mobile Development" },
  ];

  const technologiesUsed = [
    {
      type: "Core technologies",
      technologies: ["Java", "Javascript", "Python", "React"],
    },
    { type: "DBMS", technologies: ["MySQL", "MongoDB", "PostgreSQL"] },
    {
      type: "Web Technologies",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      type: "Other Technologies",
      technologies: ["Git", "Docker", "Kubernetes", "CI/CD"],
    },
  ];

  // Dynamically handle technology selection
  const handleSelect = (tech) => {
    const existingTech = selectedTech.find((t) => t.technology === tech);
    if (!existingTech) {
      setSelectedTech((prev) => [
        ...prev,
        {
          technology: tech,
          rating: currentRating,
          yearOfExperience: currentExperience,
        },
      ]);
    }

    setCurrentRating("");
    setCurrentExperience(0);
  };

  const onSubmit: SubmitHandler<SkillsDetailsValues> = (data) => {
    data.technologiesUsed = selectedTech;
    nextStep(data);
  };

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.formTitle}>
          <FitScreenOutlinedIcon />
          <h1 className="pt-3">Technical Skills</h1>
        </div>
        <form className={style.formFields} onSubmit={handleSubmit(onSubmit)}>
          <SelectField
            name="preferredRole"
            control={control}
            width="100%"
            optionsList={preferredRoleOptions}
            placeholder="Select your Preferred Role"
            label="Preferred Role"
            rules={{ required: "Preferred Role is required" }}
            showSearch={true}
            value={
              formData.educationDetails.highestEducationOptions || undefined
            }
          />

          <div className={style.technologiesContainer}>
            {technologiesUsed.map((technology) => (
              <div className="" key={technology.type}>
                <h2 className="text-[#000000] text-[0.85rem] font-medium leading-[1.15rem] ml-1">
                  {technology.type}
                </h2>
                <div className="flex gap-2 w-full h-auto font-normal text-[14px] leading-[1.15rem] flex-wrap overflow-x-hidden">
                  {technology.technologies.map((tech, index) => (
                    <Popover key={index}>
                      <PopoverTrigger>
                        <button
                          className={style.technologiesButton}
                          type="button"
                        >
                          {tech}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className={style.popover}
                        side="bottom"
                        align="start"
                      >
                        <p>You selected: {tech}</p>
                        <div className="flex items-center border gap-2">
                          <span className="text-center">Rate yourself:</span>
                          {/* <Rating register={register} name="rating" /> */}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Year of experience: </span>
                          <input
                            type="number"
                            className="border px-2 py-1"
                            value={currentExperience}
                            onChange={(e) =>
                              setCurrentExperience(parseInt(e.target.value))
                            }
                          />
                        </div>
                        <button
                          className={style.technologiesButton}
                          type="button"
                          onClick={() => handleSelect(tech)}
                        >
                          Add
                        </button>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button btnText="Continue" />
        </form>
      </div>
    </>
  );
};

export default SkillsDetails;
