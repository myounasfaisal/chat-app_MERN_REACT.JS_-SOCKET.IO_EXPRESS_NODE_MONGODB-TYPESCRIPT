import mongoose from "mongoose"

export interface IMessage extends mongoose.Document {

    senderId: mongoose.Types.ObjectId | string,
    
    recieverId: mongoose.Types.ObjectId | string,
    
    text?: string | null | undefined,
    
    image?: string | null | undefined

}

export interface IMessageResponse {
    message?: IMessage
}