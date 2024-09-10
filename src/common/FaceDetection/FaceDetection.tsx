import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection } from '@mediapipe/face_detection';
import { useEffect, useRef } from 'react';

type FaceProps = {
  setFaces : (value : number) => void
}


const FaceDetections:React.FC<FaceProps> = ({setFaces}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if(!videoElement) return;

    const faceDetection = new FaceDetection({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5,
    });

    faceDetection.onResults((results: any) => {
      setFaces(results.detections.length);
    });

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await faceDetection.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    return () => {
      camera.stop();
      faceDetection.close();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default FaceDetections;
