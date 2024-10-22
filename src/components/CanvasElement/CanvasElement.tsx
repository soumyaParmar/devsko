import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Avatar } from "../Avatar/Avatar";
import * as THREE from "three";
import style from "@/styles/interviewscreen.module.css";

interface Question {
    question_text: string;
}

interface propType {
    text:boolean;
    questions?:Question[];
    response?:number;
    context?:'big' |  'small';

}

const CanvasElement:React.FC<propType> = ({text,context}) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: "6px",
      }}
      className={context=="big" ? style.inner_avatar_big : style.inner_avatar}

    >
      <OrbitControls enableRotate={false} />
      <Avatar
        position={[0, -1.5, 9] as THREE.Vector3Tuple}
        scale={2}
        text={text}
      />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default React.memo(CanvasElement);
