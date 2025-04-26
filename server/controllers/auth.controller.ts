import authService from "../services/AuthService";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { IAuthResponse, IUpdateDetails } from "../types/auth";
import { asyncWrapper } from "../utils/asyncWrapper";

export const registerController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const { token, newUser } = await authService.registerUser(req);

        res.cookie("jwt", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        });

        const response = new ApiResponse(201, { newUser, token } as IAuthResponse, "User registered successfully");
        res.status(response.statusCode as number).json(response);
    } catch (error) {
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiResponse(status, {} as any, message));
    }
})

export const loginController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const { token, user } = await authService.loginUser(req);

        res.cookie("jwt", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        });

        const response = new ApiResponse(200, { token, user } as IAuthResponse, "Login successful");
        res.status(response.statusCode as number).json(response);
    } catch (error) {
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiResponse(status, {} as any, message));
    }
})

export const logoutController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const result = await authService.logoutUser();

        res.cookie("jwt", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1,
        });

        const response = new ApiResponse(200, result as any, result.message);
        res.status(response.statusCode as number).json(response);
    } catch (error) {
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiResponse(status, {} as any, message));
    }

})

export const updateController = asyncWrapper(async (req: Request, res: Response) => {
    try {

        const user: IUpdateDetails | null = await authService.updateProfile(req);

        if (!user) {
            throw new ApiError("Failed To Update the User", 505);
        }

        res.status(202).json(new ApiResponse(202,user,"User details updated successfully" ))


    } catch (error) {
        throw new ApiError("Internal Server Error", 505);
    }


})
