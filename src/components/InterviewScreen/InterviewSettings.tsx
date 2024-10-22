import { useAppSelector } from '@/utils/store/hooks';
import React, { useCallback, useEffect, useState } from 'react'

const InterviewSettings = () => {

  const { preferredCamera, preferredMic } = useAppSelector((state) => state.preferredDevices)
  const [selectedMic, setSelectedMic] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);

  const checkDevice = useCallback(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const availableMics = devices.filter(
        (device) => device.kind === "audioinput"
      );

      const availableCamera = devices.filter(
        (device) => device.kind === "videoinput"
      );
      // console.log(availableMics);

      setAudioDevices(availableMics);
      setVideoDevices(availableCamera);

      // Checkinf if the previously selected mic is still available
      const micStillAvailable = availableMics.some(
        (device) => device.deviceId === preferredMic
      );

      // Checking if the previously selected camera is still available
      const cameraStillAvailable = availableCamera.some(
        (device) => device.deviceId === preferredCamera
      );
      if (!micStillAvailable || !cameraStillAvailable) {
        // console.log(
        //   "Your selected microphone is disconnected or changed. Please select a new microphone."
        // );
        // setDevicePopup(true);
      }
    });
  }, [preferredCamera, preferredMic]);


  useEffect(() => {
    const settingPreferredDevice = () => {
      navigator.mediaDevices
        .getUserMedia({
          audio: { deviceId: preferredMic ? { exact: preferredMic } : undefined },
          video: {
            deviceId: preferredCamera ? { exact: preferredCamera } : undefined,
          },
        })
        .then((stream) => {
          // const audioTracks = stream.getAudioTracks();
          const videoElement = document.querySelector("video");
          if (videoElement) videoElement.srcObject = stream;
          // console.log("Using microphone:", audioTracks[0].label);
        })
        .catch((error) => {
          console.error("Error accessing microphone/camera:", error);
        });
    };
    settingPreferredDevice();
  }, [preferredCamera, preferredMic]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const availableMics = devices.filter(
        (device) => device.kind === "audioinput"
      );

      const availableCamera = devices.filter(
        (device) => device.kind === "videoinput"
      );
      // console.log(availableMics);

      setAudioDevices(availableMics);
      setVideoDevices(availableCamera);
    });

    navigator.mediaDevices.ondevicechange = () => {
      console.log("Device changed");
      checkDevice();
    };
  }, [checkDevice])

  return (
    <div className="absolute z-20 h-[300px] w-[500px] border right-0 bottom-[70px] bg-slate-50">
      <p>Please select mic and camera from here:</p>
      {/* for Microphone selection */}
      <div>
        <label>Select Microphone:</label> <br />
        <select
          value={selectedMic || ""}
          onChange={(e) => {
            setSelectedMic(e.target.value);
            localStorage.setItem("preferredMic", e.target.value);
          }}
          className={`mb-3`}
        >
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Camera:</label> <br />
        <select
          value={selectedCamera || ""}
          onChange={(e) => {
            setSelectedCamera(e.target.value);
            localStorage.setItem("preferredCamera", e.target.value);
          }}
          className={`mb-3`}
        >
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InterviewSettings