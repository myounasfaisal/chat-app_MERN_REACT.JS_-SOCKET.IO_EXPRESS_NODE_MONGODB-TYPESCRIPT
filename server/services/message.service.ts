import { Request } from "express"
import { ApiError } from "../utils/ApiError";
import {User} from "../models/user.model";
import { IUser } from "../types";
import Message from "../models/message.model";
import { IMessage, IMessageResponse } from "../types/message";
import { uploadOnCloudinary } from "../utils/fileUploadCloudinary";

class MessageService {
    getUsersFromSideBar = async (req: Request): Promise<IUser[]> => {

        const loggedInUser = req.user;

        if (!loggedInUser) {

            throw new ApiError("User Details not found", 402);

        }

        const filteredUsers = await User.find({ id: { $ne: loggedInUser._id } }).select("-password");
        if (!filteredUsers) {

            throw new ApiError("Failed to execute Query", 502);

        } else if (filteredUsers.length < 1) {

            console.log("There are no users")

        }

        return filteredUsers;

    }

    getMessages = async (req: Request): Promise<IMessage[]> => {

        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId }, { recieverId: myId, senderId: userToChatId }
            ]
        })
        if (!messages) {
            throw new ApiError("Failed to execute Query", 502);
        } else if (messages.length < 1) {

            console.log("There are no messages")

        }

        return messages;

    }

    sendMessages = async (req: Request) : Promise <IMessageResponse> => {
        const { text} = req.body;
        const {id: recieverId }=req.params;
        const {user}=req
        const { file } = req;
        if (!text && !file) {
            throw new ApiError("Either Send Text Or File", 422);
        }
        let imageUrl
        if (file) {
            const cloudinaryReponse = await uploadOnCloudinary(file.path);
            if (cloudinaryReponse) {
                imageUrl = cloudinaryReponse.secure_url;
            }
        }

        const message=await Message.create({
            senderId:user._id,
            recieverId:recieverId,
            text:text ? text : "",
            image:imageUrl ? imageUrl : ""
        })

        if(!message){
            throw new ApiError("Failed to Create Message",424);
        }

        return {message};

    }
}

const messageService=new MessageService();

export default messageService;