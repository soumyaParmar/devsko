
import React from 'react'
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import Button from '../ui/Button';
import ExtendedTextBox from '../ui/ExtendedTextBox';
import { RecommInterview } from '@/models/RecommInterview';
import { LoadingButton, LoadingLines } from '../ui/LoadingComponents';
import { useRouter } from 'next/navigation';

const InterviewCard: React.FC<RecommInterview> = (recommInterview) => {
    const router = useRouter();
    const { credits, difficultyLevel, durationInMinutes, interviewName } = recommInterview;

    const handleStartInterview = () => { 
        router.push("/userverifications/1");
    }
    return (
        <div className=' md:w-[100%] xl:w-[calc(50%-4px)] 2xl:w-[calc(33%-10px)] 3xl:w-[calc(25%-12px)] bg-white rounded-2xl flex flex-col gap-2 p-3'>
            <div className='flex gap-4 items-center'>
                <div className='h-10 w-10 rounded-full bg-gray-300' />
                <div className='flex flex-col'>
                    <div>
                        {interviewName}
                    </div>
                    <div>
                        {`${credits} credits`}
                    </div>
                </div>
            </div>
            <div className='text-gray-600 text-sm h-full min-h-10'>
                <ExtendedTextBox minWords={8} text={interviewName} />
            </div>
            <div className='flex gap-2 items-center text-sm'>
                <div className='flex gap-2 items-center'>
                    <WatchLaterIcon />
                    <span>{`${durationInMinutes} min`}</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <InsertChartIcon />
                    <span>{difficultyLevel}</span>
                </div>
            </div>
            <Button value='Start Assessment' onClick={handleStartInterview} />
        </div>
    )
}

export const InterviewCardLoading: React.FC = () => {
    return (
        <div className=' md:w-[100%] xl:w-[calc(50%-4px)] 2xl:w-[calc(33%-10px)] 3xl:w-[calc(25%-12px)] bg-white rounded-2xl flex flex-col gap-2 p-3'>
            <div className='flex gap-4 items-center'>
                <div className='h-10 w-10 rounded-full bg-gray-300' />
                <div className='flex w-full flex-col gap-2'>
                    <div>
                        <LoadingLines />
                    </div>
                    <div>
                        <LoadingLines />
                    </div>
                </div>
            </div>
            <div className='text-gray-600 text-sm h-full min-h-10'>
                <LoadingLines noOfLines={3} />
            </div>
            <div className='flex gap-2 items-center text-sm'>
                <div className='flex gap-2 items-center'>
                    <LoadingLines />
                </div>
                <div className='flex gap-2 items-center'>
                    <LoadingLines />
                </div>
            </div>
            <LoadingButton />
        </div>
    )
}

export default InterviewCard