import { useAppSelector } from "@/utils/store/hooks";
import { useEffect, useState } from "react";

export default function useMicrophoneLevel(){
  const [microphoneLevel, setMicrophoneLevel] = useState<number>(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const selectedMic = useAppSelector(state  => state.preferredDevices.preferredMic);


  useEffect(() => {
    if (selectedMic) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      setAudioContext(audioContext);
      startMicTest(audioContext);
    }
    console.log(audioContext)
  }, [selectedMic]);

  const startMicTest = async (audioCtx: AudioContext) => {
    try {
      if (selectedMic) {
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
        // setError("Please select a microphone.");
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
    //   setError("Error accessing microphone. Please check your permissions.");
    }
  };

  return {
    microphoneLevel,
  }

}