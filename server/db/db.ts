import { MongoClient } from "mongodb";

const connectDB = async () => {
    try {
        const connection = await MongoClient.connect(process.env.MONGODB_URI || "")

        if (connection) {
            console.log("Connected With the Database successfully");
        }
        else {
            console.log("Failed To Connect with The Database");
        }
    }catch(error){
        console.error("Error While Connecting With the Database");
    }

}

export default connectDB;