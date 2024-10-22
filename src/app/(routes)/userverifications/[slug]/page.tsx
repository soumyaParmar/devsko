"use client";

import "regenerator-runtime/runtime";
import DialogBox from "@/components/DialogBox/DialogBox";
import React, { Dispatch, SetStateAction, useState } from "react";
import style from "@/styles/userverifications.module.css";
import { useRouter } from "next/navigation";
import UserPermissions from "@/components/UserVerificationsScreen/UserPermissions";
import AudioVerification from "@/components/UserVerificationsScreen/AudioVerification";
import VideoVerification from "@/components/UserVerificationsScreen/VideoVerification";
import SystemVerification from "@/components/UserVerificationsScreen/SystemVerification";

enum selectedButtonType {
  "Permissions"
  , "Audio"
  , "Video"
  , "System"
  , "other"
}

type allPermissionType = {
  camera: boolean | 'loading';
  audio: boolean | 'loading';
  location: boolean | 'loading';
  fullScreen: boolean | 'loading';
  imageCaptured: boolean | 'loading';
  usersSpeech: boolean | 'loading';
  userFaces: boolean | 'loading';
};

const UserVerifications = () => {
  const [open, setOpen] = React.useState(true);
  const [currentSelectedButton, setCurrentSelectedButton] =
    useState<selectedButtonType>(selectedButtonType.Permissions);
  const [faces, setFaces] = useState<number>(0);
  const [allPermission, setAllPermission] = useState<allPermissionType>({
    camera: false,
    audio: false,
    location: false,
    fullScreen: false,
    imageCaptured: false,
    usersSpeech: false,
    userFaces: false,
  });
  const [loadRoute, setLoadRoute] = useState<boolean>(false);

  const route = useRouter();

  const handleNext = async() => {
    if (allPermission.audio && allPermission.camera && allPermission.fullScreen && allPermission.location && faces == 1) {
      setLoadRoute(true)
      route.push('/interview/1')
      setLoadRoute(false)
    }
  };

  const menuOption: {
    name: string;
    type: selectedButtonType;
  }[] = [
      {
        name: "Permissions",
        type: selectedButtonType.Permissions
      }, {
        name: "Audio/Image",
        type: selectedButtonType.Audio
      }, {
        name: "Video",
        type: selectedButtonType.Video
      }, {
        name: "System",
        type: selectedButtonType.System
      }, {
        name: "Other",
        type: selectedButtonType.other
      },
    ];

  const getSelectedComponent = () => {
    switch (currentSelectedButton) {
      case selectedButtonType.Permissions:
        return <UserPermissions allPermission={allPermission} setAllPermission={setAllPermission} />
      case selectedButtonType.Audio:
        return <AudioVerification />
      case selectedButtonType.Video:
        return <VideoVerification faces={faces} setFaces={setFaces} />
      case selectedButtonType.System:
        return <SystemVerification />
      case selectedButtonType.other:
        return <div>Other</div>
      default:
        return <></>
    }
  }

  return (
    <section>
      {loadRoute ? (
        <div>Loading</div>
      ) : (
        <DialogBox
          title="User Verification"
          open={open}
          setOpen={setOpen}
          action={"Start Test"}
          handlAction={handleNext}
          // actionBack={"Back"}
          // handlActionBack={handleBack}
          closable={false}
          buttonDisable={!(allPermission.audio && allPermission.camera && allPermission.fullScreen && allPermission.location && faces == 1)}
          disableAction="Please allow all permissions"
        >
          <div className="flex h-full">
            <div className={style.left}>
              {menuOption.map((option, index) =>
                <MenuButton
                  key={index}
                  optionType={option.type}
                  optionName={option.name}
                  currentSelectedButton={currentSelectedButton}
                  setCurrentSelectedButton={setCurrentSelectedButton}
                />)}
            </div>
            <div className={style.right}>
              {
                getSelectedComponent()
              }
            </div>
          </div>
        </DialogBox>
      )}
    </section>
  );
};



interface MenuButtonProps {
  optionType: selectedButtonType,
  optionName: string,
  currentSelectedButton: selectedButtonType,
  setCurrentSelectedButton: Dispatch<SetStateAction<selectedButtonType>>
}

const MenuButton: React.FC<MenuButtonProps> = ({ optionType, optionName, currentSelectedButton, setCurrentSelectedButton }) => {
  return (
    <button
      className={
        currentSelectedButton === optionType ? style.active_btn : ""
      }
      onClick={() => setCurrentSelectedButton(optionType)}
    >
      {optionName}
    </button>
  )
}

export default UserVerifications;