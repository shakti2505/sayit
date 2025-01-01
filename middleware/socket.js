
export const setUpSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);

    socket.on("message", (data) => {
      console.log("client side message", data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });
};
