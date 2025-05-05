import { axiosInstance } from "../../../lib/axios.js"
import toast from "react-hot-toast";

export const checkAuth = async (set) => {
    try {
        const res = await axiosInstance.get("/auth/check", {
            withCredentials: true, // Send cookies with the request
        });
        console.log("Authenticated:", res.data);
        set({ authUser: res.data, isUserLoggedIn: false });
    } catch (error) {
        console.error("CheckAuth Error:", error.message);
        set({ isUserLoggedIn: false});
    } finally {
        set({ isCheckingAuth: false });
    }
};

export const signUp = async (userDetails, set) => {
    try {
        set({ isSigningUp: true });
        const res = await axiosInstance.post("/auth/signup", userDetails);
        console.log("Signing Up: ", res.data['Data']);
        const { newUser } = res.data['Data'];
        set({ authUser: newUser });
        set({ isUserLoggedIn: true });
        toast.success("Account Created Successfully !");
    } catch (error) {
        console.error(error);
        toast.error("Failed to Create New User");

    } finally {
        set({ isSigningUp: false });
    }
}

export const logout = async (set) => {
    try {
        await axiosInstance.get("/auth/logout");
        set({ authUser: null });
        set({ isUserLoggedIn: false });
        toast.success("User Logged Out Successfully ");

    } catch (error) {
        console.error("logout error : ", error);
        toast, error("Failed To Logout");
    }
}

export const login = async (set,userDetails) =>{
    try {
        set({isLoggingIn:true})
        const res=await axiosInstance.post ("/auth/login",userDetails);
        console.log("Logging In: ", res.data['Data']);
        const { user } = res.data['Data'];
        set({ authUser: user });
        set({ isUserLoggedIn: true });
        toast.success("User Logged In Successfully");
    } catch (error) {
        console.error("Login Error : ",error);
        toast.error("Failed To Login");
    }finally{

        set({isLoggingIn:false})
    
    }
}