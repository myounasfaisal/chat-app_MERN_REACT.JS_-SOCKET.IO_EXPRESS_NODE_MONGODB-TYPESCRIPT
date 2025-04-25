import authService from "../services/AuthService";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { IAuthResponse } from "../types/auth";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { token, newUser } = await authService.registerUser(req);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    const response = new ApiResponse(201, {  newUser,token } as IAuthResponse, "User registered successfully");
    return res.status(response.statusCode as number).json(response);
  } catch (error) {
    const status = error instanceof ApiError ? error.statusCode : 500;
    const message = error instanceof ApiError ? error.message : "Internal Server Error";
    return res.status(status).json(new ApiResponse(status, {} as any, message));
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { token, user } = await authService.loginUser(req);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    const response = new ApiResponse(200, { token, user } as IAuthResponse, "Login successful");
    return res.status(response.statusCode as number).json(response);
  } catch (error) {
    const status = error instanceof ApiError ? error.statusCode : 500;
    const message = error instanceof ApiError ? error.message : "Internal Server Error";
    return res.status(status).json(new ApiResponse(status, {} as any, message));
  }
};

export const logoutController = async (_req: Request, res: Response) => {
  try {
    const result = await authService.logoutUser();

    res.cookie("jwt", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1,
    });

    const response = new ApiResponse(200, result as any, result.message);
    return res.status(response.statusCode as number).json(response);
  } catch (error) {
    const status = error instanceof ApiError ? error.statusCode : 500;
    const message = error instanceof ApiError ? error.message : "Internal Server Error";
    return res.status(status).json(new ApiResponse(status, {} as any, message));
  }
};
