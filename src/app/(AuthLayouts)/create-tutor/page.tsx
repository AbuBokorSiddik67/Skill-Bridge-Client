import CreateTutorForm from "@/components/create-tutor";
import { getUser } from "@/services/auth";
import React from "react";

export default async function CreateTutor() {
  const me = await getUser();
  return (
    <div>
      <CreateTutorForm userId={ me?.id} />
    </div>
  );
}
