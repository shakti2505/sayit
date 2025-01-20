import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "../../../lib/socket.config";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store"; // Import AppDispatch type
import { useParams } from "react-router-dom";

interface GroupChatProps {
  searchMessage: string;
}
type groupChatUserType = {
  name: string;
  group_id: string;
  chatGroup: string;
};

type messageType = {
  _id: string;
  sender_id: string;
  createdAt: Date;
  group_id: string;
  message: string;
  name: string;
  isRead: boolean;
  isReceived: boolean;
};

const GroupChats: React.FC<GroupChatProps> = ({
  searchMessage,
}: GroupChatProps) => {
  // const { data } = useSelector(
  //   (ChatGroups: RootState) => ChatGroups.getGroupByID
  // );
  const groupChats = useSelector(
    (ChatGroups: RootState) => ChatGroups.getGroupChat
  );

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<messageType>>(groupChats.data);
  const [messageReceived, setMessagereceived] = useState(false);
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
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);

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

  const handleChange = (msg: string) => {
    setMessage(msg);
    setMessagereceived(false);
  };

  let groupedMessages;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const sender = JSON.parse(localStorage.getItem("user") || "");
    const payload: messageType = {
      isRead: false,
      isReceived: false,
      _id: "",
      sender_id: sender.id,
      createdAt: new Date(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      group_id: group_id ?? "",
    };
    socket.emit("message", payload, (response: { status: string }) => {
      if (response.status === "Message Received") {
        setMessagereceived(true);
      }
    });
    setMessage("");
    setMessages([...messages, payload]);
  };

  // function to group message by date
  const groupMessagesByDate = (messages: messageType[]) => {
    return messages.reduce<Record<string, messageType[]>>((groups, message) => {
      const dateKey = new Date(message.createdAt).toDateString(); // Group by "D"
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message); // Add message to the respective date
      return groups;
    }, {});
  };
  groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-[94vh] p-4 bg-red-50 rounded-md">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        {messages.length !== 0 ? (
          <div className="flex flex-col gap-2">
            {
              // Render the grouped messages
              Object.entries(groupedMessages).map(([date, messagesForDate]) => {
                if (messagesForDate[0].group_id === group_id) {
                  return (
                    <React.Fragment key={date}>
                      <div className="">
                        {/* Date Header */}
                        <div className="flex flex-row justify-center items-center w-full sticky top-0">
                          <div className="p-1 text my-4 text-xs bg-red-300 rounded-xl text-white">
                            {date}
                          </div>
                        </div>

                        {/* Messages for the Date */}
                        <div className="flex flex-col gap-2">
                          {messagesForDate
                            .filter((message) =>
                              message.message
                                .toLowerCase()
                                .includes(searchMessage)
                            )
                            .map((item) => {
                              return (
                                <>
                                  <div
                                    key={item?._id}
                                    className={`rounded-lg p-2 inline-block max-w-[45%] ${
                                      item.name === chatUser?.name
                                        ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                                        : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
                                    }`}
                                  >
                                    <span className="break-words">
                                      {item.message}
                                    </span>
                                    <div className="flex flex-row justify-end">
                                      <div className="text-xs flex flex-row items-center gap-2">
                                        {new Date(
                                          item.createdAt
                                        ).toLocaleTimeString()}
                                        {item.isReceived ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            width="15"
                                            height="15"
                                            // fill="#74C0FC"
                                            fill="#C2B3F0"
                                          >
                                            <path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" />
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            width="20"
                                            height="15"
                                          >
                                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              })
            }
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600 rounded-md">
            <div>
              <p className="text-white font-bold">Start new conversation... </p>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message and press enter to send...."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
    </div>
  );
};

export default GroupChats;
