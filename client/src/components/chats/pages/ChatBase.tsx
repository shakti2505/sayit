import { useEffect, useMemo, useState } from "react";
import { getSocket } from "../../../lib/socket.config";
import { useParams } from "react-router-dom";
import ChatSidebar from "../ChatSideBar";
import ChatNav from "../ChatNav";
import ChatUserDialog from "../ChatUserDialog";
import GroupChats from "./groupChats";

export const ChatBase = () => {
  const { group_id } = useParams();
  const [openAddNewUserDialog, setopenAddNewUserDialog] = useState(true);
  const [searchMessage, setSearchMessage]  = useState('');

  let socket = useMemo(() => {
    const socket = getSocket();
    // adding parameters in room,  a group ID
    socket.auth = {
      room: group_id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    // listening to the event
    socket.on("connect", () => {
      console.log("The socket is connected");
    });

    socket.on("message", (data) => {
      console.log("The socket message", data);
    });

    // clearing the socket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, [socket]);

  // const handleClick = () => {
  //   socket.emit("message", { name: "shakti" });
  // };

  return (
    <div className="flex">
      <ChatSidebar />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {openAddNewUserDialog ? (
          <ChatUserDialog
            open={openAddNewUserDialog}
            setOpen={setopenAddNewUserDialog}
          />
        ) : (
          <ChatNav setSerchMessage={setSearchMessage} />
        )}
        <GroupChats searchMessage={searchMessage} />
      </div>
    </div>
  );
};

export default ChatBase;
