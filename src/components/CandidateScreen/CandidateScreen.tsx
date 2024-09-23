"use client";

import { StateSetter } from "@/utils/types/statesetter";
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Webcam from "react-webcam";
import style from "../../styles/candidatescreen.module.css";
import { testStartType } from "@/app/(routes)/interview/page";

interface PassedProps {
  speechDone: boolean;
  setSpeechDone: StateSetter<boolean>;
  setDoneResponse: StateSetter<string>;
  setDone: StateSetter<boolean>;
  nextQuestion: () => void;
  setText: StateSetter<boolean>;
  setUnsupported: StateSetter<boolean>;
  setUsersBlankAnswer: StateSetter<boolean>;
  testStarted:testStartType | undefined;
}

const CandidateScreen: React.FC<PassedProps> = (props) => {
  const {
    speechDone,
    setSpeechDone,
    setDoneResponse,
    setDone,
    nextQuestion,
    setText,
    setUnsupported,
    setUsersBlankAnswer,
    testStarted
  } = props;
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  // const [testStatus, setTestStatus] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [lastTranscript, setLastTranscript] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [pauseTriggered, setPauseTriggered] = useState<boolean>(false);
  const [repeatHandled, setRepeatHandled] = useState<boolean>(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (speechDone && testStarted=="yes") {
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
      setDoneResponse("");
      setLastTranscript("");
      setText(false);
      setSpeechDone(false);
    }
  }, [speechDone,testStarted]);

  useEffect(() => {
    if (listening) {
      setDoneResponse(transcript);
    }

    if (listening && transcript !== lastTranscript && transcript.length > 10 ) {
      speechTimer(handleTranscriptPause,6000);
      setLastTranscript(transcript);
      setPauseTriggered(false);
      setRepeatHandled(false);
    }

    if(listening && transcript.length < 10 && transcript.toLowerCase().includes('repeat') && !repeatHandled){
      setRepeatHandled(true);
      speechTimer(()=>{
        handleUserNotSpeaking();
        setRepeatHandled(true);
      },7000)

    }

    if(listening && transcript.length < 10 && transcript.toLowerCase().includes('sorry') && !pauseTriggered ){
      speechTimer(() => {
        handleTranscriptPause();
        setPauseTriggered(true);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [listening, transcript]);

  useEffect(()=>{

    if(testStarted=='yes'){
      handleRecordingFromStart();
    }else if(testStarted == 'end'){
      handleRecordingWhenEnds();
    }

  },[testStarted])

  const speechTimer = (fun:()=>void,time:number) =>{
    if(timer) clearTimeout(timer);

    const newTimer = setTimeout (()=>{
      fun();
    },time)

    setTimer(newTimer)
  }

  const handleUserNotSpeaking = () =>{
    setUsersBlankAnswer(true);
    setText(true);
    setDoneResponse("");
    setLastTranscript("");
    resetTranscript();
    SpeechRecognition.stopListening();
  }

  const handleTranscriptPause = () => {
    setDone(true);
    setText(true);
    nextQuestion();
    SpeechRecognition.stopListening();
  };

  const handleDataAvailable = ({ data }: { data: Blob }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data]);
    }
  };

  const handleRecordingFromStart = () => {
    setText(true);
    setRecordedChunks([]);
    setVideoUrl("");
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  };

  const handleRecordingWhenEnds = () => {
    if(timer) clearTimeout(timer);
    setText(false);
    setSpeechDone(false);
    resetTranscript();
    setDoneResponse("");
    SpeechRecognition.stopListening();
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (recordedChunks) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      setVideoUrl(url);
      setRecordedChunks([]);
      console.log(videoUrl);
    }
    // route.push('/dashboard');
  };

  if (!browserSupportsSpeechRecognition) {
    setUnsupported(true);
  }

  return (
    <div className={style.webcam}>
        <Webcam ref={webcamRef} />
    </div>
  );
};

export default CandidateScreen;
