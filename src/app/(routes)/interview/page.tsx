/* eslint-disable react/no-unescaped-entities */
"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { questions } from "@/utils/Questions/Questions";
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import ChatBox from "@/components/Chats/ChatBox";

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
    <>
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
      <p>{doneResponse}</p>
      <ChatBox chats={allChat}/>
    </>
  );
};

export default Interview;
