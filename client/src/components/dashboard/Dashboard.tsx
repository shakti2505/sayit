import React from "react";
import DashNav from "./DashNav";
import CreateChatGroup from "../groupChat/pages/CreateChatGroup";
import GroupChatCard from "../groupChat/pages/GroupChatCard";


const Dashboard: React.FC = () => {
 
  return (
    <>
      <DashNav />
      <div className="container">
        {/* <div className="flex justify-end mt-24 fixed  w-full">
          <CreateChatGroup />
        </div> */}
        <div className="flex mt-20 ">
        <GroupChatCard/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
