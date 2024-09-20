"use client";

import React from "react";
import { useRouter } from "next/navigation";

const EndOfInterviewPage: React.FC = () => {
  const navigate = useRouter();
  const handleBacktoHome = () => {
    navigate.push("/");
  };
  return (
    <>
      <div className="w-full h-full border m-auto flex justify-center items-center flex-col">
        <h1 className="text-2xl mb-8">Your interview is terminated because of  internet connection</h1>
        <button onClick={handleBacktoHome} className="border py-4 px-2 rounded-md cursor bg-black text-white">Back to home</button>
      </div>
    </>
  );
};

export default EndOfInterviewPage;
