/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { PopUpProps } from "@/utils/Interfaces/Modal/popup";
import logEvent from "@/lib/logEventFunc";
import './modal.css'

const Popup: React.FC<PopUpProps> = ({ open, message, onClose, type }) => {
  const [counter, setCounter] = useState<number>(10);

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setCounter(10)
        setCounter((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            onClose();
            handleEndTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }
  }, [open]);

  const handleEndTest = () => {
    logEvent(
      "Session",
      "terminate after 60 seconds due internet issue",
      new Date()
    );
    window.location.href = "/endofinterview/1";
  };

  return (
    <>
      {open && (
        <>
          <div className="modalBlurBackdrop"></div>
          <Modal
            centered
            title={"Warning !!!"}
            open={open}
            footer={null}
            onCancel={onClose}
            className={`modalTitle modalTitleWarning z-400 text-center text-[20px]`}
          >
            <p className="text-[1.2rem] leading-6 mb-6 text-center">
              {message}
            </p>
            <div className="btns">
              <button onClick={onClose}>
                Continue
              </button>
              <button  onClick={handleEndTest}>
                Terminate
              </button>
            </div>
            <p className="text-[1.1rem] p-3 text-center mx-auto text-red-700 ">
              Interview will be terminated in {counter >=0 ? counter : 0} seconds
            </p>
          </Modal>
        </>
      )}
    </>
  );
};

export default Popup;
