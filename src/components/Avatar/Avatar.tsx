import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'
import * as THREE from 'three'

interface AvatarType {
  text:string | boolean;
  position: THREE.Vector3Tuple;
  scale:number;
}


export function Avatar({ text, position , scale }:AvatarType) {
  const { scene } = useGLTF('/66bb0cfe7b7ea426542e5b6d.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  // Assert the type as SkinnedMesh to access skeleton and morphTarget properties
  const headRef = useRef<THREE.SkinnedMesh>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (headRef.current && headRef.current.morphTargetInfluences && text) {
        headRef.current.morphTargetInfluences[0] =
          headRef.current.morphTargetInfluences[0] === 1 ? 0 : 1
      } else if (headRef.current && headRef.current.morphTargetInfluences) {
        headRef.current.morphTargetInfluences[0] = 0
      }
    }, 200)

    return () => clearInterval(interval)
  }, [text])

  return (
    <group position={position} scale={scale} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Hair as THREE.Mesh).geometry}
        material={materials.Wolf3D_Hair}
        skeleton={(nodes.Wolf3D_Hair as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Glasses as THREE.Mesh).geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={(nodes.Wolf3D_Glasses as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Top as THREE.Mesh).geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={(nodes.Wolf3D_Outfit_Top as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Bottom as THREE.Mesh).geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={(nodes.Wolf3D_Outfit_Bottom as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Footwear as THREE.Mesh).geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={(nodes.Wolf3D_Outfit_Footwear as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Body as THREE.Mesh).geometry}
        material={materials.Wolf3D_Body}
        skeleton={(nodes.Wolf3D_Body as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={(nodes.EyeLeft as THREE.Mesh).geometry}
        material={materials.Wolf3D_Eye}
        skeleton={(nodes.EyeLeft as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.EyeLeft as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.EyeLeft as THREE.SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={(nodes.EyeRight as THREE.Mesh).geometry}
        material={materials.Wolf3D_Eye}
        skeleton={(nodes.EyeRight as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.EyeRight as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.EyeRight as THREE.SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        ref={headRef}
        name="Wolf3D_Head"
        geometry={(nodes.Wolf3D_Head as THREE.Mesh).geometry}
        material={materials.Wolf3D_Skin}
        skeleton={(nodes.Wolf3D_Head as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.Wolf3D_Head as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.Wolf3D_Head as THREE.SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={(nodes.Wolf3D_Teeth as THREE.Mesh).geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('/66bb0cfe7b7ea426542e5b6d.glb')
