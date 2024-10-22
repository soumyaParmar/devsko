/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import style from "@/styles/onboardingforms.module.css";
import Input from "@/components/Forms/Fields/Input";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Button from "@/components/Forms/Button/Button";
import SelectField from "@/components/Forms/Fields/Select";
import { postData, getData } from "@/lib/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { PersonalDetailsValues } from "@/utils/Interfaces/Forms/Steps/PersonalDetails";
import "react-phone-input-2/lib/style.css";
import NavigateButton from "../NavigateButton/NavigateButton";
import { useAppSelector } from "@/utils/store/hooks";

type countryType = {
  label: string;
  value: string;
  countryCode: string;
};

type countryResponseType = {
  countryid: number;
  countryname: string;
  countrycode: string;
};

const PersonalDetails = ({
  formData,
  nextStep,
  errorMsg,
  handlenextStep,
  currentStep,
  prevStep,
  disable,
}) => {

  const userId = useAppSelector(state => state.userInfo.userId)
  const [countries, setCountries] = useState<countryType[]>([
    { countryCode: "+91", label: "india", value: "india" },
  ]);
  const [countrieCode, setCountrieCode] = useState<countryType[]>([
    { countryCode: "+91", label: "(+91) india", value: "+91" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<PersonalDetailsValues>({
    mode: "all",
  });

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const response = await getData("countries");
  //     if (response && response.data) {
  //       const countriesData = response.data.data;
  //       const countryOptions = countriesData.map(
  //         (country: countryResponseType) => ({
  //           label: country.countryname,
  //           value: country.countryid,
  //           contryCode: country.countrycode,
  //         })
  //       );
  //       const getCountryCode = countriesData.map((country: countryResponseType) => ({
  //         contryCode: country.countrycode,
  //         label: `(${country.countrycode}) ${country.countryname}`,
  //         value: country.countrycode,
  //       }))
  //       setCountries(countryOptions);
  //       setCountrieCode(getCountryCode)
  //     } else {
  //       console.log("Some error occurs:", response);
  //     }
  //   };

  //   fetchCountries();
  // }, []);

  const genderOptions = [
    { value: "m", label: "Male" },
    { value: "f", label: "Female" },
    { value: "o", label: "Other" },
  ];

  const onSubmit: SubmitHandler<PersonalDetailsValues> = async (data) => {
    // const payload = {
    //   userid: userId,
    //   firstname: data.firstname,
    //   lastname: data.lastname,
    //   phonenumber: data.countryCode + data.phonenumber,
    //   gender: data.gender,
    //   countryid: data.country,
    //   dob: data.dob,
    //   state: "Bagal me hu",
    //   city: "Bagel pe he hu",
    // };
    // data.userid = 10;
    // const res = await postData("user/info", payload);
    // if (res && res.data.success) {
      nextStep(data);
    //   console.log("data", data);
    // } else console.log("error", res);
  };

  const validateDOB = (value: string) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    return (age >= 18 && age <= 60) || "Age must be between 18 and 60";
  };

  return (
    <div className="w-[620px] flex justify-center items-center gap-5">
      <div className={`${style.formContainer}`}>
        <div>
          <div className={style.formTitle}>
            <PermIdentityOutlinedIcon />
            <h1 className="pt-3"> Basic Details</h1>
          </div>
          <form className={style.formFields} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 w-full">
              <div className={style.inputContainerOuter}>
                <Input
                  name="firstname"
                  placeholder="First Name"
                  type="text"
                  label="First Name"
                  width="100%"
                  className={errors.firstname ? style.errorBorder : ""}
                  register={register}
                  validationRules={{
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters",
                    },
                    required: "First name is required",
                  }}
                  required
                  defaultValue={formData.personalDetails.firstname}
                />
                {errors.firstname && errorMsg(errors.firstname)}
              </div>
              <div className={style.inputContainerOuter}>
                <Input
                  name="lastname"
                  placeholder="Last Name"
                  type="text"
                  label="Last Name"
                  width="100%"
                  className={errors.lastname ? style.errorBorder : ""}
                  register={register}
                  required
                  validationRules={{
                    minLength: {
                      value: 3,
                      message: "Last name must be at least 3 characters",
                    },
                    required: "Last name is required",
                  }}
                  defaultValue={formData.personalDetails.lastname}
                />
                {errors.lastname && errorMsg(errors.lastname)}
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <div className={style.inputContainerOuter}>
                <Input
                  name="dob"
                  placeholder="YYYY/MM/DD"
                  className={errors.dob ? style.errorBorder : ""}
                  type="date"
                  label="Date of Birth"
                  width="100%"
                  register={register}
                  required
                  validationRules={{
                    // pattern: {
                    //   value: /^\d{4}-\d{2}-\d{2}$/,
                    //   message: "Date of birth must be a valid date (YYYY-MM-DD)",
                    // },
                    required: "Date of birth is required",
                    validate: validateDOB,
                  }}
                  defaultValue={formData.personalDetails.dob}
                  pattern="\d{4}/\d{2}/\d{2}"
                />
                {errors.dob && errorMsg(errors.dob)}
              </div>
              
              <SelectField
                name="gender"
                control={control}
                width="100%"
                optionsList={genderOptions}
                placeholder="Select Gender"
                label="Gender"
                value={formData.personalDetails.gender || undefined}
                rules={{ required: "Gender is required" }}
                defaultValue={formData.personalDetails.gender || undefined}
              />
              
            </div>
            <div className="flex gap-2 w-full">
              <SelectField
                control={control}
                width="100%"
                optionsList={countries}
                placeholder="Select Country "
                label="Country of residence"
                showSearch={true}
                rules={{ required: "Country is required" }}
                value={formData.personalDetails.country || undefined}
                defaultValue={formData.personalDetails.country || undefined}
                name="country"
              />
              <div className={style.inputContainerOuter1}>
                <Input
                  name="phonenumber"
                  placeholder="Phone Number"
                  className={errors.phonenumber ? style.errorBorder : ""}
                  type="tel"
                  label="Phone Number"
                  width="100%"
                  register={register}
                  validationRules={{
                    pattern: {
                      value: /^[1-9][0-9]{9}$/,
                      message:
                        "Phone number must be a 10-digit number and should not start with 0",
                    },
                    required: "Phone number is required",
                  }}
                  required
                  defaultValue={formData.personalDetails.phonenumber}
                  control={control}
                  countries={countrieCode}
                  countryCodeValue={formData.personalDetails.countryCode}
                />
                {errors.phonenumber && errorMsg(errors.phonenumber)}
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Button btnText="Save" />
            </div>
          </form>
        </div>
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

export default PersonalDetails;
