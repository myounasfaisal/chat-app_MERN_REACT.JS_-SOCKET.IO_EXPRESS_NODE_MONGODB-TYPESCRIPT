import { IAuthResponse, IUpdateDetails } from "../types/auth";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { ApiError } from "../utils/ApiError";
import { uploadOnCloudinary } from "../utils/fileUploadCloudinary";
import { UploadApiResponse } from "cloudinary";
import { User } from "../models/user.model";

class AuthService {

    generateTokens = (userId: Types.ObjectId | string): string => {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new ApiError("JWT Secret is not available", 500);
        }

        const token= jwt.sign({ userId }, jwtSecret, {
            expiresIn: "7d",
        })
        return token;
    };

    signupUser = async (request: Request): Promise<IAuthResponse> => {

            const { email, password, name, DoB } = request.body;
            const profilePic = request.file;

            if (!email) {
                throw new ApiError("Missing Email", 400);
            }

            if (!password) {
                throw new ApiError("Missing password", 400);
            }

            if (!name) {
                throw new ApiError("Missing name", 400);
            }

            if (!DoB) {
                throw new ApiError("Missing Date of Birth", 400);
            }

            if (password.length < 6) {
                throw new ApiError("Password should be at least 6 characters", 400);
            }

            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                throw new ApiError("User with this email already exists", 409);
            }


            let cloudinaryResponse: UploadApiResponse | undefined;

            if (profilePic) {
                cloudinaryResponse = await uploadOnCloudinary(profilePic.path)
            }

            const newUser = await User.create({
                name,
                email,
                password,
                DoB,
                profilePic: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
            });

            const token = this.generateTokens(newUser._id);
            console.log("Signup Token : ",token);
            return { newUser, token };
        
    };

    loginUser = async (request: Request): Promise<IAuthResponse> => {
        const { email, password } = request.body;

        if (!email) {
            throw new ApiError("Email is required", 400);
        }
        if (!password) {
            throw new ApiError("Password is required", 400);
        }

        const user = await User.findOne({ email:email });
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError("Invalid credentials", 401);
        }

        const token = this.generateTokens(user._id);
        return { token, user };
    };

    logoutUser = async (): Promise<{ message: string }> => {
        return { message: "Logout successful (client should delete token)" };
    };

    updateProfile = async (request: Request): Promise<IUpdateDetails | null> => {
        const { _id } = request.user;
        const profilePic = request.file;
    
        let detailsToUpdate: Partial<IUpdateDetails> = {};

        if(!profilePic){
            throw new ApiError("No profile picture Available", 404);
        }
    
        if (profilePic) {
            const cloudinaryResponse = await uploadOnCloudinary(profilePic.path);
            if (cloudinaryResponse) {
                detailsToUpdate.profilePic = cloudinaryResponse.secure_url;
            }
        }
    
        // If no profilePic in request, you can optionally throw an error or just return null
        if (!detailsToUpdate.profilePic) {
            throw new ApiError("No profile picture uploaded", 400);
        }
    
        const user = await User.findByIdAndUpdate(_id, detailsToUpdate, { new: true });
        return user ? user : null;
    };
    

    checkAuth = (req: Request): IAuthResponse => {
        return req.user
    }
}

const authService = new AuthService();
export default authService;
