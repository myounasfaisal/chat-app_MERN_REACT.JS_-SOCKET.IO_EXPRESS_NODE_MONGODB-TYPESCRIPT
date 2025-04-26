import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncWrapper } from "../utils/asyncWrapper";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";


export const validateTokens = asyncWrapper(async (req: Request, _: Response, next: NextFunction) => {
    try {
        const accessToken =
            req?.body?.jwt ||
            req?.headers["authorization"]?.split(" ")[1] ||
            req?.cookies?.jwt;

        if (!accessToken) {
            console.error("❌ No access token found in request");
            throw new ApiError("Access token not found", 404);
        }

        let decodedToken;
        try {
            const jwtSecret = process?.env?.JWT_SECRET;
            if (!jwtSecret) throw new ApiError("JWT Token Secret not found", 500)
            decodedToken = jwt.verify(accessToken, jwtSecret) as JwtPayload;

        } catch (error) {
            if (error instanceof Error) {
                console.error("❌ JWT Verification Failed:", error.message);
            } else {
                console.error("❌ JWT Verification Failed:", error);
            }
            throw new ApiError("Invalid access token", 403);
        }



        const user = await User.findById(decodedToken._id).select("-password");
        if (!user) {
            console.error(" User Not Found in Database");
            throw new ApiError("User not found", 404);
        }


        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Error in validateTokens Middleware:", error);
        next(error);
    }
});