"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRouter } from "next/navigation";

const Temp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [recording, setRecording] = useState(false);
  // const [permission,setPermission] = useState<boolean>(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const[image,setImage] = useState<boolean>(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const route = useRouter();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (video && canvas && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(true)
      const base64Image = canvas.toDataURL("image/jpeg", 0.5);
      console.log(base64Image);
    }
  };

  const startRecording = async () => {
    resetTranscript();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64Audio = reader.result?.toString().split(",")[1] || "";
          console.log(base64Audio);
        };

        reader.readAsDataURL(audioBlob);
        audioChunksRef.current = []; // Reset audio chunks
      };
      SpeechRecognition.startListening({ continuous: true });
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      SpeechRecognition.stopListening();
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSecondVerification = () => {
    route.push("verificationsecond");
  };

  return (
    <div className="flex justify-center items-center flex-col gap-6 h-full">
      <div className="flex justify-center items-center flex-col gap-6">
        <div className="flex justify-center items-center flex-col">
          <div className="flex gap-[50px]">
            <video ref={videoRef} autoPlay playsInline style={{ width:'500px'}}></video>
            <canvas ref={canvasRef}  style={{ width:'500px',display: image? "block":"none"}}></canvas>
          </div>
          <button className="bg-black text-white mt-3 pl-2 pr-2 rounded-xl" onClick={handleCapture}>Capture image</button>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-xl font-semibold">
            Please read below line after pressing the button. Start Recording
          </h1>
          <p>
            Software engineering is not just about writing code. It’s about
            solving problems and making lives better.
          </p>
          <button className="bg-black text-white mt-3 pl-2 pr-2 rounded-xl" onClick={recording ? stopRecording : startRecording}>
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          <p>{transcript}</p>
        </div>
      </div>
      <button className="bg-green-400 text-white mt-3 pl-2 pr-2 rounded-xl" onClick={handleSecondVerification}>Next</button>
    </div>
  );
};

export default Temp;
