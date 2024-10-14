/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { StateSetter } from "@/utils/types/statesetter";
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Webcam from "react-webcam";
import style from "../../styles/candidatescreen.module.css";
import { FaceDetection } from "@mediapipe/face_detection";
// import Popup from "../Modal/Modal";
import { Camera } from "@mediapipe/camera_utils";
import { testStartType } from "@/app/(routes)/interview/[slug]/page";

interface PassedProps {
  speechDone: boolean;
  setSpeechDone: StateSetter<boolean>;
  setDoneResponse: StateSetter<string>;
  setDone: StateSetter<boolean>;
  nextQuestion: () => void;
  setText: StateSetter<boolean>;
  setUnsupported: StateSetter<boolean>;
  setUsersBlankAnswer: StateSetter<boolean>;
  testStarted: testStartType | undefined;
  responseTimer: boolean;
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
    testStarted,
    responseTimer,
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
  const faceDetectionRef = useRef<FaceDetection | null>(null);

  const [isMultipleFaceDetected, setMultipleFaceDetected] =
    useState<boolean>(false);

  const [faces, setFaces] = useState(0);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // const videoRef = useRef<HTMLVideoElement>(null);

  // for face detection
  useEffect(() => {
    const videoElement = webcamRef.current?.video;
    if (!videoElement) return;

    faceDetectionRef.current = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetectionRef.current.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    faceDetectionRef.current.onResults((results) => {
      setFaces(results.detections.length);
    });

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        if (faceDetectionRef.current) { // Ensure it's still valid
          await faceDetectionRef.current.send({ image: videoElement });
        }
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    return () => {
      camera.stop();
      if (faceDetectionRef.current) {
        faceDetectionRef.current.close(); // Clean up the instance
        faceDetectionRef.current = null; // Set it to null to avoid stale references
      }
      // Stop the media tracks properly
      const stream = webcamRef.current?.stream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (speechDone && testStarted == "yes") {
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
      setDoneResponse("");
      setLastTranscript("");
      setText(false);
      setSpeechDone(false);
    }
  }, [speechDone, testStarted]);

  useEffect(() => {
    if (listening) {
      setDoneResponse(transcript);
    }

    if (listening && transcript !== lastTranscript && transcript.length > 10) {
      speechTimer(handleTranscriptPause, 6000);
      setLastTranscript(transcript);
      setPauseTriggered(false);
      setRepeatHandled(false);
    }

    if (
      listening &&
      transcript.length < 10 &&
      transcript.toLowerCase().includes("repeat") &&
      !repeatHandled
    ) {
      setRepeatHandled(true);
      speechTimer(() => {
        handleUserNotSpeaking();
        setRepeatHandled(true);
      }, 7000);
    }

    if (
      listening &&
      transcript.length < 10 &&
      transcript.toLowerCase().includes("sorry") &&
      !pauseTriggered
    ) {
      speechTimer(() => {
        handleTranscriptPause();
        setPauseTriggered(true);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [listening, transcript]);

  useEffect(() => {
    if (faces > 1) setMultipleFaceDetected(true);
  }, [faces]);

  useEffect(() => {
    if (testStarted == "yes") {
      handleRecordingFromStart();
    } else if (testStarted == "end") {
      handleRecordingWhenEnds();
    }
  }, [testStarted]);

  const speechTimer = (fun: () => void, time: number) => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      fun();
    }, time);

    setTimer(newTimer);
  };

  const handleUserNotSpeaking = () => {
    setUsersBlankAnswer(true);
    setText(true);
    setDoneResponse("");
    setLastTranscript("");
    resetTranscript();
    SpeechRecognition.stopListening();
  };

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
    if (timer) clearTimeout(timer);
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

  // const handleClose = () => {
  //   setMultipleFaceDetected(false);
  // };

  if (!browserSupportsSpeechRecognition) {
    setUnsupported(true);
  }

  return (
    <>
      {isMultipleFaceDetected && (<></>
        // <Popup
        //   isVisible={isMultipleFaceDetected}
        //   message="Multiple Faces are detected"
        //   onClose={handleClose}
        //   isWarning={true}
        //   type="Warning"
        // />
      )}
      <div className={`${style.webcam}`}>
        <Webcam
          ref={webcamRef}
          audio={false}
          className={`${style.video1} ${
            responseTimer && testStarted == "yes" ? style.blue_border : ""
          }`}
        />
      </div>
    </>
  );
};

export default CandidateScreen;
