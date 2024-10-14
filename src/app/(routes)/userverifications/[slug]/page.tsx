"use client";

import "regenerator-runtime/runtime";
import DialogBox from "@/components/DialogBox/DialogBox";
import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/userverifications.module.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import FaceDetections from "@/common/FaceDetection/FaceDetection";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

type selectedButtonType =
  | "Permissions"
  | "Audio"
  | "Video"
  | "System"
  | "other";

interface MediaDeviceInfoExtended extends MediaDeviceInfo {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}
type allPermissionType = {
  camera: boolean | 'loading';
  audio: boolean | 'loading';
  location: boolean | 'loading';
  fullScreen: boolean | 'loading';
  imageCaptured: boolean | 'loading';
  usersSpeech: boolean | 'loading';
  userFaces: boolean | 'loading';
};

const UserVerifications = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [open, setOpen] = React.useState(true);
  const [currentSelectedButton, setCurrentSelectedButton] =
    React.useState<selectedButtonType>("Permissions");
  const [image, setImage] = React.useState<boolean>(false);
  const [recording, setRecording] = useState(false);
  const [faces, setFaces] = useState<number>(0);
  const [devices, setDevices] = useState<MediaDeviceInfoExtended[]>([]);
  const [selectedMic, setSelectedMic] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allPermission, setAllPermission] = useState<allPermissionType>({
    camera: false,
    audio: false,
    location: false,
    fullScreen: false,
    imageCaptured: false,
    usersSpeech: false,
    userFaces: false,
  });
  const  [loadRoute, setLoadRoute] = useState<boolean>(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const route = useRouter();

  useEffect(() => {
    if (currentSelectedButton === "Audio") {
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
    console.log(error)
  }, [currentSelectedButton]);

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

  const handleNext = () => {
    if(allPermission.audio &&  allPermission.camera && allPermission.fullScreen && allPermission.location && faces == 1){
      setLoadRoute(true)
      route.push('/interview/1')
      setLoadRoute(false) 
    }
  };

  const getDevices = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const deviceList = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceList as MediaDeviceInfoExtended[]);

      // Automatically select the first available microphone, camera, and speaker
      const defaultMic = deviceList.find(
        (device) =>
          device.deviceId === stream.getAudioTracks()[0].getSettings().deviceId
      );
      const defaultCamera = deviceList.find(
        (device) =>
          device.deviceId === stream.getVideoTracks()[0].getSettings().deviceId
      );
      const defaultSpeaker = deviceList.find(
        (device) => device.kind === "audiooutput"
      );

      setSelectedMic((prev) => prev || defaultMic?.deviceId || null);
      setSelectedCamera((prev) => prev || defaultCamera?.deviceId || null);
      setSelectedSpeaker((prev) => prev || defaultSpeaker?.deviceId || null);

      localStorage.setItem("preferredCamera", defaultCamera?.deviceId ?? "");
      localStorage.setItem("preferredMic", defaultMic?.deviceId ?? "");
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError(
        "Unable to access media devices. Please check your permissions."
      );
    }
  };

  const testSpeaker = () => {
    if (selectedSpeaker) {
      const audio = new Audio("/test-sound2.mp3");
      if (typeof audio.setSinkId === "function") {
        audio
          .setSinkId(selectedSpeaker)
          .then(() => {
            audio.play();
          })
          .catch((error) => {
            console.error("Error setting speaker device:", error);
            setError(
              "Error playing test sound. Please check your speaker settings."
            );
          });
      } else {
        console.error("Browser does not support setSinkId.");
        setError("Browser does not support speaker selection.");
      }
    } else {
      console.error("Speaker not selected");
      setError("Please select a speaker.");
    }
  };

  const handleAudioPermission = async () => {
    setAllPermission((prev)=>({...prev, audio: 'loading' }));
    try {
      const cameraPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (cameraPermission.active) {
        setAllPermission((prev)=>({...prev, audio: true }));
      }
    } catch (error) {}
  };
  const handleCameraPermission = async () => {
    setAllPermission((prev)=>({...prev, camera: 'loading' }));
    try {
      const cameraPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (cameraPermission.active) {
        setAllPermission((prev)=>({...prev, camera: true }));
      }
    } catch (error) {}
  };

  const handleScreenPermission = () => {
    setAllPermission((prev)=>({...prev, fullScreen: 'loading' }));
    document.documentElement.requestFullscreen();
    setAllPermission((prev)=>({...prev, fullScreen: true }));
  };

  const handleLocationPermission = () => {
    setAllPermission((prev)=>({...prev, location: 'loading' }));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    setAllPermission((prev)=>({...prev, location: true }));
    console.log("Latitude : ", position.coords.latitude);
    console.log("Longitude : ", position.coords.longitude);
  };

  const handleError = (error: GeolocationPositionError) => {
    if (error.code) {
      setAllPermission((prev)=>({...prev, location: false }));
    }
  };

  return (
    <section>
      {loadRoute ? (
        <div>Loading</div>
      ):(
      <DialogBox
        title="User Verification"
        open={open}
        setOpen={setOpen}
        action={"Start Test"}
        handlAction={handleNext}
        // actionBack={"Back"}
        // handlActionBack={handleBack}
        closable={false}
        buttonDisable={!(allPermission.audio && allPermission.camera && allPermission.fullScreen && allPermission.location && faces == 1)}
      >
        <div className="flex h-full">
          <div className={style.left}>
            <button
              className={
                currentSelectedButton === "Permissions" ? style.active_btn : ""
              }
              onClick={() => setCurrentSelectedButton("Permissions")}
            >
              Permissions
            </button>
            <button
              className={
                currentSelectedButton === "Audio" ? style.active_btn : ""
              }
              onClick={() => setCurrentSelectedButton("Audio")}
            >
              Audio/Image
            </button>
            <button
              className={
                currentSelectedButton === "Video" ? style.active_btn : ""
              }
              onClick={() => setCurrentSelectedButton("Video")}
            >
              Video
            </button>
            <button
              className={
                currentSelectedButton === "System" ? style.active_btn : ""
              }
              onClick={() => {
                setCurrentSelectedButton("System");
                getDevices();
                navigator.mediaDevices.ondevicechange = getDevices;
              }}
            >
              System
            </button>
            <button
              className={
                currentSelectedButton === "other" ? style.active_btn : ""
              }
              onClick={() => setCurrentSelectedButton("other")}
            >
              Other
            </button>
          </div>
          <div className={style.right}>
            {currentSelectedButton === "Permissions" && (
              <div className="h-full">
                <h1 className={style.heading}>Mandatory</h1>
                <div className="flex flex-col gap-7">
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Audio</p>
                        <p className={style.text_secondary}>
                          Allows the AI to give accurate feedback based on your
                          conversation and materials.
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className={style.btn}
                        onClick={handleAudioPermission}
                      >
                        {allPermission.audio  == 'loading'  ? (<CircularProgress size={'25px'}/>) : allPermission.audio ? "✔" : "Allow"}
                      </button>
                    </div>
                  </div>
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Camera</p>
                        <p className={style.text_secondary}>
                          Enabling the camera enhances the realism of mock
                          interviews.
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className={style.btn}
                        onClick={handleCameraPermission}
                      >
                        {allPermission.camera  == 'loading'  ? (<CircularProgress size={'25px'}/>) : allPermission.camera ? "✔" : "Allow"}
                      </button>
                    </div>
                  </div>
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Location</p>
                        <p className={style.text_secondary}>
                          Allows the AI to give accurate feedback based on your
                          conversation and materials.
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className={style.btn}
                        onClick={handleLocationPermission}
                      >
                        {allPermission.location  == 'loading'  ? (<CircularProgress size={'25px'}/>) : allPermission.location ? "✔" : "Allow"}
                      </button>
                    </div>
                  </div>
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Full screen</p>
                        <p className={style.text_secondary}>
                          Allows the AI to give accurate feedback based on your
                          conversation and materials.
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className={style.btn}
                        onClick={handleScreenPermission}
                      >
                        {allPermission.fullScreen  == 'loading'  ? (<CircularProgress size={'25px'}/>) : allPermission.fullScreen ? "✔" : "Allow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentSelectedButton === "Audio" && (
              <div>
                <h1 className={style.heading}>Audio & Image Sample</h1>
                <div className="pb-5 border-b flex justify-between">
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
                  <div className="flex items-center"><button className={style.btn} onClick={handleCapture}>
                    Capture image
                  </button></div>
                </div>
                <div className="pt-4 flex border-b pb-5 w-full justify-between">
                  <div className="w-[75%]">
                    <h1 className="font-semibold pb-5">
                      Please read below line after pressing the button. Start
                      Recording
                    </h1>
                    <p>
                      Software engineering is not just about writing code. It’s
                      about solving problems and making lives better.
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
            )}
            {currentSelectedButton === "Video" && (
              <div className="w-1/2">
                <h1 className={style.heading}>Video features</h1>
                <div className={style.video}>
                  {currentSelectedButton === "Video" && (
                    <FaceDetections setFaces={setFaces} />
                  )}
                </div>
                <p className="flex justify-between items-center">
                  {faces ? (
                    <>
                      <span>Face detection successful, number of faces: </span>
                      <span className={style.btn}>{faces}</span>
                    </>
                  ) : (
                    <>
                      <span>Face detection failed, number of faces: </span>
                      <span className={style.btn}>{faces}</span>
                    </>
                  )}
                </p>
              </div>
            )}
            {currentSelectedButton === "System" && (
              <div className="h-full">
                <h1 className={style.heading}>System settings</h1>
                <div className="flex flex-col gap-7">
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Camera</p>
                        <p className={style.text_secondary}>Select Camera</p>
                      </div>
                    </div>
                    <div>
                      <select
                        value={selectedCamera || ""}
                        onChange={(e) => {
                          setSelectedCamera(e.target.value);
                        }}
                        className={style.select_btn}
                      >
                        {devices
                          .filter((device) => device.kind === "videoinput")
                          .map((device) => (
                            <option
                              key={device.deviceId}
                              value={device.deviceId}
                            >
                              {device.label || `Camera ${device.deviceId}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Mic</p>
                        <p className={style.text_secondary}>
                          Select Microphone
                        </p>
                      </div>
                    </div>
                    <div>
                      <select
                        value={selectedMic || ""}
                        onChange={(e) => {
                          setSelectedMic(e.target.value);
                        }}
                        className={style.select_btn}
                      >
                        {devices
                          .filter((device) => device.kind === "audioinput")
                          .map((device) => (
                            <option
                              key={device.deviceId}
                              value={device.deviceId}
                            >
                              {device.label || `Microphone ${device.deviceId}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Speaker</p>
                        <p className={style.text_secondary}>
                          Select Speaker {"(Headphones*)"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <select
                        value={selectedSpeaker || ""}
                        onChange={(e) => {
                          setSelectedSpeaker(e.target.value);
                        }}
                        className={style.select_btn}
                      >
                        {devices
                          .filter((device) => device.kind === "audiooutput")
                          .map((device) => (
                            <option
                              key={device.deviceId}
                              value={device.deviceId}
                            >
                              {device.label || `Speaker ${device.deviceId}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className={style.permission_sec}>
                    <div className="flex gap-2">
                      <span>$</span>
                      <div>
                        <p className={style.text_primary}>Test Speaker</p>
                        <p className={style.text_secondary}>
                          Allows the AI to give accurate feedback based on your
                          conversation and materials.
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className={style.btn} onClick={testSpeaker}>
                        Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentSelectedButton === "other" && <div>Other</div>}
          </div>
        </div>
      </DialogBox>
    )}
    </section>
  );
};

export default UserVerifications;
