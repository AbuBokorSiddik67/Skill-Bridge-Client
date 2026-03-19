import TutorManagement from '@/components/all-tutors';
import { getAllTutors } from '@/services/tutors';
import React from 'react'

export default async function AllTutors() {
  const tutors = await getAllTutors();
  return (
    <div>
      <TutorManagement initialTutors={tutors?.data} />
    </div>
  )
}
