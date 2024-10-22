/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import style from "@/styles/onboardingforms.module.css";
import { UseFormRegister } from "react-hook-form";
import SelectField from "./Select";

export interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  label?: string;
  width?: string;
  required?: boolean;
  register?: UseFormRegister<any>;
  validationRules?: any;
  className?: any;
  defaultValue?: string | number;
  pattern?: string;
  min?: number;
  disabled?: boolean;
  control?: any;
  countries?: any;
  countryCodeValue?:string
}

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
  defaultValue,
  pattern,
  min,
  disabled,
  control,
  countries,
  countryCodeValue
}) => {
  return (
    <>
      <div className={style.inputContainer} style={{ width: width }}>
        <label className={disabled ? "opacity-50" : ""}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {name == "phonenumber" ? (
          <div className="flex">
            <SelectField
              control={control}
              width="30%"
              optionsList={countries}
              placeholder="+91"
              label=""
              showSearch={true}
              rules={{ required: "Country code is required" }}
              value={countryCodeValue}
              defaultValue={countryCodeValue}
              name="countryCode"
              className="select !mt-0 "
            />
            <div className="w-3/4">
            <input
              {...register(name, { required, ...validationRules })}
              className={`${style.input} w-full !rounded-l-none`}
              name={name}
              placeholder={placeholder}
              type={type}
              defaultValue={defaultValue}
              pattern={pattern}
              min={min}
              disabled={disabled}
            />
            </div>
          </div>
        ) : (
          <input
            {...register(name, { required, ...validationRules })}
            className={`${style.input} ${className}`}
            name={name}
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
            pattern={pattern}
            min={min}
            disabled={disabled}
          />
        )}
      </div>
    </>
  );
};

export default Input;
