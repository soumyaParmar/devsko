import React, { useCallback, useEffect, useState } from "react";
import style from "@/styles/UserVerificationsScreen/system_verification.module.css";
import { useAppDispatch } from "@/utils/store/hooks";
import {
  setPreferredCamera,
  setPreferredMic,
} from "@/utils/store/features/preferredDevices/preferredDevicesSlice";
import useMicrophoneLevel from "@/hooks/useMicrophoneLevel";

interface MediaDeviceInfoExtended extends MediaDeviceInfo {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

const SystemVerification = () => {
  const dispatch = useAppDispatch();

  const [devices, setDevices] = useState<MediaDeviceInfoExtended[]>([]);
  const [selectedMic, setSelectedMic] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
  const {microphoneLevel} = useMicrophoneLevel();

  const getDevices = useCallback(async () => {
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

      dispatch(setPreferredMic(defaultMic?.deviceId ?? null));
      dispatch(setPreferredCamera(defaultCamera?.deviceId ?? null));
    } catch (err) {
      console.error("Error fetching devices:", err);
      //   setError(
      //     "Unable to access media devices. Please check your permissions."
      //   );
    }
  }, [dispatch]);

  useEffect(() => {
    getDevices();
    navigator.mediaDevices.ondevicechange = getDevices;
  }, [getDevices]);

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
          });
      } else {
        console.error("Browser does not support setSinkId.");
      }
    } else {
      console.error("Speaker not selected");
    }
  };

  return (
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
                  <option key={device.deviceId} value={device.deviceId}>
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
              <p className={style.text_secondary}>Select Microphone</p>
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
                  <option key={device.deviceId} value={device.deviceId}>
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
                  <option key={device.deviceId} value={device.deviceId}>
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
        <div className={style.permission_sec}>
          <div className="flex gap-2 w-full">
            <span>$</span>
            <div className="w-full">
              <p className={style.text_primary}>Microphone Test</p>
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "#ccc",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius:'10px',
                }}
              >
                <div
                  style={{
                    width: `${microphoneLevel}%`,
                    height: "100%",
                    background: microphoneLevel > 5 ? "#3b82f6" : "gray",
                    position: "absolute",
                    left: 0,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemVerification;
