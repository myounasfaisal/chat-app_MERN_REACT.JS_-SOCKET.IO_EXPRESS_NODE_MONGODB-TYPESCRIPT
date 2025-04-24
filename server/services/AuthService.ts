import User,{IUser} from "../models/user.model";
import { Types,Document} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";

class AuthService {

    generateTokens = (userId: Types.ObjectId | string): string | void => {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
            return jwt.sign({ userId }, jwtSecret, {
                expiresIn: "7d",
            });
        } else {
            console.error("JWT Secret is not available");
        }
    }
    
    registerUser = async (request: Request) : Promise<{token:string ,newUser:IUser}> => {
        try {
            const { email, password, name, DoB, profilePic } = request.body;

            if (!email || !password || !name || !DoB) {
                throw new Error("Missing required fields");
            }

            if (password.length < 6) {
                throw new Error("Password should be at least 6 characters");
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // 🌩️ Add cloudinary logic here to upload profilePic if needed

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                DoB,
                profilePic:profilePic || "",
            });
            const token =this.generateTokens(newUser._id);
            if(!token){
                throw new Error("Failed to generate Token");
            }
            return {token,newUser};
        } catch (error) {
            throw error;
        }
    };

    loginUser = async (request: Request) : Promise<{token:string,user:IUser}> => {
        try {
            const { email, password } = request.body;

            if (!email) {
                throw new Error("Email is required");
            }
            if (!password) {
                throw new Error("Password is required");
            }
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                throw new Error("Invalid credentials");
            }

            const token = this.generateTokens(user._id);
            if(!token){
                throw new Error("Token Not Generated");
            }
            return { token, user };
        } catch (error) {
            throw error;
        }
    };

    logoutUser = async (): Promise<{message:string}> => {
    
        return { message: "Logout successful (client should delete token)" };
    };
}

 const authService= new AuthService();

 export default authService;