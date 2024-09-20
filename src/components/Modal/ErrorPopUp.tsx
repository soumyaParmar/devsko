/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { ErrorPopUpProps } from "@/utils/Interfaces/Modal/popup";
import { useRouter } from "next/navigation";
import logEvent from "@/lib/logEventFunc";

const INITIAL_COUNTER = 60;

const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ errorPopup, errorMsg }) => {
  const [counter, setCounter] = useState<number>(INITIAL_COUNTER);
  const navigate = useRouter();

  const handleEndTest = () => {
    logEvent(
      "Session",
      "terminate after 60 seconds due internet issue",
      new Date()
    );
    navigate.push("/endofinterview");
  };

  // for setting up the timer
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleEndTest();
    }
  }, [counter]);

  return (
    <>
      <Modal title="Error has come" centered open={errorPopup} footer={[]}>
        <p>{errorMsg}</p>
        
        <p>{counter}</p>
      </Modal>
    </>
  );
};

export default ErrorPopUp;
