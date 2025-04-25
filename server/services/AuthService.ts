import User from "../models/user.model";
import { IAuthResponse, IUser } from "../types/auth";
import { Types, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { ApiError } from "../utils/ApiError"; 

class AuthService {
  generateTokens = (userId: Types.ObjectId | string): string => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new ApiError("JWT Secret is not available", 500);
    }
    return jwt.sign({ userId }, jwtSecret, {
      expiresIn: "7d",
    });
  };

  registerUser = async (request: Request): Promise<IAuthResponse> => {
    const { email, password, name, DoB, profilePic } = request.body;

    if (!email || !password || !name || !DoB) {
      throw new ApiError("Missing Email", 400);
    }

    if (!password) {
        throw new ApiError("Missing password", 400);
      }

      if (!name) {
        throw new ApiError("Missing name", 400);
      }

      if ( !DoB) {
        throw new ApiError("Missing Date of Birth", 400);
      }

    if (password.length < 6) {
      throw new ApiError("Password should be at least 6 characters", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError("User with this email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🌩️ Add cloudinary logic here to upload profilePic if needed

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      DoB,
      profilePic: profilePic || "",
    });

    const token = this.generateTokens(newUser._id);
    return {  newUser,token };
  };

  loginUser = async (request: Request): Promise<IAuthResponse> => {
    const { email, password } = request.body;

    if (!email) {
      throw new ApiError("Email is required", 400);
    }
    if (!password) {
      throw new ApiError("Password is required", 400);
    }

    const user = await User.findOne({ email });
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
}

const authService = new AuthService();
export default authService;
