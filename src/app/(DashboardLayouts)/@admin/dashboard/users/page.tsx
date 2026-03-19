import UserManagement from '@/components/all-users'
import { getAllStudents } from '@/services/auth'
import React from 'react'

export default async function UserPage() {
const allStudent = await getAllStudents()
  return (
      <div>
          <UserManagement initialUsers={allStudent.data} />
    </div>
  )
}
