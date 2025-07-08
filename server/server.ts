import { configDotenv } from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import connectDB from "./db/db";

// 1. Load env variables
configDotenv();

// 2. Create HTTP server from express app
const server = http.createServer(app);

// 3. Attach Socket.IO to the HTTP server
export const io = new Server(server, {
  cors: {
    origin: ["*",'http://localhost:5173'],
    credentials: true,
  },
});

// 4. Global Socket.IO reference (optional)
import { registerSocketServer } from "./lib/socket";
registerSocketServer(io);

// 5. Connect to DB and start server
const PORT = process.env.PORT || 5050;
server.listen(PORT, async () => {
  console.log("🚀 Server listening on port:", PORT);
  await connectDB();
});
