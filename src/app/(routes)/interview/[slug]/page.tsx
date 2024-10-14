/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import "regenerator-runtime/runtime";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { questions } from "@/utils/Questions/Questions";
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import ChatBox from "@/components/Chats/ChatBox";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "@/components/Avatar/Avatar";
import { Environment, OrbitControls } from "@react-three/drei";
import WhiteBoard from "@/common/WhiteBoard/WhiteBoard";
import * as THREE from "three";
// import CandidateScreen from "@/components/CandidateScreen/CandidateScreen";
import style from "../../../../styles/interviewscreen.module.css";
import { getCurrentDate } from "@/helpers/getCurrentDate";
import CaptionBox from "@/common/CaptionBox/CaptionBox";
import Popup from "@/components/Modal/Modal";
import logEvent from "@/lib/logEventFunc";
import { postData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { stopWatch } from "@/helpers/stopWatch";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import Whiteboard from "../../../../../public/interview_screen/Whiteboard";
import Code from "../../../../../public/interview_screen/Code";
import Settings from "../../../../../public/interview_screen/Settings";
import Clock from "../../../../../public/interview_screen/Clock";
import Image from "next/image";
import { handleTimeApi } from "@/helpers/timeApi";
import { getCurrentTime } from "@/helpers/getCurrentTime";
import { ScreenType } from "@/utils/Interfaces/Verification/verification";
import Mic from "../../../../../public/interview_screen/Mic";
import Mic2 from "../../../../../public/interview_screen/Mic2";
import dynamic from "next/dynamic";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { CircularProgress } from "@mui/material";

const CandidateScreen = dynamic(
  () => import("@/components/CandidateScreen/CandidateScreen"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export type testStartType = "yes" | "no" | "end" | "start";

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
  const [testStarted, setTestStarted] = useState<testStartType>("no");
  const [openCaption, setOpenCaption] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const { day, month, year } = getCurrentDate();
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [devicePopup, setDevicePopup] = useState(false);
  const [selectedMic, setSelectedMic] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("");
  const [networkErrorPopup, setnetworkErrorPopup] = useState<boolean>(true);
  const [slowNetwork, setslowNetwork] = useState<boolean>(false);
  const [liveChat, setLiveChat] = useState<string>("");
  const [responseTimer, setResponseTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState({ hour: "00", min: "00", sec: "00" });
  const [isExtendedScreen, setIsExtendedScreen] = useState<boolean>(false);
  const [isfullScreen, setIsFullScreen] = useState<boolean>(false);
  const [liveQuestion, setLiveQuestion] = useState<string>("");
  const [openCode, setOpenCode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState({
    hour: "",
    minutes: "",
    suffix: "",
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stopwatchId, setStopWatchId] = useState<NodeJS.Timeout | null>(null);
  const [code, setCode] = useState("// Write your code here");
  const codeRef = useRef<HTMLPreElement>(null);
  const childSize = { width: 180, height: 180 };
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [timerRunning, setTimerRunning] = useState<boolean>(false);
  // const [timerData, setTimerData] = useState({
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  const route = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // let stopwatchId: NodeJS.Timeout | null = null;
  let reconnection: number = 0;
  let disconnected: number = 0;
  let preferredMic: string | null = "";
  let preferredCamera: string | null = "";
  let responsePayLoad = [];

  useEffect(() => {
    if (openWhiteBoard) {
      const a = document.querySelector(".interviewscreen_whiteboard__28_bK");
      setTimeout(() => {
        const b = a?.querySelector("div")?.getElementsByTagName("style")[1];
        if (b) b.innerHTML = "";
      });
    }
  }, [openWhiteBoard]);

  // for setting up the response
  useEffect(() => {
    const fetchResponse = async () => {
      // const utc_time = await handleTimeApi();
      if (done) {
        setAllChat((prev) => [
          ...prev,
          {
            response: doneResponse,
            // timeStamp: utc_time || new Date(),
          },
        ]);
        responsePayLoad = [
          {
            interview_id: 1,
            user_id: 10,
            question_id: questions[response]?.id,
            response: doneResponse,
            response_duration: timer * 1000,
          },
        ];
        // const res = await postData("interview/responses", responsePayLoad);
        // console.log(res?.status);

        setDone(false);
      }
    };
    setLiveChat(doneResponse);
    setLiveQuestion("");

    fetchResponse();
  }, [done, doneResponse]);

  useEffect(() => {
    if (
      "speechSynthesis" in window &&
      usersBlankAnswer &&
      testStarted != "end"
    ) {
      const speech = `I will repeat my question. ${questions[response]} `;
      setLiveChat("");
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
      // const utc_time = await handleTimeApi();

      if ("speechSynthesis" in window && text && testStarted != "end") {
        const utterance = new SpeechSynthesisUtterance(
          questions[response]?.question_text
        );
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
          setSpeechDone(true);
          setResponseTimer(true);
          setText(false);
          setAllChat((prev) => [
            ...prev,
            {
              question: questions[response]?.question_text,
              // timeStamp: utc_time || new Date(),
            },
          ]);
        };
      } else if (!("speechSynthesis" in window)) {
        console.error("Sorry, your browser does not support text-to-speech.");
      }
    };

    fetchResponse();
  }, [text]);

  // useEffect(() => {
  //   let index = 0;
  //   setLiveQuestion('')

  //   const typeNextChar = () => {
  //     if (index < liveQuestion.length) {
  //       setLiveQuestion((prev) => prev + questions[response].question_text[index]);
  //       index++;
  //       setTimeout(typeNextChar, 50); // Call the next character after the timeout
  //     }
  //   };

  //   if (liveQuestion) {
  //     typeNextChar(); // Start typing
  //   }

  //   return () => {
  //     // Cleanup the timeout to avoid memory leaks if the component unmounts or text changes
  //     index = liveQuestion.length;
  //   };
  // }, [liveQuestion]);

  useEffect(() => {
    if (responseTimer) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else {
      setTimer(0);
    }
  }, [responseTimer]);

  useEffect(() => {
    settingPreferredDevice();
  }, [preferredMic, preferredCamera]);

  useEffect(() => {
    const fetchTime = async () => {
      const time = await getCurrentTime();
      setCurrentTime(time);
    };

    preferredMic = localStorage.getItem("preferredMic");
    preferredCamera = localStorage.getItem("preferredCamera");

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const availableMics = devices.filter(
        (device) => device.kind === "audioinput"
      );

      const availableCamera = devices.filter(
        (device) => device.kind === "videoinput"
      );
      // console.log(availableMics);

      setAudioDevices(availableMics);
      setVideoDevices(availableCamera);
    });

    navigator.mediaDevices.ondevicechange = () => {
      console.log("Device changed");
      checkDevice();
    };

    const checkInitialFullscreen = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    // funcution to check whether it is full screen or not
    checkInitialFullscreen();

    // fetching current time
    fetchTime();

    // function for setting preferred devices
    settingPreferredDevice();

    // Set the initial online status
    handleOnlineStatus();

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    document.addEventListener("fullscreenchange", checkInitialFullscreen);

    // Setting up the interval to check the connection stability in every 10 seconds
    const internetCheckup = setInterval(checkInternetSpeed, 10000);
    // Fetching time after 60 sec
    const timeInterval = setInterval(fetchTime, 60000);

    return () => {
      clearInterval(internetCheckup);
      clearInterval(timeInterval);
      document.removeEventListener("fullscreenchange", checkInitialFullscreen);
    };
  }, []);

  useEffect(() => {
    if ((window.screen as ScreenType).isExtended) {
      setIsExtendedScreen(true);
    }
  }, [isExtendedScreen]);

  // hooks for pausing the timer when popups open
  // useEffect(() => {
  //   if (slowNetwork || devicePopup || !networkErrorPopup) setModalOpen(true);
  //   else setModalOpen(false);
  // }, [slowNetwork, devicePopup, networkErrorPopup]);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     pauseTimer();
  //   } else if (!isModalOpen && !timerRunning && testStarted == "yes") {
  //     startTimer();
  //   }
  // }, [isModalOpen]);

  // useEffect(() => {
  //   const hours = Number(time.hour);
  //   const minutes = Number(time.min);
  //   const seconds = Number(time.sec);
  //   setTimerData({ hours, minutes, seconds });
  // }, [time]);

  const settingPreferredDevice = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: { deviceId: preferredMic ? { exact: preferredMic } : undefined },
        video: {
          deviceId: preferredCamera ? { exact: preferredCamera } : undefined,
        },
      })
      .then((stream) => {
        const audioTracks = stream.getAudioTracks();
        const videoElement = document.querySelector("video");
        if (videoElement) videoElement.srcObject = stream;
        // console.log("Using microphone:", audioTracks[0].label);
      })
      .catch((error) => {
        console.error("Error accessing microphone/camera:", error);
      });
  };

  const checkDevice = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const availableMics = devices.filter(
        (device) => device.kind === "audioinput"
      );

      const availableCamera = devices.filter(
        (device) => device.kind === "videoinput"
      );
      // console.log(availableMics);

      setAudioDevices(availableMics);
      setVideoDevices(availableCamera);

      // Checkinf if the previously selected mic is still available
      const micStillAvailable = availableMics.some(
        (device) => device.deviceId === preferredMic
      );

      // Checking if the previously selected camera is still available
      const cameraStillAvailable = availableCamera.some(
        (device) => device.deviceId === preferredCamera
      );
      if (!micStillAvailable || !cameraStillAvailable) {
        // console.log(
        //   "Your selected microphone is disconnected or changed. Please select a new microphone."
        // );
        setDevicePopup(true);
      }
    });
  };

  // Function to check internet speed
  const checkInternetSpeed = () => {
    if (navigator.connection) {
      const connection = navigator.connection;
      const slowDownlinkThreshold = 0.3;
      const slowConnectionTypes: string[] = ["slow-2g", "2g", "3g"];
      const overAllNetworkQuality: string = `Speed: ${connection.downlink}MBPs Type: ${connection.effectiveType}`;
      const isSlowDownlink = connection.downlink < slowDownlinkThreshold;

      const isSlowEffectiveType = slowConnectionTypes.includes(
        connection.effectiveType
      );

      // logging network spead and type
      logEvent("Network speed anf type", overAllNetworkQuality, new Date());

      if (isSlowDownlink || isSlowEffectiveType) {
        setslowNetwork(true);
      } else {
        setslowNetwork(false);
      }
    } else {
      console.error("Network API is not supported in this browser.");
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
      setResponseTimer(false);
    } else {
      setTestStarted("end");
      alert("Thank you for your time. We will get back to you soon.");
    }
  };

  const handleWhiteBoard = () => {
    setOpenWhiteBoard(!openWhiteBoard);
    setOpenCode(false);
  };

  const startTimer = () => {
    // setTimerRunning(true);
    setStopWatchId(
      // stopWatch(setTime, timerData.hours, timerData.minutes, timerData.seconds)
      stopWatch(setTime)
    );
  };

  const handleTestStart = () => {
    setTestStarted("yes");
    startTimer();
  };

  const handleTestEnd = () => {
    setTestStarted("end");
    // setTimerRunning(false);
    if (stopwatchId) clearInterval(stopwatchId);
    route.push('/endofinterview/1');
  };

  // const pauseTimer = () => {
  //   if (stopwatchId) clearInterval(stopwatchId);
  //   setTimerRunning(false);
  // };

  const OpenCaptionBox = () => {
    setOpenCaption(!openCaption);
  };

  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleNetworkError = () => {
    setnetworkErrorPopup(!networkErrorPopup);
  };

  const handleDeviceError = () => {
    setDevicePopup(!devicePopup);
  };

  const handleSlowNetworkError = () => {
    setslowNetwork(!slowNetwork);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  const handleSecondScreenDetected = () => {
    setIsExtendedScreen(!isExtendedScreen);
  };

  const handleCode = () => {
    setOpenCode(!openCode);
    setOpenWhiteBoard(false);
  };

  if (unsupported) {
    return (
      <span style={{ fontSize: "20px" }}>
        Browser doesn't support speech recognition. Please use Chrome or Edge.
      </span>
    );
  }

  const snapToCorner = (x: number, y: number) => {
    const parent = parentRef.current;
    if (!parent) return { x, y };
    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;

    const corners = {
      topLeft: { x: 0, y: 0 },
      topRight: { x: parentWidth - 180, y: 0 },
      bottomLeft: { x: 0, y: parentHeight - 180 },
      bottomRight: { x: parentWidth - 180, y: parentHeight - 180 },
    };

    const distance = (cornerX: number, cornerY: number) =>
      Math.sqrt((cornerX - x) ** 2 + (cornerY - y) ** 2);

    const closestCorner = Object.values(corners).reduce((prev, curr) => {
      return distance(curr.x, curr.y) < distance(prev.x, prev.y) ? curr : prev;
    });

    setPosition({ x: closestCorner.x, y: closestCorner.y });
  };

  const handleExit = () => {
    route.push("/dashboard/1");
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <section
      className={`${style.section}`}
      ref={containerRef}
    >
      {testStarted == "end" ? (
        <>
          <div className="h-screen w-screen flex flex-col justify-center items-center">
            <p>Thank You, We will get back to you soon.</p>
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          {!isfullScreen && <div>
            {/* {!networkErrorPopup && (
              <Popup
                isVisible={!networkErrorPopup}
                message="Your device is offline. Please check your internet settings."
                onClose={handleNetworkError}
                isWarning={false}
                type="Error"
              />
            )}
            {devicePopup && (
              <Popup
                isVisible={devicePopup}
                message="Selected devices are disconnected; please reselect from settings"
                onClose={handleDeviceError}
                isWarning={true}
                type="Warning"
              />
            )}
            {slowNetwork && (
              <Popup
                isVisible={slowNetwork}
                message="Slow network detected. Check connection for smooth interview."
                onClose={handleSlowNetworkError}
                isWarning={true}
                type="Warning"
              />
            )}

            {!isfullScreen && (
              <Popup
                isVisible={!isfullScreen}
                message="To continue this interview full screen is required"
                onClose={handleFullscreen}
                isWarning={true}
                type="Warning"
              />
            )} */}
            {/* {isExtendedScreen && (
              <Popup
                isVisible={isExtendedScreen}
                message="Second Screen is detected"
                onClose={handleSecondScreenDetected}
                isWarning={true}
                type="Warning"
              />
            )} */}
            {!isfullScreen && (
              <Popup
                isVisible={!isfullScreen}
                message="To continue this interview full screen is required"
                onClose={handleFullscreen}
                isWarning={true}
                type="Warning"
              />
            )}
          </div>}

          <div className={style.top}>
            <div className={style.logo}>DevSko</div>
            <div className={style.top_middle}>
              <span className={style.interview}>
                Interview for {"Software Developer"}
              </span>
              <div className="flex gap-3 justify-center">
                <span className={style.day}>{`${day} ${month} ${year}`}</span>
                <span
                  className={style.day}
                >{`${currentTime.hour}:${currentTime.minutes} ${currentTime.suffix}`}</span>
              </div>
            </div>
            <div className={style.right_btns}>
              <span>{`${time.hour}:${time.min}:${time.sec}`}</span>
              <button
                className={
                  testStarted == "yes" ? style.end_btn : style.start_btn
                }
                onClick={testStarted == "yes" ? handleTestEnd : handleTestStart}
              >
                {testStarted == "yes" ? "Terminate" : "Start"}
              </button>
            </div>
          </div>

          <div className={`${style.mid} border-black`}>
            {openWhiteBoard && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className={style.whiteboard}
              >
                {/* <WhiteBoard /> */}
                <Tldraw />
              </motion.div>
            )}
            {openCode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className={style.editor_container}>
                <select className={style.select_lang} value={"language"}>
                  <option>Javascript</option>
                  <option>Java</option>
                  <option>C#</option>
                  <option>C++</option>
                  <option>Go</option>
                </select>
                <CodeMirror
                  value={code}
                  height="71vh"
                  theme={dracula} // Using the Dracula theme
                  extensions={[javascript()]} // Setting language to JavaScript
                  onChange={(value) => handleCodeChange(value)}
                />
              </motion.div>
            )}
            {openCaption && (
              <div className="absolute z-20 h-[300px] w-[500px] left-1/2 bottom-[70px]">
                <CaptionBox caption={doneResponse} />
              </div>
            )}
            <div
              className={style.mid2}
              data-isSide={openCode || openWhiteBoard || openCaption}
            >
              <motion.div
                layout
                className={
                  openCode || openWhiteBoard || openCaption
                    ? style.candidate2
                    : style.candidate
                }
                ref={parentRef}
              >
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
                  responseTimer={responseTimer}
                />
                <span className="absolute bottom-4 left-5 bg-white pl-2 pr-2 rounded-full">
                  {"Candidate name"}
                </span>
                {(openCode || openWhiteBoard || openCaption) == false ? (
                  <motion.div
                    // drag
                    // dragConstraints={parentRef}
                    className={`${style.avatar} ${!responseTimer && testStarted == "yes"
                        ? style.blue_border
                        : ""
                      }`}
                  // dragMomentum={true}
                  // style={{
                  //   x: position.x,
                  //   y: position.y,
                  // }}
                  // onDragEnd={(event, info) => {
                  //   const { x, y } = info.point;
                  //   snapToCorner(x, y);
                  // }}
                  >
                    <span className="absolute top-3 left-[0.1rem] z-10 pl-2 pr-2 ">
                      {!responseTimer && testStarted == "yes" ? (
                        <Mic2 />
                      ) : (
                        <Mic />
                      )}
                    </span>
                    <Canvas
                      camera={{ position: [0, 2, 10], fov: 50 }}
                      style={{
                        height: "180px",
                        backgroundColor: "whitesmoke",
                        width: "180px",
                        borderRadius: "6px",
                      }}
                    >
                      <OrbitControls enableRotate={false} />
                      <Avatar
                        position={[0, -1.5, 9] as THREE.Vector3Tuple}
                        scale={2}
                        text={text ? questions[response]?.question_text : ""}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                    <span className="absolute bottom-3 left-[3rem] z-10 bg-white pl-2 pr-2 rounded-full ">
                      {"AI Avatar"}
                    </span>
                  </motion.div>
                ) : null}
              </motion.div>
              <motion.div
                layout
                className={
                  openCode || openWhiteBoard || openCaption
                    ? "h-3/5 w-full"
                    : "w-1/3"
                }
              >
                <ChatBox
                  chats={allChat}
                  liveChat={liveChat}
                  liveQuestion={liveQuestion}
                />
              </motion.div>
            </div>
          </div>
          <div className={style.lower}>
            <div>{testStarted == "yes" ? "Recording" : ""}</div>
            <div className="flex gap-4">
              <span onClick={handleWhiteBoard}>
                <Whiteboard />
              </span>
              <span onClick={handleCode}>
                <Code />
              </span>
              <span onClick={OpenCaptionBox}>
                <Image
                  src="/interview_screen/subtitles.png"
                  height={25}
                  width={25}
                  alt="caption"
                />
              </span>
            </div>

            <span onClick={handleOpenSetting}>
              <Settings />
            </span>
          </div>
          {openSetting && (
            <div className="absolute z-20 h-[300px] w-[500px] border right-0 bottom-[70px] bg-slate-50">
              <p>Please select mic and camera from here:</p>
              {/* for Microphone selection */}
              <div>
                <label>Select Microphone:</label> <br />
                <select
                  value={selectedMic || ""}
                  onChange={(e) => {
                    setSelectedMic(e.target.value);
                    localStorage.setItem("preferredMic", e.target.value);
                  }}
                  className={`mb-3`}
                >
                  {audioDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Select Camera:</label> <br />
                <select
                  value={selectedCamera || ""}
                  onChange={(e) => {
                    setSelectedCamera(e.target.value);
                    localStorage.setItem("preferredCamera", e.target.value);
                  }}
                  className={`mb-3`}
                >
                  {videoDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Interview;
