import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin:["*",'http://localhost:5173'],
    credentials: true,
}))

import authRouter from "./routes/auth.route";
app.use("/api/auth",authRouter);


import messageRouter from "./routes/message.route";
app.use("/api/messages",messageRouter);

export default app;