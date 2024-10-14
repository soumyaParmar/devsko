/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection } from '@mediapipe/face_detection';
import { useEffect, useRef } from 'react';
import style from "@/styles/Verification.module.css";

type FaceProps = {
  setFaces: (value: number) => void;
};

const FaceDetections: React.FC<FaceProps> = ({ setFaces }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const faceDetectionRef = useRef<FaceDetection | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    // Initialize FaceDetection
    const faceDetection = new FaceDetection({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5,
    });

    faceDetection.onResults((results: any) => {
      setFaces(results.detections?.length || 0);
    });

    faceDetectionRef.current = faceDetection;

    // Initialize Camera
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        try {
          if (faceDetectionRef.current && videoElement) {
            await faceDetectionRef.current.send({ image: videoElement });
          }
        } catch (error) {
          console.error("Error during face detection:", error);
        }
      },
      width: 1280,
      height: 720,
    });

    camera.start();
    cameraRef.current = camera;

    return () => {
      // Clean up camera and face detection when component unmounts
      cameraRef.current?.stop();
      faceDetectionRef.current?.close().catch((error) => {
        console.error("Error closing face detection:", error);
      });
      cameraRef.current = null;
      faceDetectionRef.current = null;
    };
  }, [setFaces]);

  return (
    <div className={style.video}>
      <video ref={videoRef} autoPlay muted playsInline></video>
    </div>
  );
};

export default FaceDetections;
