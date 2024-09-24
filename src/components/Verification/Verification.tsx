/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Verification.module.css";
import FaceDetections from "@/common/FaceDetection/FaceDetection";
import { useRouter } from "next/navigation";
import { ScreenType } from "@/utils/Interfaces/Verification/verification";

// Define device type
interface MediaDeviceInfoExtended extends MediaDeviceInfo {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

const Verification = () => {
  const [isExtendedScreen, setIsExtendedScreen] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [browserCheck, setBrowserCheck] = useState<boolean>(false);
  const [allPermission, setAllPermission] = useState<boolean>(false);
  const [faces, setFaces] = useState<number>(0);
  const webcam = useRef<HTMLVideoElement>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const navigate = useRouter();

  //  states for setting up desired device
  const [devices, setDevices] = useState<MediaDeviceInfoExtended[]>([]);
  const [selectedMic, setSelectedMic] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [microphoneLevel, setMicrophoneLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Rendered");
    localStorage.clear();
    console.log(window.localStorage);
  }, []);

  useEffect(() => {
    const isChrome =
      /Chrome/.test(navigator.userAgent) &&
      !/Edg|OPR/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if ((window.screen as ScreenType).isExtended) {
      setIsExtendedScreen(true);
    }
    getCameraPermission();

    if (
      !isExtendedScreen &&
      cameraPermission &&
      fullScreen &&
      faces == 1 &&
      browserCheck
    ) {
      setAllPermission(true);
    }
    if (isChrome || isEdge || isSafari) {
      setBrowserCheck(true);
    }

    navigator.mediaDevices.ondevicechange = getDevices; // automatically detects external devices without refresh

    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      navigator.mediaDevices.ondevicechange = null;
    };
  }, [isExtendedScreen, cameraPermission, fullScreen, faces]);

  // start mic test if a microphone is selected
  useEffect(() => {
    if (selectedMic) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      setAudioContext(audioContext);
      startMicTest(audioContext);
      localStorage.setItem("preferredMic", selectedMic)
    }
  }, [selectedMic]);

  useEffect(() => {
    const startCameraPreview = async () => {
      if (selectedCamera) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedCamera } },
          });
          const videoElement = document.getElementById(
            "cameraPreview"
          ) as HTMLVideoElement;
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setError("Error accessing camera. Please check your permissions.");
        }
        localStorage.setItem("preferredCamera", selectedCamera);
      }

    };

    startCameraPreview();
  }, [selectedCamera]);

  // Function to test microphone input and display audio levels
  const startMicTest = async (audioCtx: AudioContext) => {
    console.log(window.localStorage);
    try {
      if (selectedMic) {
        console.log(selectedMic);

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: selectedMic } },
        });

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const updateMicLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const level = Math.max(...dataArray);
          const normalizedLevel = Math.min((level / 255) * 100, 100);
          setMicrophoneLevel(normalizedLevel);
          requestAnimationFrame(updateMicLevel);
        };

        updateMicLevel();
      } else {
        console.error("Microphone not selected");
        setError("Please select a microphone.");
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Error accessing microphone. Please check your permissions.");
    }
  };

  // Function to test speaker
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

  // Function to fetch devices
  const getDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceList as MediaDeviceInfoExtended[]);
      // console.log(deviceList);

      // Automatically select the first available microphone, camera, and speaker
      const defaultMic = deviceList.find(
        (device) => device.kind === "audioinput"
      );
      const defaultCamera = deviceList.find(
        (device) => device.kind === "videoinput"
      );
      const defaultSpeaker = deviceList.find(
        (device) => device.kind === "audiooutput"
      );

      setSelectedMic((prev) => prev || defaultMic?.deviceId || null);
      setSelectedCamera((prev) => prev || defaultCamera?.deviceId || null);
      setSelectedSpeaker((prev) => prev || defaultSpeaker?.deviceId || null);

      localStorage.setItem("preferredCamera", defaultCamera?.deviceId ?? "");
      localStorage.setItem("preferredMic", defaultMic?.deviceId ?? "");
      // localStorage.setItem("preferredSpeaker", defaultSpeaker.deviceId);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError(
        "Unable to access media devices. Please check your permissions."
      );
    }
  };

  // Function to get camera and microphone permission
  const getCameraPermission = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      await getDevices(); //get available devices on the system
      if (videoStream.active) {
        videoStreamRef.current = videoStream;
        setCameraPermission(true);
        if (webcam.current) {
          webcam.current.srcObject = videoStream;
        }
      } else {
        setCameraPermission(false);
      }
    } catch (error) {
      setCameraPermission(false);
    }
  };

  // function for full screen
  const handleFullscreen = () => {
    document.documentElement.requestFullscreen();
    setFullScreen(true);
  };

  // function for exit full screen
  const handleExitFullscreen = () => {
    document.exitFullscreen();
    setFullScreen(false);
  };

  const handleStartTest = () => {
    navigate.push("/interview");
  };

  return (
    <>
      <div className={` ${style.outer}`}>
        <div className={` ${style.inner}`}>
          <h1 className="text-2xl font-semibold">
            Required permission to start your test.
          </h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* required permission div */}
          <div className="flex justify-between">
            <div>
              {/* for full screen */}
              <div>
                {!fullScreen ? (
                  <button className={style.button1} onClick={handleFullscreen}>
                    Click here to allow full screen
                    <span className="pl-8 font-bold text-red-600">x</span>
                  </button>
                ) : (
                  <button
                    className={style.button2}
                    onClick={handleExitFullscreen}
                  >
                    Exit full screen{" "}
                    <span className="pl-8 font-bold text-green-600">
                      &#10003;
                    </span>
                  </button>
                )}
              </div>

              {/* for extended screen */}
              <div>
                {isExtendedScreen ? (
                  <p className={style.button1}>
                    Second screen found. Please remove other screen.{" "}
                    <span className="pl-8 font-bold text-red-600">x</span>
                  </p>
                ) : (
                  <p className={style.button2}>
                    No second screen detected{" "}
                    <span className="pl-8 font-bold text-green-600">
                      &#10003;
                    </span>
                  </p>
                )}
              </div>

              {/* for preferred browser */}
              <div>
                {browserCheck ? (
                  <p className={style.button2}>
                    Browser detected{" "}
                    <span className="pl-8 font-bold text-green-600">
                      &#10003;
                    </span>{" "}
                  </p>
                ) : (
                  <p className={style.button1}>
                    Unsupprted browser detected{" "}
                    <span className="pl-8 font-bold text-red-600">x</span>
                  </p>
                )}
              </div>

              {/* for face detection */}
              <div>
                {!faces && (
                  <p className={style.button1}>
                    No face detected{" "}
                    <span className="pl-8 font-bold text-red-600">x</span>
                  </p>
                )}
                {faces == 1 && (
                  <p className={style.button2}>
                    Face detected{" "}
                    <span className="pl-8 font-bold text-green-600">
                      &#10003;
                    </span>{" "}
                  </p>
                )}
                {faces > 1 && (
                  <p className={style.button1}>
                    Multiple faces detected. Please go solo{" "}
                    <span className="pl-8 font-bold text-red-600">x</span>
                  </p>
                )}
              </div>

              {/* for camera and microphone */}
              <div>
                {cameraPermission ? (
                  <p className={style.button2}>
                    Camera and microphone access granted.
                    <span className="pl-8 font-bold text-green-600">
                      &#10003;
                    </span>
                  </p>
                ) : (
                  <p className={style.button1}>
                    Camera and microphone access not granted.
                    <span className="pl-8 font-bold text-red-600">x</span>
                  </p>
                )}
              </div>

              {cameraPermission ? (
                <>
                  <h5 className="text-xl mt-3 font-light">
                    Choose desired device
                  </h5>

                  {/*for Camera selection */}
                  <div>
                    <label className={style.button2}>Select Camera:</label>{" "}
                    <br />
                    <select
                      value={selectedCamera || ""}
                      onChange={(e) => {
                        setSelectedCamera(e.target.value);
                        // localStorage.setItem("preferredCamera", e.target.value);
                      }}
                      className={style.selectBtn}
                    >
                      {devices
                        .filter((device) => device.kind === "videoinput")
                        .map((device) => (
                          <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${device.deviceId}`}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* for Microphone selection */}
                  <div>
                    <label className={style.button2}>Select Microphone:</label>{" "}
                    <br />
                    <select
                      value={selectedMic || ""}
                      onChange={(e) => {
                        setSelectedMic(e.target.value);
                        // localStorage.setItem("preferredMic", e.target.value);
                      }}
                      className={`mb-3 ${style.selectBtn}`}
                    >
                      {devices
                        .filter((device) => device.kind === "audioinput")
                        .map((device) => (
                          <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Microphone ${device.deviceId}`}
                          </option>
                        ))}
                    </select>
                    {/* Audio level indicator */}
                    <div
                      style={{
                        width: "200px",
                        height: "20px",
                        background: "#ccc",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${microphoneLevel}%`,
                          height: "100%",
                          background: microphoneLevel > 5 ? "green" : "gray",
                          position: "absolute",
                          left: 0,
                          transition: "width 0.1s linear",
                        }}
                      />
                    </div>
                  </div>

                  {/* for Speaker selection */}
                  <div>
                    <label className={style.button2}>
                      Select Speaker (Headphones):
                    </label>{" "}
                    <br />
                    <select
                      value={selectedSpeaker || ""}
                      onChange={(e) => {
                        setSelectedSpeaker(e.target.value);
                        // localStorage.setItem(
                        //   "preferredSpeaker",
                        //   e.target.value
                        // );
                      }}
                      className={style.selectBtn}
                    >
                      {devices
                        .filter((device) => device.kind === "audiooutput")
                        .map((device) => (
                          <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Speaker ${device.deviceId}`}
                          </option>
                        ))}
                    </select>
                    <br />
                    <button
                      onClick={testSpeaker}
                      className={`mt-3 ${style.btn1}`}
                    >
                      Test Speaker
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              {cameraPermission && <FaceDetections setFaces={setFaces} />}
            </div>
          </div>

          {/* button for starting the test */}
          <div>
            {allPermission ? (
              <button className={` ${style.btn1}`} onClick={handleStartTest}>
                Go to next screen
              </button>
            ) : (
              <button className={style.btn2}>
                All permissions required to go to next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
