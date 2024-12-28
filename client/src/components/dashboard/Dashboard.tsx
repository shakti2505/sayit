import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import CreateChatGroup from "../groupChat/CreateChatGroup";

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
  }, []);
  return (
    <>
      <DashNav />
      <div className="container">
        <div className="flex justify-end mt-10">
          <CreateChatGroup />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
