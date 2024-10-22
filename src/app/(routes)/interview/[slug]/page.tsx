/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import "regenerator-runtime/runtime";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { questions } from "@/utils/Questions/Questions";
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import ChatBox from "@/components/Chats/ChatBox";
import style from "../../../../styles/interviewscreen.module.css";
import Popup from "@/common/Modal/Modal";
import logEvent from "@/lib/logEventFunc";
import { postData } from "@/lib/api";
import { motion } from "framer-motion";
import Whiteboard from "../../../../../public/interview_screen/Whiteboard";
import Code from "../../../../../public/interview_screen/Code";
import Settings from "../../../../../public/interview_screen/Settings";
// import { handleTimeApi } from "@/helpers/timeApi";
import { ScreenType } from "@/utils/Interfaces/Verification/verification";
import dynamic from "next/dynamic";
import "tldraw/tldraw.css";
import { CircularProgress } from "@mui/material";
import InterviewSettings from "@/components/InterviewScreen/InterviewSettings";
import Header from "@/components/InterviewScreen/Header";
import WhiteBoard from "@/components/InterviewScreen/WhiteBoard";
import CodeEditor from "@/components/InterviewScreen/CodeEditor";
import A_Snackbar from "@/common/A_Snackbar/A_Snackbar";
// import useMicrophoneLevel from "@/hooks/useMicrophoneLevel";
import CanvasElement from "@/components/CanvasElement/CanvasElement";
import Icon from "@/common/VideoChatAnimationIcon/Icon";
import useSnackbar from "@/hooks/useSnackbar";
const CandidateScreen = dynamic(
  () => import("@/components/CandidateScreen/CandidateScreen"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export type testStartType = "yes" | "no" | "end" | "start";

type snackbarType = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning";
};

type errorType = {
  open: boolean
  message: string
  type: 'Error' | 'Warning';
  onClose: () => void;
}

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
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [networkErrorPopup, setnetworkErrorPopup] = useState<boolean>(true);
  const [slowNetwork, setslowNetwork] = useState<boolean>(false);
  const [liveChat, setLiveChat] = useState<string>("");
  const [responseTimer, setResponseTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isExtendedScreen, setIsExtendedScreen] = useState<boolean>(false);
  const [liveQuestion, setLiveQuestion] = useState<string>("");
  const [openCode, setOpenCode] = useState<boolean>(false);
  const [code, setCode] = useState("// Write your code here");
  const [errorPopup, setErrorPopup] = useState<errorType>({
    open: false,
    message: "",
    type: 'Error',
    onClose: () => { }
  });
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { showSnackbar } = useSnackbar()
  // const {microphoneLevel} = useMicrophoneLevel();
  // console.log("page rerender");

  // let stopwatchId: NodeJS.Timeout | null = null;
  let reconnection: number = 0;
  let disconnected: number = 0;

  // for setting up the response
  useEffect(() => {
    const fetchResponse = async () => {
      const utc_time = new Date();
      if (done) {
        setAllChat((prev) => [
          ...prev,
          {
            response: doneResponse,
            timeStamp: new Date(),
          },
        ]);
        // const responsePayLoad = [
        //   {
        //     interview_id: 1,
        //     user_id: 10,
        //     question_id: questions[response]?.id,
        //     response: doneResponse,
        //     response_duration: timer * 1000,
        //   },
        // ];
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
      const speech = `I will repeat my question. ${questions[response]?.question_text} `;
      setLiveQuestion(speech);
      setLiveChat("");
      const utterance = new SpeechSynthesisUtterance(speech);
      speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setSpeechDone(true);
        setText(false);
        setUsersBlankAnswer(false);
        setLiveQuestion("");
      };
    }
  }, [usersBlankAnswer]);

  // for text-to-speech and setting up the time stamp
  useEffect(() => {
    const fetchResponse = async () => {
      if ("speechSynthesis" in window && text && testStarted != "end") {
        const utterance = new SpeechSynthesisUtterance(
          questions[response]?.question_text
        );
        setLiveQuestion(questions[response]?.question_text);
        speechSynthesis.speak(utterance);
        const utc_time = new Date();
        utterance.onend = () => {
          setSpeechDone(true);
          setResponseTimer(true);
          setText(false);
          setAllChat((prev) => [
            ...prev,
            {
              question: questions[response]?.question_text,
              timeStamp: utc_time,
            },
          ]);
        };
      } else if (!("speechSynthesis" in window)) {
        console.error("Sorry, your browser does not support text-to-speech.");
      }
    };

    fetchResponse();
  }, [text]);

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
    const checkInitialFullscreen = () => {
      if (!document.fullscreenElement) {
        setErrorPopup({
          open: true,
          message: "To continue this interview full screen is required",
          type: 'Error',
          onClose: handleFullscreen,
        })
      }
    };

    // funcution to check whether it is full screen or not
    checkInitialFullscreen();

    // Set the initial online status
    handleOnlineStatus();

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    document.addEventListener("fullscreenchange", checkInitialFullscreen);

    // Setting up the interval to check the connection stability in every 10 seconds
    const internetCheckup = setInterval(checkInternetSpeed, 10000);

    return () => {
      clearInterval(internetCheckup);
      document.removeEventListener("fullscreenchange", checkInitialFullscreen);
    };
  }, []);

  useEffect(() => {
    if ((window.screen as ScreenType).isExtended) {
      setIsExtendedScreen(true);
      // setErrorPopup({
      //   open:true,
      //   message:"To continue this interview please remove other screen",
      //   type:'Error',
      //   onClose:handleExtendedScreenPopupClose,
      // })
    } else {
      // setErrorPopup({
      //   open:false,
      //   message:'',
      //   type:"Error",
      //   onClose:null
      // })
    }
  }, [isExtendedScreen]);

  //close  the error popup for  extended screen
  const handleExtendedScreenPopupClose = () => {
    setIsExtendedScreen(!isExtendedScreen)
  }

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
        showSnackbar({
          message: "Your internet speed is slow",
          severity: "warning",
        });
      } else {
        setslowNetwork(false);
      }
    } else {
      // console.error("Network API is not supported in this browser.");
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

  const nextQuestion = useCallback(() => {
    if (response < questions.length - 1) {
      setResponse(response + 1);
      setResponseTimer(false);
    } else {
      setTestStarted("end");
      if ("speechSynthesis" in window) {
        setText(true)
        const utterance = new SpeechSynthesisUtterance(
          "Thank you for participating in the test. Your results will be displayed shortly."
        );
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
          setText(false);
        }
      }
      setTimeout(() => {
        window.location.href = '/dashboard/1'
      }, 5000)
    }
  }, [response]);

  const handleWhiteBoard = () => {
    setOpenWhiteBoard(!openWhiteBoard);
    setOpenCode(false);
  };

  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
        // setIsFullScreen(true);
        setErrorPopup({
          open: false,
          message: '',
          type: "Error",
          onClose: null
        })
      }
    }
  };

  const handleOpenCodeEditor = () => {
    setOpenCode(!openCode);
    setOpenWhiteBoard(false);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleCloseSnackbar = () => {
    showSnackbar({
      message: "",
    });
  };

  if (unsupported) {
    return (
      <span style={{ fontSize: "20px" }}>
        Browser doesn't support speech recognition. Please use Chrome or Edge.
      </span>
    );
  }

  if (testStarted == "end") {
    return (
      <section className={`${style.section}`} ref={containerRef}>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <CanvasElement
            text={text}
            context="big"
          />
        </div>
      </section>
    );
  }

  return (
    <section className={`${style.section}`} ref={containerRef}>
      <Popup
        open={errorPopup.open}
        message={errorPopup.message}
        onClose={errorPopup.onClose}
        type={errorPopup.type}
      />
      <Header testStarted={testStarted} setTestStarted={setTestStarted} setText={setText}/>
      <div className={`${style.mid} border-black`}>
        {openWhiteBoard && <WhiteBoard />}
        {openCode && (
          <CodeEditor code={code} handleCodeChange={handleCodeChange} />
        )}
        <div className={style.mid2} data-isside={openCode || openWhiteBoard}>
          <motion.div
            layout
            className={
              openCode || openWhiteBoard ? style.candidate2 : style.candidate
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
            <div
              style={
                (openCode || openWhiteBoard) == false
                  ? { visibility: 'visible' }
                  : { visibility: 'hidden' }
              }
              className={`${style.avatar} ${!responseTimer && testStarted == "yes" ? style.blue_border : ""
                }`}
            >
              <span className="absolute top-3 left-[0.1rem] z-10 pl-2 pr-2 ">
                {!responseTimer && testStarted == "yes" ? <Icon /> : ""}
              </span>
              <CanvasElement
                // questions={questions}
                // response={response}
                text={text}
              />
              <span className="absolute bottom-3 left-[1rem] z-10 bg-white pl-2 pr-2 rounded-full ">
                {"AI Avatar"}
              </span>
            </div>
          </motion.div>
          <motion.div
            layout
            className={openCode || openWhiteBoard ? "h-3/5 w-full" : "w-1/3"}
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
          <span onClick={handleOpenCodeEditor}>
            <Code />
          </span>
        </div>

        <span onClick={handleOpenSetting}>
          <Settings />
        </span>
      </div>
      {openSetting && <InterviewSettings />}
    </section>
  );
};

export default Interview;
