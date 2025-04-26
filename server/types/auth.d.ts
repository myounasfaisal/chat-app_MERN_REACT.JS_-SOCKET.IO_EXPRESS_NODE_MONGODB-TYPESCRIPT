import { Jwt } from "jsonwebtoken";
import { Document } from "mongoose";
export interface IUser extends Document {
    _id: string,
    name: string,
    email: string,
    password: string,
    DoB: string,
    profilePic: string,
    comparePassword: (password: string) => Promise<boolean>;
}

export interface IAuthResponse {
    user?: IUser,
    newUser?: IUser,
    token?: Jwt | string | null
}

export interface IUpdateDetails {
    name?:string,
    email?: string,
    password?: string,
    DoB?: string,
    profilePic?: string
}