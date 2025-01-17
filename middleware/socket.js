import groupChatModal from "../modals/groupChatModal.js";

export const setUpSocket = (io) => {
  // middleware for hand shaking before creating socket connection
  io.use((socket, next) => {
    // get the room passed from client
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    // if room is not available then throw error
    if (!room) {
      return next(new Error("Invalid Room! please pass correct room ID"));
    }

    socket.room = room;
    next();
  });

  // socket connection if room is available
  io.on("connection", (socket) => {
    // join the room
    socket.join(socket.room);

    socket.on("message", async (data) => {
      // socket.broadcast.emit("message", data);
      await groupChatModal.create({
        group: data.group,
        chat_groupUUID: data.group_id,
        message: data.message,
        name: data.name,
      });

      // emitting the message to the room
      socket.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });
};
