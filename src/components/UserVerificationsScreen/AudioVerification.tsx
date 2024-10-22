import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/UserVerificationsScreen/audio_verification.module.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { checkCameraPermission } from "@/lib/checkCameraPermission";

const AudioVerification = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [image, setImage] = React.useState<boolean>(false);
  const [recording, setRecording] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (video && canvas && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(true);
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

  useEffect(() => {
    if(checkCameraPermission()){
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
    }
  }, []);

  return (
    <div>
      <h1 className={style.heading}>Audio & Image Sample</h1>
      <div className="pb-5 border-b flex justify-between items-center">
        <div className="flex gap-[50px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "350px", padding: "10px 0" }}
          ></video>
          <canvas
            ref={canvasRef}
            style={{
              width: "350px",
              display: image ? "block" : "none",
            }}
          ></canvas>
        </div>
        <div>
          <button className={style.btn} onClick={handleCapture}>
            Capture image
          </button>
        </div>
      </div>
      <div className="pt-4 flex border-b pb-5 w-full justify-between">
        <div className="w-[75%]">
          <h1 className="font-semibold pb-5">
            Please read below line after pressing the button. Start Recording
          </h1>
          <p>
            Software engineering is not just about writing code. It’s about
            solving problems and making lives better.
          </p>
        </div>
        <div className="flex items-center">
          <button
            className={style.btn}
            onClick={recording ? stopRecording : startRecording}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
      </div>
      <div>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default AudioVerification;
