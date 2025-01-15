import React, { useEffect } from "react";
import ChatBase from "./ChatBase";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupChatByID } from "../services/chatGroupServices";
import type { AppDispatch } from "../../../store/store"; // Import AppDispatch type
import { useDispatch } from "react-redux";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  const navigate = useNavigate();
  const { group_id } = useParams();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch
  // fetching groups chat by id

  useEffect(() => {
    if (!group_id || group_id.length !== 36) {
      navigate("/not-found");
    }
  }, [group_id, navigate]);

  useEffect(() => {
    if (group_id) {
      dispatch(getGroupChatByID(group_id));
    }
  }, []);

  return (
    <div>
      {/* <Button onClick={() => navigate("/dashboard")}>GO Back</Button> */}
      {/* <h1>Hellow I am chat!</h1> */}
      <ChatBase />
    </div>
  );
};

export default ChatPage;
