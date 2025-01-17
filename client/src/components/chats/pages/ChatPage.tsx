import React, { useEffect } from "react";
import ChatBase from "./ChatBase";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupsByID } from "../services/chatGroupServices";
import type { AppDispatch } from "../../../store/store"; // Import AppDispatch type
import { useDispatch } from "react-redux";
import { getGroupChatsByID } from "../services/groupChatsServices";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  const navigate = useNavigate();
  const { group_id } = useParams();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch
  // fetching groups chat by id

  useEffect(() => {
    if (!group_id) {
      navigate("/not-found");
    }
  }, [group_id, navigate]);

  useEffect(() => {
    if (group_id) {
      dispatch(getGroupsByID(group_id));
      dispatch(getGroupChatsByID(group_id));
    }
  }, [group_id]);

  return (
    <div>
      {/* <Button onClick={() => navigate("/dashboard")}>GO Back</Button> */}
      {/* <h1>Hellow I am chat!</h1> */}
      <ChatBase />
    </div>
  );
};

export default ChatPage;
