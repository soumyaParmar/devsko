/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { questions } from "@/utils/Questions/Questions";
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import ChatBox from "@/components/Chats/ChatBox";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "@/components/Avatar/Avatar";
import { Environment, OrbitControls } from "@react-three/drei";
import WhiteBoard from "@/common/WhiteBoard/WhiteBoard";
import * as THREE from "three";
import CandidateScreen from "@/components/CandidateScreen/CandidateScreen";
import style from "../../../styles/interviewscreen.module.css";
import { getCurrentDate } from "@/helpers/getCurrentDate";
import CaptionBox from "@/common/CaptionBox/CaptionBox";
import ErrorPopUp from "@/components/Modal/ErrorPopUp";
import logEvent from "@/lib/logEventFunc";

// const VideoRecorder = dynamic(
//   () => import("@/components/VideoRecoeder/VideoRecorder"),
//   { ssr: false }
// );

export type testStartType = 'yes' | 'no' | 'end' | 'start';

const Interview = () => {
  const [response, setResponse] = useState<number>(0);
  const [doneResponse, setDoneResponse] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [allChat, setAllChat] = useState<ChatType[]>([]);
  const [text, setText] = useState<boolean>(false);
  const [speechDone, setSpeechDone] = useState<boolean>(false);
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [openWhiteBoard, setOpenWhiteBoard] = useState<boolean>(false);
  const [usersBlankAnswer, setUsersBlankAnswer] = useState<boolean>(false);
  const [testStarted, setTestStarted] = useState<testStartType>();
  const [openCaption,setOpenCaption] = useState<boolean>(false)
  const {day,month,year} = getCurrentDate();
  const [networkErrorPopup, setnetworkErrorPopup] = useState(true);
  const [mediaDevicesError, setmediaDevicesError] = useState(false);
  let reconnection: number = 0;
  let disconnected: number = 0;

  // for setting up the resoonse
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await fetch(
          "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
        );

        const data = await response.json();

        if (done) {
          setAllChat((prev) => [
            ...prev,
            {
              response: doneResponse,
              timeStamp: data.utc_datetime || new Date(),
            },
          ]);
          setDone(false);
        }
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };

    fetchResponse();
  }, [done]);

  useEffect(() => {
    if ("speechSynthesis" in window && usersBlankAnswer) {
      const speech = `I will repeat my question. ${questions[response]} `;
      const utterance = new SpeechSynthesisUtterance(speech);
      speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setSpeechDone(true);
        setText(false);
        setUsersBlankAnswer(false);
      };
    }
  }, [usersBlankAnswer]);

  // for text-to-speech and setting up the time stamp
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetch(
          "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
        );
        const data = await res.json();
        if ("speechSynthesis" in window && text) {
          const utterance = new SpeechSynthesisUtterance(questions[response]);
          speechSynthesis.speak(utterance);
          utterance.onend = () => {
            setSpeechDone(true);
            setText(false);
            setAllChat((prev) => [
              ...prev,
              {
                question: questions[response],
                timeStamp: data.utc_datetime || new Date(),
              },
            ]);
          };
          // console.log(allChat);
        } else if (!("speechSynthesis" in window)) {
          alert("Sorry, your browser does not support text-to-speech.");
        }
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };

    fetchResponse();
  }, [text]);

  useEffect(() => {
    // Set the initial online status
    handleOnlineStatus();

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Set up the interval to check the connection stability in every 10 seconds
    const internetCheckup = setInterval(checkInternetSpeed, 10000);
    const deviceCheckup = setInterval(checkDevice, 10000);

    return () => {
      clearInterval(internetCheckup);
      clearInterval(deviceCheckup);
    };
  }, []);

  const checkDevice = () => {
    const selectedMic = localStorage.getItem("preferredMic");
    const selectedCamera = localStorage.getItem("preferredCamera");
    console.log(selectedCamera);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];

        if (
          videoTrack.getSettings().deviceId !== selectedCamera ||
          audioTrack.getSettings().deviceId !== selectedMic
        ) {
          setmediaDevicesError(true);
        } else setmediaDevicesError(false);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  };

  // Function to check internet speed
  const checkInternetSpeed = () => {
    if (navigator.connection) {
      const connection = navigator.connection;
      const slowDownlinkThreshold = 1;
      const slowConnectionTypes: string[] = ["slow-2g", "2g", "3g"];
      const overAllNetworkQuality: string = `Speed: ${connection.downlink}MBPs Type: ${connection.effectiveType}`;

      const isSlowDownlink = connection.downlink < slowDownlinkThreshold;

      const isSlowEffectiveType = slowConnectionTypes.includes(
        connection.effectiveType
      );

      // logging network spead and type
      logEvent("Network speed anf type", overAllNetworkQuality, new Date());

      if ((isSlowDownlink || isSlowEffectiveType) && networkErrorPopup) {
        alert("Your internet connection is very slow");
      }
    } else {
      console.error(
        "Network Information API is not supported by this browser."
      );
    }
  };

  const handleOnlineStatus = () => {
    if (navigator.onLine) {
      reconnection++;
      if (reconnection === 1)
        logEvent("Network", "intially connected", new Date());
      else
        logEvent(
          "Network",
          `Reconnected after ${reconnection} attempt(s)`,
          new Date()
        );
    } else {
      disconnected++;
      logEvent("Network", `disconnected ${disconnected} times`, new Date());
    }
    setnetworkErrorPopup(navigator.onLine);
  };

  const nextQuestion = () => {
    if (response < questions.length - 1) {
      setResponse(response + 1);
    } else {
      setTestStarted("end")
      alert("Thank you for your time. We will get back to you soon.");
    }
  };

  const handleWhiteBoard = () => {
    setOpenWhiteBoard(!openWhiteBoard);
  };

  const handleTestStart = () => {
    setTestStarted("yes");
  };

  const handleTestEnd = () => {
    setTestStarted("no");
  };

  const OpenCaptionBox  = () => {
    setOpenCaption(!openCaption)
  }


  if (unsupported) {
    return (
      <span style={{ fontSize: "20px" }}>
        Browser doesn't support speech recognition. Please use Chrome or Edge.
      </span>
    );
  }



  return (
    <section className="h-full">
          {!networkErrorPopup && (
            <ErrorPopUp
              errorPopup={!networkErrorPopup}
              errorMsg="You are currently offline. Please check your internet connection."
            />
          )}

          {mediaDevicesError && (
            <ErrorPopUp
              errorPopup={mediaDevicesError}
              errorMsg=" Selected Microphone/Camera is not detected. "
            />
          )}
      <div className={style.top}>
        <div className={style.logo}>DevSko</div>
        <div className={style.top_middle}>
          <span className={style.interview}>
            Interview for {"UI/UX Designer"}
          </span>
          <span className={style.day}>{`${day} ${month} ${year}`}</span>
        </div>
        <div className={style.right_btns}>
          <span>{"00:00:00"}</span>
          <button
          className={testStarted == "yes"? style.end_btn : style.start_btn}
            onClick={testStarted == "yes" ? handleTestEnd : handleTestStart}
          >
            {testStarted == "yes" ? "Terminate" : "Start"}
          </button>
        </div>
      </div>
      <div className={style.mid}>
        <div className={style.candidate}>
          <CandidateScreen
            speechDone={speechDone}
            setSpeechDone={setSpeechDone}
            setDoneResponse={setDoneResponse}
            setDone={setDone}
            nextQuestion={nextQuestion}
            setText={setText}
            setUnsupported={setUnsupported}
            setUsersBlankAnswer={setUsersBlankAnswer}
            testStarted={testStarted}
          />
          <span className="absolute bottom-4 left-5 bg-white pl-2 pr-2 rounded-full">
            {"Candidate name"}
          </span>
          <span className="absolute bottom-6 right-5 z-10 bg-white pl-2 pr-2 rounded-full">
            {"AI Avatar"}
          </span>
          <div className={style.avatar}>
            <Canvas
              camera={{ position: [0, 2, 10], fov: 50 }}
              style={{
                height: "180px",
                backgroundColor: "whitesmoke",
                width: "180px",
                borderRadius: "6px",
              }}
            >
              <OrbitControls />
              <Avatar
                position={[0, -1.5, 9] as THREE.Vector3Tuple}
                scale={2}
                text={text ? questions[response] : ""}
              />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </div>
        <div className="h-full w-1/3">
          <ChatBox chats={allChat} />
        </div>
      </div>
      <div className={style.lower}>
        <div>{testStarted == "yes" ? "Recording" : ""}</div>
        <div className="flex gap-4">
          <span onClick={handleWhiteBoard}>Whiteboard</span>
          <span>Code Editor</span>
          <span onClick={OpenCaptionBox}>Captions</span>
        </div>
        <div>
          <span>Settings</span>
        </div>
      </div>
      {openWhiteBoard && (
        <div className="absolute left-1/3 bottom-[70px]">
          <WhiteBoard />
        </div>
      )}
      {openCaption && (
        <div className="absolute z-20 h-[300px] w-[500px] left-1/2 bottom-[70px]">
          <CaptionBox caption={doneResponse}/>
        </div>
      )}
      <div>{doneResponse}</div>
    </section>
  );
};

export default Interview;
