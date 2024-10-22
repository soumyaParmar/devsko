export type RecommInterviewB = {
    interviewid: number,
    intervieworder: number,
    interviewname: string,
    weightage: number,
    credits: number,
    difficultylevel: number,
    durationinminutes: number
}

export type RecommInterview = {
    interviewId: number,
    interviewOrder: number,
    interviewName: string,
    weightage: number,
    credits: number,
    difficultyLevel: number,
    durationInMinutes: number
}

export const recommInterviewMapper = (list: Array<RecommInterviewB>): Array<RecommInterview> => {
    return list.map((item) => {
        return {
            interviewId: item.interviewid,
            interviewOrder: item.intervieworder,
            interviewName: item.interviewname,
            weightage: item.weightage,
            credits: item.credits,
            difficultyLevel: item.difficultylevel,
            durationInMinutes: item.durationinminutes,
        }
    })
}