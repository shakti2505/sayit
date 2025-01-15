import React, { useEffect } from "react";
import type { AppDispatch } from "../../store/store"; // Import AppDispatch type
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupUsers } from "./services/chatGroupServices";
import { useParams } from "react-router-dom";
import type { RootState } from "../../store/store"; // Import AppDispatch type

interface Props {
  // define your props here
}

const ChatSidebar: React.FC<Props> = () => {
  const { group_id } = useParams();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch
  const { data } = useSelector(
    (ChatGroupUsers: RootState) => ChatGroupUsers.getAllGroupUsers
  );

  useEffect(() => {
    if (group_id) {
      dispatch(getAllGroupUsers(group_id));
    }
  }, []);

  return (
    <div className="hidden md:block h-screen overflow-y-scroll w-1/5 bg-muted px-2">
      <h1 className="text-2xl font-extrabold py-4 ">Users</h1>
      {data.length > 0 &&
        data.map((item, index) => (
          <div key={index} className="bg-white rounded-md p-2 mt-2">
            <p className="font-bold"> {item.name}</p>
            <p>
              Joined : <span>{new Date(item.createdAt).toDateString()}</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default ChatSidebar;
