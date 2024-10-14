/* eslint-disable @typescript-eslint/no-explicit-any */

type optionList = { value: string; label: string }[];

export interface SelectProps {
  width: string;
  // optionsList: optionList & { label: string; title: string; options: optionList }[];
  optionsList: optionList;
  placeholder: string;
  label: string;
  showSearch?: boolean;
  mode?: "multiple" | "tags" | undefined;
  value: string;
  name: string;
  control: any;
  rules: any;
  allowClear?: boolean;
  className?: string;
  defaultValue?: string | number;
}
