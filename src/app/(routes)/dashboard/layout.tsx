'use client';
import UserInfo from '@/components/DashboardScreen/UserInfo';
import React, { ReactNode } from 'react'

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {


  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='max-w-[356px] min-w-80 shadow-type2 z-30 bg-[#F9FAFB]'>
        <div className='logo text-3xl font-medium p-4'>Devsko</div>
        <div className='h-full w-full  overflow-y-scroll no-scrollbar rounded-[12px] p-[14px] '>
          <UserInfo />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Layout