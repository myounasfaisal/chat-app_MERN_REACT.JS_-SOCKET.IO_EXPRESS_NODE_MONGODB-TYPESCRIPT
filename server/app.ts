import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
    credentials: true,
}))



export default app;