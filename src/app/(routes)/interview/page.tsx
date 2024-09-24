/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { stopWatch } from "@/helpers/stopWatch";

// const VideoRecorder = dynamic(
//   () => import("@/components/VideoRecoeder/VideoRecorder"),
//   { ssr: false }
// );

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
  const [time, setTime] = useState({ hour: "00", min: "00", sec: "00" });
  const route = useRouter();

  let stopwatchId : NodeJS.Timeout | null = null

  let reconnection: number = 0;
  let disconnected: number = 0;
  // const preferredMic = localStorage.getItem("preferredMic");
  // const preferredCamera = localStorage.getItem("preferredCamera");
  let preferredMic: string | null = "";
  let preferredCamera: string| null = "";
  

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
    setLiveChat(doneResponse);

    fetchResponse();
  }, [done, doneResponse]);

  useEffect(() => {
    if ("speechSynthesis" in window && usersBlankAnswer && testStarted != "end") {
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
      try {
        const res = await fetch(
          "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
        );
        const data = await res.json();
        if ("speechSynthesis" in window && text && testStarted != "end") {
          const utterance = new SpeechSynthesisUtterance(questions[response]);
          setLiveChat("");
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
    settingPreferredDevice();
  }, [preferredMic, preferredCamera]);

  useEffect(() => {
    preferredMic = localStorage.getItem("preferredMic");
     preferredCamera = localStorage.getItem("preferredCamera");

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const availableMics = devices.filter(
        (device) => device.kind === "audioinput"
      );

      const availableCamera = devices.filter(
        (device) => device.kind === "videoinput"
      );
      console.log(availableMics);

      setAudioDevices(availableMics);
      setVideoDevices(availableCamera);
    });

    // function for setting preferred devices
    settingPreferredDevice();

    navigator.mediaDevices.ondevicechange = () => {
      console.log("Device changed");
      checkDevice();
    };

    // Set the initial online status
    handleOnlineStatus();

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Set up the interval to check the connection stability in every 10 seconds
    const internetCheckup = setInterval(checkInternetSpeed, 10000);

    return () => {
      clearInterval(internetCheckup);
    };
  }, []);

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
        console.log("Using microphone:", audioTracks[0].label);
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
      console.log(availableMics);

      setAudioDevices(availableMics);
      setVideoDevices(availableCamera);

      // Check if the previously selected mic is still available
      const micStillAvailable = availableMics.some(
        (device) => device.deviceId === preferredMic
      );

      // Check if the previously selected camera is still available
      const cameraStillAvailable = availableCamera.some(
        (device) => device.deviceId === preferredCamera
      );
      if (!micStillAvailable || !cameraStillAvailable) {
        console.log(
          "Your selected microphone is disconnected or changed. Please select a new microphone."
        );
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
        // alert("Your internet connection is very slow");
        setslowNetwork(true);
      } else {
        setslowNetwork(false);
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
      setTestStarted("end");
      alert("Thank you for your time. We will get back to you soon.");
    }
  };

  const handleWhiteBoard = () => {
    setOpenWhiteBoard(!openWhiteBoard);
  };

  const handleTestStart = () => {
    setTestStarted("yes");
    stopwatchId = stopWatch(setTime)

  };

  const handleTestEnd = () => {
    setTestStarted("end");
    if(stopwatchId) clearInterval(stopwatchId)
  };

  const OpenCaptionBox = () => {
    setOpenCaption(!openCaption);
  };

  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };

  if (unsupported) {
    return (
      <span style={{ fontSize: "20px" }}>
        Browser doesn't support speech recognition. Please use Chrome or Edge.
      </span>
    );
  }

  return (
    <section className="h-full">
      {testStarted == "end" ? (
        <>
        <div>
          <p>Thank You,  We will get back to you soon.</p>
          <button onClick={()=>route.push('/dashboard')}>Dashboard</button>
        </div>
        </>
      ):(
      <>
      {!networkErrorPopup && (
        <ErrorPopUp
          errorPopup={!networkErrorPopup}
          errorMsg="You are currently offline. Please check your internet connection."
          setErrorPopup={setnetworkErrorPopup}
        />
      )}
      {devicePopup && (
        <ErrorPopUp
          errorPopup={devicePopup}
          errorMsg="Your selected devices are disconnected or changed. Please select a new one from setting"
          setErrorPopup={setDevicePopup}
        />
      )}

      <div className={style.top}>
        <div className={style.logo}>DevSko</div>
        <div className={style.top_middle}>
          <span className={style.interview}>
            Interview for {"Software Developer"}
          </span>
          <span className={style.day}>{`${day} ${month} ${year}`}</span>
        </div>
        <div className={style.right_btns}>
          <span>{`${time.hour}:${time.min}:${time.sec}`}</span>
          <button
            className={testStarted == "yes" ? style.end_btn : style.start_btn}
            onClick={testStarted == "yes" ? handleTestEnd : handleTestStart}
          >
            {testStarted == "yes" ? "Terminate" : "Start"}
          </button>
        </div>
      </div>
      {slowNetwork && (
        <p className="text-center text-red-600 text-[1rem]">
          Your internet speed is slow
        </p>
      )}
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
              <OrbitControls enableRotate={false} />
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
          <ChatBox chats={allChat} liveChat={liveChat} />
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
          <span onClick={handleOpenSetting}>Settings</span>
        </div>
      </div>
      {openWhiteBoard && (
        <div className="absolute left-1/3 bottom-[70px]">
          <WhiteBoard />
        </div>
      )}
      {openCaption && (
        <div className="absolute z-20 h-[300px] w-[500px] left-1/2 bottom-[70px]">
          <CaptionBox caption={doneResponse} />
        </div>
      )}

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
