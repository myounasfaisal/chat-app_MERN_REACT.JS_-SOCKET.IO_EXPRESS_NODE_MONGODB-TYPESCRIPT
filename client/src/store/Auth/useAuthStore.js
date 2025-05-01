import {create} from "zustand"
import { checkAuth, signUp } from "./api/auth"

export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isLoggingIn:false,
    isSigningUp:false,
    checkAuth: ()=>checkAuth(set),
    signup:(userDetails)=>signUp(userDetails,set)
}))