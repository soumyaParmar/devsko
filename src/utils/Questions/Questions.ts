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
  {
    id: 6,
    question_text: "What are the SOLID principles, and how do they contribute to improving the design and maintainability of our low-level design (LLD) projects?",
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
    created_at: "2024-10-04T16:04:29.021954+05:30",
    updated_at: "2024-10-04T16:04:29.021954+05:30",
    expected_responses: {
      correct: [
        "Concurrency is about dealing with multiple tasks at once.",
        "Parallelism is about executing multiple tasks at the same time."
      ]
    },
    bucket_id: 1
  },
  // {
  //   id: 8,
  //   question_text: "Can you explain how Node.js handles concurrency and whether it is truly a single-threaded environment? What implications does this have for building scalable applications?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:05:02.609262+05:30",
  //   updated_at: "2024-10-04T16:05:02.609262+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 4,
  //   question_text: "What is your understanding of RESTful APIs, and how have you approached implementing them in your projects?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:03:41.486155+05:30",
  //   updated_at: "2024-10-04T16:03:41.486155+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 9,
  //   question_text: "How does inheritance work in JavaScript, and what are the differences between class-based and prototype-based approaches?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:06:23.499882+05:30",
  //   updated_at: "2024-10-04T16:06:23.499882+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 5,
  //   question_text: "What is your understanding of debouncing, and why might it be necessary? Can you share any experiences where you’ve implemented it in your projects?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:04:03.493134+05:30",
  //   updated_at: "2024-10-04T16:04:03.493134+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 13,
  //   question_text: "What are environment variables, their purpose, and how do you set environment variables in a Node.js application?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:07:59.097623+05:30",
  //   updated_at: "2024-10-04T16:07:59.097623+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 15,
  //   question_text: "Can subclass overriding method declare an exception if the parent class doesn't throw an exception?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:08:53.398022+05:30",
  //   updated_at: "2024-10-04T16:08:53.398022+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 7,
  //   question_text: "What is your understanding of Object-Oriented Programming (OOPs), and what has been your experience working with it?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:04:41.388058+05:30",
  //   updated_at: "2024-10-04T16:04:41.388058+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // },
  // {
  //   id: 3,
  //   question_text: "What are some of the differences between SQL and NoSQL databases, and how do you decide when to use one over the other?",
  //   experience_id: 1,
  //   question_type_id: 1,
  //   technology_id: 1,
  //   difficulty_level: "Intermediate",
  //   weightage: 5,
  //   parent_question_ids: [101, 102],
  //   keywords: ["concurrency", "parallelism", "multi-threading"],
  //   followup_question_ids: [201, 202],
  //   is_obsolete: false,
  //   is_deleted: false,
  //   created_at: "2024-10-04T16:03:27.420572+05:30",
  //   updated_at: "2024-10-04T16:03:27.420572+05:30",
  //   expected_responses: {
  //     correct: [
  //       "Concurrency is about dealing with multiple tasks at once.",
  //       "Parallelism is about executing multiple tasks at the same time."
  //     ]
  //   },
  //   bucket_id: 1
  // }
];


export { questions };

