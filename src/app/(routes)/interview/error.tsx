"use client";

import Link from "next/link";
import React from "react";

const error = () => {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   }
  
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <p>Oops, looks like an error occured..</p>
      <Link href={"/dashboard/1"}>
        <button className="p-5 border-2 rounded-2xl">DashBoard</button>
      </Link>
    </div>
  );
};

export default error;
