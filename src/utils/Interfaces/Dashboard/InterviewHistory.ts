export interface InterviewHistoryProps {
  interview_name: string;
  company: string;
  total_rounds: number;
  completed_rounds: number;
  status: "Completed" | "Pending" | "Cancelled";
}
