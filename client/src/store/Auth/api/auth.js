import { axiosInstance } from "../../../lib/axios.js";
import toast from "react-hot-toast";

export const checkAuth = async (set, get) => {
    try {
        const res = await axiosInstance.get("/auth/check", {
            withCredentials: true,
        });
        const { user } = res.data['Data'];
        set({ authUser: user, isUserLoggedIn: true });
        get().connectSocket();
    } catch (error) {
        console.error("CheckAuth Error:", error.message);
        set({ authUser: null, isUserLoggedIn: false });
    } finally {
        set({ isCheckingAuth: false });
    }
};

export const signUp = async (userDetails, set, get) => {
    try {
        set({ isSigningUp: true });
        const res = await axiosInstance.post("/auth/signup", userDetails);
        const { newUser } = res.data['Data'];
        set({ authUser: newUser, isUserLoggedIn: true });
        get().connectSocket();
        toast.success("Account Created Successfully!");
    } catch (error) {
        console.error("Signup Error:", error);
        toast.error("Failed to Create New User");
    } finally {
        set({ isSigningUp: false });
    }
};

export const login = async (set, userDetails, get) => {
    try {
        set({ isLoggingIn: true });
        const res = await axiosInstance.post("/auth/login", userDetails);
        const { user } = res.data['Data'];
        set({ authUser: user, isUserLoggedIn: true });
        get().connectSocket();
        toast.success("User Logged In Successfully");
    } catch (error) {
        console.error("Login Error:", error);
        toast.error("Failed to Login");
    } finally {
        set({ isLoggingIn: false });
    }
};

export const logout = async (set, get) => {
    try {
        await axiosInstance.get("/auth/logout");
        set({ authUser: null, isUserLoggedIn: false });
        get().disconnectSocket();
        toast.success("User Logged Out Successfully");
    } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Failed To Logout");
    }
};

export const updateProfile = async (userDetails, set) => {
    try {
        set({ isUpdatingProfile: true });
        const res = await axiosInstance.patch("/auth/update-profile", userDetails, {
            withCredentials: true
        });
        const { updatedUser } = res.data.Data;
        set({ authUser: updatedUser });
        toast.success("Profile Updated Successfully");
    } catch (error) {
        console.error("Update Profile Error:", error);
        toast.error("Failed to update profile");
    } finally {
        set({ isUpdatingProfile: false });
    }
};
