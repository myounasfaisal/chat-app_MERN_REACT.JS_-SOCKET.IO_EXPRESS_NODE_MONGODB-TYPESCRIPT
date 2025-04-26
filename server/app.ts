import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
    credentials: true,
}))

import authRouter from "./routes/auth.route";
app.use("/api/auth",authRouter);


import messageRouter from "./routes/message.route";
app.use("/api/message",messageRouter);

export default app;