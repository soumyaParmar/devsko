import { getDateStrings } from '@/helpers/getDateStrings';
import { InterviewRecord } from '@/models/InterviewRecord';
import React from 'react'

const InterviewHistoryTile: React.FC<InterviewRecord> = (interviewRecord) => {
  const { interviewId, name, startTime } = interviewRecord;

  const { dayOfMonth, month, year } = getDateStrings(startTime);
  const handleViewReport = () => {
    console.log(interviewId)
  }

  return (
    <div className='p-3 bg-slate-100 flex items-center text-sm gap-2 w-full rounded-[12px]'>
      <div className='bg-slate-100 flex flex-col items-center text-sm'>
        <span className='font-medium'>{dayOfMonth}</span>
        <span>{`${month} ${year}`}</span>
      </div>
      <div className='h-full w-[1px] bg-gray-200' />
      <div className='flex flex-col gap-1'>
        <span className='font-medium'>
          {name}
        </span>
        <div className='text-xs' onClick={handleViewReport}>
          View Report
        </div>
      </div>
    </div>

  )
}

export default InterviewHistoryTile