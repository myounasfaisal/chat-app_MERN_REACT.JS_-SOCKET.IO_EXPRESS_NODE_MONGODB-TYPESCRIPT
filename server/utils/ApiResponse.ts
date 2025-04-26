import { IAuthResponse, IUpdateDetails, IUser } from "../types/auth";

export class ApiResponse {

    statusCode: Number;
    Data: IAuthResponse | IUpdateDetails;
    message: string;
    success: boolean;

    constructor(statusCode: Number, Data: IAuthResponse | IUpdateDetails, message = "Success") {

        this.statusCode = statusCode;
        this.Data = Data;
        this.message = message;
        this.success = true;
    }
}

