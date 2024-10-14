/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getData } from "@/lib/api";
// import { QuestionProps } from "../Interfaces/Interview/questionProps";

// let questions: QuestionProps[] = [];

// async function getQuestion() {
//   const res = await getData("questions/random");
//   const y = res?.data;
//   if (res && res.data) {
//     const questionArr: QuestionProps[] = [];
//     const questionsData = y;
//     questionsData?.data?.forEach((element:any) => {
//       questionArr.push({
//         id: element.id,
//         question_text: element.question_text,
//       });
//     });
//     return questionArr;
//   } else {
//     console.error("some error occurs:", res);
//     return [];
//   }
// }

// export async function fetchQuestion() {
//   questions = await getQuestion();
// }
// async function initializeQuestions() {
//   await fetchQuestion(); 
// }


// initializeQuestions(); 

const questions = [
  {
    id: 11,
    question_text: "Please introduce yourself?",
    experience_id: 1,
    question_type_id: 1,
    technology_id: 1,
    difficulty_level: "Intermediate",
    weightage: 5,
    parent_question_ids: [101, 102],
    keywords: ["concurrency", "parallelism", "multi-threading"],
    followup_question_ids: [201, 202],
    is_obsolete: false,
    is_deleted: false,
    created_at: "2024-10-04T16:07:07.70202+05:30",
    updated_at: "2024-10-04T16:07:07.70202+05:30",
    expected_responses: {
      correct: [
        "Concurrency is about dealing with multiple tasks at once.",
        "Parallelism is about executing multiple tasks at the same time."
      ]
    },
    bucket_id: 1
  },
]

export { questions };

