import EditAccount from '@/components/edit-profile';
import { getMe } from '@/services/auth'
import React from 'react'

export default async function EditProfile() {
    const userData = await getMe();
  return (
    <div>
      <EditAccount userData={userData} />
    </div>
  );
}
