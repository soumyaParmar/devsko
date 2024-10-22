export type InterviewRecordB = {
    interviewid: number,
    name: string,
    startTime: string
}

export type InterviewRecord = {
    interviewId: number,
    name: string,
    startTime: string
}

export const interviewRecordMapper = (list: Array<InterviewRecordB>): Array<InterviewRecord> => {
    return list.map((item) => {
        return {
            interviewId: item.interviewid,
            name: item.name,
            startTime: item.startTime
        }
    })
}