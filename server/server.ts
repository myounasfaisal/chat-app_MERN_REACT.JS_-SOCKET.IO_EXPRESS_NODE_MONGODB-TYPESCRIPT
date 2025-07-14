import { configDotenv } from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import connectDB from "./db/db";


configDotenv();


const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: ["*",'http://localhost:5173'],
    credentials: true,
  },
});


import { registerSocketServer } from "./lib/socket";
registerSocketServer(io);


const PORT = process.env.PORT || 5050;
server.listen(PORT, async () => {
  console.log("🚀 Server listening on port:", PORT);
  await connectDB();
});
