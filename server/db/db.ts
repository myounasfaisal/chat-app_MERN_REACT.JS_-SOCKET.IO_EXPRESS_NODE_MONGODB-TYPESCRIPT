import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            console.log("❌ MongoDB URI not found in environment variables");
            return;
        }

        const connection = await mongoose.connect(mongoURI, {
            dbName: "chatapp", // ✅ explicitly mention DB name if needed
        });

        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("❌ Error while connecting to MongoDB:", error);
        process.exit(1); // Optional: crash if DB fails
    }
};

export default connectDB;
