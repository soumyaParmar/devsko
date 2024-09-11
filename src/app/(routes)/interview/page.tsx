/* eslint-disable react/no-unescaped-entities */
"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { questions } from "@/utils/Questions/Questions";
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import ChatBox from "@/components/Chats/ChatBox";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "@/components/Avatar/Avatar";
import { Environment, OrbitControls } from "@react-three/drei";
import WhiteBoard from "@/common/WhiteBoard/WhiteBoard";
import * as THREE from 'three'

const VideoRecorder = dynamic(
  () => import("@/components/VideoRecoeder/VideoRecorder"),
  { ssr: false }
);

const Interview = () => {
  const [response, setResponse] = useState<number>(0);
  const [doneResponse, setDoneResponse] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [allChat, setAllChat] = useState<ChatType[]>([]);
  const [text, setText] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [speechDone, setSpeechDone] = useState<boolean>(false);
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [openWhiteBoard, setOpenWhiteBoard] = useState<boolean>(false);

  useEffect(() => {
    if (done) {
      setAllChat((prev) => [...prev, { response: doneResponse }]);
    }
  }, [done]);

  useEffect(() => {
    if ("speechSynthesis" in window && text) {
      const utterance = new SpeechSynthesisUtterance(questions[response]);
      speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setDisable(false);
        setSpeechDone(true);
        setText(false);
        setNext(false);
        setAllChat((prev) => [...prev, { question: questions[response] }]);
      };
    } else if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  }, [text]);

  const nextQuestion = () => {
    if (response < questions.length - 1) {
      setResponse(response + 1);
      setNext(true);
    } else {
      //   localStorage.setItem('stop',true)
      alert("Thank you for your time. We will get back to you soon.");
    }
  };

  const handleWhiteBoard = () => {
    setOpenWhiteBoard(!openWhiteBoard);
  };

  if (unsupported) {
    return (
      <span style={{ fontSize: "20px" }}>
        Browser doesn't support speech recognition. Please use Chrome or Edge.
      </span>
    );
  }

  //   const handleStartStop = () =>{

  //   }

  return (
    <div className="flex">
      <div>
        <div className="flex pt-[50px] pl-[50px] gap-2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Canvas
              camera={{ position: [0, 2, 10], fov: 50 }}
              style={{
                height: "375px",
                backgroundColor: "whitesmoke",
                width: "400px",
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
            <span style={{ padding: "20px 0 0 0" }}>Interviewer</span>
          </div>
          {response !== questions.length - 1 ? (
            <div>
              <VideoRecorder
                setDoneResponse={setDoneResponse}
                setDone={setDone}
                response={response}
                setText={setText}
                next={next}
                setNext={setNext}
                nextQuestion={nextQuestion}
                speechDone={speechDone}
                setSpeechDone={setSpeechDone}
                setUnsupported={setUnsupported}
                setDisable={setDisable}
                disable={disable}
                //    handleStartStop={handleStartStop}
              />
            </div>
          ) : (
            <h1>thank you</h1>
          )}
        </div>
        <p>{doneResponse}</p>
      </div>
      <ChatBox chats={allChat} />
      <button className="absolute left-5 bottom-5" onClick={handleWhiteBoard}>{!openWhiteBoard ? "Open white board" : "Close board"}</button>
      {openWhiteBoard && (
        <div className="absolute left-5 bottom-[100px]">
          <WhiteBoard />
        </div>
      )}
    </div>
  );
};

export default Interview;
