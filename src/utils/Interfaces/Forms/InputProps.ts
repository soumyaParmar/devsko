/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

export interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  width: string;
  required?: boolean;
  register?: UseFormRegister<any>;
  validationRules?: any;
  className?: any;
  defaultValue?: string | number;
}
