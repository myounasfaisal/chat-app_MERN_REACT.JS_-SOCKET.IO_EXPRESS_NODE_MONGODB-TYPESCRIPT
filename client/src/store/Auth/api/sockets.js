import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5050" : "/";

export const connect=(set , authUser)=>{
     const newSocket = io(BASE_URL, {
          query: {
            userId: authUser._id, // pass userId
          },
          withCredentials: true,
        });

        set({ socket: newSocket });

        newSocket.on("connect", () => {
          console.log("✅ Socket connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
          console.log("❌ Socket disconnected");
        });

        newSocket.on("onlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
}

export const disconnect =(set,socket)=>{
        if (socket && socket.connected) {
          socket.disconnect();
          set({ socket: null, onlineUsers: [] });
        }
    }
