import { IAuthResponse, IUpdateDetails, IUser } from "../types/auth";
import { IMessage, IMessageResponse } from "../types/message";

export class ApiResponse {

    statusCode: Number;
    Data: IAuthResponse[] |IAuthResponse | IUpdateDetails | IUser[] | IMessageResponse | IMessage[] ;
    message: string;
    success: boolean;

    constructor(statusCode: Number, Data: IAuthResponse[] |IAuthResponse | IUpdateDetails | IUser[] | IMessageResponse | IMessage[] , message = "Success") {

        this.statusCode = statusCode;
        this.Data = Data;
        this.message = message;
        this.success = true;
    }
}

