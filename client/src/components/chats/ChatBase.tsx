import { useEffect, useMemo } from "react";
import { getSocket } from "../../lib/socket.config";
import { Button } from "../ui/button";

export const ChatBase = () => {

  let socket = useMemo(() => {
    const socket = getSocket();
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

  const handleClick = () => {
    socket.emit("message", { name: "shakti" });
  };

  return (
    <div>
      <Button onClick={handleClick}>send message</Button>
    </div>
  );
};

export default ChatBase;
