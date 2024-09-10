"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PreviewIcon from '@mui/icons-material/Preview';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReplayIcon from '@mui/icons-material/Replay';

// Define the types for props
interface RecorderProps {
  setDoneResponse: Dispatch<SetStateAction<string>>;
  setDone: (value: boolean) => void;
  response: number;
  setText: (value: boolean) => void;
  next: boolean;
  nextQuestion: () => void;
  speechDone: boolean;
  setSpeechDone: (value: boolean) => void;
  setUnsupported: (value: boolean) => void;
  disable: boolean;
  setDisable: (value: boolean) => void;
  setNext: (value: boolean) => void;
 // handleStartStop: () => void;
}

const Recorder: React.FC<RecorderProps> = (props) => {
  const {
    setDoneResponse,
    setDone,
    response,
    setText,
    next,
    nextQuestion,
    speechDone,
    setSpeechDone,
    setUnsupported,
    disable,
    setDisable,
    setNext,
   // handleStartStop
  } = props;

  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (webcamRef.current?.video) {
      webcamRef.current.video.muted = true;
    }
  }, [webcamRef, next]);

  useEffect(() => {
    if (listening) {
      setDoneResponse(transcript);
    }
  }, [transcript, listening]);

  useEffect(() => {
    setCapturing(false);
    setRecordedChunks([]);
    setVideoUrl(null);
  }, [response]);

  useEffect(() => {
    if (speechDone) {
      handleStartCaptureClick();
    }
  }, [speechDone]);

  const handleDataAvailable = ({ data }: { data: Blob }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  };

  const handleStopCaptureClick = () => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    }
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      setVideoUrl(url);
      setRecordedChunks([]);
    }
    SpeechRecognition.stopListening();
    setCapturing(false);
    setDone(true);
    setText(false);
    setSpeechDone(false);
    if (webcamRef.current?.video) {
      webcamRef.current.video.muted = true; // Mute audio on stop
    }

  //  handleStartStop();
  };

  const handleStartCaptureClick = () => {
    setCapturing(true);
    setVideoUrl(null);
    resetTranscript();
    setDoneResponse("");
    setDone(false);
    setNext(false);
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      SpeechRecognition.startListening({ continuous: true });
      mediaRecorderRef.current.start();
    }
  };

  const handleSave = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setRecordedChunks([]);
      setSpeechDone(false);
    }
  };

  const startSpeech = () => {
    setDisable(true);
    setText(true);
    setNext(true);
   // handleStartStop();
  };

  const restartSpeech = () => {
    setVideoUrl(null);
    setCapturing(false);
    setDoneResponse('');
    setRecordedChunks([]);
  };

  const handleNext = () => {
    nextQuestion();
    setDoneResponse("");
    startSpeech();
  };

  if (!browserSupportsSpeechRecognition) {
    setUnsupported(true);
  }

  return (
    <div className="webCam w-[35rem]">
      {videoUrl ? (
        <div>
          <h3>Preview:</h3>
          <video src={videoUrl} controls width={300} />
        </div>
      ) : (
        <Webcam audio={true} ref={webcamRef} />
      )}
      <div style={{ display: "flex", gap: "10px", paddingTop: "50px" }}>
        {capturing && !disable ? (
          <button
            onClick={handleStopCaptureClick}
            style={{ bottom: 0, left: "50%" }}
            className="btn"
          >
            <StopCircleIcon fontSize='large' />
            <p style={{ fontSize: '12px' }}>Stop</p>
          </button>
        ) : (!disable && recordedChunks.length > 0) || videoUrl ? (
          <button onClick={restartSpeech} className="btn">
            <ReplayIcon fontSize='large' />
            <p style={{ fontSize: '12px' }}>Re-Try</p>
          </button>
        ) : (
          !disable && (
            <button onClick={startSpeech} style={{ bottom: 0 }} className="btn">
              <PlayCircleFilledWhiteIcon fontSize='large' />
              <p style={{ fontSize: '12px' }}>Start</p>
            </button>
          )
        )}
        {recordedChunks.length > 0 && !disable && (
          <button onClick={handleSave} className="btn">
            <PreviewIcon fontSize='large' />
            <p style={{ fontSize: '12px' }}>Preview</p>
          </button>
        )}
        {!capturing && !disable && (
          <button onClick={handleNext} className="btn">
            <ArrowForwardIosIcon fontSize='large' />
            <p style={{ fontSize: '12px' }}>Next</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Recorder;
