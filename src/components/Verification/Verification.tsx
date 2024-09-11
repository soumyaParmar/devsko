"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Verification.module.css";
import FaceDetections from "@/common/FaceDetection/FaceDetection";
// import { isChrome } from "@/utils/browsers/Chrome";
// import { isEdge } from "@/utils/browsers/Edge";
// import { isSafari } from "@/utils/browsers/Safari";
import { useRouter } from "next/navigation";
import { ScreenType } from "@/utils/Interfaces/Verification/verification";


const Verification = () => {
  const [isExtendedScreen, setIsExtendedScreen] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [browserCheck,setBrowserCheck] = useState<boolean>(false);
  const [allPermission, setAllPermission] = useState<boolean>(false);
  const [faces, setFaces] = useState<number>(0);
  const webcam = useRef<HTMLVideoElement>(null);
  const navigate = useRouter();

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg|OPR/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if ((window.screen as ScreenType).isExtended) {
      setIsExtendedScreen(true);
    }
    getCameraPermission();
    if (!isExtendedScreen && cameraPermission && fullScreen && faces == 1 && browserCheck) {
      setAllPermission(true);
    }
    if(isChrome || isEdge || isSafari){
      setBrowserCheck(true);
    }
  }, [isExtendedScreen, cameraPermission, fullScreen, faces]);

  const getCameraPermission = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoStream.active) {
        setCameraPermission(true);
        if (webcam.current) {
          webcam.current.srcObject = videoStream;
        }
      } else {
        setCameraPermission(false);
      }
    } catch (error) {
      setCameraPermission(false);
    }
  };

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen();
    setFullScreen(true);
  };

  const handleExitFullscreen = () => {
    document.exitFullscreen();
    setFullScreen(false);
  };

  const handleStartTest = () =>{
    navigate.push('/interview')
  }

  return (
    <div className={style.outer}>
      <div className={style.inner}>
        <h1 className="text-2xl font-semibold">
          Required permission to start your test.
        </h1>
        <div className="flex justify-between">
          <div>
            {!fullScreen ? (
              <button className={style.button1} onClick={handleFullscreen}>
                Click here to allow full screen
                <span className="pl-8 font-bold text-red-600">x</span>
              </button>
            ) : (
              <button className={style.button2} onClick={handleExitFullscreen}>
                Exit full screen{" "}
                <span className="pl-8 font-bold text-green-600">&#10003;</span>
              </button>
            )}
            {isExtendedScreen ? (
              <p className={style.button1}>
                Second screen found. Please remove other screen.{" "}
                <span className="pl-8 font-bold text-red-600">x</span>
              </p>
            ) : (
              <p className={style.button2}>
                No second screen detected{" "}
                <span className="pl-8 font-bold text-green-600">&#10003;</span>
              </p>
            )}
            {cameraPermission ? (
              <p className={style.button2}>
                Camera and microphone access granted.
                <span className="pl-8 font-bold text-green-600">&#10003;</span>
              </p>
            ) : (
              <p className={style.button1}>
                Camera and microphone access not granted.
                <span className="pl-8 font-bold text-red-600">x</span>
              </p>
            )}
            {
              browserCheck ? (
                <p className={style.button2}>
                Browser detected{" "}
                <span className="pl-8 font-bold text-green-600">&#10003;</span>{" "}
              </p>
              ):(
                <p className={style.button1}>
                  Unsupprted browser detected {" "}
                  <span className="pl-8 font-bold text-red-600">x</span>
                </p>
              )
            }
            {
              !faces && (
                <p className={style.button1}>
                No face detected{" "}
                <span className="pl-8 font-bold text-red-600">x</span>
              </p>
              )
            }
            {faces == 1 && (
              <p className={style.button2}>
                Face detected{" "}
                <span className="pl-8 font-bold text-green-600">&#10003;</span>{" "}
              </p>
            )}
            {faces > 1 && (
              <p className={style.button1}>
                Multiple faces detected. Please go solo{" "}
                <span className="pl-8 font-bold text-red-600">x</span>
              </p>
            )}
          </div>
          <div>
            {cameraPermission && <FaceDetections setFaces={setFaces} />}
          </div>
        </div>
        <div>
          {allPermission ? (
            <button className={style.btn1} onClick={handleStartTest}>Start Test</button>
          ) : (
            <button className={style.btn2}>
              All permissions required to start test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
