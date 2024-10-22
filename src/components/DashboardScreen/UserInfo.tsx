'use client'
import React from 'react'
import style from '@/styles/DashboardScreen/user_info.module.css'
import ExtendedTextBox from '../ui/ExtendedTextBox'
import ProgressBar from '../ui/ProgressBar'
import Button from '../ui/Button'
import Image from 'next/image'
// import { useAppSelector } from '@/utils/store/hooks'
import img from '../../../public/interviewer.webp'

const UserInfo = () => {
  // const { firstName, lastName,profilePic} = useAppSelector((state) => state.userInfo);
  const aboutUser = 'Passionate UI designer with 5+ years of experience crafting intuitive and visually appealing interfaces. Expert in user-centered';
  const handleUpdateRedirect = () => {

  }
  return (
    <div className={style.user_info}>
      <div className='flex flex-col gap-3'>
        {/* user image  */}
        <div className={style.gradient_space_behind}>
          <div className={style.profile_image}>
            <Image alt='' width={100} height={100} src={img} />
          </div>
        </div>
        {/* user name and designation */}
        <div className={style.name_designation}>
          <span>{`${"John"} ${"Carter"}`}</span>
        </div>
        {/* about user  */}
        <div className='flex flex-col gap-0.5'>
          <span className='text-md'>About</span>
          <ExtendedTextBox text={aboutUser} minWords={10} />
        </div>
        {/* profile completion */}
        <ProgressBar heading='Complete your profile' percentage={40} />
        <Button value='Update Profile' onClick={handleUpdateRedirect} />
      </div>
    </div>
  )
}

export default UserInfo
