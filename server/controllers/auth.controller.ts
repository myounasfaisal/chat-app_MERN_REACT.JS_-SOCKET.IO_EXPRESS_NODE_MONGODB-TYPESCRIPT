import authService from "../services/AuthService";
import { Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";

export const registerController = asyncWrapper(async (req: Request, res: Response) => {
    const { token, newUser } = await authService.registerUser(req);


    res.cookie("jwt", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production", // Set to false in development
        sameSite: "none", // Required for cross-origin cookies
        maxAge: 15 * 60 * 1000, // 15 minute
      });
  

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            token,
            user: newUser,
        },
    });
});

export const loginController = asyncWrapper(async (req: Request, res: Response) => {
    const { token, user } = await authService.loginUser(req);

    res.cookie("jwt", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production", // Set to false in development
        sameSite: "none", // Required for cross-origin cookies
        maxAge: 15 * 60 * 1000, // 15 minute
      });

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token,
            user,
        },
    });
});

export const logoutController = asyncWrapper(async (_req: Request, res: Response) => {
    const result = await authService.logoutUser();

    res.cookie("jwt", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production", // Set to false in development
        sameSite: "none", // Required for cross-origin cookies
        maxAge: 1, // 15 minute
      });

    res.status(200).json({
        success: true,
        message: result.message,
    });
});
