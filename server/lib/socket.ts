import { Server } from "socket.io";

let io: Server;
const onlineUsers = new Map<string, string>(); // userId => socketId

export const registerSocketServer = (serverIO: Server) => {
  io = serverIO;

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    const userId = socket.handshake.query.userId as string;

    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("👥 Online Users:", Array.from(onlineUsers.keys()));
    }

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);

      for (const [uid, sid] of onlineUsers.entries()) {
        if (sid === socket.id) {
          onlineUsers.delete(uid);
          break;
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};

export { io };
