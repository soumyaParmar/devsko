import React from "react";
import style from "@/styles/VideoChatAnimation/videochat.module.css";

const Icon = () => {
  return (
    <div className={style.outer_layer}>
      <span className="w-1/3 bg-white rounded-2xl"></span>
      <span className="w-1/3 bg-white rounded-2xl"></span>
      <span className="w-1/3 bg-white rounded-2xl"></span>
    </div>
  );
};

export default Icon;
