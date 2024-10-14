import React from "react";
import style from "@/styles/onboardingforms.module.css";

const Rating = ({ register, name }) => {
  return (
    <>
      <div className={style.rating} {...register(name)}>
        <input value="beginner" name="rating" id="star1" type="radio" />
        <label htmlFor="star1"></label>
        <input value="intermediate" name="rating" id="star2" type="radio" />
        <label htmlFor="star2"></label>
        <input value="advanced" name="rating" id="star3" type="radio" />
        <label htmlFor="star3"></label>
        <input value="expert" name="rating" id="star4" type="radio" />
        <label htmlFor="star4"></label>
        <input value="expert" name="rating" id="star5" type="radio" />
        <label htmlFor="star5"></label>
      </div>
    </>
  );
};

export default Rating;
