import ProfilePage from "@/components/profile";
import { getMe } from "@/services/auth";
import React from "react";

export default async function MyProfile() {
  const myData = await getMe();
  return (
    <div>
      <ProfilePage userData={myData} />
    </div>
  );
}
