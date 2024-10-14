/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EnrollCardProps {
  img: any;
  course_name: string;
  course_tutor: string;
  total_lessons: number;
  completed_lessons: number;
}

export interface RecommandCardProps {
  img: any;
  course_name: string;
  course_tutor: string;
  flag: boolean;
  price: number;
  base_price: number;
}

export interface TestCardProps {
  testType: string;
  testName: string;
  testDesc: string;
  bgColor?: any;
  btnText: string;
  testPrice: string;
  isDisabled?: boolean;
  handleClick?: () => void;
}
