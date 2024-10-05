"use client";

import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  if (!session) {
    return <div>loading...</div>;
  }
  
  console.log(session);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};
export default ProfilePage;
