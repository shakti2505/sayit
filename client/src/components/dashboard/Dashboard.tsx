import React, { useEffect, useState } from "react";

interface UserInfo {
  image: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [userInfo, setuserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setuserInfo(JSON.parse(data));
    }
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <img src={userInfo?.image} alt="user" />
      <p>{userInfo?.name}</p>
      <p>{userInfo?.email}</p>
    </div>
  );
};

export default Dashboard;
