import FaceDetections from '@/common/FaceDetection/FaceDetection'
import React, { Dispatch, SetStateAction } from 'react'
import style from '@/styles/UserVerificationsScreen/video_verification.module.css'

interface VideoVerificationProps {
    faces: number,
    setFaces: Dispatch<SetStateAction<number>>
}

const VideoVerification: React.FC<VideoVerificationProps> = ({ faces, setFaces }) => {
    return (
        <div className="w-1/2">
            <h1 className={style.heading}>Video features</h1>
            <div className={style.video}>
                <FaceDetections setFaces={setFaces} />
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
    )
}

export default VideoVerification