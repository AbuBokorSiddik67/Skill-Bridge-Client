import { getAllTutors } from '@/services/tutors';
import React from 'react'

export default async function AllTutors() {
  const tutors = await getAllTutors();
  console.log(tutors)
  return (
    <div>All Tutor Page</div>
  )
}
