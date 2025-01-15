export const setUpSocket = (io) => {


  // middleware for hand shaking before creating socket connection
  io.use((socket, next) => {
    // get the room passed from client
    const room = socket.handshake.auth.room || socket.handshake.headers.room
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

    socket.on("message", (data) => {
      console.log("client side message", data);
      // socket.broadcast.emit("message", data);

      // emitting the message to the room
      io.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });
};
