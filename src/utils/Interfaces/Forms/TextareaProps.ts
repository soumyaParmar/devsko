/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseFormRegister } from "react-hook-form";

export interface TextareaProps {
  name: string;
  label: string;
  width: string;
  register: UseFormRegister<any>;
}
