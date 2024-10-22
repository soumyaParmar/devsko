import Image from 'next/image'
import React from 'react'
import profilePic from '@/assets/dashboard/profile-pic.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppSelector } from '@/utils/store/hooks';

const ProfileSetting = () => {

    const { firstName, lastName } = useAppSelector((state) => state.userInfo);
    const handleProfileOptionsOpen = () => {

    }
    return (
        <div className='flex gap-3 items-center'>
            <div className=' h-11 w-11 rounded-full overflow-hidden'>
                <Image alt='' src={profilePic} />
            </div>
            <div className='flex flex-col'>
                <span className='font-semibold'>
                   {`${firstName} ${lastName}`}
                </span>
                <span className='font-light'>
                    Pro Member
                </span>
            </div>
            <div className='cursor-pointer' onClick={handleProfileOptionsOpen}>
                <KeyboardArrowDownIcon />
            </div>
        </div>
    )
}

export default ProfileSetting