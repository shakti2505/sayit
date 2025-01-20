import React, { useEffect, useState } from "react";
import type { AppDispatch } from "../../store/store"; // Import AppDispatch type
import { useDispatch, useSelector } from "react-redux";
import {
  generateGroupLink,
  getAllGroupUsers,
} from "./services/chatGroupServices";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store/store"; // Import AppDispatch type
import User_skeleton_loader from "../common/Skeleton loader/User_skeleton_loader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// import UserAvatar from "../common/UserAvatar";

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
  const [user, setUser] = useState<{ name: string; image: string } | null>(
    null
  );

  useEffect(() => {
    if (group_id) {
      dispatch(getAllGroupUsers(group_id));
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  return (
    <div className="hidden md:block h-screen overflow-y-scroll w-1/5 bg-muted px-2">
      <div className="flex flex-row justify-between items-center">
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={() => group_id && generateGroupLink(group_id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path
                    fill="#fff"
                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate Group Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <h1 className="text-2xl font-semibold py-4"></h1> */}
      </div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="bg-white rounded-md p-2 mt-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback>cn</AvatarFallback>
              </Avatar>
              <p className="font-bold"> {item.name}</p>
            </div>

            <p>
              Joined : <span>{new Date(item.createdAt).toDateString()}</span>
            </p>
          </div>
        ))
      ) : (
        <User_skeleton_loader />
      )}
    </div>
  );
};

export default ChatSidebar;
