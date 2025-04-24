import { IUser } from "../models/user.model";

export class ApiResponse {

    statusCode: Number;
    Data: IUser;
    message: string;
    success: boolean;

    constructor(statusCode: Number, Data: IUser, message = "Success") {

        this.statusCode = statusCode;
        this.Data = Data;
        this.message = message;
        this.success = true;
    }
}

