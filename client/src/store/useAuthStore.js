import {create} from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isLoggingIn:false,
    isRegistering:false,
    checkAuth:async()=>{
        const res =await axiosInstance.get("/auth/check")
    }
}))