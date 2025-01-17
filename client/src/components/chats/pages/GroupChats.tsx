import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "../../../lib/socket.config";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store"; // Import AppDispatch type
import { useParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";

type groupChatUserType = {
  name: string;
  group_id: string;
  chatGroup: string;
};

type messageType = {
  group_id: string;
  message: string;
  name: string;
};

export default function GroupChats() {
  const { data } = useSelector(
    (ChatGroups: RootState) => ChatGroups.getGroupByID
  );
  const groupChats = useSelector(
    (ChatGroups: RootState) => ChatGroups.getGroupChat
  );

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<messageType>>(groupChats.data);

  const [chatUser, setChatUser] = useState<groupChatUserType>();
  const { group_id } = useParams();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const useAppDispatch: () => AppDispatch = useDispatch;
  //   const dispatch = useAppDispatch(); // Typed dispatch

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group_id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(()=>{
    console.log("messages",messages);
  },[messages])
  // fetching the chat user from local storage and parsing the data, setting it to state variable, groud_id passed as dependency.

  useEffect(() => {
    if (group_id) {
      const data = localStorage.getItem(group_id);
      if (data) {
        const pData = JSON.parse(data);
        setChatUser(pData);
      }
    }
  }, [group_id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload: messageType = {
      message: message,
      name: chatUser?.name ?? "Unknown",
      group_id: group_id ?? "",
    };
    console.log("payload:: ", payload);
    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.group_id}
              className={`max-w-sm rounded-lg p-2 ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-400 to-blue-600  text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
