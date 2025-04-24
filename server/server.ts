import { configDotenv } from "dotenv";

configDotenv({});

import app from "./app";
import connectDB from "./db/db";

app.listen(5050, () => {
    console.log("Listening at Port : ", 5050);
    connectDB();
})