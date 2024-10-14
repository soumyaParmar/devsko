import React from "react";
import style from "@/styles/onboardingforms.module.css";
import { InputProps } from "@/utils/Interfaces/Forms/InputProps";

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  type,
  label,
  width,
  register,
  required,
  validationRules,
  className,
  defaultValue
}) => {
  return (
    <>
      <div className={style.inputContainer} style={{ width: width }}>
        <label>{label}</label>
        <input
          {...register(name, { required, ...validationRules })}
          className={`${style.input} ${className}`}
          name={name}
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default Input;
