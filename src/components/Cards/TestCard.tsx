/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import style from "@/styles/TestCard.module.css";
import { TestCardProps } from "@/utils/Interfaces/Dashboard/CardProps";

const TestCard: React.FC<TestCardProps> = (props) => {
  const {
    testType,
    testName,
    testDesc,
    bgColor,
    btnText,
    testPrice,
    isDisabled,
    handleClick,
  } = props;

  return (
    <>
      <div className={style.cardContainer}>
        <div className={`${style.top}`} style={{ backgroundColor: bgColor }}>
          <span className={style.test_type}>{testType}</span>
          <div className={style.test_name}>{testName}</div>
          <div className={style.test_desc}>{testDesc}</div>
        </div>
        <div className={style.bottom}>
          <div className={style.test_price}>
            <div className="font-[400] text-[#101010] text-[0.9rem]">
              {testPrice}
            </div>
            <div className="text-xs text-[#5B617A]">Online</div>
          </div>
          <button
            className={style.btn}
            disabled={isDisabled}
            onClick={handleClick}
          >
            {btnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default TestCard;
