"use client"
import CreditDetails from '@/components/DashboardScreen/CreditDetails'
import DashboardContent from '@/components/DashboardScreen/DashboardContent'
import DashboardHeader from '@/components/DashboardScreen/DashboardHeader'
import InterviewReports from '@/components/DashboardScreen/InterviewReports'
// import ProfileAssessment from '@/components/DashboardScreen/ProfileAssessment'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-col flex-grow bg-[#F6F6F6FC]'>
      <DashboardHeader/>
      <div className='flex gap-2 w-full overflow-auto'>
        <div className='h-full w-full overflow-y-scroll no-scrollbar'>
          <DashboardContent />
        </div>
        <div className='flex flex-col sm:w-[580px] 2xl:w-[700px] gap-3 h-full p-4 overflow-y-scroll no-scrollbar'>
          <CreditDetails />
          <InterviewReports />
        </div>
      </div>
    </div>
  )
}

export default Dashboard