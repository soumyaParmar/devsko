"use client"
import React from 'react'
import ContentSection from './ContentSection'
import InterviewCard, { InterviewCardLoading } from './InterviewCard'
import useRecommInterviewsFetch from '@/hooks/useRecommInterviewsFetch'



const RecommendedInterviews = () => {

  const { data: recommendedInterviews } = useRecommInterviewsFetch()

  
  return (
    <ContentSection
      heading='Recommended Interviews'
      loading={false}
      LoadingComponent={InterviewCardLoading}
      list={recommendedInterviews}
      ItemComponent={InterviewCard}
      minCount={4} />
  )
}

export default RecommendedInterviews