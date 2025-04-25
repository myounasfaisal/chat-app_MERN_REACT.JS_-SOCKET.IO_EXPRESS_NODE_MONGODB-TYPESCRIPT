import { IAuthResponse, IUser } from "../types/auth";

export class ApiResponse {

    statusCode: Number;
    Data: IAuthResponse;
    message: string;
    success: boolean;

    constructor(statusCode: Number, Data: IAuthResponse, message = "Success") {

        this.statusCode = statusCode;
        this.Data = Data;
        this.message = message;
        this.success = true;
    }
}

