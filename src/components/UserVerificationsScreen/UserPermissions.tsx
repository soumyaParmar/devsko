import style from '@/styles/UserVerificationsScreen/user_permission.module.css'
import { allPermissionType } from '@/utils/types/userpermissions';
import { CircularProgress } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface UserPermissionsProps {
    allPermission: allPermissionType,
    setAllPermission: Dispatch<SetStateAction<allPermissionType>>
}
const UserPermissions: React.FC<UserPermissionsProps> = ({ allPermission, setAllPermission }) => {

    useEffect(()=>{
        handleAudioPermission();
        handleCameraPermission();
        handleLocationPermission();
    },[])

    const handleAudioPermission = async () => {
        setAllPermission((prev) => ({ ...prev, audio: 'loading' }));
        try {
            const cameraPermission = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            if (cameraPermission.active) {
                setAllPermission((prev) => ({ ...prev, audio: true }));
            }
        } catch (error) { }
    };
    const handleCameraPermission = async () => {
        setAllPermission((prev) => ({ ...prev, camera: 'loading' }));
        try {
            const cameraPermission = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if (cameraPermission.active) {
                setAllPermission((prev) => ({ ...prev, camera: true }));
            }
        } catch (error) { }
    };

    const handleScreenPermission = () => {
        setAllPermission((prev) => ({ ...prev, fullScreen: 'loading' }));
        document.documentElement.requestFullscreen();
        setAllPermission((prev) => ({ ...prev, fullScreen: true }));
    };

    const handleLocationPermission = () => {
        setAllPermission((prev) => ({ ...prev, location: 'loading' }));
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
        setAllPermission((prev) => ({ ...prev, location: true }));
        console.log("Latitude : ", position.coords.latitude);
        console.log("Longitude : ", position.coords.longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
        if (error.code) {
            setAllPermission((prev) => ({ ...prev, location: false }));
        }
    };
    return (
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
                            {allPermission.audio == 'loading' ? (<CircularProgress size={'25px'} />) : allPermission.audio ? "✔" : "Allow"}
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
                            {allPermission.camera == 'loading' ? (<CircularProgress size={'25px'} />) : allPermission.camera ? "✔" : "Allow"}
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
                            {allPermission.location == 'loading' ? (<CircularProgress size={'25px'} />) : allPermission.location ? "✔" : "Allow"}
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
                            {allPermission.fullScreen == 'loading' ? (<CircularProgress size={'25px'} />) : allPermission.fullScreen ? "✔" : "Allow"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPermissions