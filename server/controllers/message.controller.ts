import { Request, Response } from "express";
import messageService from "../services/message.service";
import { asyncWrapper } from "../utils/asyncWrapper";
import { IMessage, IMessageResponse } from "../types/message";
import { IUser } from "../types";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { io } from "../server";
import { onlineUsers } from "../lib/socket";

export const getUsersController = asyncWrapper(async (req: Request, res: Response) => {
    try {

        const users: IUser[] = await messageService.getUsersFromSideBar(req);

        if (!users) {
            throw new ApiError("Users were not filtered Properly", 424);
        }

        res.status(200).json(new ApiResponse(200, users, "Users fetched for the sidebar"))

    } catch (error) {

    }
})

export const getMessagesController = asyncWrapper(async (req: Request, res: Response) => {
    try {

        const messages: IMessage[] = await messageService.getMessages(req);
        if (!messages) {
            throw new ApiError("Failed To get All the Messages", 424);
        }

        res.status(200).json(new ApiResponse(200, messages, "Messages Fetched Successfully"));

    } catch (error) {

    }
})

export const sendMessageController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const message: IMessageResponse = await messageService.sendMessages(req);

        if (!message || !message.message) {
            throw new ApiError("Failed to write message", 424);
        }

        const receiverSocketId = onlineUsers.get(String(message.message.recieverId));
        const senderSocketId = onlineUsers.get(String(message.message.senderId));

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message.message);
            console.log("Reciever Id : ",receiverSocketId);
        }
        if (senderSocketId && senderSocketId !== receiverSocketId) {
            io.to(senderSocketId).emit("newMessage", message.message);
            console.log("Sender Id : ",senderSocketId);
        }

        res.status(200).json(
            new ApiResponse(200, message, "Message Created Successfully")
        );

    } catch (error) {
        console.error("Send Message Error:", error);
    }
});
