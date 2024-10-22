import React from 'react'
import IconButton, { IconButtonType } from '../ui/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileSetting from './ProfileSetting';

const DashboardHeader = () => {
  const handleNotificationRedirect = () => {

  }
  const handleSettingRedirect = () => {

  }
  return (
    <div className='flex w-full z-20 items-center justify-between px-4 p-2 shadow'>
      <div id='logo' className='text-[32px] font-semibold'>
        Dashboard
      </div>
      <div className='flex gap-7 items-center'>
        <div className='flex gap-4'>
          <IconButton onClick={handleNotificationRedirect} type={IconButtonType.LIGHT} Icon={NotificationsIcon} />
          <IconButton onClick={handleSettingRedirect} type={IconButtonType.LIGHT} Icon={SettingsIcon} />
        </div>
        <ProfileSetting />
      </div>
    </div>
  )
}

export default DashboardHeader