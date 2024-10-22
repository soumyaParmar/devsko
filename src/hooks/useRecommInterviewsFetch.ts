import { RecommInterview, recommInterviewMapper } from '@/models/RecommInterview';
// import useApiQuerry from './useApiQuerry'
// import { useAppSelector } from '@/utils/store/hooks';
// import { recommendedInterviewsGetEP } from '@/lib/endPoints';

const useRecommInterviewsFetch = () => {
    // const userId = useAppSelector((state) => state.userInfo.userId)
    // const { data, error, loading } = useApiQuerry<Array<RecommInterviewB>>({ endPoint: recommendedInterviewsGetEP(userId) });

    const data = [
        {
            "interviewid": 6,
            "intervieworder": 0,
            "interviewname": "Java Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 7,
            "intervieworder": 0,
            "interviewname": "Golang Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 8,
            "intervieworder": 0,
            "interviewname": "C# Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 9,
            "intervieworder": 0,
            "interviewname": "JavaScript Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 10,
            "intervieworder": 0,
            "interviewname": "TypeScript Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 11,
            "intervieworder": 0,
            "interviewname": "Python Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 12,
            "intervieworder": 0,
            "interviewname": "HTML Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 13,
            "intervieworder": 0,
            "interviewname": "CSS Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 14,
            "intervieworder": 0,
            "interviewname": "Spring Boot Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 15,
            "intervieworder": 0,
            "interviewname": "ASP.NET Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 16,
            "intervieworder": 0,
            "interviewname": "GoFiber Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 17,
            "intervieworder": 0,
            "interviewname": "React Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 18,
            "intervieworder": 0,
            "interviewname": "Angular Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 19,
            "intervieworder": 0,
            "interviewname": "Vue.js Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 20,
            "intervieworder": 0,
            "interviewname": "Django Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 21,
            "intervieworder": 0,
            "interviewname": "PostgreSQL Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 22,
            "intervieworder": 0,
            "interviewname": "MySQL Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 23,
            "intervieworder": 0,
            "interviewname": "MongoDB Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 24,
            "intervieworder": 0,
            "interviewname": "SQLite Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 25,
            "intervieworder": 0,
            "interviewname": "Oracle Database Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 26,
            "intervieworder": 0,
            "interviewname": "Web Development Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        },
        {
            "interviewid": 27,
            "intervieworder": 0,
            "interviewname": "Data Science Interview",
            "weightage": 0,
            "credits": 100,
            "difficultylevel": 1,
            "durationinminutes": 30
        }
    ]
    let recommInterviews: RecommInterview[] = [];

    if (data) {
        recommInterviews = recommInterviewMapper(data)
    }

    return { data: recommInterviews }
}

export default useRecommInterviewsFetch