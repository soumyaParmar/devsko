import { InterviewRecord, interviewRecordMapper } from '@/models/InterviewRecord';
// import useApiQuerry from './useApiQuerry'
// import { useAppSelector } from '@/utils/store/hooks';
// import { interviewHistoryGetEP } from '@/lib/endPoints';

const useInterviewHistoryFetch = () => {
    // const userId = useAppSelector((state) => state.userInfo.userId)
    // const { data, error, loading } = useApiQuerry<Array<InterviewRecordB>>({ endPoint: interviewHistoryGetEP(userId), dependencies });


    let interviewHistory: InterviewRecord[] = [];

    const data =  [
        {
            "interviewid": 10,
            "name": "TypeScript Interview",
            "startTime": "2024-10-03T11:00:00Z"
        },
        {
            "interviewid": 15,
            "name": "ASP.NET Interview",
            "startTime": "2024-10-04T11:00:00Z"
        }
    ]

    if (data) {
        interviewHistory = interviewRecordMapper(data)
    }

    return { data: interviewHistory }
}

export default useInterviewHistoryFetch