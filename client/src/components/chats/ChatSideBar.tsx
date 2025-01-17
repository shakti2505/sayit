import React, { useEffect } from "react";
import type { AppDispatch } from "../../store/store"; // Import AppDispatch type
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupUsers } from "./services/chatGroupServices";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store/store"; // Import AppDispatch type
import { Button } from "../ui/button";

interface Props {
  // define your props here
}

const ChatSidebar: React.FC<Props> = () => {
  const navigate = useNavigate();
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
      <div className="flex flex-row justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-blue-300"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M11 6L5 12M5 12L11 18M5 12H19"
            ></path>
          </svg>
        </button>
        <h1 className="text-2xl font-semibold py-4 ">Members</h1>
      </div>
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
