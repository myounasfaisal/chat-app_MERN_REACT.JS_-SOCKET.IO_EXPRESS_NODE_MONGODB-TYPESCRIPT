import { axiosInstance } from "../../../lib/axios.js"
import toast from "react-hot-toast";

export const checkAuth=async(set)=>{
    try {
        const res =await axiosInstance.get("/auth/check")
        console.log(res);
        set({authUser:res.data});
    } catch (error) {
        console.error("Error : ",error.message);
    } finally{
       set({isCheckingAuth:false});
    }
}

export const signUp=async(userDetails,set)=>{
try {
    set({isSigningUp:true});
    const res= await axiosInstance.post("/auth/signup",userDetails);
    console.log("Signing Up: " , res)
    set({authUser:res.data});
} catch (error) {
    console.error(error);
    toast.error(error.message);
    
} finally{
    set({isSigningUp:false});
}
}