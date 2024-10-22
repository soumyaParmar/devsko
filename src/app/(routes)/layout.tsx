// 'use client';
// import useUserFetch from '@/hooks/useUserFetch';
// import { CircularProgress } from '@mui/material';
// import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  // const router = useRouter();
  // const { loading, data } = useUserFetch();
  
  // if (loading) {
  //   return <div className="flex justify-center items-center h-screen" > <CircularProgress /></div >
  // }

  // if (!data) {
  //   router.push("/useronboarding/1")
  // }

  return (
    <>{children}</>
  )
}

export default Layout