import { MongoClient } from "mongodb";

const connectDB = async () => {
    try {
        const mongoURI=process.env.MONGODB_URI;
        if(mongoURI){
        const client = new MongoClient(mongoURI);
            const connection=await client.connect();
        if (connection) {
            console.log("Connected With the Database successfully");
        }
        else {
            console.log("Failed To Connect with The Database");
        }}else{
            console.log("The URI is not available...");
        }

    }catch(error){
        console.error("Error While Connecting With the Database");
    }

}

export default connectDB;