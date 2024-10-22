/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Select, ConfigProvider } from "antd";
import { Controller } from "react-hook-form";

import "antd/es/style/reset.css";
import style from "@/styles/onboardingforms.module.css";

type optionList = { value: string; label: number | string }[];

interface SelectProps {
  width: string;
  // optionsList: optionList & { label: string; title: string; options: optionList }[];
  optionsList: optionList;
  placeholder: string;
  label?: string;
  showSearch?: boolean;
  mode?: "multiple" | "tags" | undefined;
  value: string;
  name: string;
  control: any;
  rules: any;
  allowClear?: boolean;
  className?: string;
  defaultValue?: string | number;
  onSelect?: (value: number | string) => void;
}

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
  defaultValue,
  onSelect,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => {
            if (value === undefined || value === null) {
              return rules;
            }
            return true;
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <div className={`${style.inputContainer} ${className}`} style={{ width: width }}>
            {label ? <label>
              {label} {rules && <span className="text-red-500">*</span>}
            </label> : ""}
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorPrimaryActive: "#000000",
                    colorPrimary: "#000000",
                    colorPrimaryHover: "#000000",
                    lineWidth: 2,
                    colorBorder: "#ededed",
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
                onSelect={onSelect}
                dropdownStyle={{
                  minWidth:'150px'
                }}
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
