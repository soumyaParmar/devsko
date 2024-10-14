/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Select, ConfigProvider } from "antd";
import { Controller } from "react-hook-form";

import "antd/es/style/reset.css";
import style from "@/styles/onboardingforms.module.css";
import { SelectProps } from "@/utils/Interfaces/Forms/SelectProps";

const SelectField: React.FC<SelectProps> = ({
  width,
  optionsList,
  placeholder,
  label,
  showSearch,
  mode,
  name,
  control,
  rules,
  allowClear,
  className,
  defaultValue
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <div className={style.inputContainer} style={{ width: width }}>
            <label>{label}</label>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorPrimaryActive: "#000000",
                    colorPrimary: "#000000",
                    colorPrimaryHover: "#000000",
                    lineWidth: 2,
                    colorBorder:  "#ededed",
                    borderRadius: 8,
                  },
                },
              }}
            >
              <Select
                showSearch={showSearch}
                allowClear={allowClear}
                mode={mode}
                style={{
                  minHeight: "2.7rem",
                  outline: "none",
                  borderRadius: "8px",
                }}
                maxTagCount="responsive"
                placeholder={placeholder}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={optionsList}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                defaultValue={defaultValue}
              />
            </ConfigProvider>
            {error && <span className={style.errorMsg}>{error.message}</span>}
          </div>
        )}
      />
    </>
  );
};

export default SelectField;
