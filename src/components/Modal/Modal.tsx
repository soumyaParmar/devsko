/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { PopUpProps } from "@/utils/Interfaces/Modal/popup";
import { useRouter } from "next/navigation";
import logEvent from "@/lib/logEventFunc";
import styles from "@/styles/modal.module.css";

const Popup: React.FC<PopUpProps> = ({
  isVisible,
  message,
  onClose,
  isWarning,
  type,
}) => {
  const [counter, setCounter] = useState<number>(isWarning ? 5 : 60);
  const navigate = useRouter();

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      if (counter === 0) {
        clearInterval(timer);
        onClose();
        if (!isWarning) {
          handleEndTest();
        }
      }

      return () => clearInterval(timer);
    }
  }, [counter, onClose, isWarning, isVisible]);

  useEffect(() => {
    if (isVisible) {
      setCounter(isWarning ? 5 : 60);
    }
  }, [isVisible, isWarning]);

  const handleEndTest = () => {
    logEvent(
      "Session",
      "terminate after 60 seconds due internet issue",
      new Date()
    );
    navigate.push("/endofinterview");
  };

  const titleClass = isWarning ? "modalTitleWarning" : "modalTitleError";

  return (
    <>
      <div className="modalBlurBackdrop"></div>
      <Modal
      centered
        title={type.toUpperCase() + "!!!"}
        open={isVisible}
        footer={null}
        onCancel={isWarning ? onClose : undefined}
        className={` ${titleClass} z-400  modalTitle text-center text-[20px]`}
      >
        <p className="text-[1.2rem] leading-6 mb-6 text-center">{message}</p>
        {!isWarning && (
          <p className="text-[1.1rem] border w-[60px] h-[50px] p-3 text-center mx-auto rounded-full text-red-700 ">
            {counter}
          </p>
        )}
      </Modal>
    </>
  );
};

export default Popup;
