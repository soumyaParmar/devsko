/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import style from "@/styles/onboardingforms.module.css";

const Rating = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (e) => {
    const ratingValue = parseInt(e.target.value);
    setSelectedRating(ratingValue);
    onRatingChange(ratingValue);
  };

  return (
    <>
      <div className={style.rating}>
        <input
          value={4}
          name="rating"
          id="expert"
          type="radio"
          onChange={handleRatingChange}
        />
        <label htmlFor="expert"></label>
        <input
          value={3}
          name="rating"
          id="advanced"
          type="radio"
          onChange={handleRatingChange}
        />
        <label htmlFor="advanced"></label>

        <input
          value={2}
          name="rating"
          id="intermediate"
          type="radio"
          onChange={handleRatingChange}
        />
        <label htmlFor="intermediate"></label>
        <input
          value={1}
          name="rating"
          id="beginner"
          type="radio"
          onChange={handleRatingChange}
        />
        <label htmlFor="beginner"></label>
      </div>
    </>
  );
};

export default Rating;
