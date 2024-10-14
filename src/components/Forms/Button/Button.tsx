import React from "react";
import style from "../../../styles/onboardingforms.module.css";

const Button = ({btnText}:{btnText: string}) => {
  return (
    <>
      <button className={style.button} type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          ></path>
        </svg>

        <div className={style.text}>{btnText}</div>
      </button>
    </>
  );
};

export default Button;
