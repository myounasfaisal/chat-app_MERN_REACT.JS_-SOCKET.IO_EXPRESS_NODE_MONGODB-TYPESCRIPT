import authService from "../services/auth.service";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { IAuthResponse, IUpdateDetails } from "../types/auth";
import { asyncWrapper } from "../utils/asyncWrapper";

export const signupController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const { token, newUser } = await authService.signupUser(req);

        res.cookie("jwt", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });

        const response = new ApiResponse(201, { newUser, token } as IAuthResponse, "User registered successfully");
        res.status(response.statusCode as number).json(response);
    } catch (error) {
        console.error("error : ",error);
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiError(message,status));
      }
})

export const loginController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const { token, user } = await authService.loginUser(req);

        res.cookie("jwt", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });

        const response = new ApiResponse(200, { token, user } as IAuthResponse, "Login successful");
        res.status(response.statusCode as number).json(response);
    } catch (error) {
        console.error("Login Error : ",error);
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiError(message,status));
     }
})

export const logoutController = asyncWrapper(async (req: Request, res: Response) => {
    try {
        const result = await authService.logoutUser();

        res.cookie("jwt", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1,
        });

        const response = new ApiResponse(200, result as any, result.message);
        res.status(response.statusCode as number).json(response);
    } catch (error) {
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiError(message,status));
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
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiError(message,status));
    
    }

})

export const checkAuthController=asyncWrapper(async(req:Request,res:Response)=>{
    try {
        
        const user : IAuthResponse=authService.checkAuth(req);
    
        res.status(202).json(new ApiResponse(202,user,"Authenticated User"));
    
        if(!user){
            throw new ApiError("User not found in the Body",404);
        }
    
    } catch (error) {
    
        const status = error instanceof ApiError ? error.statusCode : 500;
        const message = error instanceof ApiError ? error.message : "Internal Server Error";
        res.status(status).json(new ApiError(message,status));  
    }
        
    
    })
