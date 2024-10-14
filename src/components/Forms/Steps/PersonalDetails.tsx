/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import style from "@/styles/onboardingforms.module.css";
import Input from "@/components/Forms/Fields/Input";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Button from "@/components/Forms/Button/Button";
import SelectField from "@/components/Forms/Fields/Select";
import { useForm, SubmitHandler } from "react-hook-form";

interface PersonalDetailsValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  DOB: string;
  country: string;
  gender: string;
}

const PersonalDetails = ({ formData, nextStep, errorMsg }) => {
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<PersonalDetailsValues>();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryOptions = data.map((country: any) => ({
          label: country.name.common,
          value: country.cca2,
        }));

        setCountries(countryOptions);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const onSubmit: SubmitHandler<PersonalDetailsValues> = (data) => {
    nextStep(data);
  };

  const validateDOB = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 || "You must be at least 18 years old";
  };

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.formTitle}>
          <PermIdentityOutlinedIcon />
          <h1 className="pt-3"> Basic Details</h1>
        </div>
        <form className={style.formFields} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 w-full">
            <div className={style.inputContainerOuter}>
              <Input
                name="firstName"
                placeholder="First Name"
                type="text"
                label="First Name"
                width="100%"
                className={errors.firstName ? style.errorBorder : ""}
                register={register}
                validationRules={{
                  minLength: {
                    value: 3,
                    message: "First name must be at least 3 characters",
                  },
                  required: "First name is required",
                }}
                required
                defaultValue={formData.personalDetails.firstName}
              />
              {errors.firstName && errorMsg(errors.firstName)}
            </div>
            <div className={style.inputContainerOuter}>
              <Input
                name="lastName"
                placeholder="Last Name"
                type="text"
                label="Last Name"
                width="100%"
                className={errors.lastName ? style.errorBorder : ""}
                register={register}
                required
                validationRules={{
                  minLength: {
                    value: 3,
                    message: "Last name must be at least 3 characters",
                  },
                  required: "Last name is required",
                }}
                defaultValue={formData.personalDetails.lastName}
              />
              {errors.lastName && errorMsg(errors.lastName)}
            </div>
          </div>

          <div className={style.inputContainerOuter}>
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              className={errors.phoneNumber ? style.errorBorder : ""}
              type="tel"
              label="Phone Number"
              width="100%"
              register={register}
              validationRules={{
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be a 10-digit number",
                },
                required: "Phone number is required",
              }}
              required
              defaultValue={formData.personalDetails.phoneNumber}
            />
            {errors.phoneNumber && errorMsg(errors.phoneNumber)}
          </div>

          <div className={style.inputContainerOuter}>
            <Input
              name="DOB"
              placeholder="Date of Birth"
              className={errors.DOB ? style.errorBorder : ""}
              type="date"
              label="Date of Birth"
              width="100%"
              register={register}
              required
              validationRules={{
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Date of birth must be a valid date (YYYY-MM-DD)",
                },
                required: "Date of birth is required",
                validate: validateDOB,
              }}
              defaultValue={formData.personalDetails.DOB}
            />
            {errors.DOB && errorMsg(errors.DOB)}
          </div>

          <div className="flex gap-2 w-full">
            <SelectField
              control={control}
              width="50%"
              optionsList={countries}
              placeholder="Select Country "
              label="Country of residence"
              showSearch={true}
              rules={{ required: "Country is required" }}
              value={formData.personalDetails.country || undefined}
              name="country"
            />
            <SelectField
              name="gender"
              control={control}
              width="50%"
              optionsList={genderOptions}
              placeholder="Select Gender"
              label="Gender"
              value={formData.personalDetails.gender || undefined}
              rules={{ required: "Gender is required" }}
            />
          </div>
          <Button btnText="Continue" />
        </form>
      </div>
    </>
  );
};

export default PersonalDetails;
