import { Server } from "socket.io";

let io: Server;

export const registerSocketServer = (serverIO: Server) => {
  io = serverIO;

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("message", (data) => {
      console.log("📨 Message received:", data);
      io.emit("message", data); // broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

export { io };
