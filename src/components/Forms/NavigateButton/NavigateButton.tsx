import React from "react";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface  Props {
    className:string;
    prevStep:()=>void;
    currentStep:number;
    disable:boolean;
    handlenextStep:()=>void;
}


const NavigateButton:React.FC<Props> = ({className,prevStep,currentStep,disable,handlenextStep}) => {
  return (
    <div className={className}>
      <button
        onClick={prevStep}
        style={{
          color: currentStep > 1 ? "#000000" : "#888888",
        }}
        disabled={currentStep === 1 ? true : false}
      >
        <KeyboardArrowUpOutlinedIcon />
      </button>
      <button
        onClick={handlenextStep}
        style={{
          color: disable ? "#888888" : "#000000",
        }}
        disabled={disable ? true : false}
      >
        <KeyboardArrowDownOutlinedIcon />
      </button>
    </div>
  );
};

export default NavigateButton;
