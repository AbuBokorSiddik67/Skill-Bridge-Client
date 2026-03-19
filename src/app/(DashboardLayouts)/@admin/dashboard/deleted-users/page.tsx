import DeletedUserManagement from '@/components/deleted-users'
import { deletedStudentProfile } from '@/services/auth'
import React from 'react'

export default async function DeleteUserPage() {
    const deletedUsersData = await deletedStudentProfile()
  return (
      <div>
          <DeletedUserManagement initialUsers={deletedUsersData.data}/>
    </div>
  )
}
