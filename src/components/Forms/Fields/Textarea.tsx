import React from "react";
import style from "@/styles/onboardingforms.module.css";
import { TextareaProps } from "@/utils/Interfaces/Forms/TextareaProps";

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  width,
  register,
}) => {
  return (
    <>
      <div className={style.inputContainer} style={{ width: width }}>
        <label>{label}</label>
        <textarea
          {...register(name)}
          className={style.input}
          style={{ minHeight: "3.7rem" }}
          name={name}
        ></textarea>
      </div>
    </>
  );
};

export default Textarea;
