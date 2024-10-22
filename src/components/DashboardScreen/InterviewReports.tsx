"use client"
import React from 'react'
import ContentSection from './ContentSection'
import InterviewHistoryTile from './InterviewHistoryTile'
import useInterviewHistoryFetch from '@/hooks/useInterviewHistoryFetch'

const InterviewReports = () => {
  const { data: interviewHistory} = useInterviewHistoryFetch();

  // if (error || !interviewHistory) {
  //   <div>Oops something went wrong</div>
  // }

  return (
    <div className='bg-white shadow-type1 py-6 px-4 rounded-[12px]'>
    <ContentSection heading='Interview history' loading={false} list={interviewHistory} ItemComponent={InterviewHistoryTile}/>
    </div>
  )
}

export default InterviewReports