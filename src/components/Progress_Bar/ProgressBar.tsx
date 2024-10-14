import React from "react";

interface ProgressBarProps {
  outerWidth: string;
  innerWidth: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  outerWidth,
  innerWidth,
}) => {
  return (
    <>
      <div
        className={` h-3 border rounded-[1rem] overflow-hidden`}
        style={{width: outerWidth}}
      >
        <div
          className={`h-full w-[${innerWidth}%] bg-blue-800 rounded-[1rem]`}
          style={{width: innerWidth}}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
